import { OpenAI } from 'openai'

interface Options {
  threadId: string
  runId: string
}

export const checkCompleteStatusUseCase = async (
  openai: OpenAI,
  options: Options,
): Promise<OpenAI.Beta.Threads.Runs.Run> => {
  const { threadId, runId } = options

  const runStatus = await openai.beta.threads.runs.retrieve(threadId, runId)

  if (runStatus.status === 'completed') {
    return runStatus
  }

  await new Promise((resolve) => setTimeout(resolve, 1000))

  return await checkCompleteStatusUseCase(openai, options)
}
