import { useEffect, useState } from 'react'
import { useAuth } from '../../../hooks'
import movementsService from '../services/movements.service'
import { NavLink } from 'react-router-dom'
import dayjs from 'dayjs'
import type { Dayjs } from 'dayjs'
import Case from '../utils/case.status'
import Checkbox from '@mui/material/Checkbox'
import TodayIcon from '@mui/icons-material/Today'
import DoneIcon from '@mui/icons-material/Done'
import ErrorIcon from '@mui/icons-material/Error'
import GroupsIcon from '@mui/icons-material/Groups'
import ArchiveIcon from '@mui/icons-material/Archive'

interface IMovement {
  id: string
  createdAt: string
  date: string
  title: string
  type: string
  done: boolean
  content: string
  caseId: string
  Case: {
    id: string
    createdAt: string
    caseName: string
    jury: string
    caseNumber: string
    applicant: string
    respondent: string
    type: string
    status: string
    userId: string
  }
}

interface MovementsProp {
  selectedDate: Date | Dayjs
}

const CalendarMovements = ({ selectedDate }: MovementsProp) => {
  const [movements, setMovements] = useState<IMovement[] | []>([])
  const [indexFocus, setIndexFocus] = useState<number | null>(null)

  const { token } = useAuth()

  const handleIndexFocus = (index: number) => {
    setIndexFocus(index)
  }

  const handleMovementCheck = (movement: IMovement) => {
    const { id, done } = movement
    const updatedMovement = {
      done: !done,
    }
    if (token) {
      movementsService.updateMovement(id, updatedMovement)
    }
  }

  useEffect(() => {
    const formattedDate = dayjs(selectedDate).toISOString()
    if (token) {
      movementsService.getMovementsByDate(formattedDate).then((res) => {
        if (Array.isArray(res?.data)) {
          setMovements(res.data)
        } else {
          console.log('Error al obtener los movimientos')
        }
      })
    }
  }, [token, selectedDate])

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

  return (
    <div className='bg-rhythm sm:w-5/6 flex flex-col rounded-lg px-4 min-w-[300px] sm:px-12 py-2 sm:py-6 h-[300px]'>
      <div className='flex justify-between'>
        <h3 className='text-sm max-w-[200px] sm:max-w-full'>
          Caso:{' '}
          {indexFocus != null && (
            <NavLink
              to={`/cases/${movements?.[indexFocus].Case.id}`}
              className='inline font-bold'
            >
              {movements?.[indexFocus].Case.caseName}
            </NavLink>
          )}
        </h3>
        {indexFocus != null && (
          <h3 className='flex justify-center items-center gap-2 text-sm'>
            {movements?.[indexFocus].Case.status == 'INITIATED' && (
              <DoneIcon sx={{ width: 15 }} />
            )}
            {movements?.[indexFocus].Case.status == 'EVIDENCE' && (
              <ErrorIcon sx={{ width: 15 }} />
            )}
            {movements?.[indexFocus].Case.status == 'JUDGMENT' && (
              <GroupsIcon sx={{ width: 15 }} />
            )}
            {movements?.[indexFocus].Case.status == 'CLOSED' && (
              <ArchiveIcon sx={{ width: 15 }} />
            )}
            {Case.CasesStatus[movements?.[indexFocus].Case.status]}
          </h3>
        )}
      </div>
      <ul className='flex flex-col gap-4 overflow-y-auto my-4 scrollbar-thin scrollbar-thumb-white scrollbar-track-bg px-2'>
        {movements &&
          movements.map((item, index) => {
            const date = new Date(item.date)
            return (
              <li
                key={index}
                onClick={() => handleIndexFocus(index)}
                className={`bg-bg cursor-pointer flex justify-between items-center px-5 rounded-lg py-1 md:py-0 ${
                  indexFocus === index
                    ? 'bg-mellowApricot text-black border-2 border-white'
                    : ''
                }`}
              >
                <span className='text-xs md:text-sm max-w-[100px] md:max-w-full'>
                  <TodayIcon /> {date.toLocaleDateString()}
                </span>
                <span className='text-xs md:text-sm'>{item.title}</span>
                <Checkbox
                  {...label}
                  className='!text-inherit'
                  defaultChecked={item.done}
                  onChange={() => handleMovementCheck(item)}
                />
              </li>
            )
          })}
      </ul>
    </div>
  )
}

export default CalendarMovements
