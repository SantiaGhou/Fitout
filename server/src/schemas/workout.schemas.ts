import { z } from 'zod';

export const exerciseSchema = z.object({
  name: z.string().min(1, 'Exercise name is required'),
  sets: z.number().min(1, 'Sets must be at least 1'),
  reps: z.string().min(1, 'Reps is required'),
  weight: z.number().optional(),
  duration: z.number().optional(),
  notes: z.string().optional(),
  order: z.number().default(0)
});

export const workoutSchema = z.object({
  name: z.string().min(1, 'Workout name is required'),
  userId: z.string().cuid('Invalid user ID'),
  date: z.string().datetime().or(z.date()),
  exercises: z.array(exerciseSchema).min(1, 'At least one exercise is required')
});

export const updateWorkoutSchema = workoutSchema.partial().extend({
  id: z.string().cuid('Invalid workout ID')
});

export type ExerciseInput = z.infer<typeof exerciseSchema>;
export type WorkoutInput = z.infer<typeof workoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>;