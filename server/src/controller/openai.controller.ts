import { Request, Response, NextFunction } from 'express'
import { OpenAIService } from '../services/openai.service'

const openAIService = new OpenAIService()

export class OpenAIController {
  checkOrthography(req: Request, res: Response, next: NextFunction) {
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
}
