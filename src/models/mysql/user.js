import { pool } from "../../services/mysqlPool.js";
import bcrypt from "bcryptjs";
import { PetsModel } from "./pet.js";

export class UsersModel {
  static async getAll(filters) {
    let query =
      "SELECT (BIN_TO_UUID(id_user)), name, description, email, cellphone, role FROM user WHERE ";
    const conditions = ["sate = ?"];
    const values = ["enabled"];
    if (filters) {
      if (filters.name) {
        conditions.push("name LIKE ?");
        values.push(`${filters.name}%`);
      }
      if (filters.email) {
        conditions.push("email = ?");
        values.push(filters.email);
      }
      if (filters.cellphone) {
        conditions.push("cellphone = ?");
        values.push(filters.cellphone);
      }
      if (filters.role) {
        conditions.push("role = ?");
        values.push(filters.role);
      }
    }
    query += conditions.join(" AND ");
    query += ";";

    try {
      const [users] = await pool.query(query, values);
      return users;
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error obtaining users: ${errorMessage}`);
    }
  }

  static async getById({ userId }) {
    try {
      const [user] = await pool.query(
        `SELECT (BIN_TO_UUID(id_user)), name, description, email, cellphone, role FROM user WHERE id_user = (UUID_TO_BIN(?)) AND state = "enabled";`,
        [userId]
      );
      if (user.length === 0) return null;
      return user[0];
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error obtaining user with id: ${errorMessage}`);
    }
  }

  static async create({ input }) {
    const { name, description, email, cellphone, password, role } = input;
    const hashedPassword = await bcrypt.hash(password, 8);
    try {
      const [uuidResult] = await connection.query("SELECT UUID() uuid;");
      const [{ userId }] = uuidResult;
      const userResult = await pool.query(
        `INSERT INTO user (id_user, name, description, email, cellphone, password, role)
      VALUES ((UUID_TO_BIN("${userId}")), ?, ?, ?, ?, ?);`,
        [name, description, email, cellphone, hashedPassword, role]
      );
      return userResult[0];
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error creating user: ${errorMessage}`);
    }
  }

  static async update({ id, input }) {
    let query = "UPDATE user SET ";
    const conditions = [];
    const values = [];
    if (input) {
      if (input.name) {
        conditions.push("name = ?");
        values.push(input.name);
      }
      if (input.description) {
        conditions.push("description = ?");
        values.push(input.description);
      }
      if (input.email) {
        conditions.push("email = ?");
        values.push(input.email);
      }
      if (input.cellphone) {
        conditions.push("cellphone = ?");
        values.push(input.cellphone);
      }
      if (input.password) {
        conditions.push("password = ?");
        values.push(input.password);
      }
      if (input.role) {
        conditions.push("role = ?");
        values.push(input.role);
      }
    }
    query += conditions.join(", ");
    query += ' WHERE id_user = (UUID_TO_BIN(?))  AND state = "enabled";';
    values.push(id);

    try {
      const result = await pool.query(query, values);
      return result[0];
    } catch (error) {
      const errorMessage = error.message ?? error;
      throw new Error(`Error updating pet: ${errorMessage}`);
    }
  }

  static async delete({ id }) {
    try {
      const result = await pool.query(
        'UPDATE user SET state = "disabled" WHERE id_user = (UUID_TO_BIN(?)) AND state = "enabled";',
        [id]
      );
      await PetsModel.deleteByUserId({ id });
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
