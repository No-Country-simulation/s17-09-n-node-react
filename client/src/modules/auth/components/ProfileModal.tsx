import Box from '@mui/material/Box'
import { LiaEdit } from 'react-icons/lia'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24,
}

interface BasicModalProps {
  handleClose: () => void
  open: boolean
}
interface DataProps {
  title: string
  info: string
  type: string
}

const BasicModal: React.FC<BasicModalProps> = ({ handleClose, open }) => {
  const data: DataProps[] = [
    { title: 'Apellido', info: 'Gomez', type: 'string' },
    { title: 'Nombre', info: 'Clara', type: 'string' },
    { title: 'Email', info: 'C.Gomez@gmail.com', type: 'email' },
    { title: 'Contraseña', info: '*********', type: 'password' },
    { title: 'Confirmar contraseña', info: '*********', type: 'password' },
  ]

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style} className='p-12 w-full max-w-[1024px] bg-bg rounded-lg'>
        <div>
          <h1 className='text-white text-3xl font-bold'>Editar perfil</h1>
          <div className='flex flex-col gap-8'>
            <div className='relative self-center'>
              <button className='absolute top-0 right-0'>
                <LiaEdit className='w-8 text-white' />
              </button>
              <img
                src='https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg'
                alt=''
                className='w-40'
              />
            </div>
            <div className='bg-policeBlue rounded-lg'>
              <form
                action=''
                className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-6'
              >
                {data.map((info, index) => (
                  <div
                    key={index}
                    className={`${index === 2 ? 'col-span-2' : ''}`}
                  >
                    <TextField
                      type={info.type}
                      label={info.title}
                      variant='outlined'
                      fullWidth
                      defaultValue={info.info}
                      className='py-1'
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'white',
                          },
                          '&:hover fieldset': {
                            borderColor: 'white',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#F6B17A',
                          },
                        },
                        '& .MuiInputBase-input': {
                          color: 'white',
                        },
                        '& .MuiInputLabel-root': {
                          color: 'white',
                          '&.Mui-focused': {
                            color: '#F6B17A',
                          },
                          '&.MuiFormLabel-root:not(.MuiInputLabel-shrink)': {
                            color: '#7077A1',
                          },
                        },
                      }}
                    />
                  </div>
                ))}
                <div className='col-span-2 mt-4'>
                  <input
                    type='submit'
                    value='Confirmar'
                    className='cursor-pointer mx-auto py-2 px-8 rounded bg-bg hover:bg-mellowApricot hover:text-black transition-all duration-200'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  )
}

export default BasicModal
