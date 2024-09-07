import { useState } from 'react'

import {
  DateCalendar,
  type DateCalendarSlotProps,
} from '@mui/x-date-pickers/DateCalendar'
import { Box, type SxProps, type Theme } from '@mui/material'

import type { Dayjs } from 'dayjs'

const FONT_COLOR = 'white'
const BG_SELECTED = 'rgba(255, 255, 255, 0.2)'

interface CalendarProps {
  className?: string
  sx?: SxProps<Theme>
  onDateChange?: (date: Dayjs) => void
}

const Calendar = ({ className, sx, onDateChange }: CalendarProps) => {
  const [value, setValue] = useState<Dayjs | null>(null)

  const dayOfWeekFormatter = (date: Dayjs) =>
    date.format('ddd').slice(0, 3).toUpperCase()

  const handleChange = (date: Dayjs) => {
    setValue(date)
    if (!onDateChange) return
    onDateChange(date)
  }

  const calendarSlotProps: DateCalendarSlotProps<Dayjs> = {
    day: {
      sx: {
        color: FONT_COLOR,
        '&:focus': { bgcolor: 'rgba(255, 255, 255, 0.08)' },
        '&.Mui-selected': {
          fontWeight: 'bold',
          bgcolor: BG_SELECTED,
          '&:hover': { bgcolor: BG_SELECTED },
          '&:focus': { bgcolor: BG_SELECTED },
        },
        '&.MuiPickersDay-today': {
          '&:not(.Mui-selected)': {
            border: '1px solid rgba(255, 255, 255, 0.6)',
          },
        },
      },
    },
    yearButton: {
      sx: {
        '&.Mui-selected': {
          bgcolor: BG_SELECTED,
          '&:hover': { bgcolor: BG_SELECTED },
          '&:focus': { bgcolor: BG_SELECTED },
        },
      },
    },
    leftArrowIcon: { sx: { color: FONT_COLOR } },
    rightArrowIcon: { sx: { color: FONT_COLOR } },
    switchViewButton: { sx: { color: FONT_COLOR } },
  }

  return (
    <Box sx={sx} className={className}>
      <DateCalendar
        value={value}
        onChange={handleChange}
        dayOfWeekFormatter={dayOfWeekFormatter}
        slotProps={calendarSlotProps}
        sx={{
          color: FONT_COLOR,
          bgcolor: '#7077A1',
          borderRadius: '13px',
          '& .MuiDayCalendar-weekDayLabel': {
            color: FONT_COLOR,
            fontWeight: 'bold',
          },
          '& .MuiPickersCalendarHeader-label': {
            textTransform: 'capitalize',
          },
        }}
      />
    </Box>
  )
}

export default Calendar
