import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import { OpenAIController } from '../controller/openai.controller'
import { uploadAudio } from '../utils/upload.config'

export class OpenAIRoutes {
  static get routes(): Router {
    const router = Router()

    const openAIController = new OpenAIController()

    router.post('/orthography', openAIController.checkOrthography, errorHandler)
    router.post('/audio-to-text', uploadAudio.single, errorHandler)

    return router
  }
}
