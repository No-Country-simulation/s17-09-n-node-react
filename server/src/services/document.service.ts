import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { PrismaClient } from '@prisma/client'
import PrinterUtil from '../utils/pdf-printer.util'
import getReport from '../utils/sheet/report'
import getUsersListPdf from '../utils/sheet/users-list'

const prisma = new PrismaClient()
const printer = new PrinterUtil()

export class DocumentService {
  async getReportPdf(id: string): Promise<PDFKit.PDFDocument> {
    const docDefinition: TDocumentDefinitions = getReport()
    const doc = printer.createPdf(docDefinition)
    return doc
  }

  async getUsersListPdf(): Promise<PDFKit.PDFDocument> {
    const users = await prisma.user.findMany({
      select: {
        email: true,
        name: true,
        lastName: true,
        role: true,
        isActive: true,
        cases: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: 'asc',
      },
    })
    const docDefinition: TDocumentDefinitions = getUsersListPdf({ users: users })
    const doc = printer.createPdf(docDefinition)
    return doc
  }
}
