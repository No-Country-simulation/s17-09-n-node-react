import { PrismaClient } from '@prisma/client'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdateMovementDTO } from '../dtos/movement/update-dto.movement'
import { DateMovementDTO } from '../dtos/movement/date-dto.movement'

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
      include: {
        Case: true,
      },
    })

    if (!movementFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Movement not found!')

    return movementFound
  }

  async updateMovement(id: string, updateMovementDto: UpdateMovementDTO) {
    return await prisma.movement.update({
      where: { id },
      data: { updatedAt: new Date(), ...updateMovementDto },
    })
  }

  async deleteMovement(id: string) {
    return await prisma.movement.delete({ where: { id } })
  }

  getMovementsByUserIdAndDate = async (userId: string, dateMovementDto: DateMovementDTO) => {
    const userFound = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userFound) {
      throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'User not found!')
    }

    let { date } = dateMovementDto

    if (date === undefined) {
      date = new Date().toISOString()
    }

    const startOfDay = new Date(date)
    startOfDay.setUTCHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setUTCHours(23, 59, 59, 999)

    const movements = await prisma.movement.findMany({
      where: {
        Case: {
          userId: userId,
        },
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
      include: {
        Case: true,
      },
    })

    return movements
  }
}
