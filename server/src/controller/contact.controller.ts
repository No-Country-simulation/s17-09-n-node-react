import { Request, Response, NextFunction } from 'express'
import { ContactService } from '../services/contact.service'
import { CreateContactDTO } from '../dtos/contact/create-dto.contact'
import { UpdateContactDTO } from '../dtos/contact/update-dto.contact'
import HttpError from '../config/errors'
import { HTTP_STATUS, ROLE } from '../enums/enum'

const contactService = new ContactService()

export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  createContact(req: Request, res: Response, next: NextFunction) {
    const { body } = req
    const { caseId } = body

    if (!caseId) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'caseId is required')
    }

    const [error, createContactDto] = CreateContactDTO.create(body)

    if (error || !createContactDto) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, error)
    }

    contactService
      .createContact(createContactDto)
      .then((data) => res.status(201).json(data))
      .catch((error) => next(error))
  }

  getContacts(req: Request, res: Response, next: NextFunction) {
    contactService
      .getContacts()
      .then((contacts) => res.status(200).json(contacts))
      .catch((error) => next(error))
  }

  getContactsByCaseId(req: Request, res: Response, next: NextFunction) {
    const { caseId } = req.params

    if (!caseId) {
      throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'caseId is required')
    }

    contactService
      .getContactsByCaseId(caseId)
      .then((contacts) => res.status(200).json(contacts))
      .catch((error) => next(error))
  }

  getContactById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params

    contactService
      .getContactById(id)
      .then((contact) => res.status(200).json(contact))
      .catch((error) => next(error))
  }

  async updateContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params
      const { caseId } = req.body

      if (!caseId) {
        throw new HttpError(400, HTTP_STATUS.BAD_REQUEST, 'caseId is required')
      }

      const [errors, updateContactDto] = UpdateContactDTO.update(req.body)

      if (errors || !updateContactDto) {
        return res.status(400).json({ errors })
      }

      const updatedContact = await contactService.updateContact(id, updateContactDto)
      res.status(200).json(updatedContact)
    } catch (error) {
      next(error)
    }
  }

  async deleteContact(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params

      if (req.user?.role === ROLE.ADMIN) {
        await contactService.deleteContact(id)
        res.status(200).json({ message: 'Contact deleted successfully' })
      } else {
        throw new HttpError(401, HTTP_STATUS.UNAUTHORIZED, 'Only an admin can delete a contact')
      }
    } catch (error) {
      next(error)
    }
  }
}
