import { User } from "../../models/user.model";
import { Crypt } from "../../utils/crypt";
import { Jwt } from "../../utils/jwt";

export class AuthService {
  static async register(email: string, password: string) {
    const hash = await Crypt.hash(password);
    const exists = await User.findOne({ email });

    if (exists) {
      throw new Error("User already exists");
    }

    const user = await User.create({ email, password: hash });
    return Jwt.sign({ sub: user._id });
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await Crypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid password");
    }

    return Jwt.sign({ sub: user._id });
  }
}
