import { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces'
import headerSection from '../sections/header-section'
import footerSection from '../sections/footer-section'
import { formatter } from '../date-formatter'

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
  },
  subHeader: {
    fontSize: 16,
    italics: true,
    alignment: 'right',
  },
  body: {
    fontSize: 12,
    margin: [0, 0, 0, 50],
    alignment: 'justify',
  },
  signature: {
    fontSize: 12,
    alignment: 'right',
    italics: true,
  },
}

interface MovementDocument {
  title: string
  date: Date
  content: string
}

export default function getMovementPdf(data: MovementDocument): TDocumentDefinitions {
  const docDefinitions: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    pageSize: 'A4',
    header: headerSection({
      showDate: false,
      showLogo: true,
    }),
    footer: footerSection,
    watermark: {
      text: 'Prototipo',
      color: 'gray',
      opacity: 0.3,
      bold: true,
      fontSize: 120,
      angle: 45,
    },
    content: [
      {
        qr: 'https://s17-09-n-node-react-2.onrender.com',
        fit: 75,
        alignment: 'right',
        marginBottom: 10,
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 1,
            lineColor: '#3d3d3d',
          },
        ],
      },
      {
        text: `${data.title}`,
        style: 'header',
      },
      {
        text: `${formatter.format(data.date)}`,
        style: 'subHeader',
      },
      {
        text: `${data.content}`,
        style: 'body',
      },
    ],
  }

  return docDefinitions
}
