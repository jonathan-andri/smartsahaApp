export interface UploadProgress {
    loaded: number;
    total: number;
    percentage: number;
  }
  
  export interface UploadResult {
    url: string;
    filename: string;
    size: number;
    mimeType: string;
  }