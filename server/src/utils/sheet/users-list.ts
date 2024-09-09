import { User } from '../../dtos/user'
import { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces'
import headerSection from '../sections/header-section'
import footerSection from '../sections/footer-section'

interface ListOptions {
  title?: string
  subtitle?: string
  users: Omit<User, 'id'>[]
}

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
  },
}

export default function getUsersListPdf(options: ListOptions): TDocumentDefinitions {
  const { title, subtitle, users } = options

  return {
    styles: styles,
    pageOrientation: 'landscape',
    header: headerSection({}),
    footer: footerSection,
    pageMargins: [40, 110, 40, 60],
    watermark: {
      text: 'Confidencial',
      color: 'gray',
      opacity: 0.3,
      bold: true,
      fontSize: 100,
      angle: 45,
    },
    content: [
      {
        style: 'header',
        text: title ?? 'Reporte de usuarios',
        marginTop: 10,
        marginBottom: 10,
      },
      {
        style: 'header',
        text: subtitle ?? 'Lista de usuarios',
        marginBottom: 10,
      },
      // USERS TABLE
      {
        layout: 'customLayout01',
        fontSize: 12,
        table: {
          headerRows: 1,
          widths: ['auto', '*', 50, 50],
          body: [
            // HEADER
            [
              { text: 'Apellido, Nombre', color: '#ffffff', bold: true },
              { text: 'Correo', color: '#ffffff', bold: true },
              { text: 'Rol', color: '#ffffff', bold: true },
              { text: 'Activo', color: '#ffffff', bold: true },
            ],
            // USERS
            ...users.map((user) => [
              { text: `${user.lastName}, ${user.name}`, bold: true },
              user.email,
              user.role,
              { text: 'Sí', bold: true },
            ]),
          ],
        },
      },
      // TOTAL OF USERS
      {
        layout: 'noBorders',
        alignment: 'right',
        marginTop: 20,
        table: {
          headerRows: 1,
          widths: [100, 50],
          body: [
            [
              {
                text: 'Total de usuarios',
                bold: true,
                italics: true,
              },
              {
                text: users.length.toString(),
                colSpan: 1,
                bold: true,
              },
            ],
          ],
        },
      },
    ],
  }
}
