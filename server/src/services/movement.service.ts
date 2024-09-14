import { PrismaClient } from '@prisma/client'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdateMovementDTO } from '../dtos/movement/update-dto.movement'

const prisma = new PrismaClient()

export class MovementService {
  async createMovement(userId: string, createMovementDto: CreateMovementDTO) {
    const caseFound = await prisma.case.findUnique({
      where: { id: createMovementDto.caseId },
    })

    if (!caseFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')

    if (caseFound.userId !== userId)
      throw new HttpError(
        403,
        HTTP_STATUS.FORBIDDEN,
        'You do not have permission to create a movement for this case!',
      )

    return await prisma.movement.create({ data: createMovementDto })
  }

  async getMovements(userId: string) {
    const movementsFound = await prisma.movement.findMany({
      where: {
        Case: {
          userId: userId,
        },
      },
    })

    if (!movementsFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'no cases found!')

    return movementsFound
  }

  async getMovementById(id: string) {
    const movementFound = await prisma.movement.findUnique({
      where: { id },
    })

    if (!movementFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Movement not found!')

    return movementFound
  }

  async updateMovement(id: string, updateMovementDto: UpdateMovementDTO) {
    return await prisma.movement.update({
      where: { id },
      data: { updatedAt: Date.now().toString(), ...updateMovementDto },
    })
  }

  async deleteMovement(id: string) {
    return await prisma.movement.delete({ where: { id } })
  }
}
