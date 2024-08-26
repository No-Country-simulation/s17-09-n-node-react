import { Server } from 'node:http'
import { Express } from 'express'
import TestAgent from 'supertest/lib/agent'
import Test from 'supertest/lib/test'
import request from 'supertest'
import createApp from '../src/app'

describe('Testing the user route', () => {
  let app: Express
  let server: Server
  let api: TestAgent<Test>

  beforeAll(async () => {
    app = createApp()
    server = app.listen(9000)
    api = request(app)
  })

  describe('GET /', () => {
    it('Should get list of users', async () => {
      const { statusCode, body } = await api.get('/api/v1/user')
      expect(statusCode).toBe(200)
      expect(body).toBeInstanceOf(Array)
    })
  })

  afterAll(async () => {
    await server.close()
  })
})
