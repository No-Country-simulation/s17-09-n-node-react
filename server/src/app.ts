import express from 'express'
import AppRoutes from './routes'

export default class App {
  public readonly app = express()

  start(): express.Express {
    // MIDDLEWARES
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    // ROUTES
    this.app.use('/api/v1', AppRoutes.routes)

    return this.app
  }
}
