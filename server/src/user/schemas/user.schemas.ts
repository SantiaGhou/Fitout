import { z } from 'zod';

// Aceita qualquer case e transforma para UPPERCASE antes de validar
const upperEnum = <T extends string>(values: [T, ...T[]]) =>
  z.preprocess((v) => (typeof v === 'string' ? v.toUpperCase() : v), z.enum(values));

// Converte null → undefined para campos opcionais vindos do banco
const nullableString = z.preprocess(
  (v) => (v === null ? undefined : v),
  z.string().optional()
);

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
  allergies: nullableString,
  avoidFoods: nullableString,
  dietType: upperEnum(['FEW_MEALS', 'MANY_MEALS', 'PRACTICAL']),
  intermittentFasting: upperEnum(['YES', 'NO', 'MAYBE']),
  photo: nullableString,
});

// Schema parcial para updates — nenhum campo é obrigatório
export const updateUserProfileSchema = userProfileSchema.partial();

export const personalProfileSchema = z.object({
  cref: z.string().optional(),
  photo: z.string().optional(),
  experience: z.number().min(0).default(0),
});

// Capitaliza cada palavra: "joao silva" → "Joao Silva"
const capitalizeName = (v: unknown) => {
  if (typeof v !== 'string') return v;
  return v
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const updateUserSchema = z.object({
  name: z.preprocess(capitalizeName, z.string().optional()),
  email: z.string().email().optional(),
});

export type UserProfileInput = z.infer<typeof userProfileSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type PersonalProfileInput = z.infer<typeof personalProfileSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
