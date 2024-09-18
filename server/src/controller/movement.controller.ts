import { Response, Request, NextFunction } from 'express'
import { MovementService } from '../services/movement.service'
import { HTTP_STATUS } from '../enums/enum'
import HttpError from '../config/errors'
import { CreateMovementDTO } from '../dtos/movement/create-dto.movement'
import { UpdateMovementDTO } from '../dtos/movement/update-dto.movement'
import { DateMovementDTO } from '../dtos/movement/date-dto.movement'

export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  getMovements = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    if (!userId) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'user id not Found')

    this.movementService
      .getMovements(userId)
      .then((data) => {
        res.status(201).json(data)
      })
      .catch((error: unknown) => next(error))
  }

  getUserMovementsByDate = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
    }

    const [error, dateMovementDto] = DateMovementDTO.create(req.query)

    if (error || !dateMovementDto) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    }

    this.movementService
      .getMovementsByUserIdAndDate(userId, dateMovementDto)
      .then((movements) => {
        res.status(201).json(movements)
      })
      .catch((error: unknown) => next(error))
  }

  getMovementById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params
    this.movementService
      .getMovementById(id)
      .then((movement) => {
        res.status(201).json(movement)
      })
      .catch((error: unknown) => next(error))
  }

  createMovement = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id
    if (!userId) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'user id not found!')
    const [error, createMovementDto] = CreateMovementDTO.create(req.body)
    if (error || !createMovementDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)

    this.movementService
      .createMovement(userId, createMovementDto)
      .then(() => {
        res.status(201).json({ message: 'case successfully created!' })
      })
      .catch((error: unknown) => next(error))
  }

  updateMovement = (req: Request, res: Response, next: NextFunction) => {
    const { id: movementId } = req.params
    const [error, updateMovementDto] = UpdateMovementDTO.create(req.body)

    if (error || !updateMovementDto) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    }

    this.movementService
      .updateMovement(movementId, updateMovementDto)
      .then(() => {
        res.status(201).json({ message: 'case successfully updated!' })
      })
      .catch((error: unknown) => next(error))
  }

  deleteMovement = (req: Request, res: Response, next: NextFunction) => {
    const { id: movementId } = req.params

    this.movementService
      .deleteMovement(movementId)
      .then(() => {
        res.status(201).json({ message: 'case successfully deleted!' })
      })
      .catch((error: unknown) => next(error))
  }
}
