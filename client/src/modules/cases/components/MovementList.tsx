import { useEffect, useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import MovementCard, { MovementInfoType } from './MovementCard'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import CasesScrollbar from './CasesScrollBar'
import CreateMovementModal from './CreateMovementModal'
const MovementList = ({
  items,
  filter,
}: {
  items: MovementInfoType[]
  filter: undefined | null | string
}) => {
  const [filteredMovements, setFilteredMovements] = useState<
    [] | MovementInfoType[]
  >([])

  useEffect(() => {
    const filterMovements = () => {
      if (filter === 'all' || !filter) {
        return items
      } else {
        return items.filter((i) => i.type === filter)
      }
    }
    setFilteredMovements(filterMovements())
  }, [items, filter])

  const [openCreateMovement, setOpenCreateMovement] = useState(false)

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
            {filteredMovements.map((movementInfo, index) => (
              <MovementCard key={index} movementInfo={movementInfo} />
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
            onClick={() => setOpenCreateMovement(true)}
          >
            <Typography variant='body2'>Nuevo Movimiento</Typography>
          </Button>
          <CreateMovementModal
            openCreateMovement={openCreateMovement}
            setOpenCreateMovement={setOpenCreateMovement}
          />
        </Box>
      </Box>
    </>
  )
}

export default MovementList
