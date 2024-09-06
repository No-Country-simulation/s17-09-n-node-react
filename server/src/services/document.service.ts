import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { PrismaClient } from '@prisma/client'
import PrinterUtil from '../utils/pdf-printer.util'

const prisma = new PrismaClient()
const printer = new PrinterUtil()

export class DocumentService {
  pdfExport(id: string) {
    const docDefinition: TDocumentDefinitions = {
      content: ['Hola Mundo'],
    }
    const doc = printer.createPdf(docDefinition)
    return doc
  }
}
