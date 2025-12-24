import { Request, Response } from "express";
import { AuthService } from "./auth.service";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.register(email, password);
    return res.json({ token });
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    return res.json({ token });
  }
}
