import { Router } from 'express'
import { MovementService } from '../services/movement.service'
import { MovementController } from '../controller/movement.controller'
import authHandler from '../middlewares/auth-handler'
import rolesHandler from '../middlewares/role-handler'
import { ROLE } from '../enums/enum'
import errorHandler from '../middlewares/error-handler'

export class MovementRoutes {
  static get routes(): Router {
    const router = Router()

    const movementService = new MovementService()
    const movementController = new MovementController(movementService)

    router.get(
      '/',
      authHandler,
      rolesHandler(ROLE.ADMIN),
      movementController.getMovements,
      errorHandler,
    )

    router.get('/:id', authHandler, movementController.getMovementById, errorHandler)

    return router
  }
}
