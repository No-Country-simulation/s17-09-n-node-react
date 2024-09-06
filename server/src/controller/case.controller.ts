import { Request, Response, NextFunction } from 'express'
import { CaseService } from '../services/case.service'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import HttpError from '../config/errors'
import { HTTP_STATUS } from '../enums/enum'

const caseService = new CaseService()

export class CaseController {
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

  async updateCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const updateCaseDTO: UpdateCaseDTO = req.body
      const updatedCase = await caseService.updateCase(id, updateCaseDTO)
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
