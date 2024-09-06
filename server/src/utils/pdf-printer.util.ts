import PdfPrinter from 'pdfmake'
import { TDocumentDefinitions, BufferOptions, TFontDictionary } from 'pdfmake/interfaces'

const fonts: TFontDictionary = {
  Roboto: {
    normal: 'assets/fonts/Roboto-Regular.ttf',
    bold: 'assets/fonts/Roboto-Bold.ttf',
    italics: 'assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'assets/fonts/Roboto-BoldItalic.ttf',
  },
}

export default class PrinterUtil {
  createPdf(docDefinition: TDocumentDefinitions, options: BufferOptions = {}): PDFKit.PDFDocument {
    const printer = new PdfPrinter(fonts)
    return printer.createPdfKitDocument(docDefinition, options)
  }
}
