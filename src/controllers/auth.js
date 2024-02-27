import jwt from "jsonwebtoken";
import { configValues } from "../config.js";

export class AuthController {
  static login(req, res) {
    const { user } = req;
    const payload = {
      sub: user.userId,
      role: user.role,
    };
    const token = jwt.sign(payload, configValues.secret);
    res.json({ user, token });
  }
}
