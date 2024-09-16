import { PrismaClient } from '@prisma/client'
import { CreateContactDTO } from '../dtos/contact/create-dto.contact'
import { UpdateContactDTO } from '../dtos/contact/update-dto.contact'
import { HTTP_STATUS } from '../enums/enum'
import HttpError from '../config/errors'

const prisma = new PrismaClient()

export class ContactService {
  async createContact(createContactDTO: CreateContactDTO) {
    return await prisma.contact.create({ data: createContactDTO })
  }

  async getContacts() {
    return await prisma.contact.findMany()
  }

  async getContactById(id: string) {
    const contactFound = await prisma.contact.findUnique({
      where: { id },
    })
    if (!contactFound) throw new HttpError(404, HTTP_STATUS.NOT_FOUND, 'Contact not found!')
    return contactFound
  }

  async getContactsByCaseId(caseId: string) {
    const contacts = await prisma.contact.findMany({
      where: { caseId },
    })
    if (contacts.length === 0)
      throw new HttpError(
        404,
        HTTP_STATUS.NOT_FOUND,
        'No contacts found for the specified case ID!',
      )
    return contacts
  }

  async updateContact(contactId: string, updateContactDto: UpdateContactDTO) {
    return await prisma.contact.update({
      where: { id: contactId },
      data: updateContactDto,
    })
  }

  async deleteContact(id: string) {
    return await prisma.contact.delete({ where: { id } })
  }
}
