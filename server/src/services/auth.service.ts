import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/database';
import { env } from '../config/env';
import { createError } from '../middlewares/errorHandler';
import { RegisterInput, LoginInput } from '../schemas/auth.schemas';

export class AuthService {
  static async register(data: RegisterInput) {
    
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw createError('User already exists with this email', 409);
    }


    const hashedPassword = await bcrypt.hash(data.password, 12);


    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        type: data.type,
        name: data.name
      },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        createdAt: true
      }
    });

  
    const token = jwt.sign(
      { userId: user.id, email: user.email, type: user.type },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    return { user, token };
  }

  static async login(data: LoginInput) {

    const user = await prisma.user.findUnique({
      where: { email: data.email },
      include: {
        userProfile: true,
        personalProfile: true
      }
    });

    if (!user) {
      throw createError('Invalid credentials', 401);
    }


    const isValidPassword = await bcrypt.compare(data.password, user.password);
    if (!isValidPassword) {
      throw createError('Invalid credentials', 401);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email, type: user.type },
      env.JWT_SECRET,
      { expiresIn: env.JWT_EXPIRES_IN }
    );

    
    const { password, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  static async getProfile(userId: string) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProfile: true,
        personalProfile: true
      },
      select: {
        id: true,
        email: true,
        name: true,
        type: true,
        createdAt: true,
        userProfile: true,
        personalProfile: true
      }
    });

    if (!user) {
      throw createError('User not found', 404);
    }

    return user;
  }
}