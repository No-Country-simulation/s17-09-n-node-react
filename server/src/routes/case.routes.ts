import { Router } from 'express'
import { CaseController } from '../controller/case.controller'
import authHandler from '../middlewares/auth-handler'
import errorHandler from '../middlewares/error-handler'
import rolesHandler from '../middlewares/role-handler'
import { ROLE } from '../enums/enum'

export default class CaseRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new CaseController()

    // GET routes
    router.get('/', authHandler, rolesHandler(ROLE.ADMIN), controller.getCases, errorHandler)
    router.get('/user', authHandler, controller.getUserCases, errorHandler)
    router.get('/user/:userId', authHandler, controller.getCasesByUserId, errorHandler)
    router.get('/:id', authHandler, controller.getCaseById, errorHandler)
    // POST routes
    router.post('/', authHandler, controller.createCase, errorHandler)
    // PUT routes
    router.put('/:id', authHandler, controller.updateCase, errorHandler)
    // DELETE routes
    router.delete('/:id', authHandler, controller.deleteCase, errorHandler)

    return router
  }
}
