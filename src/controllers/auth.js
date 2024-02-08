import jwt from "jsonwebtoken";

export class AuthController {
  static login(req, res) {
    const user = req.user;
    const payload = {
      sub: user.IdUser,
      role: user.role,
    };
    const token = jwt.sign(payload, "secret");
    res.json({ user, token });
  }
}
