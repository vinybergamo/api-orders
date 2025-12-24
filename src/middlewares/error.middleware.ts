import { NextFunction, Request, Response } from "express";
import { treeifyError, ZodError } from "zod";
import { HttpException } from "../exceptions/http.exception";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      statusCode: 400,
      code: "BAD_REQUEST",
      error: "VALIDATION_ERROR",
      message: JSON.parse(err.message),
      errors: treeifyError(err).errors,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      statusCode: err.statusCode,
      code: err.code,
      error: err.error,
      message: err.message,
      errors: err.errors,
    });
  }

  console.error(err);

  return res.status(500).json({
    statusCode: 500,
    code: "INTERNAL_SERVER_ERROR",
    error: "INTERNAL_SERVER_ERROR",
    message: err?.message || "Internal Server Error",
  });
}
