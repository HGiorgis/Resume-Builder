import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";

interface ErrorHandler extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
  stack?: string;
  code?: number;
  name: string;
  errors?: Record<string, { message: string }>;
  path?: string;
  value?: string;
  errmsg?: string;
}
const handleCastErrorDB = (err: ErrorHandler): AppError => {
  const message = `Invalid ${err.path} : ${err.value}.`;
  return new AppError(message, 404);
};

const handleDuplicateDB = (err: ErrorHandler): AppError => {
  const match = err.errmsg?.match(/(["'])(\\?.)*?\1/);
  const value = match ? match[0] : "unknown value";

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
const handleValidationErrorDB = (err: ErrorHandler): AppError => {
  const errors = Object.values(err.errors || {}).map((er) => er.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJsonWebTokenError = (): AppError => {
  return new AppError("Invalid token", 401);
};

const handleTokenExpiredError = (): AppError => {
  return new AppError("Token is expired", 401);
};

const sendErrorDev = (res: Response, err: AppError): void => {
  res.status(err.statusCode).json({
    status: err.status,
    err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (res: Response, err: AppError): void => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong",
    });
  }
};
export default (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  err.statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err as AppError);
  } else if (process.env.NODE_ENV === "production") {
    let error: AppError = {
      ...err,
      isOperational: false,
      statusCode: err.statusCode || 500,
      status,
    };

    if (err.code === 11000) error = handleDuplicateDB(error);
    if (err.name === "ValidationError") error = handleValidationErrorDB(error);
    if (err.name === "CastError") error = handleCastErrorDB(error);
    if (err.name === "JsonWebTokenError") error = handleJsonWebTokenError();
    if (err.name === "TokenExpiredError") error = handleTokenExpiredError();

    sendErrorProd(res, error);
  }
};
