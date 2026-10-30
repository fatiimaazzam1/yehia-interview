//used in both server and client components
export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message); // This calls the parent Error constructor
    this.name = 'ApiError';
    this.status = status;
  }
}
//this is important as when our fetch request fails with a 503, we want to capture both message(Server is down) and the status code 503
//Error is a standard envelope holding the message only
//ApiError is a custom envelope holding both the message and the status code