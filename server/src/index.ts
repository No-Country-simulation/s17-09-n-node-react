import express from 'express';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import env from 'env-var';
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = env.get('PORT').required().asPortNumber();
const databaseUrl = env.get('DATABASE_URL').required().asString();

app.use(express.json());

// app.get('/users', async (req, res) => {
//   const users = await prisma.user.findMany();
//   res.json(users);
// });

// app.post('/users', async (req, res) => {
//   const { email, name } = req.body;
//   const user = await prisma.user.create({
//     data: { email, name },
//   });
//   res.json(user);
// });
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Database URL: ${databaseUrl}`);
  });
