import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, type, name, profile } = req.body;

    if (!email || !password || !type || !profile) {
      return res.status(400).json({ error: "Dados obrigatórios faltando" });
    }

   
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        type,
        name,
        profile: {
          create: {
            age: profile.age,
            gender: profile.gender,
            bloodType: profile.bloodType,
            height: profile.height,
            weight: profile.weight,
            hasTrainer: profile.hasTrainer,
            objective: profile.objective,
            workoutType: profile.workoutType,
            frequency: profile.frequency,
            schedule: profile.schedule,
            allergies: profile.allergies,
            avoidFoods: profile.avoidFoods,
            dietType: profile.dietType,
            intermittentFasting: profile.intermittentFasting,
            streak: profile.streak,
            workoutDays: {
              set: profile.workoutDays,
            },
          },
        },
      },
    });

    const userWithProfile = await prisma.user.findUnique({
      where: { id: createdUser.id },
      include: {
        profile: true,
      },
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso",
      user: userWithProfile,
    });
  } catch (err: any) {
    console.error("Erro no registerUser:", err);


    if (err.code === "P2002" && err.meta?.target?.includes("email")) {
      return res.status(409).json({ error: "E-mail já cadastrado" });
    }

    return res.status(500).json({ error: "Erro interno no servidor" });
  }
};
