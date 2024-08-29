import { Request, Response, NextFunction } from 'express'
import { CaseService } from '../services/case.service'
import { CreateCaseDTO } from '../dtos/case/create-dto.case'
import { UpdateCaseDTO } from '../dtos/case/update-dto.case'
import { CustomError } from '../errors/custom-error'

const caseService = new CaseService()

export class CaseController {
  private caseService: CaseService

  constructor(caseService: CaseService) {
    this.caseService = caseService
  }
  async createCase(req: Request, res: Response, next: NextFunction) {
    try {
      const createCaseDTO: CreateCaseDTO = req.body
      const newCase = await caseService.createCase(createCaseDTO)
      res.status(201).json(newCase)
    } catch (error) {
      next(new CustomError('Failed to create case', 400))
    }
  }

  async getCases(req: Request, res: Response, next: NextFunction) {
    try {
      const cases = await caseService.getCases()
      res.status(200).json(cases)
    } catch (error) {
      next(new CustomError('Failed to fetch cases', 500))
    }
  }

  async getCaseById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const caseData = await caseService.getCaseById(id)
      if (!caseData) {
        throw new CustomError('Case not found', 404)
      }
      res.status(200).json(caseData)
    } catch (error) {
      next(error)
    }
  }

  async updateCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const updateCaseDTO: UpdateCaseDTO = req.body
      const updatedCase = await caseService.updateCase(id, updateCaseDTO)
      res.status(200).json(updatedCase)
    } catch (error) {
      next(new CustomError('Failed to update case', 400))
    }
  }

  async deleteCase(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      await caseService.deleteCase(id)
      res.status(200).json({ message: 'Case deleted successfully' })
    } catch (error) {
      next(new CustomError('Failed to delete case', 400))
    }
  }
}
