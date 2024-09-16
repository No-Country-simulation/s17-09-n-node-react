import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import { OpenAIController } from '../controller/ai-assistant.controller'
import { uploadAudio } from '../middlewares/upload-handler'

export class OpenAIRoutes {
  static get routes(): Router {
    const router = Router()

    const openAIController = new OpenAIController()

    router.post('/orthography', openAIController.orthographyCheck, errorHandler)
    router.post(
      '/audio-to-text',
      uploadAudio.single('audio'),
      openAIController.audioTranscription,
      errorHandler,
    )

    return router
  }
}
