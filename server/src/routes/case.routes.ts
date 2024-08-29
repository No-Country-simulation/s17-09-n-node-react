
import { Router } from 'express'
import { CaseService } from '../services/case.service'
import { CaseController } from '../controller/case.controller'

export default class CaseRoutes {
  static get routes(): Router {
    const router = Router()

    const caseService = new CaseService()
    const controller = new CaseController(caseService)

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.post('/', async (req, res, next) => {
      try {
        await controller.createCase(req, res, next)
      } catch (error) {
        next(error)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/', async (req, res, next) => {
      try {
        await controller.getCases(req, res,next)
      } catch (error) {
        next(error)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.get('/:id', async (req, res, next) => {
      try {
        await controller.getCaseById(req, res, next)
      } catch (error) {
        next(error)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.put('/:id', async (req, res, next) => {
      try {
        await controller.updateCase(req, res, next)
      } catch (error) {
        next(error)
      }
    })

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.delete('/:id', async (req, res, next) => {
      try {
        await controller.deleteCase(req, res, next)
      } catch (error) {
        next(error)
      }
    })

    return router
  }
}
