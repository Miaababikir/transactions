export class ApiResponse {
  data?: any;
  message?: string;
  status: number = 200;
  constructor(data?: any, message?: string, status?: number) {
    this.data = data;
    this.message = message;
    if (status) {
      this.status = status;
    }
  }
}
