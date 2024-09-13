import express from 'express'
import cors from 'cors'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
import AppRoutes from './routes'
import { envs } from './config'
import { options } from './config/swagger'

export default class App {
  public readonly app = express()

  start(): express.Express {
    // MIDDLEWARES
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))

    const allowedOrigin = [
      'https://s17-09-n-node-react-2.onrender.com',
      'https://s17-09-n-node-react.onrender.com',
      'http://localhost:5173',
      envs.clientUrl as string,
    ]

    this.app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin || allowedOrigin.includes(origin)) {
            callback(null, true)
          } else {
            callback(new Error('Not allowed by CORS'))
          }
        },
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

    const specs = swaggerJSDoc(options)
    this.app.use('/doc', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))

    // ROUTES
    this.app.use('/api/v1', AppRoutes.routes)

    return this.app
  }
}
