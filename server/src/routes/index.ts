import { Router } from 'express'
import UserRoutes from './user.route'
import CaseRoutes from './case.routes'
import { MovementRoutes } from './movement.route'

export default class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/user', UserRoutes.routes)
    router.use('/cases', CaseRoutes.routes)
    router.use('/movement', MovementRoutes.routes)

    return router
  }
}
