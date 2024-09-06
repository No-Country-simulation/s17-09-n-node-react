import { Router } from 'express'
import UserRoutes from './user.route'
import CaseRoutes from './case.routes'
import DocumentRoutes from './document.routes'

export default class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/user', UserRoutes.routes)
    router.use('/cases', CaseRoutes.routes)
    router.use('/document', DocumentRoutes.routes)

    return router
  }
}
