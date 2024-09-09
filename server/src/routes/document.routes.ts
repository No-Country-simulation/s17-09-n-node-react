import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import { DocumentController } from '../controller/document.controller'

export default class DocumentRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new DocumentController()

    router.get('/export', controller.getReportPdf, errorHandler)
    router.get('/users', controller.getUsersListPdf, errorHandler)

    return router
  }
}
