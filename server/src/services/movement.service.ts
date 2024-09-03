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
