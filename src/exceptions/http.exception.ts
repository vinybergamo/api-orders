export class HttpException extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: string,
    public readonly error: string,
    public readonly message: string,
    public readonly errors?: Record<string, string[]>
  ) {
    super(message);

    this.statusCode = statusCode;
    this.code = code;
    this.error = error;
    this.errors = errors;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}
