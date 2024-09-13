import OpenAI from 'openai'

interface Options {
  prompt: string
}

export const orthographyCheckUseCase = async (openai: OpenAI, options: Options) => {
  const { prompt } = options

  return await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: `
            Se te dará un texto, el cual puede contener errores de otorgrafía y/o gramaticales. 
            Debes dar un porcentaje y cuáles son los errores contenidos en el mismo.
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })
}
