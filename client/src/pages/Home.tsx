import { useState } from 'react'
import { Calendar } from '../components/ui/Calendar'
import CalendarMovements from '../modules/cases/components/CalendarMovements'
import type { Dayjs } from 'dayjs'

const Home = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | Date>(new Date())

  const handleDateChange = (date: Dayjs) => {
    setSelectedDate(date)
  }

  return (
    <div className='bg-bg text-white flex justify-center items-center min-h-screen py-1'>
      <div className='bg-policeBlue flex flex-col gap-8 items-center justify-center sm:w-5/6 w-full h-full px-2 py-8 mt-[90px] sm:mt-[85px] rounded-lg max-w-[1000px]'>
        <div>
          <h1 className='self-start text-2xl font-bold mb-2'>
            Tareas para hoy
          </h1>
          <Calendar onDateChange={handleDateChange} />
        </div>
        <CalendarMovements selectedDate={selectedDate} />
      </div>
    </div>
  )
}

export default Home
