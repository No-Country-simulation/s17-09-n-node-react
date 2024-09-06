import { Request, Response, NextFunction } from 'express'
import { DocumentService } from '../services/document.service'

const documentService = new DocumentService()

export class DocumentController {
  exportPdf(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const pdfDoc = documentService.pdfExport(id)
    res.setHeader('Content-Type', 'application/pdf')
    pdfDoc.info.Title = 'Hola Mundo'
    pdfDoc.pipe(res)
    pdfDoc.end()
  }
}
