import { Router, Request, Response } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import workoutRoutes from './workout.routes';

const router = Router();


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);


router.get('/health', (req: Request, res: Response) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;