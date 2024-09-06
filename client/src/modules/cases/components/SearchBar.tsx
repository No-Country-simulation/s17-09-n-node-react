import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '../assets/SearchIcon'

const SearchBar: React.FC = () => {
  return (
    <Paper
      component='form'
      sx={{
        marginY: 'auto',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: { sm: '50vw', xs: '100%' },
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search'
        inputProps={{ 'aria-label': 'Search' }}
      />
      <IconButton type='button' sx={{ p: '5px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}

export default SearchBar
