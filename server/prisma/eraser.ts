import { PrismaClient } from '@prisma/client'

export async function eraser() {
  const prisma = new PrismaClient()
  await prisma.$connect()

  await prisma.user.delete({
    where: { email: 'admin@email.com' },
  })

  await prisma.case.deleteMany({
    where: {
      User: {
        email: 'admin@email.com',
      },
    },
  })

  await prisma.movement.deleteMany({
    where: {
      Case: {
        caseNumber: '#5632189' && '#2106546',
      },
    },
  })

  await prisma.contact.deleteMany({
    where: {
      Case: {
        caseNumber: '#5632189' && '#2106546',
      },
    },
  })
}

void eraser()
