import OpenAI from 'openai'
import { envs } from '../../config'

interface Options {
  threadId: string
  assistantId?: string
}

export const createRunUseCase = async (openai: OpenAI, options: Options) => {
  const { threadId, assistantId = envs.openAIAssistantId as string } = options

  const run = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
    // instructions: ''
  })

  return run
}
