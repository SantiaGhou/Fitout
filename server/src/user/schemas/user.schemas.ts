import { z } from 'zod';

export const userProfileSchema = z.object({
  age: z.number().min(1).max(120),
  gender: z.enum(['M', 'F']),
  bloodType: z.string(),
  height: z.number().min(50).max(300), // cm
  weight: z.number().min(20).max(500), // kg
  hasTrainer: z.boolean().default(false),
  objective: z.enum(['MASS', 'FAT_LOSS', 'HEALTH']),
  workoutType: z.enum(['GYM', 'CARDIO', 'FUNCTIONAL', 'OTHER']),
  frequency: z.number().min(0).max(7),
  schedule: z.enum(['MORNING', 'AFTERNOON', 'EVENING', 'FLEXIBLE']),
  allergies: z.string().optional(),
  avoidFoods: z.string().optional(),
  dietType: z.enum(['FEW_MEALS', 'MANY_MEALS', 'PRACTICAL']),
  intermittentFasting: z.enum(['YES', 'NO', 'MAYBE']),
  photo: z.string().optional()
});

export const personalProfileSchema = z.object({
  cref: z.string().optional(),
  photo: z.string().optional(),
  experience: z.number().min(0).default(0)
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional()
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;