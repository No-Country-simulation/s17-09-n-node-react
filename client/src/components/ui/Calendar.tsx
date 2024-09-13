import { useState } from 'react'
import { DateCalendar, type DateCalendarSlotProps } from '@mui/x-date-pickers/DateCalendar'
import { Box, type SxProps, type Theme } from '@mui/material'
import type { Dayjs } from 'dayjs'

const FONT_COLOR = 'white'
const BG_SELECTED = 'rgba(255, 255, 255, 0.2)'

interface ICalendarProps {
  className?: string
  sx?: SxProps<Theme>
  onDateChange?: (date: Dayjs) => void
}

export const Calendar = ({ className, sx, onDateChange }: ICalendarProps) => {
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
        marginX: { xs: '5px', sm: '10px', md: '15px', lg: '20px' },
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
        width: 'auto',
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
          width: 'auto',
          height: 'auto',
          color: FONT_COLOR,
          bgcolor: '#7077A1',
          borderRadius: '13px',
          // padding: { xs: '2px', sm: '5px', md: '10px' },
          '&.MuiDateCalendar-root': {
            maxHeight: '100%',
          },
          '& .MuiPickersDay-root': {
            marginX: { xs: '5px', sm: '10px', md: '15px', lg: '20px' },
          },
          '& .MuiDayCalendar-weekDayLabel': {
            marginX: { xs: '5px', sm: '10px', md: '15px', lg: '20px' },
            color: FONT_COLOR,
            fontWeight: 'bold',
            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '.9rem' },
          },
          '& .MuiPickersCalendarHeader-label': {
            textTransform: 'capitalize',
            fontSize: { sm: '1rem', md: '1.2rem', lg: '1.4rem' },
          },
          '& .MuiYearCalendar-root': {
            width:{ xs: '322px', sm: '396px', md: '462px', lg: '532px' },
            padding: '0',
            justifyContent:'center',
          },
          '& .MuiPickersYear-root': {
            marginX: { xs: '5px', sm: '10px', md: '15px', lg: '20px' },
          },
        }}
      />
    </Box>
  )
}
