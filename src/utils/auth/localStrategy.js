import { Strategy } from "passport-local";
import bcrypt from "bcryptjs";
import { UsersModel } from "../../models/mysql/user.js";

export const localStrategy = new Strategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async (email, password, done) => {
    try {
      const user = await UsersModel.getByEmail({ email, withPassword: true });
      if (!user) {
        // done(boom.unauthorized(), false);
        throw new Error("Error");
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        // done(boom.unauthorized(), false);
        throw new Error("Error");
      }
      delete user.password;
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);
