import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { AuthRequest } from '../middlewares/auth';

export class UserController {
  static async updateUserProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await UserService.updateUserProfile(req.user!.id, req.body);
      res.json({
        message: 'User profile updated successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePersonalProfile(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const profile = await UserService.updatePersonalProfile(req.user!.id, req.body);
      res.json({
        message: 'Personal profile updated successfully',
        data: profile
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const user = await UserService.updateUser(req.user!.id, req.body);
      res.json({
        message: 'User updated successfully',
        data: user
      });
    } catch (error) {
      next(error);
    }
  }

  static async searchUsers(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { q } = req.query;
      const users = await UserService.searchUsers(q as string, req.user!.id);
      res.json({
        message: 'Users retrieved successfully',
        data: users
      });
    } catch (error) {
      next(error);
    }
  }

  static async addStudent(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { studentId } = req.body;
      const relation = await UserService.addStudent(req.user!.id, studentId);
      res.status(201).json({
        message: 'Student added successfully',
        data: relation
      });
    } catch (error) {
      next(error);
    }
  }

  static async getStudents(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const students = await UserService.getStudents(req.user!.id);
      res.json({
        message: 'Students retrieved successfully',
        data: students
      });
    } catch (error) {
      next(error);
    }
  }
}