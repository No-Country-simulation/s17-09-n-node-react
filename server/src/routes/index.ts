import express from 'express'
import userRoute from './user.route'

export default function routes (app: express.Express): void {
  const router = express.Router()
  router.use('/user', userRoute)
  app.use('/api/v1', router)
}
