import OpenAI from 'openai'
import { envs } from '../config'
import { orthographyCheckUseCase } from '../utils/use-cases/ortography.use-case'
import { audioToTextUseCase } from '../utils/use-cases/audio-to-text.use-case'

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
}
