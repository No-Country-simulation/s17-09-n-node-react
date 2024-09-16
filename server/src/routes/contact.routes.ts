import { Router } from 'express'
import { ContactService } from '../services/contact.service'
import { ContactController } from '../controller/contact.controller'
import authHandler from '../middlewares/auth-handler'
import errorHandler from '../middlewares/error-handler'

export default class ContactRoutes {
  static get routes(): Router {
    const router = Router()

    const contactService = new ContactService()
    const controller = new ContactController(contactService)

    // GET routes
    router.get('/', authHandler, controller.getContacts, errorHandler)
    router.get('/:id', authHandler, controller.getContactById, errorHandler)
    router.get('/case/:caseId', authHandler, controller.getContactsByCaseId, errorHandler)
    // POST routes
    router.post('/', authHandler, controller.createContact, errorHandler)
    // PUT routes
    router.put('/:id', authHandler, controller.updateContact, errorHandler)
    // DELETE routes
    router.delete('/:id', authHandler, controller.deleteContact, errorHandler)

    return router
  }
}
