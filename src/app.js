const express = require("express");
const pets = require("../pets.json");
const cors = require("cors");

const { validatePet, validatePartialPet } = require("./schemas/pets");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: (origin, callback) => {
      const ACCEPTED_ORIGINS = [
        "http://localhost:3000",
        "https://chapipets.com",
      ];

      if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.disable("x-powered-by");

const PORT = process.env.PORT ?? 3005;

app.get("/", (req, res) => {
  res.send("<h1>Hola chapipets</h1>");
});

app.get("/pets", (req, res) => {
  const { animal } = req.query;
  if (animal) {
    const filteredPets = pets.filter(
      (pet) => pet.animal === animal.toLowerCase()
    );
    return res.json(filteredPets);
  }
  res.json(pets);
});

app.get("/pets/:id", (req, res) => {
  const petId = Number(req.params.id);
  const petsIndex = pets.findIndex((pet) => {
    return pet.id === petId;
  });
  if (petsIndex < 0) {
    return res.status(404).json({ message: "Pet don't found" });
  }
  res.json(pets[petsIndex]);
});

app.post("/pets", (req, res) => {
  const result = validatePet(req.body);
  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const newPet = {
    id: pets.length + 1,
    ...result.data,
  };

  pets.push(newPet);

  res.status(201).json(newPet);
});

// app.put("/pets/:id", (req, res) => {});

app.patch("/pets/:id", (req, res) => {
  const result = validatePartialPet(req.body);

  if (result.error) {
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  }

  const petId = Number(req.params.id);
  const petsIndex = pets.findIndex((pet) => {
    return pet.id === petId;
  });
  if (petsIndex < 0) {
    return res.status(404).json({ message: "Pet don't found" });
  }

  const newPet = {
    ...pets[petsIndex],
    ...result.data,
  };

  pets[petsIndex] = newPet;

  res.status(200).json(newPet);
});

app.delete("/pets/:id", (req, res) => {
  const petId = Number(req.params.id);
  const petsIndex = pets.findIndex((pet) => {
    return pet.id === petId;
  });
  if (petsIndex < 0) {
    return res.status(404).json({ message: "Pet don't found" });
  }

  pets.splice(petsIndex, 1);
  res.status(204);
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: http://localhost:${PORT}`);
});
