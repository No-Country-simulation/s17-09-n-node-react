import * as fs from 'node:fs'
import OpenAI from 'openai'

interface Options {
  prompt?: string
  audioFile: Express.Multer.File
}

export const audioToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt, audioFile } = options

  const response = await openai.audio.transcriptions.create({
    model: 'whisper-1',
    file: fs.createReadStream(audioFile.buffer),
    prompt: prompt,
    language: 'es',
    // verbose_json da más información que vtt
    response_format: 'vtt',
  })

  return response
}
