import express from 'express'
import routes from './routes'

export default function createApp (): express.Express {
  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  routes(app)

  return app
}
