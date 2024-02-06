import { readJson } from "../../utils/readJson.js";

const pets = readJson("../../pets.json");

export class PetsModel {
  static async getAll({ animal, size, breed }) {
    const filteredPets = pets.filter((pet) => {
      let filter = true;
      if (animal) {
        filter = pet.animal === animal.toLowerCase();
      }
      if (size && filter) {
        filter = pet.size === size.toLowerCase();
      }
      if (breed && filter) {
        filter = pet.breed.toLowerCase() === breed.toLowerCase();
      }
      return filter;
    });
    return filteredPets;
  }

  static async getById({ id }) {
    const pet = pets.find((pet) => pet.id == id);
    return pet;
  }

  static async create({ input }) {
    const newPet = {
      id: pets.length + 1,
      ...input,
    };

    pets.push(newPet);
    return newPet;
  }

  static async update({ id, input }) {
    const petsIndex = pets.findIndex((pet) => {
      return pet.id === id;
    });
    if (petsIndex === -1) {
      return undefined;
    }

    pets[petsIndex] = {
      ...pets[petsIndex],
      ...input,
    };
    return pets[petsIndex];
  }

  static async delete({ id }) {
    const petsIndex = pets.findIndex((pet) => {
      return pet.id === id;
    });
    if (petsIndex === -1) {
      return false;
    }

    pets.splice(petsIndex, 1);
    return true;
  }
}
