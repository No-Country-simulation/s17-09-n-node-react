import { Router } from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'
import errorHandler from '../middlewares/error-handler'
import authHandler from '../middlewares/auth-handler'
import rolesHandler from '../middlewares/role-handler'
import { ROLE } from '../enums/enum'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const controller = new UserController(userService)

    router.get(
      '/admin',
      authHandler,
      rolesHandler(ROLE.ADMIN),
      controller.getUsers,
      errorHandler,
    )

    router.get('/:userId', authHandler, controller.getUserById, errorHandler)

    router.post('/login', controller.loginUser, errorHandler)
    router.post('/register', controller.registerUser, errorHandler)

    router.put('/:userId', authHandler, controller.updateUser, errorHandler)

    router.delete(
      '/:userId',
      authHandler,
      rolesHandler(ROLE.ADMIN),
      controller.deleteUser,
      errorHandler,
    )

    return router
  }
}
