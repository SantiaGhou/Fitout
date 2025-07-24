import { Request, Response, NextFunction } from 'express';
import { WorkoutService } from '../services/workout.service';
import { AuthRequest } from '../middlewares/auth';

export class WorkoutController {
  static async createWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const workout = await WorkoutService.createWorkout(req.body, req.user!.id);
      res.status(201).json({
        message: 'Workout created successfully',
        data: workout
      });
    } catch (error) {
      next(error);
    }
  }

  static async getUserWorkouts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const workouts = await WorkoutService.getUserWorkouts(userId || req.user!.id);
      res.json({
        message: 'Workouts retrieved successfully',
        data: workouts
      });
    } catch (error) {
      next(error);
    }
  }

  static async getWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const workout = await WorkoutService.getWorkoutById(id, req.user!.id);
      res.json({
        message: 'Workout retrieved successfully',
        data: workout
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const workout = await WorkoutService.updateWorkout(id, req.body, req.user!.id);
      res.json({
        message: 'Workout updated successfully',
        data: workout
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await WorkoutService.deleteWorkout(id, req.user!.id);
      res.json(result);
    } catch (error) {
      next(error);
    }
  }

  static async completeWorkout(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const workout = await WorkoutService.completeWorkout(id, req.user!.id);
      res.json({
        message: 'Workout completed successfully',
        data: workout
      });
    } catch (error) {
      next(error);
    }
  }
}