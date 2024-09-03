import { Router } from 'express'
import { MovementService } from '../services/movement.service'

export class MovementRoutes {
  static get routes(): Router {
    const router = Router()

    const movementService = new MovementService()
    // const controller = new UserController(userService)
    // router.get('/')

    return router
  }
}
