import { PrismaClient } from '@prisma/client'
import { DocumentDTO } from '../dtos/documents/create-dto.documents'
import { HTTP_STATUS } from '../enums/enum'
import HttpError from '../config/errors'

const prisma = new PrismaClient()

export class DocumentService {
  async createDocument(createDocumentDTO: DocumentDTO) {
    return await prisma.document.create({ data: createDocumentDTO })
  }

  async getDocuments() {
    return await prisma.document.findMany()
  }

  async getDocumentById(id: string) {
    const documentFound = await prisma.document.findUnique({ where: { id } })
    if (!documentFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Document not found!')
    return documentFound
  }

  async updateDocument(documentId: string, updateDocumentDTO: Partial<DocumentDTO>) {
    return await prisma.document.update({
      where: { id: documentId },
      data: updateDocumentDTO,
    })
  }

  async deleteDocument(id: string) {
    return await prisma.document.delete({ where: { id } })
  }
}
