import { Router } from 'express'
import errorHandler from '../middlewares/error-handler'
import { DocumentController } from '../controller/document.controller'
import { DocumentService } from '../services/document.service'

export default class DocumentRoutes {
  static get routes(): Router {
    const router = Router()

    const controller = new DocumentController()

    router.get('/export', controller.exportPdf, errorHandler)

    return router
  }
}
