/* eslint-disable @typescript-eslint/no-explicit-any */
export class HttpException extends Error {
  public message: string;
  public errorCode: any;
  public statusCode: number;
  public errors: any;

  constructor(
    message: string,
    errorCode: any,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
