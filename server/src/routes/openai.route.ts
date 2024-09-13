import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import authHandler from '../middlewares/auth-handler'
import { OpenAIService } from '../services/openai.service'
import { OpenAIController } from '../controller/openai.controller'

export class OpenAIRoutes {
  static get routes(): Router {
    const router = Router()

    const openAIController = new OpenAIController()

    router.post('/orthography', openAIController.checkOrthography, errorHandler)

    return router
  }
}
