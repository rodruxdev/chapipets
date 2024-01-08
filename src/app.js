const express = require("express");

const app = express();
app.disable("x-powered-by");

app.use(express.json());

const PORT = process.env.PORT ?? 3005;

let pets = [];

app.get("/", (req, res) => {
  res.send("<h1>Hola chapipets</h1>");
});

app.get("/pets", (req, res) => {
  res.json(pets);
});

app.get("/pets/:id", (req, res) => {
  const petId = Number(req.params.id);
  const petsIndex = pets.findIndex((pet) => {
    return pet.id === petId;
  });
  if (petsIndex !== -1) {
    res.json(pets[petsIndex]);
  } else {
    res.status(404).send("<h1>404</h1>");
  }
});

app.post("/pets", (req, res) => {
  const newPet = req.body;
  pets.push(newPet);
  res.status(201).json(newPet);
});

app.put("/pets/:id", (req, res) => {});

app.patch("/pets/:id", (req, res) => {});

app.delete("/pets/:id", (req, res) => {});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
