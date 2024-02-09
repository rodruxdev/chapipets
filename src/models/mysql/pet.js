import { pool } from "../../services/mysqlPool.js";
import { UsersModel } from "./user.js";

export class PetsModel {
  static async getAll(filters) {
    let query =
      "SELECT id_pet as petId, type, name, description, breed, age, size, color, image, pet_state, (BIN_TO_UUID(id_user)) as userId FROM pet WHERE ";
    const conditions = ["state = ?"];
    const values = ["enabled"];
    if (filters) {
      if (filters.type) {
        conditions.push("type = ?");
        values.push(filters.type);
      }
      if (filters.name) {
        conditions.push("name LIKE ?");
        values.push(`${filters.name}%`);
      }
      if (filters.breed) {
        conditions.push("LOWER(breed) = ?");
        values.push(filters.breed.toLowerCase());
      }
      if (filters.size) {
        conditions.push("LOWER(size) = ?");
        values.push(filters.size.toLowerCase());
      }
      if (filters.age) {
        conditions.push("age = ?");
        values.push(filters.age.toLowerCase());
      }
      if (filters.color) {
        conditions.push("LOWER(color) = ?");
        values.push(filters.color.toLowerCase());
      }
      if (filters.petState) {
        conditions.push("pet_state = ?");
        values.push(filters.petState);
      }
      if (filters.userId) {
        conditions.push("id_user = (UUID_TO_BIN(?))");
        values.push(filters.userId);
      }
    }
    query += conditions.join(" AND ");
    query += ";";

    try {
      const [pets] = await pool.query(query, values);
      return pets;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error obtaining pets: ${errorMessage}`);
    }
  }

  static async getByUserId({ userId }) {
    try {
      const [pets] = await pool.query(
        `SELECT id_pet as petId, type, name, description, breed, age, size, color, image, pet_state, (BIN_TO_UUID(id_user)) as userId
        FROM pet WHERE id_user = (UUID_TO_BIN(?)) AND state = "enabled";`,
        [userId]
      );
      if (pets.length === 0) return null;
      return pets;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error obtaining pet with user id: ${errorMessage}`);
    }
  }

  static async getById({ id }) {
    try {
      const [pet] = await pool.query(
        `SELECT id_pet as petId, type, name, description, breed, age, size, color, image, pet_state, (BIN_TO_UUID(id_user)) as userId
        FROM pet WHERE id_pet = ? AND state = "enabled";`,
        [id]
      );
      if (pet.length === 0) return null;
      return pet[0];
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error obtaining pet with id: ${errorMessage}`);
    }
  }

  static async create({ input }) {
    const {
      type,
      name,
      description,
      breed,
      age,
      size,
      color,
      image,
      petState,
      userId,
    } = input;
    const state = "enabled";

    try {
      const user = await UsersModel.getById({ userId });
      if (user === null) {
        throw new Error(`Error: User doesn't exist or was deleted`);
      }
      const petResult = await pool.query(
        `INSERT INTO pet (type, name, description, breed, age, size, color, image, pet_state, state, id_user)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, (UUID_TO_BIN(?)));`,
        [
          type,
          name,
          description,
          breed,
          age,
          size,
          color,
          image,
          petState,
          state,
          userId,
        ]
      );
      const { affectedRows, insertId } = petResult[0];
      if (affectedRows === 1) {
        const newPet = await this.getById({ id: insertId });
        return newPet;
      }
      return null;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error creating pet: ${errorMessage}`);
    }
  }

  static async update({ id, input }) {
    let query = "UPDATE pet SET ";
    const conditions = [];
    const values = [];
    if (input) {
      if (input.type) {
        conditions.push("type = ?");
        values.push(input.type);
      }
      if (input.name) {
        conditions.push("name = ?");
        values.push(`${input.name}%`);
      }
      if (input.description) {
        conditions.push("description = ?");
        values.push(input.description);
      }
      if (input.breed) {
        conditions.push("breed = ?");
        values.push(input.breed);
      }
      if (input.size) {
        conditions.push("size = ?");
        values.push(input.size);
      }
      if (input.age) {
        conditions.push("age = ?");
        values.push(input.age);
      }
      if (input.color) {
        conditions.push("color = ?");
        values.push(input.color);
      }
      if (input.image) {
        conditions.push("image = ?");
        values.push(input.image);
      }
      if (input.petState) {
        conditions.push("pet_state = ?");
        values.push(input.petState);
      }
      query += conditions.join(", ");
      query += ' WHERE id_pet = ? AND state = "enabled";';
      values.push(id);
      try {
        const result = await pool.query(query, values);
        const pet = await this.getById({ id: id });
        return pet;
      } catch (error) {
        const errorMessage = error.message ?? error;
        throw new Error(`Error updating pet: ${errorMessage}`);
      }
    }
  }

  static async delete({ id }) {
    try {
      const result = await pool.query(
        'UPDATE pet SET state = "disabled" WHERE id_pet = ? AND state = "enabled";',
        [id]
      );
      if (result[0].affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error deleting pet: ${errorMessage}`);
    }
  }

  static async deleteByUserId({ userId }) {
    try {
      const result = await pool.query(
        'UPDATE pet SET state = "disabled" WHERE id_user=(UUID_TO_BIN(?)) AND state="enabled";',
        [userId]
      );
      if (result[0].affectedRows === 0) {
        return false;
      }
      return true;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error deleting pet: ${errorMessage}`);
    }
  }
}
