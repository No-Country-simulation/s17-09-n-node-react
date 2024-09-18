// Función para formatear una fecha en formato dd-mm-yy hh:mm:ss

export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  const dateOptions: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  }

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }

  const formattedDate = new Intl.DateTimeFormat('es-ES', dateOptions).format(
    date,
  )
  const formattedTime = new Intl.DateTimeFormat('es-ES', timeOptions).format(
    date,
  )

  return `${formattedDate} ${formattedTime}`
}
