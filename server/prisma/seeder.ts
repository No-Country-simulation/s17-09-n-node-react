import { PrismaClient } from '@prisma/client'

export async function seeder() {
  const prisma = new PrismaClient()

  await prisma.$connect()

  const user = await prisma.user.create({
    data: {
      email: 'admin@email.com',
      password: '$2b$10$46UQE.q11fjy3tKe6yJnl.BcAXnvycDxWCfYhPH6FRuePR1Kr7.u.',
      name: 'Admin',
      lastName: 'Admin',
      role: 'ADMIN',
    },
  })

  await prisma.case.createMany({
    data: [
      {
        caseName: 'Demanda',
        caseNumber: '#2106546',
        type: 'FAMILY_LAW',
        status: 'INITIATED',
        jury: 'Jurado 1',
        respondent: 'Juanito de Tales',
        applicant: 'Anónimo',
        userId: user.id,
      },
      {
        caseName: 'Divorcio',
        caseNumber: '#5632189',
        type: 'FAMILY_LAW',
        status: 'CLOSED',
        jury: 'Jurado 2',
        respondent: 'John Doe',
        applicant: 'Anónimo',
        userId: user.id,
      },
    ],
  })

  const userCases = await prisma.case.findMany({
    where: {
      userId: user.id,
    },
  })

  await prisma.movement.createMany({
    data: [
      {
        date: new Date(),
        title: `Caso ${userCases[0].caseNumber}`,
        type: 'PROCEDURAL_ACTION',
        done: false,
        content: 'Se produce al procesamiento del acusado por el delito de asociación ilícita',
        caseId: userCases[0].id,
      },
      {
        date: new Date(),
        title: `Caso ${userCases[1].caseNumber}`,
        type: 'APPOINTMENT',
        done: false,
        content: 'Nada por aquí',
        caseId: userCases[1].id,
      },
    ],
  })

  await prisma.contact.createMany({
    data: [
      {
        name: 'Jane',
        lastName: 'Doe',
        phone: '+542610000000',
        email: 'jane@correo.com',
        address: 'Calle falsa 123',
        relation: 'CLIENT',
        caseId: userCases[1].id,
      },
      {
        name: 'Johann',
        lastName: 'Niemand',
        phone: '+542610000000',
        email: 'johann@correo.com',
        address: 'falsche Straße 123',
        relation: 'DEFENDANT',
        caseId: userCases[1].id,
      },
    ],
  })

  await prisma.$disconnect()
}

void seeder()
