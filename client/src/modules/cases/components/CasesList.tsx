import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import CaseCard, { CaseInfoType } from './CaseCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CasesScrollbar from './CasesScrollBar'
import casesService from '../services/cases.service'

const CasesList = ({
  items,
  filter,
}: {
  items: CaseInfoType[]
  filter: undefined | null | string
}) => {
  const [filteredCases, setFilteredCases] = useState<[] | CaseInfoType[]>([])

  useEffect(() => {
    const filtered = (value: string) => {
      return items.filter((i) => i.status == value)
    }
    if (filter && filter === 'inicio') {
      setFilteredCases(filtered('INITIATED'))
    } else if (filter && filter === 'prueba') {
      setFilteredCases(filtered('EVIDENCE'))
    } else if (filter && filter === 'sentencia') {
      setFilteredCases(filtered('JUDGMENT'))
    } else if (filter && filter === 'archivado') {
      setFilteredCases(filtered('CLOSED'))
    } else {
      setFilteredCases(items)
    }
  }, [items, filter])

  const handleDeleteCase = (id: string, index: number) => {
    casesService.deleteCase(id)
    const filteredCaesCopy = [...filteredCases]
    filteredCaesCopy.splice(index, 1)
    setFilteredCases(filteredCaesCopy)
  }

  return (
    <>
      <Box
        borderRadius={2}
        bgcolor='primary.main'
        px={3}
        pt={4}
        mt={3}
        sx={{ minHeight: { sm: 350, xs: 400 } }}
      >
        <CasesScrollbar>
          <ul
            style={{
              listStyle: 'none',
              padding: 5,
            }}
          >
            {filteredCases.map((caseInfo, index) => (
              <CaseCard
                key={index}
                caseInfo={caseInfo}
                handleDelete={() => handleDeleteCase(caseInfo.id, index)}
              />
            ))}
          </ul>
        </CasesScrollbar>

        <Box display={'flex'} justifyContent={'center'}>
          <Button
            startIcon={<AddCircleOutlineIcon sx={{ color: 'white' }} />}
            sx={{
              color: 'white',
              '&.Mui-selected': {
                color: 'white',
              },
            }}
          >
            <Typography variant='body2'>Nuevo Caso</Typography>
          </Button>
        </Box>
      </Box>
    </>
  )
}

export default CasesList
