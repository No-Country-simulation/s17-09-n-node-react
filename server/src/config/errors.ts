export default class HttpError {
  public status: number
  public message: string
  public description?: string | string[] | undefined

  constructor(
    statusCode: number = 500,
    message: string,
    description?: string | string[] | undefined,
  ) {
    this.status = statusCode
    this.message = message
    this.description = description ?? undefined
  }
}
