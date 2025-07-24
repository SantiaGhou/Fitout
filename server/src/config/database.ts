import { PrismaClient } from '@prisma/client'



const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

export default prisma;


process.on('beforeExit', async () => {
  await prisma.$disconnect();
});