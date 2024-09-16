export interface IAIAudioAssistantDto {
  audio: string
  prompt: string
}

export class AIAudioAssistant {
  constructor(
    public audio: string,
    public prompt: string,
  ) {}

  static create(object: { [key: string]: string }): [string[]?, IAIAudioAssistantDto?] {
    const { audio, prompt } = object
    const instance = new AIAudioAssistant(audio, prompt)
    const keys = Object.keys(instance)
    let errors: string[] = []

    if (!keys.every((key) => Object.keys(object).includes(key))) {
      Object.keys(object)
        .filter((key) => !keys.includes(key))
        .forEach((key) => {
          errors.push(`${key} should not exist`)
        })
      return [errors]
    }

    return [undefined, instance]
  }
}
