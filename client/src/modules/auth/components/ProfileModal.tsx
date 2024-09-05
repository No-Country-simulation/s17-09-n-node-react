import Box from '@mui/material/Box'
import { LiaEdit } from 'react-icons/lia'
import Modal from '@mui/material/Modal'
import { TextField } from '@mui/material'
import React, { useState } from 'react'
import { Cloudinary } from 'cloudinary-core'

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
  user: {
    id: string
    name: string
    lastName: string
    email: string
    role: string
  }
  setUser: React.Dispatch<React.SetStateAction<{
    id: string
    name: string
    lastName: string
    email: string
    role: string
  }>>
}

const BasicModal: React.FC<BasicModalProps> = ({ handleClose, open, user, setUser }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    lastName: user.lastName,
    email: user.email,
    password: '',
    confirmPassword: '',
  })


  const cloudinary = new Cloudinary({ cloud_name: 'your_cloud_name', secure: true })

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'your_upload_preset')
  
    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudinary.config().cloud_name}/image/upload`,
        formData
      )
      // Guarda la URL de la imagen en el perfil del usuario
      const imageUrl = response.data.secure_url
      // Update user profile with the new image URL
      await axios.put(`/api/v1/user/${user.id}`, { imageUrl })
      // Update the user state
      setUser((prevUser) => ({ ...prevUser, imageUrl }))
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden.')
      return
    }
    try {
      // Aquí deberías realizar la petición para actualizar los datos del usuario
      // const response = await axios.put(`/api/v1/user/${user.id}`, formData)
      setUser({ ...user, ...formData })
      handleClose()
    } catch (error) {
      console.error('Error updating user data:', error)
    }
  }

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
              <input type='file' onChange={handleImageUpload} />

              <img
                src='https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg'
                alt=''
                className='w-40'
              />
            </div>
            <div className='bg-policeBlue rounded-lg'>
              <form
                onSubmit={handleSubmit}
                className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-6'
              >
                <div>
                  <TextField
                    type='text'
                    label='Apellido'
                    variant='outlined'
                    name='lastName'
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
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
                <div>
                  <TextField
                    type='text'
                    label='Nombre'
                    variant='outlined'
                    name='name'
                    fullWidth
                    value={formData.name}
                    onChange={handleChange}
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
                <div className='col-span-2'>
                  <TextField
                    type='email'
                    label='Email'
                    variant='outlined'
                    name='email'
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
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
                <div>
                  <TextField
                    type='password'
                    label='Contraseña'
                    variant='outlined'
                    name='password'
                    fullWidth
                    value={formData.password}
                    onChange={handleChange}
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
                <div>
                  <TextField
                    type='password'
                    label='Confirmar contraseña'
                    variant='outlined'
                    name='confirmPassword'
                    fullWidth
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
