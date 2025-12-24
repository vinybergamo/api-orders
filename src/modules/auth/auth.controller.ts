import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const token = await AuthService.register(req.body);
    return res.json({ token });
  }

  static async login(req: Request, res: Response) {
    const token = await AuthService.login(req.body);
    return res.json({ token });
  }
}
