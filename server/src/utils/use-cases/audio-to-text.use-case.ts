import { OpenAI, toFile } from 'openai'

interface Options {
  prompt?: string
  audioFile: Express.Multer.File
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options

  const file = await toFile(audioFile.buffer)

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: file,
    prompt: prompt,
    language: 'es',
    // verbose_json da más información que vtt
    response_format: 'vtt',
  })

  return response
}
