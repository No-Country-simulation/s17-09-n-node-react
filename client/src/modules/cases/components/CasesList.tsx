import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import CaseCard, { CaseInfoType } from './CaseCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CasesScrollbar from './CasesScrollBar'

import casesService from '../services/cases.service'

import { Modal } from '../../../components/Modal'
import { NewCase } from './NewCase'

const CasesList = ({
  items,
  filter,
  openNewCase,
  setOpenNewCase,
}: {
  items: CaseInfoType[]
  filter: undefined | null | string
  openNewCase: boolean
  setOpenNewCase: Dispatch<SetStateAction<boolean>>
}) => {
  const [filteredCases, setFilteredCases] = useState<[] | CaseInfoType[]>([])
  // const [openNewCase, setOpenNewCase] = useState<boolean>(false);
  // const [updateCase, setUpdateCase] = useState<boolean>(false);

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
            onClick={() => {
              setOpenNewCase(true)
            }}
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
        {openNewCase && (
          <div>
            <div
              className='fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 '
              onClick={() => setOpenNewCase(false)}
            />
            <Modal>
              <NewCase setOpenModal={setOpenNewCase} />
            </Modal>
          </div>
        )}
      </Box>
    </>
  )
}

export default CasesList
