import jwt from "jsonwebtoken";
import { env } from "../config/env";

export class Jwt {
  static sign(payload: Record<string, unknown>) {
    return jwt.sign(payload, env.jwt.secret, {
      expiresIn: "7d",
    });
  }

  static verify(token: string) {
    return jwt.verify(token, env.jwt.secret);
  }

  static decode(token: string) {
    return jwt.decode(token);
  }
}
