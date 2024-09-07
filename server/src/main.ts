import App from './app'
import { PrismaClient } from '@prisma/client'

async function main() {
  const prisma = new PrismaClient()

  await prisma.$connect()

  const app = new App().start()

  // eslint-disable-next-line no-console
  app.listen(3000, () => console.log('Listening on port 3000'))

  await prisma.$disconnect()
}

void main()
