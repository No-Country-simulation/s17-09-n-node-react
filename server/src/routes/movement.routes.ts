import { Router } from 'express'
import { MovementService } from '../services/movement.service'

export class MovementRoutes {
  static get routes(): Router {
    const router = Router()

    const movementService = new MovementService()
    // eslint-disable-next-line no-console
    console.log(movementService)
    // const controller = new UserController(userService)
    // router.get('/')

    return router
  }
}
