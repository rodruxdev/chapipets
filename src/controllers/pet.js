import { Boom } from "@hapi/boom";
import { PetsModel } from "../models/mysql/pet.js";
import { validatePartialPet, validatePet } from "../schemas/pets.js";

export class PetsController {
  static async getAll(req, res) {
    const result = validatePartialPet(req.body);
    if (result.error) {
      throw Boom.badRequest(result.error.message);
    }
    const filters = result.data;
    const filteredPets = await PetsModel.getAll(filters);
    res.json(filteredPets);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const pet = await PetsModel.getById({ id });
    if (pet === undefined) {
      throw Boom.notFound("Pet don't found");
    }
    res.json(pet);
  }

  static async getByUserId(req, res) {
    const { userId } = req.params;
    const pet = await PetsModel.getByUserId({ userId });
    if (pet === undefined) {
      throw Boom.notFound("Pets don't found for user");
    }
    res.json(pet);
  }

  static async create(req, res) {
    const result = validatePet(req.body);
    if (result.error) {
      throw Boom.badRequest(result.error.message);
    }
    const newPet = await PetsModel.create({ input: result.data });
    res.status(201).json(newPet);
  }

  static async update(req, res) {
    const result = validatePartialPet(req.body);
    if (result.error) {
      throw Boom.badRequest(result.error.message);
    }
    const id = Number(req.params.id);
    const updatedPet = await PetsModel.update({ id, input: result.data });
    if (updatedPet === undefined) {
      throw Boom.notFound("Pets don't found for user");
    }
    res.status(200).json(updatedPet);
  }

  static async delete(req, res) {
    const id = Number(req.params.id);
    const deletePetResult = await PetsModel.delete({ id });
    if (!deletePetResult) {
      throw Boom.notFound("Pets don't found for user");
    }
    res.status(204);
  }
}
