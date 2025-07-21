import { Router } from 'express';
import { WorkoutController } from '../controllers/workout.controller';
import { validateBody, validateParams } from '../middlewares/validation';
import { authenticateToken } from '../middlewares/auth';
import { workoutSchema, updateWorkoutSchema } from '../schemas/workout.schemas';
import { z } from 'zod';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

const idParamSchema = z.object({
  id: z.string().cuid('Invalid workout ID')
});

const userIdParamSchema = z.object({
  userId: z.string().cuid('Invalid user ID').optional()
});

// Workout CRUD routes
router.post('/', validateBody(workoutSchema), WorkoutController.createWorkout);
router.get('/user/:userId?', validateParams(userIdParamSchema), WorkoutController.getUserWorkouts);
router.get('/:id', validateParams(idParamSchema), WorkoutController.getWorkout);
router.put('/:id', validateParams(idParamSchema), validateBody(updateWorkoutSchema), WorkoutController.updateWorkout);
router.delete('/:id', validateParams(idParamSchema), WorkoutController.deleteWorkout);
router.patch('/:id/complete', validateParams(idParamSchema), WorkoutController.completeWorkout);

export default router;