import OpenAI from 'openai'
import { envs } from '../config'
import { orthographyCheckUseCase } from '../utils/use-cases/ortography.use-case'

export class OpenAIService {
  private openai = new OpenAI({
    apiKey: envs.openAIApiKey,
  })

  async orthographyCheck(prompt: string) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: prompt,
    })
  }
}
