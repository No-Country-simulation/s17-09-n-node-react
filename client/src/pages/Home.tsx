import { NavLink } from 'react-router-dom'
import Calendar from '../components/ui/Calendar'
import Checkbox from '@mui/material/Checkbox'
import { useState } from 'react'
import TodayIcon from '@mui/icons-material/Today';
import CheckIcon from '@mui/icons-material/Check';

const Home = () => {
  const [indexFocus, setIndexFocus] = useState<number | null>(null)
  const handleIndexFocus = (index: number) => {
    setIndexFocus(index)
  }
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const cases = [
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Presentar demanda',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Audiencia testimonial',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Redactar escrito',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Reunión con clientes',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Nombre',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Nombre',
      checked: false,
    },
    {
      date: '26/06/2024 - 10:00hs',
      name: 'Nombre',
      checked: false,
    },
  ]
  return (
    <div className='bg-bg flex justify-center items-center min-h-screen'>
      <div className='bg-policeBlue flex flex-col gap-8 items-center justify-center sm:w-5/6 w-full h-full px-2 py-8 mt-[90px] sm:mt-[85px] rounded-lg max-w-[1000px]'>
        <div>
          <h1 className='self-start text-2xl font-bold mb-2'>
            Tareas para hoy
          </h1>
          <Calendar />
        </div>
        <div className='bg-rhythm sm:w-5/6 flex flex-col rounded-lg px-4 sm:px-12 py-2 sm:py-6 h-[300px]'>
          <div className='flex justify-between'>
            <h3 className='text-sm max-w-[200px] sm:max-w-full'>
              Caso:{' '}
              <NavLink to='/cases:caseId' className='inline font-bold'>
                Juan Perez c/ Marcos Gonzalez
              </NavLink>
            </h3>
            <h4 className='flex justify-center items-center gap-2 text-sm'><CheckIcon /> Inicio</h4>
          </div>
          <ul className='flex flex-col gap-4 overflow-y-auto my-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-bg px-2'>
            {cases &&
              cases.map((item, index) => (
                <li
                  key={index}
                  onClick={() => handleIndexFocus(index)}
                  className={`bg-bg cursor-pointer flex justify-between items-center px-5 rounded-lg py-1 md:py-0 ${
                    indexFocus === index ? 'bg-mellowApricot text-black border-2 border-white' : ''}`}
                >
                  <span className='text-xs md:text-sm max-w-[100px] md:max-w-full'><TodayIcon /> {item.date}</span>
                  <span className='text-xs md:text-sm'>{item.name}</span>
                  <Checkbox {...label} className='!text-inherit' />
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
