import { Request, Response, NextFunction } from 'express'
import { OpenAIService } from '../services/ai-assistant.service'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { MulterError } from 'multer'

const openAIService = new OpenAIService()

export class OpenAIController {
  orthographyCheck(req: Request, res: Response, next: NextFunction) {
    openAIService
      .orthographyCheck(req.body)
      .then(async (stream) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200)

        for await (const chunk of stream) {
          const piece = chunk.choices[0].delta.content || ''
          res.write(piece)
        }
        res.end()
      })
      .catch((error) => next(error))
  }

  audioTranscription(req: Request, res: Response, next: NextFunction) {
    if (!req.file) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'file not loaded')

    openAIService
      .audioTranscription(req.file, req.body)
      .then((text) => {
        res.status(200).json({ transcription: text })
      })
      .catch((error) => {
        if (error instanceof MulterError) {
          throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'file field should be "audio"')
        }
        next(error)
      })
  }
}
