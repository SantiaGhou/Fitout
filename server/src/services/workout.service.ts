import prisma from '../config/database';
import { createError } from '../middlewares/errorHandler';
import {
  WorkoutInput,
  UpdateWorkoutInput,
  ExerciseInput,
} from '../schemas/workout.schemas';

export class WorkoutService {
  static async createWorkout(data: WorkoutInput, creatorId: string) {

    const user = await prisma.user.findUnique({
      where: { id: data.userId }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

   
    const workout = await prisma.workout.create({
      data: {
        name: data.name,
        userId: data.userId,
        personalId: creatorId,
        date: new Date(data.date),
        exercises: {
          create: data.exercises.map((exercise: ExerciseInput, index: number) => ({
            ...exercise,
            order: index
          }))
        }
      },
      include: {
        exercises: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return workout;
  }

  static async getUserWorkouts(userId: string) {
    const workouts = await prisma.workout.findMany({
      where: { userId },
      include: {
        exercises: {
          orderBy: { order: 'asc' }
        },
        personal: {
          select: {
            id: true,
            name: true
          }
        }
      },
      orderBy: { date: 'desc' }
    });

    return workouts;
  }

  static async getWorkoutById(workoutId: string, userId: string) {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        OR: [
          { userId },
          { personalId: userId }
        ]
      },
      include: {
        exercises: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!workout) {
      throw createError('Workout not found', 404);
    }

    return workout;
  }

  static async updateWorkout(workoutId: string, data: UpdateWorkoutInput, userId: string) {
    // Verify workout exists and user has permission
    const existingWorkout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        OR: [
          { userId },
          { personalId: userId }
        ]
      }
    });

    if (!existingWorkout) {
      throw createError('Workout not found', 404);
    }

    // Update workout
    const workout = await prisma.workout.update({
      where: { id: workoutId },
      data: {
        name: data.name,
        date: data.date ? new Date(data.date) : undefined,
        exercises: data.exercises
          ? {
              deleteMany: {},
              create: data.exercises.map(
                (exercise: ExerciseInput, index: number) => ({
                  ...exercise,
                  order: index,
                })
              ),
            }
          : undefined
      },
      include: {
        exercises: {
          orderBy: { order: 'asc' }
        }
      }
    });

    return workout;
  }

  static async deleteWorkout(workoutId: string, userId: string) {
    // Verify workout exists and user has permission
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        OR: [
          { userId },
          { personalId: userId }
        ]
      }
    });

    if (!workout) {
      throw createError('Workout not found', 404);
    }

    await prisma.workout.delete({
      where: { id: workoutId }
    });

    return { message: 'Workout deleted successfully' };
  }

  static async completeWorkout(workoutId: string, userId: string) {
    const workout = await prisma.workout.findFirst({
      where: {
        id: workoutId,
        userId
      }
    });

    if (!workout) {
      throw createError('Workout not found', 404);
    }

    const updatedWorkout = await prisma.workout.update({
      where: { id: workoutId },
      data: { completed: true },
      include: {
        exercises: {
          orderBy: { order: 'asc' }
        }
      }
    });

    // Update user's streak and workout days
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true }
    });

    if (user?.userProfile) {
      const today = new Date().toISOString().split('T')[0];
      const workoutDays: string[] = Array.isArray(user.userProfile.workoutDays)
        ? (user.userProfile.workoutDays as unknown as string[])
        : JSON.parse(user.userProfile.workoutDays || '[]');

      if (!workoutDays.includes(today)) {
        workoutDays.push(today);
        await prisma.userProfile.update({
          where: { userId },
          data: {
            workoutDays: JSON.stringify(workoutDays),
            streak: user.userProfile.streak + 1
          }
        });
      }
    }

    return updatedWorkout;
  }
}