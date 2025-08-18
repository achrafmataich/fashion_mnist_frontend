import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { PredictionResponse } from '../../models/prediction.model';
import { PredictionService } from '../../services/prediction.service';

@Component({
  selector: 'app-file-upload',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css'
})
export class FileUploadComponent {
  uploadForm: FormGroup;
  selectedFile: File | null = null;
  previewUrl: string | null = null;
  isDragOver = false;
  isUploading = false;
  predictionResult: PredictionResponse | null = null;
  uploadError: string | null = null;

  // Allowed file types and max size
  readonly allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  private readonly maxFileSize = 5 * 1024 * 1024; // 5MB

  constructor(
    private fb: FormBuilder,
    private predictionService: PredictionService
  ) {
    this.uploadForm = this.fb.group({
      image: [null, [Validators.required]]
    });
  }

  ngOnInit(): void { }

  // Drag and drop event handlers
  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelection(files[0]);
    }
  }

  // File input change handler
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.handleFileSelection(input.files[0]);
    }
  }

  // Common file handling logic
  private handleFileSelection(file: File): void {
    if (this.isValidFile(file)) {
      this.selectedFile = file;
      this.uploadForm.patchValue({ image: file });
      this.uploadForm.get('image')?.updateValueAndValidity();
      this.generatePreview(file);
      this.clearErrors();
    }
  }

  // File validation
  private isValidFile(file: File): boolean {
    // Check file type
    if (!this.allowedTypes.includes(file.type.toLowerCase())) {
      this.uploadError = 'Please select a valid image file (JPEG, PNG)';
      return false;
    }

    // Check file size
    if (file.size > this.maxFileSize) {
      this.uploadError = 'File size must be less than 5MB';
      return false;
    }

    return true;
  }

  // Generate image preview
  private generatePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Remove selected image
  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.uploadForm.patchValue({ image: null });
    this.clearErrors();
    this.predictionResult = null;
  }

  // Clear error messages
  private clearErrors(): void {
    this.uploadError = null;
  }

  // Submit form and make prediction
  onSubmit(): void {
    if (this.uploadForm.valid && this.selectedFile) {
      this.isUploading = true;
      this.clearErrors();

      this.predictionService.predictImage(this.selectedFile).subscribe({
        next: (value: PredictionResponse) => {
          this.predictionResult = value;
          console.log(value);
          this.isUploading = false;
        },
        error: err => {
          this.uploadError = err.message || 'An error occurred during prediction';
          console.error(err);
          this.isUploading = false;
        }
      });
    }
  }

  // Reset form
  resetForm(): void {
    this.uploadForm.reset();
    this.selectedFile = null;
    this.previewUrl = null;
    this.predictionResult = null;
    this.clearErrors();
  }

  // Trigger file input click
  triggerFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }
}
