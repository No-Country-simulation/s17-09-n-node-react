import { PrismaClient } from '@prisma/client'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import { HTTP_STATUS } from '../enums/enum'
import HttpError from '../config/errors'

const prisma = new PrismaClient()

export class CaseService {
  async createCase(userId: string, createCaseDTO: CreateCaseDTO) {
    await prisma.case.create({ data: { userId: userId, ...createCaseDTO } })
  }

  async getCaseById(id: string) {
    const caseFound = await prisma.case.findUnique({
      where: { id },
      include: {
        movements: true,
      },
    })
    if (!caseFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')
    return caseFound
  }

  async getCasesByUserId(userId: string) {
    return await prisma.case.findMany({
      where: { userId: userId },
    })
  }

  async getCases() {
    return await prisma.case.findMany()
  }

  async updateCase(caseId: string, updateCaseDto: UpdateCaseDTO) {
    return await prisma.case.update({
      where: { id: caseId },
      data: { updatedAt: new Date(), ...updateCaseDto },
    })
  }

  async checkUserIdAndUpdateCase(caseId: string, userId: string, updateCaseDto: UpdateCaseDTO) {
    const caseFound = await prisma.case.findUnique({
      where: { id: caseId },
    })

    if (!caseFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')

    if (caseFound.userId !== userId) {
      throw new HttpError(
        401,
        HTTP_STATUS.UNAUTHORIZED,
        'Only an admin can update a case created by a different user',
      )
    }

    return await this.updateCase(caseId, updateCaseDto)
  }

  async deleteCase(id: string) {
    await prisma.movement.deleteMany({
      where: {
        caseId: id,
      },
    })

    return await prisma.case.delete({ where: { id } })
  }

  async checkUserIdAndDeleteCase(caseId: string, userId: string) {
    const caseFound = await prisma.case.findUnique({
      where: { id: caseId },
    })

    if (!caseFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')

    if (caseFound.userId !== userId) {
      throw new HttpError(
        401,
        HTTP_STATUS.UNAUTHORIZED,
        'Only an admin can delete a case created by a different user',
      )
    }

    return await this.deleteCase(caseId)
  }
}
