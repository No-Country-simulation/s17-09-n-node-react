import { PrismaClient } from '@prisma/client'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'

const prisma = new PrismaClient()

export class CaseService {
  async createCase(createCaseDTO: CreateCaseDTO) {
    return await prisma.case.create({ data: createCaseDTO })
  }

  async getCases() {
    return await prisma.case.findMany()
  }

  async getCaseById(id: string) {
    return await prisma.case.findUnique({ where: { id } })
  }

  async updateCase(id: string, updateCaseDTO: UpdateCaseDTO) {
    return await prisma.case.update({
      where: { id },
      data: updateCaseDTO,
    })
  }

  async deleteCase(id: string) {
    return await prisma.case.delete({ where: { id } })
  }
}
