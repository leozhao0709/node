import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query'], // probably only dev open this
});

export default prisma;
