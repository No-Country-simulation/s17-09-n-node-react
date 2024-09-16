import PdfPrinter from 'pdfmake'
import {
  TDocumentDefinitions,
  BufferOptions,
  TFontDictionary,
  CustomTableLayout,
} from 'pdfmake/interfaces'

const fonts: TFontDictionary = {
  Roboto: {
    normal: 'assets/fonts/Roboto-Regular.ttf',
    bold: 'assets/fonts/Roboto-Bold.ttf',
    italics: 'assets/fonts/Roboto-Italic.ttf',
    bolditalics: 'assets/fonts/Roboto-BoldItalic.ttf',
  },
}

const customTableLayouts: Record<string, CustomTableLayout> = {
  customLayout01: {
    hLineWidth: function (i, node) {
      if (i === 0 || i === node.table.body.length) return 0
      return i === node.table.headerRows ? 2 : 1
    },
    vLineWidth: function () {
      return 0
    },
    hLineColor: function (i) {
      return i === 1 ? 'black' : '#f3f3f3be'
    },
    paddingLeft: function (i) {
      return i === 0 ? 0 : 8
    },
    paddingRight: function (i, node) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return i === node.table.widths!.length - 1 ? 0 : 8
    },
    fillColor: function (i) {
      if (i === 0) return '#510086'
      return i % 2 === 0 ? '#dcaffa' : null
    },
  },
}

export default class PrinterUtil {
  createPdf(
    docDefinition: TDocumentDefinitions,
    options: BufferOptions = {
      tableLayouts: customTableLayouts,
    },
  ): PDFKit.PDFDocument {
    const printer = new PdfPrinter(fonts)
    return printer.createPdfKitDocument(docDefinition, options)
  }
}
