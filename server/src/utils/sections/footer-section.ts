import { Content, ContextPageSize } from 'pdfmake/interfaces'

export default function footerSection(
  currentPage: number,
  pageCount: number,
  pageSize: ContextPageSize,
): Content {
  return {
    text: `Página ${currentPage} de ${pageCount}`,
    alignment: 'center',
    margin: [0, 5, 0, 10],
    fontSize: 10,
    bold: true,
  }
}
