import { Router } from 'express'
import { UserService } from '../services/user.service'
import { UserController } from '../controller/user.controller'
import errorHandler from '../middlewares/error-handler'
import authHandler from '../middlewares/auth-handler'
import rolesHandler from '../middlewares/role-handler'
import refreshHandler from '../middlewares/refresh-handler'
import { ROLE } from '../enums/enum'

export default class UserRoutes {
  static get routes(): Router {
    const router = Router()

    const userService = new UserService()
    const controller = new UserController(userService)

    // GET
    router.get('/', authHandler, controller.getUser, errorHandler)
    router.get('/list', authHandler, rolesHandler(ROLE.ADMIN), controller.getUsers, errorHandler)
    router.get('/refresh', refreshHandler, errorHandler)
    router.get('/logout', controller.logoutUser, errorHandler)
    router.get('/:id', authHandler, rolesHandler(ROLE.ADMIN), controller.getUserInfo, errorHandler)

    // POST
    router.post('/login', controller.loginUser, errorHandler)
    router.post('/register', controller.registerUser, errorHandler)

    // PUT
    router.put('/', authHandler, controller.updateUser, errorHandler)

    // DELETE
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
