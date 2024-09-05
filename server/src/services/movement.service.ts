import { PrismaClient } from '@prisma/client'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdateMovementDTO } from '../dtos/movement/update-dto.movement'

const prisma = new PrismaClient()

export class MovementService {
  async createMovement(createMovementDto: CreateMovementDTO) {
    return await prisma.movement.create({ data: createMovementDto })
  }

  async checkUserId(userId: string, caseId: string) {
    const caseFound = await prisma.case.findUnique({
      where: { id: caseId },
    })

    if (!caseFound) {
      throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Case not found!')
    }

    if (caseFound.userId !== userId) {
      throw new HttpError(
        403,
        HTTP_STATUS.FORBIDDEN,
        'You do not have permission to create a movement for this case!',
      )
    }

    return true
  }

  async getMovements() {
    return await prisma.movement.findMany()
  }

  async getMovementById(id: string) {
    const movementFound = await prisma.movement.findUnique({ where: { id } })
    if (!movementFound) {
      throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Movement not found!')
    }
    return movementFound
  }

  async checkUserIdAndGetMovement(userId: string, movementId: string) {
    const movementWithCase = await prisma.movement.findUnique({
      where: { id: movementId },
      include: {
        Case: true,
      },
    })

    if (!movementWithCase) {
      throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Movement not found!')
    }

    if (movementWithCase.Case.userId !== userId) {
      throw new HttpError(
        403,
        HTTP_STATUS.FORBIDDEN,
        'You do not have permission to access this movement!',
      )
    }

    return movementWithCase
  }

  async getMovementsByUserInTimeFrame(userId: string, startDate: Date, endDate: Date) {
    const movements = await prisma.movement.findMany({
      where: {
        Case: {
          userId: userId,
        },
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        Case: true,
      },
    })

    return movements
  }

  // getMovementsByUserOnSpecificDate = async (userId: string, specificDate: Date) => {
  //   const startOfDay = new Date(specificDate)
  //   startOfDay.setHours(0, 0, 0, 0)

  //   const endOfDay = new Date(specificDate)
  //   endOfDay.setHours(23, 59, 59, 999)

  //   const movements = await prisma.movement.findMany({
  //     where: {
  //       Case: {
  //         userId: userId,
  //       },
  //       date: {
  //         gte: startOfDay,
  //         lte: endOfDay,
  //       },
  //     },
  //     include: {
  //       Case: true,
  //     },
  //   })

  //   return movements
  // }

  async updateMovement(id: string, updateMovementDto: UpdateMovementDTO) {
    return await prisma.movement.update({
      where: { id },
      data: updateMovementDto,
    })
  }

  async deleteMovement(id: string) {
    return await prisma.movement.delete({ where: { id } })
  }
}
