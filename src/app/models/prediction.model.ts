export interface PredictionResponse {
  success: boolean;
  data?: PredictionData;
  error?: string;
}

export interface PredictionData {
  predicted_class: string;
}

export interface UploadProgress {
  status: 'uploading' | 'progress' | 'complete' | 'error';
  message?: number | string;
  body?: any;
}