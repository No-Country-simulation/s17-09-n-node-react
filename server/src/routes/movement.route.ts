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

    router.get('/user', authHandler, movementController.getUserMovementsByDate, errorHandler)

    router.get(
      '/user/:userId',
      authHandler,
      movementController.getMovementsByUserIdAndDate,
      errorHandler,
    )

    router.get('/:id', authHandler, movementController.getMovementById, errorHandler)

    router.post('/', authHandler, movementController.createMovement, errorHandler)

    router.put('/:id', authHandler, movementController.updateMovement, errorHandler)

    router.delete('/:id', authHandler, movementController.deleteMovement, errorHandler)

    return router
  }
}