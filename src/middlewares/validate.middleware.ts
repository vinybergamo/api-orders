import { NextFunction, Request, Response } from "express";
import { ZodSchema, treeifyError } from "zod";

export function validateBodyMiddleware(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        statusCode: 400,
        code: "BAD_REQUEST",
        error: "VALIDATION_ERROR",
        message: JSON.parse(result.error.message),
        errors: treeifyError(result.error).errors,
      });
    }

    req.body = result.data;
    next();
  };
}
