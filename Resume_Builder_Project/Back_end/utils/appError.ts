class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;

  constructor(message: string, statusCode: number) {
    super(message);

    // Setting up the custom properties
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    // Set the prototype explicitly to maintain the instance of AppError
    Object.setPrototypeOf(this, new.target.prototype);

    // Capturing the stack trace
    Error.captureStackTrace(this);
  }
}

export default AppError;
