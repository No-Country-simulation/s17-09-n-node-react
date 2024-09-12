import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '../services/document.service'

const documentService = new DocumentService()

export class DocumentController {
  getReportPdf(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const pdfDoc = documentService.getReportPdf(id)

    pdfDoc
      .then((data) => {
        res.setHeader('Content-Type', 'application/pdf')
        data.info.Title = 'Hola Mundo'
        data.pipe(res)
        data.end()
      })
      .catch((error) => next(error))
  }

  getUsersListPdf(req: Request, res: Response, next: NextFunction) {
    const pdfDoc = documentService.getUsersListPdf()

    pdfDoc
      .then((data) => {
        res.setHeader('Content-Type', 'application/pdf')
        data.info.Title = 'lista_de_usuarios'
        data.pipe(res)
        data.end()
      })
      .catch((error) => next(error))
  }
}