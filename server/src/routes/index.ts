import { Router } from 'express'
import UserRoutes from './user.route'
import CaseRoutes from './case.routes'
import DocumentRoutes from './document.routes'
import { MovementRoutes } from './movement.route'
import ContactRoutes from './contact.routes'
import { OpenAIRoutes } from './openai.route'

export default class AppRoutes {
  static get routes(): Router {
    const router = Router()

    router.use('/user', UserRoutes.routes)
    router.use('/cases', CaseRoutes.routes)
    router.use('/document', DocumentRoutes.routes)
    router.use('/movement', MovementRoutes.routes)
    router.use('/contact', ContactRoutes.routes)
    router.use('/assistant', OpenAIRoutes.routes)

    return router
  }
}
