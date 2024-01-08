import User from '../models/user';
import UnauthenticatedError from '../errors/UnauthenticatedError';
import bcrypt from "bcrypt";
import NotFoundError from "../errors/NotFoundError";
import BadRequestError from "../errors/BadRequestError";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(userData: { username: string; password: string; email: string }): Promise<User> {
    return User.create(userData);
  }

  async getAllUsers(): Promise<User[]> {
    return User.findAll();
  }

  async getUserById(userId: string): Promise<User | null> {
    return User.findByPk(userId);
  }

  async updateUser(userId: string, userData: { username?: string; password?: string; email?: string }): Promise<[number, User[]]> {
    const [affectedCount, updatedUsers] = await User.update(userData, { where: { id: userId }, returning: true });
    return [affectedCount, updatedUsers];
  }

  async deleteUser(userId: string): Promise<number> {
    const result = await User.destroy({ where: { id: userId } });
    return result;
  }
}

export default new UserService();
