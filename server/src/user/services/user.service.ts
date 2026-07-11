import prisma from '../../config/database';
import { createError } from '../../middlewares/errorHandler';
import { UserProfileInput, PersonalProfileInput, UpdateUserInput } from '../../user/schemas/user.schemas';

export class UserService {
  static async updateUserProfile(userId: string, data: UserProfileInput) {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    if (user.type !== 'USER') {
      throw createError('Only regular users can have user profiles', 400);
    }


    const profile = await prisma.userProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data
      }
    });

    return profile;
  }

  static async updatePersonalProfile(userId: string, data: PersonalProfileInput) {

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { personalProfile: true }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    if (user.type !== 'PERSONAL') {
      throw createError('Only personal trainers can have personal profiles', 400);
    }

    const profile = await prisma.personalProfile.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        ...data
      }
    });

    return profile;
  }

  static async updateUser(userId: string, data: UpdateUserInput) {
    const user = await prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return user;
  }

  static async searchUsers(query: string, currentUserId: string) {
    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUserId } },
          { type: 'USER' },
          {
            OR: [
              { name: { contains: query } },
              { email: { contains: query } }
            ]
          }
        ]
      },
      select: {
        id: true,
        name: true,
        email: true,
        userProfile: {
          select: {
            objective: true,
            hasTrainer: true,
            photo: true
          }
        }
      },
      take: 20
    });

    return users;
  }

  static async addStudent(personalId: string, studentId: string) {
    // Verify personal trainer exists
    const personal = await prisma.user.findUnique({
      where: { id: personalId, type: 'PERSONAL' }
    });

    if (!personal) {
      throw createError('Personal trainer not found', 404);
    }


    const student = await prisma.user.findUnique({
      where: { id: studentId, type: 'USER' },
      include: { userProfile: true }
    });

    if (!student) {
      throw createError('Student not found', 404);
    }

    if (student.userProfile?.hasTrainer) {
      throw createError('Student already has a trainer', 400);
    }


    const relation = await prisma.studentRelation.create({
      data: {
        personalId,
        studentId
      }
    });


    await prisma.userProfile.update({
      where: { userId: studentId },
      data: { hasTrainer: true }
    });

    return relation;
  }

  static async getStudents(personalId: string) {
    const students = await prisma.studentRelation.findMany({
      where: { personalId },
      include: {
        student: {
          include: {
            userProfile: true,
            workouts: {
              where: {
                date: {
                  gte: new Date(new Date().setDate(new Date().getDate() - 30))
                }
              }
            }
          }
        }
      }
    });

    return students.map((relation: any) => ({
      id: relation.student.id,
      name: relation.student.name,
      email: relation.student.email,
      profile: relation.student.userProfile,
      workoutDays: relation.student.workouts.length,
      addedAt: relation.addedAt
    }));
  }
}