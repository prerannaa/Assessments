import { Request, Response } from 'express';
import UserService from '../services/AuthService';

class UserController {
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { username, password, email } = req.body;
      const user = await UserService.createUser({ username, password, email });
      res.status(201).json(user);
    } catch (error) { 
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await UserService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const { username, password, email } = req.body;
      const [affectedCount, [updatedUser]] = await UserService.updateUser(userId, { username, password, email });

      if (affectedCount > 0 && updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const deletedRows = await UserService.deleteUser(userId);

      if (deletedRows > 0) {
        res.status(204).send();
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new UserController();
