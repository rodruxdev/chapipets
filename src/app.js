import express, { json } from "express";
import { petsRouter } from "./routes/pets.js";
import { corsMiddleware } from "./middlewares/cors.js";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";
import passport from "passport";
import { localStrategy } from "./utils/auth/localStrategy.js";
import { JwtStrategy } from "./utils/auth/jwtStrategy.js";
import {
  boomHandler,
  errorHandler,
  logErrors,
} from "./middlewares/errorHandlers.js";

const app = express();

passport.use(localStrategy);
passport.use(JwtStrategy);
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3005;

app.get("/", (req, res) => {
  res.send("<h1>Hola chapipets</h1>");
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/pets", petsRouter);

app.use(logErrors);
app.use(boomHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
