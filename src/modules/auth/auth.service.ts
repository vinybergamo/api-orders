import { HttpException } from "../../exceptions/http.exception";
import { User } from "../../models/user.model";
import { Crypt } from "../../utils/crypt";
import { Jwt } from "../../utils/jwt";

export class AuthService {
  static async register(email: string, password: string) {
    const hash = await Crypt.hash(password);
    const exists = await User.findOne({ email });

    if (exists) {
      throw new HttpException(
        409,
        "CONFLICT",
        "USER_ALREADY_EXISTS",
        "User already exists"
      );
    }

    const user = await User.create({ email, password: hash });
    return Jwt.sign({ sub: user._id });
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new HttpException(
        404,
        "NOT_FOUND",
        "USER_NOT_FOUND",
        "User not found"
      );
    }

    const valid = await Crypt.compare(password, user.password);

    if (!valid) {
      throw new HttpException(
        401,
        "UNAUTHORIZED",
        "INVALID_PASSWORD",
        "Invalid password"
      );
    }

    return Jwt.sign({ sub: user._id });
  }
}
