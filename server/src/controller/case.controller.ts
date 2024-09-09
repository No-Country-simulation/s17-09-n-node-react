import { Request, Response, NextFunction } from 'express'
import { CaseService } from '../services/case.service'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'

const caseService = new CaseService()

export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  createCase(req: Request, res: Response, next: NextFunction) {
    const [error, createCaseDto] = CreateCaseDTO.create(req.body)
    if (error || !createCaseDto) throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    caseService
      .createCase(createCaseDto)
      .then((message) => res.status(201).json(message))
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

  getCaseById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    caseService
      .getCaseById(id)
      .then((data) => res.status(200).json(data))
      .catch((error) => next(error))
  }

  async getCasesByUserId(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params
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
      await caseService.deleteCase(id)
      res.status(200).json({ message: 'Case deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
