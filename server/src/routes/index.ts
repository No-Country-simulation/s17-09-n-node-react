import { Router } from 'express'
import UserRoutes from './user.route'
import AuthRoutes from './auth.route'

export default class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/user', UserRoutes.routes)
    router.use('/', AuthRoutes.routes)

    return router
  }
}
