import { Request, Response, NextFunction } from 'express'
import { CaseService } from '../services/case.service'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import HttpError from '../config/errors'
import { HTTP_STATUS, ROLE } from '../enums/enum'

const caseService = new CaseService()

export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  createCase(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id
    const { body } = req

    if (!userId) {
      throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
    }

    const caseWithUserId = { ...body, userId }

    const [error, createCaseDto] = CreateCaseDTO.create(caseWithUserId)

    if (error || !createCaseDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)

    caseService
      .createCase(createCaseDto)
      .then((data) => res.status(201).json(data))
      .catch((error) => next(error))
  }

  getCases(req: Request, res: Response, next: NextFunction) {
    caseService
      .getCases()
      .then((cases) => {
        res.status(200).json(cases)
      })
      .then((error) => {
        next(error)
      })
  }

  getUserCases(req: Request, res: Response, next: NextFunction) {
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
    }

    caseService
      .getCasesByUserId(userId)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error))
  }

  getCaseById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    const userId = req.user?.id

    if (!userId) {
      throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Unauthorized')
    }

    // if (req.user?.role !== ROLE.ADMIN) {
    // }

    caseService
      .getCaseById(id)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error))
  }

  async getCasesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
      if (req.user?.role !== ROLE.ADMIN) {
        if (req.user?.id !== userId) {
          throw new HttpError(
            401,
            HTTP_STATUS.UNAUTHORIZED,
            'Only an admin can get cases created by a different user',
          )
        }
      }

      const cases = await caseService.getCasesByUserId(userId)
      if (cases.length === 0) {
        return res.status(404).json({ message: 'No cases found for the specified user ID.' })
      }
      res.status(200).json(cases)
    } catch (error) {
      next(error)
    }
  }

  async updateCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user?.id

      if (req.user?.role !== ROLE.ADMIN) {
        if (req.user?.id !== userId) {
          throw new HttpError(
            401,
            HTTP_STATUS.UNAUTHORIZED,
            'Only an admin can get cases created by a different user',
          )
        }
      }

      const [errors, updateCaseDto] = UpdateCaseDTO.create(req.body)

      if (errors || !updateCaseDto) {
        return res.status(400).json({ errors })
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const updatedCase = await caseService.updateCase(id, updateCaseDto)
      res.status(200).json(updatedCase)
    } catch (error) {
      next(error)
    }
  }

  async deleteCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const userId = req.user?.id

      if (req.user?.role !== ROLE.ADMIN) {
        if (req.user?.id !== userId) {
          throw new HttpError(
            401,
            HTTP_STATUS.UNAUTHORIZED,
            'Only an admin can get cases created by a different user',
          )
        }
      }
      await caseService.deleteCase(id)
      res.status(200).json({ message: 'Case deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
