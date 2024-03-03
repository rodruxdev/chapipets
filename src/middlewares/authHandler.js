import { Boom } from "@hapi/boom";

export function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(Boom.unauthorized());
    }
  };
}
