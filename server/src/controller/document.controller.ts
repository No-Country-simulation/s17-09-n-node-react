import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '../services/document.service'

const documentService = new DocumentService()

export class DocumentController {
  getMovementPdf(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const pdfDoc = documentService.getMovementPdf(id)

    pdfDoc
      .then(({ doc, caseNumber }) => {
        res.setHeader('Content-Type', 'application/pdf')
        doc.info.Title = `case-${caseNumber}`
        doc.pipe(res)
        doc.end()
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
