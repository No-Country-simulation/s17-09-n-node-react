import { Router } from 'express'
import { CaseController } from '../controller/case.controller'
import authHandler from '../middlewares/auth-handler'
import errorHandler from '../middlewares/error-handler'

export default class CaseRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new CaseController()

    router.post('/', authHandler, controller.createCase, errorHandler)
    router.get('/', authHandler, controller.getCases, errorHandler)
    router.get('/:id', authHandler, controller.getCaseById, errorHandler)
    router.put('/:id', authHandler, controller.updateCase, errorHandler)
    router.delete('/:id', authHandler, controller.deleteCase, errorHandler)

    return router
  }
}
