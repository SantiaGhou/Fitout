import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample users
  const hashedPassword = await bcrypt.hash('123456', 12);

  // Create Personal Trainer
  const personal = await prisma.user.create({
    data: {
      email: 'personal@fitconnect.com',
      password: hashedPassword,
      name: 'Carlos Personal',
      type: 'PERSONAL',
      personalProfile: {
        create: {
          cref: '123456-G/SP',
          experience: 5
        }
      }
    }
  });

  // Create Regular Users
  const user1 = await prisma.user.create({
    data: {
      email: 'joao@fitconnect.com',
      password: hashedPassword,
      name: 'João Silva',
      type: 'USER',
      userProfile: {
        create: {
          age: 28,
          gender: 'M',
          bloodType: 'O+',
          height: 175,
          weight: 80,
          hasTrainer: false,
          objective: 'MASS',
          workoutType: 'GYM',
          frequency: 4,
          schedule: 'EVENING',
          allergies: '',
          avoidFoods: '',
          dietType: 'MANY_MEALS',
          intermittentFasting: 'NO',
          streak: 5,
          workoutDays: ['2024-01-10', '2024-01-11', '2024-01-12']
        }
      }
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'maria@fitconnect.com',
      password: hashedPassword,
      name: 'Maria Santos',
      type: 'USER',
      userProfile: {
        create: {
          age: 25,
          gender: 'F',
          bloodType: 'A+',
          height: 165,
          weight: 60,
          hasTrainer: false,
          objective: 'FAT_LOSS',
          workoutType: 'CARDIO',
          frequency: 5,
          schedule: 'MORNING',
          allergies: 'Lactose',
          avoidFoods: 'Doces',
          dietType: 'FEW_MEALS',
          intermittentFasting: 'YES',
          streak: 12,
          workoutDays: ['2024-01-08', '2024-01-09', '2024-01-10', '2024-01-11', '2024-01-12']
        }
      }
    }
  });

  // Create sample workout
  await prisma.workout.create({
    data: {
      name: 'Peito e Tríceps',
      userId: user1.id,
      date: new Date(),
      exercises: {
        create: [
          {
            name: 'Supino Reto',
            sets: 4,
            reps: '8-10',
            weight: 80,
            order: 0
          },
          {
            name: 'Supino Inclinado',
            sets: 3,
            reps: '10-12',
            weight: 70,
            order: 1
          },
          {
            name: 'Tríceps Pulley',
            sets: 3,
            reps: '12-15',
            weight: 40,
            order: 2
          }
        ]
      }
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log('📧 Test accounts:');
  console.log('   Personal: personal@fitconnect.com / 123456');
  console.log('   User 1: joao@fitconnect.com / 123456');
  console.log('   User 2: maria@fitconnect.com / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });