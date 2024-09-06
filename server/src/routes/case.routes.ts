import { Router } from 'express'
import { CaseService } from '../services/case.service'
import { CaseController } from '../controller/case.controller'
import authHandler from '../middlewares/auth-handler'
import errorHandler from '../middlewares/error-handler'

export default class CaseRoutes {
  static get routes(): Router {
    const router = Router()

    const caseService = new CaseService()
    const controller = new CaseController(caseService)

    // GET routes
    router.get('/', authHandler, controller.getCases, errorHandler)
    router.get('/:id', authHandler, controller.getCaseById, errorHandler)
    router.get('/user/:userId', authHandler, controller.getCasesByUserId, errorHandler)
    // POST routes
    router.post('/', authHandler, controller.createCase, errorHandler)
    // PUT routes
    router.put('/:id', authHandler, controller.updateCase, errorHandler)
    // DELETE routes
    router.delete('/:id', authHandler, controller.deleteCase, errorHandler)

    return router
  }
}
