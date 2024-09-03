import { Router } from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'
import errorHandler from '../middlewares/error-handler'
import authHandler from '../middlewares/auth-handler'
import rolesHandler from '../middlewares/role-handler'
import { ROLE } from '../enums/enum'
import refreshHandler from '../middlewares/refresh-handler'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const controller = new UserController(userService)

    router.get('/', authHandler, rolesHandler(ROLE.ADMIN), controller.getUsers, errorHandler)
    router.get('/:id', authHandler, controller.getUserById, errorHandler)
    router.get('/refresh', refreshHandler, errorHandler)
    router.post('/login', controller.loginUser, errorHandler)
    router.post('/register', controller.registerUser, errorHandler)
    router.put('/:id', authHandler, controller.updateUser, errorHandler)
    router.delete(
      '/:id',
      authHandler,
      rolesHandler(ROLE.ADMIN),
      controller.deleteUser,
      errorHandler,
    )

    return router
  }
}
