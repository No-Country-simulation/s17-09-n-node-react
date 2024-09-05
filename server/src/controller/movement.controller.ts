import { Response, Request, NextFunction } from 'express'
import { MovementService } from '../services/movement.service'
import { HTTP_STATUS, ROLE } from '../enums/enum'
import HttpError from '../config/errors'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'

export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  getMovements = (req: Request, res: Response, next: NextFunction) => {
    this.movementService
      .getMovements()
      .then((movements) => {
        res.status(201).json(movements)
      })
      .catch((error: unknown) => next(error))
  }

  getMovementById = (req: Request, res: Response, next: NextFunction) => {
    const { id: movementId } = req.params

    if (req.user?.role === ROLE.ADMIN) {
      this.movementService
        .getMovementById(movementId)
        .then((movement) => {
          res.status(201).json(movement)
        })
        .catch((error: unknown) => next(error))
    } else {
      const userId = req.user?.id

      if (!userId) {
        throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      }

      this.movementService
        .checkUserIdAndGetMovement(userId, movementId)
        .then((movement) => {
          res.status(201).json(movement)
        })
        .catch((error: unknown) => next(error))
    }
  }

  createMovement = (req: Request, res: Response, next: NextFunction) => {
    const [error, createMovementDto] = CreateMovementDTO.create(req.body)

    if (error || !createMovementDto) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    }

    if (req.user?.role !== ROLE.ADMIN) {
      const userId = req.user?.id

      if (!userId) {
        throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
      }
      this.movementService.checkUserId(userId, createMovementDto.caseId)
    }

    this.movementService
      .createMovement(createMovementDto)
      .then((movement) => {
        res.status(201).json(movement)
      })
      .catch((error: unknown) => next(error))
  }

  // updateMovement = (req: Request, res: Response, next: NextFunction) => {
  //   const [error, updateMovementDto] = UpdateMovementDTO.create(req.body)

  //   if (error || !updateMovementDto) {
  //     throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
  //   }

  //   if (req.user?.role !== ROLE.ADMIN) {
  //     const userId = req.user?.id

  //     if (!userId) {
  //       throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
  //     }
  //     this.movementService.checkUserId(userId, updateMovementDto.caseId)
  //   }

  //   this.movementService
  //     .createMovement(createMovementDto)
  //     .then((movement) => {
  //       res.status(201).json(movement)
  //     })
  //     .catch((error: unknown) => next(error))
  // }
}
