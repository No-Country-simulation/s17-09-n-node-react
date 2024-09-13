import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import { DocumentController } from '../controller/document.controller'
import authHandler from '../middlewares/auth-handler'
import rolesHandler from '../middlewares/role-handler'
import { Role } from '@prisma/client'

export default class DocumentRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new DocumentController()

    router.get('/movement', authHandler, controller.getMovementPdf, errorHandler)
    router.get(
      '/users',
      authHandler,
      rolesHandler(Role.ADMIN),
      controller.getUsersListPdf,
      errorHandler,
    )

    return router
  }
}
