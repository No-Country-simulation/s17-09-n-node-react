import { Content } from 'pdfmake/interfaces'

const formatter = new Intl.DateTimeFormat('es-ES', {
  year: 'numeric',
  month: 'long',
  day: '2-digit',
})

const logo: Content = {
  image: 'assets/images/logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [35, 0, 0, 20],
}

interface HeadersOptions {
  title?: string
  subtitle?: string
  showLogo?: boolean
  showDate?: boolean
  showQr?: boolean
}

export default function headerSection(options: HeadersOptions): Content {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, subtitle, showLogo = true, showDate = true } = options

  const headerLogo: Content = showLogo ? logo : ''
  const headerDate: Content = showDate
    ? {
        text: `${formatter.format(new Date())}`,
        margin: [0, 20, 15, 20],
        alignment: 'right',
      }
    : ''

  return {
    columns: [headerLogo, headerDate],
  }
}