import { Request, Response, NextFunction } from "express";
import { Jwt } from "../utils/jwt";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const [type, token] = req.headers.authorization?.split(" ") ?? [];

  if (type !== "Bearer") {
    return res.status(401).json({
      statusCode: 401,
      code: "UNAUTHORIZED",
      error: "INVALID_TOKEN_TYPE",
      message: "Invalid token type",
    });
  }

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      code: "UNAUTHORIZED",
      error: "INVALID_TOKEN",
      message: "Invalid token",
    });
  }

  try {
    Jwt.verify(token);
    next();
  } catch {
    return res.status(401).json({
      statusCode: 401,
      code: "UNAUTHORIZED",
      error: "INVALID_TOKEN",
      message: "Invalid token",
    });
  }
}
