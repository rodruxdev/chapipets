import { UsersModel } from "../models/mysql/user.js";
import { validatePartialUser, validateUser } from "../schemas/users.js";

export class UsersController {
  static async getAll(req, res) {
    const result = validatePartialUser(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const filters = result.data;
    const filteredUsers = await UsersModel.getAll(filters);
    res.json(filteredUsers);
  }

  static async getById(req, res) {
    const { id } = req.params;
    const user = await UsersModel.getById({ userId: id });
    if (user === undefined) {
      return res.status(404).json({ message: "User don't found" });
    }
    res.json(user);
  }

  static async create(req, res) {
    const result = validateUser(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const newUser = await UsersModel.create({ input: result.data });
    res.status(201).json(newUser);
  }

  static async update(req, res) {
    const result = validatePartialUser(req.body);
    if (result.error) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    const { id } = req.params;
    const updatedUser = await UsersModel.update({ id, input: result.data });
    if (updatedUser === undefined) {
      return res.status(404).json({ message: "User don't found" });
    }
    res.status(200).json(updatedUser);
  }

  static async delete(req, res) {
    const { id } = req.params;
    const deleteUserResult = await UsersModel.delete({ userId: id });
    if (!deleteUserResult) {
      return res.status(404).json({ message: "User don't found" });
    }
    res.status(204);
  }
}
