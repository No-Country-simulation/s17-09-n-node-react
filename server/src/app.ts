import express from 'express'
import cors from 'cors'
import AppRoutes from './routes'
import { envs } from './config'

export default class App {
  public readonly app = express()

  start(): express.Express {
    // MIDDLEWARES
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    this.app.use(
      cors({
        origin: [envs.clientUrl as string],
        methods: 'GET,POST,PUT,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
        allowedHeaders: [
          'Content-Type',
          'Authorization',
          'Content-Disposition',
          'Access-Control-Allow-Origin',
          'Access-Control-Allow-Credentials',
        ],
      }),
    )

    // ROUTES
    this.app.use('/api/v1', AppRoutes.routes)

    return this.app
  }
}
