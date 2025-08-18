import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment.example';
import { PredictionResponse } from '../models/prediction.model';


@Injectable({
  providedIn: 'root'
})
export class PredictionService {

  private readonly apiUrl = environment.apiUrl;
  private readonly predictEndpoint = environment.predictEndpoint;

  constructor(private http: HttpClient) { }

  predictImage(imageFile: File): Observable<PredictionResponse> {
    const formData = new FormData();
    formData.append('imageFile', imageFile);

    const mapRawToResponse = (value: { predicted_class: string }): PredictionResponse => ({ success: true, data: value });

    return this.http
      .post<{ predicted_class: string }>(`${this.apiUrl}${this.predictEndpoint}`, formData)
      .pipe(
        map(mapRawToResponse)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<PredictionResponse> {
    let errorMessage = 'An error occurred during prediction';

    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid image file. Please select a valid Fashion MNIST image.';
          break;
        case 413:
          errorMessage = 'File too large. Please select a smaller image.';
          break;
        case 500:
          errorMessage = 'Server error. Please try again later.';
          break;
        default:
          errorMessage = `Server returned code: ${error.status}, error message: ${error.message}`;
      }
    }

    return throwError(() => ({
      success: false,
      error: errorMessage
    }));
  }
}
