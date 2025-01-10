import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@example.com'
    },
  })

  console.log({ user })

  await prisma.user.delete({
    where: {
      id: user.id,
    }
  })
}

try {
  await main();
} finally {
  await prisma.$disconnect()
}