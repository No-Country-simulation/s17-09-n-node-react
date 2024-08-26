import express from 'express'

interface Options {
  port: number
  routes: express.Router
}

export default class Server {
  public readonly app = express()
  private readonly port: number
  private readonly routes: express.Router

  constructor(options: Options) {
    const { port, routes } = options
    this.port = port
    this.routes = routes
  }

  async start(): Promise<express.Express> {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    return this.app
  }
}
