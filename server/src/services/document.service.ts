import type { TDocumentDefinitions } from 'pdfmake/interfaces'
import { PrismaClient } from '@prisma/client'
import PrinterUtil from '../utils/pdf-printer.util'
import getMovementPdf from '../utils/sheet/movement-document'
import getUsersListPdf from '../utils/sheet/users-list'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'

const prisma = new PrismaClient()
const printer = new PrinterUtil()

export class DocumentService {
  async getMovementPdf(id: string): Promise<PDFKit.PDFDocument> {
    const movementFound = await prisma.movement.findUnique({
      where: { id: id },
      select: {
        title: true,
        date: true,
        content: true,
      },
    })

    if (!movementFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'movement not found')

    const docDefinition: TDocumentDefinitions = getMovementPdf(movementFound)
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
