import { PrismaClient } from '@prisma/client'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import { HTTP_STATUS } from '../enums/enum'
import HttpError from '../config/errors'

const prisma = new PrismaClient()

export class CaseService {
  async createCase(createCaseDTO: CreateCaseDTO) {
    return await prisma.case.create({ data: createCaseDTO })
  }

  async getCases() {
    return await prisma.case.findMany()
  }

  async getCaseById(id: string) {
    const caseFound = await prisma.case.findUnique({ where: { id } })
    if (!caseFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')
    return caseFound
  }

  async getCasesByUserId(userId: string) {
    return await prisma.case.findMany({
      where: { userId },
    })
  }

  async updateCase(caseId: string, updateCaseDto: UpdateCaseDTO) {
    return await prisma.case.update({
      where: { id: caseId },
      data: updateCaseDto,
    })
  }

  async deleteCase(id: string) {
    return await prisma.case.delete({ where: { id } })
  }
}
