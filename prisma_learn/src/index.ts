import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import prisma from './prisma.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, '../env/.env.dev'),
});

// const prisma = new PrismaClient({
//   log: ['query'], // probably only dev open this
// });

async function main() {
  // await prisma.user.deleteMany();
  // await createMany();
  // await findUniq();
  // await findFirst();
  await findMany();

  // await updateOne();
  // await updateMany();

  // await deleteOne();
  // await deleteMany();
}

await (async function () {
  await main();
  await prisma.$disconnect();
})();

async function createOneUser() {
  const user = await prisma.user.create({
    data: {
      name: 'Kyle',
      email: 'email@test.com',
      age: 28,
      userPreference: {
        create: {
          emailUpdates: true,
        },
      },
    },
    // include: { userPreference: true },
    select: {
      name: true,
      userPreference: { select: { id: true } },
    }, // only select name, userPreference.id field
  });

  console.log(user);
}

async function createMany() {
  const { count } = await prisma.user.createMany({
    data: [
      { name: 'Kyle', email: 'kyle@test.com', age: 28 },
      { name: 'Kale', email: 'kale@test.com', age: 18 },
      { name: 'Sally', email: 'sally1@test.com', age: 18 },
    ],
  });
  console.log(count);
}

async function findUniq() {
  // can only find uniq column
  const user = await prisma.user.findUnique({
    where: {
      name: 'Kyle',
    },
    include: {
      userPreference: true,
    },
    // select: {
    //   userPreference: true,
    //   name: true,
    // },
  });
  console.log(user);
}
async function findFirst() {
  const user = await prisma.user.findFirst({
    where: {
      name: 'Kyle',
    },
    include: {
      userPreference: true,
    },
    // select: {
    //   userPreference: true,
    //   name: true,
    // },
  });
  console.log(user);
}

async function findMany() {
  const users = await prisma.user.findMany({
    where: {
      // age: { lt: 20 },
      // name: { in: ['Kyle', 'Sally'] },
      // email: { startsWith: 'Sally' },
      // email: { endsWith: '@test.com' },
      email: { contains: '@test.com' },
      // age: 18,
      // name: { not: 'Kyle' },
    },
    orderBy: {
      age: 'desc',
    },
    // distinct: ['name'],
    take: 10, // limit,
    // skip: 1, // offset
  });

  console.log(users);

  // const users2 = await prisma.user.findMany({
  //   where: {
  //     // OR: [{ age: { lt: 20 } }, { name: 'Kyle' }],
  //     // NOT: [{ age: 18 }],
  //     AND: [
  //       {
  //         name: 'Sally',
  //         age: 18,
  //         writtenPosts: {
  //           some: { title: 'Test' },
  //         },
  //       },
  //     ],
  //   },
  //   orderBy: {
  //     age: 'asc',
  //   },
  // });

  // console.log(users2);
}

async function updateOne() {
  const user = await prisma.user.update({
    where: {
      email: 'kyle1@test.com',
    },
    data: {
      email: 'kyle@test.com',
    },
    include: {
      userPreference: true,
    },
  });

  console.log(user);
}

async function updateMany() {
  const { count } = await prisma.user.updateMany({
    where: {
      age: 18,
    },
    data: {
      age: {
        increment: 1,
      },
    },
    // cannot use include and select here
  });

  console.log(count);
}

async function deleteOne() {
  const user = await prisma.user.delete({
    where: {
      email: 'kyle@test.com', // can only delete uniq column
    },
  }); // if not find, will throw error

  console.log(user);
}

async function deleteMany() {
  const { count } = await prisma.user.deleteMany({
    where: {
      age: 18,
    },
  });

  console.log(count);
}
