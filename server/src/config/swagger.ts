import { Options } from 'swagger-jsdoc'

export const options: Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 's17-09-n-node-react',
      version: '1.0.0',
      description: 'API Documentation',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/docs/*.yaml'],
}
