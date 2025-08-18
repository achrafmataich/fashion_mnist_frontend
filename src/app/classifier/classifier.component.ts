import { Component } from '@angular/core';
import { FileUploadComponent } from "../shared/file-upload/file-upload.component";

@Component({
  selector: 'app-classifier',
  imports: [FileUploadComponent],
  templateUrl: './classifier.component.html',
  styleUrl: './classifier.component.css'
})
export class ClassifierComponent {

}
