import request from 'supertest'
import { Server } from 'http'
import App from '../src/app'
import { Express } from 'express'

describe('Case Routes', () => {
  let app: Express
  let server: Server
  let token: string
  const userId = '66d9fd3e95190dbbe7c4f3c7' // Manually provide the userId corresponding to the email and password used

  beforeAll(async () => {
    app = new App().start()
    server = app.listen(9000)

    // Log in to get the token
    const loginResponse = await request(app)
      .post('/api/v1/user/login')
      .send({ email: 'samuel.bernal@example.com', password: 'password123' })

    token = loginResponse.body.accessToken
  }, 30000)

  afterAll(async () => {
    await server.close()
  })

  describe('POST /api/v1/cases', () => {
    it('should create a new case', async () => {
      const newCase = {
        caseName: 'Test Case',
        jury: 'Test Jury',
        caseNumber: '12345',
        applicant: 'Test Applicant',
        respondent: 'Test Respondent',
        userId: userId,
        type: 'DAMAGES_AND_LOSSES',
        status: 'INITIATED',
      }

      const response = await request(app)
        .post('/api/v1/cases')
        .set('Authorization', `Bearer ${token}`)
        .send(newCase)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('id')
      expect(response.body.caseName).toBe(newCase.caseName)
    }, 30000)

    it('should return 401 if not authenticated', async () => {
      const newCase = {
        caseName: 'Test Case',
        jury: 'Test Jury',
        caseNumber: '12345',
        applicant: 'Test Applicant',
        respondent: 'Test Respondent',
        userId: userId,
        type: 'DAMAGES_AND_LOSSES',
        status: 'INITIATED',
      }

      const response = await request(app).post('/api/v1/cases').send(newCase)

      expect(response.status).toBe(401)
    }, 30000)
  })
})
