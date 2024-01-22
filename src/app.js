import express, { json } from "express";
import { petsRouter } from "./routes/pets.js";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3005;

app.get("/", (req, res) => {
  res.send("<h1>Hola chapipets</h1>");
});

app.use("/pets", petsRouter);

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
