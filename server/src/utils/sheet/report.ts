import { TDocumentDefinitions, StyleDictionary } from 'pdfmake/interfaces'
import headerSection from '../sections/header-section'
import footerSection from '../sections/footer-section'

const styles: StyleDictionary = {
  header: {
    fontSize: 16,
    bold: true,
    alignment: 'center',
    margin: [0, 50, 0, 20],
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

export default function getReport(): TDocumentDefinitions {
  const docDefinitions: TDocumentDefinitions = {
    styles: styles,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({
      showDate: true,
      showLogo: true,
    }),
    footer: footerSection,
    content: [
      {
        qr: 'https://s17-09-n-node-react-2.onrender.com',
        fit: 75,
        alignment: 'right',
      },
      {
        text: 'PROTOTIPO DE DOCUMENTO',
        style: 'header',
      },
      {
        text: `Me dirijo a ustedes para presentar el prototipo del documento de reporte para la aplicación. Como prodrá ver, el mismo tiene una estructura basica: el icono de la aplicación, el cuerpo de texto y la firma de sus respectivo autor.\n 
      Estoy abierto a sugerencias para la mejora del mismo y que se adapte a las formalidades requeridas. Y como simepre, quisiera expresar mi agradecimiento por el desarrollo del proyecto en el cual forma parte este documento.\n`,
        style: 'body',
      },
      {
        text: 'Atentamente',
        style: 'signature',
      },
      {
        text: 'Facundo Castro',
        style: 'signature',
      },
      {
        text: 'Desarrollador Backend',
        style: 'signature',
      },
    ],
  }

  return docDefinitions
}
