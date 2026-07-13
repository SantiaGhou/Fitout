import { z } from 'zod';

// Zod v3: aceita qualquer case e transforma para UPPERCASE antes de validar
const upperEnum = <T extends string>(values: [T, ...T[]]) =>
  z.preprocess((v) => (typeof v === 'string' ? v.toUpperCase() : v), z.enum(values));

export const userProfileSchema = z.object({
  age: z.number().min(1).max(120),
  gender: upperEnum(['M', 'F']),
  bloodType: z.string(),
  height: z.number().min(50).max(300),
  weight: z.number().min(20).max(500),
  hasTrainer: z.boolean().default(false),
  objective: upperEnum(['MASS', 'FAT_LOSS', 'HEALTH']),
  workoutType: upperEnum(['GYM', 'CARDIO', 'FUNCTIONAL', 'OTHER']),
  frequency: z.number().min(0).max(7),
  schedule: upperEnum(['MORNING', 'AFTERNOON', 'EVENING', 'FLEXIBLE']),
  allergies: z.string().optional(),
  avoidFoods: z.string().optional(),
  dietType: upperEnum(['FEW_MEALS', 'MANY_MEALS', 'PRACTICAL']),
  intermittentFasting: upperEnum(['YES', 'NO', 'MAYBE']),
  photo: z.string().optional(),
});

export const personalProfileSchema = z.object({
  cref: z.string().optional(),
  photo: z.string().optional(),
  experience: z.number().min(0).default(0),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
