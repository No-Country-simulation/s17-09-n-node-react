import OpenAI from 'openai'
import { envs } from '../config'
import {
  audioToTextUseCase,
  createThreadUseCase,
  orthographyCheckUseCase,
} from '../utils/use-cases'

export class OpenAIService {
  private openai = new OpenAI({
    apiKey: envs.openAIApiKey,
  })

  async orthographyCheck(prompt: string) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: prompt,
    })
  }

  async audioTranscription(audioFile: Express.Multer.File, prompt?: string) {
    const { text } = await audioToTextUseCase(this.openai, {
      prompt,
      audioFile,
    })

    return text
  }

  async createThread() {
    return await createThreadUseCase(this.openai)
  }
}
