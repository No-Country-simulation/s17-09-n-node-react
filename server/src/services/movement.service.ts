import { PrismaClient } from '@prisma/client'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'
import { UpdateMovementDTO } from '../dtos/movement/update-dto.movement'
import { DateMovementDTO } from '../dtos/movement/date-dto.movement'

const prisma = new PrismaClient()

export class MovementService {
  async createMovement(createMovementDto: CreateMovementDTO) {
    return await prisma.movement.create({ data: createMovementDto })
  }

  async checkUserIdAndCreateMovement(userId: string, createMovementDto: CreateMovementDTO) {
    const caseFound = await prisma.case.findUnique({
      where: { id: createMovementDto.caseId },
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

    return await this.createMovement(createMovementDto)
  }

  async getMovements() {
    return await prisma.movement.findMany()
  }

  async getMovementById(id: string) {
    const movementFound = await prisma.movement.findUnique({
      where: { id },
      include: {
        Case: true,
      },
    })

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

  async getMovementsByUserId(userId: string) {
    const movements = await prisma.movement.findMany({
      where: {
        Case: {
          userId: userId,
        },
      },
      include: {
        Case: true,
      },
    })

    return movements
  }

  getMovementsByUserIdAndDate = async (userId: string, dateMovementDto: DateMovementDTO) => {
    let { date } = dateMovementDto

    if (date === undefined) {
      date = new Date().toISOString()
    }

    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date(date)
    endOfDay.setHours(23, 59, 59, 999)

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

  async updateMovement(id: string, updateMovementDto: UpdateMovementDTO) {
    return await prisma.movement.update({
      where: { id },
      data: updateMovementDto,
    })
  }

  async checkUserIdAndUpdateMovement(
    userId: string,
    movementId: string,
    updateMovementDto: UpdateMovementDTO,
  ) {
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
        'You do not have permission to update this movement!',
      )
    }

    return await this.updateMovement(movementId, updateMovementDto)
  }

  async deleteMovement(id: string) {
    return await prisma.movement.delete({ where: { id } })
  }

  async checkUserIdAndDeleteMovement(userId: string, movementId: string) {
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
        'You do not have permission to delete this movement!',
      )
    }

    return await this.deleteMovement(movementId)
  }
}
