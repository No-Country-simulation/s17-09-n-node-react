import React, { useState, useEffect } from 'react'
import {
  Modal,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from '@mui/material'
import axios from 'axios'

// Configura Cloudinary
// const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dx0htqhaq/image/upload'
// const CLOUDINARY_UPLOAD_PRESET = 'zwtk1tj5'
const CLOUDINARY_URL = import.meta.env.CLOUDINARY_API_URL
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.CLOUDINARY_PRESET

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#2D3250',
  boxShadow: 24,
  p: 4,
}

type ProfileModalProps = {
  open: boolean
  onClose: () => void
  currentProfilePic: string
  onProfilePicUpdate: (newUrl: string) => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({
  open,
  onClose,
  currentProfilePic,
  onProfilePicUpdate,
}) => {
  const [uploading, setUploading] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await axios.post(CLOUDINARY_URL, formData)
      const newImageUrl = response.data.secure_url
      setNewProfilePic(newImageUrl)
    } catch (error) {
      console.error('Error subiendo la imagen a Cloudinary:', error)
    } finally {
      setUploading(false)
    }
  }

  useEffect(() => {
    if (newProfilePic) {
      onProfilePicUpdate(newProfilePic)
    }
  }, [newProfilePic, onProfilePicUpdate])

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby='profile-modal-title'
      aria-describedby='profile-modal-description'
    >
      <Box sx={style}>
        <Typography id='profile-modal-title' variant='h6' gutterBottom>
          Actualiza tu foto de perfil
        </Typography>

        <div className='flex justify-center items-center mb-4'>
          {uploading ? (
            <CircularProgress />
          ) : (
            <Avatar
              alt='Foto de perfil'
              src={newProfilePic || currentProfilePic}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </div>

        <Button
          variant='contained'
          component='label'
          fullWidth
          disabled={uploading}
          sx={{
            backgroundColor: '#F6B17A',
            border: '2px solid #2D3250',
            color: '#2D3250',
            borderRadius: '0.375rem',
            padding: '0.375rem 1rem',
            margin: 0,
            '&:hover': {
              backgroundColor: '#7077A1',
              borderColor: 'white',
              color: 'white',
            },
          }}
          className='transition-colors duration-300 ease-in-out'
        >
          Subir nueva foto
          <input type='file' hidden onChange={handleFileChange} />
        </Button>

        <Button
          variant='contained'
          color='primary'
          fullWidth
          onClick={onClose}
          sx={{
            backgroundColor: '#F6B17A',
            border: '2px solid #2D3250',
            color: '#2D3250',
            borderRadius: '0.375rem',
            padding: '0.375rem 1rem',
            margin: 0,
            marginTop: 2,
            '&:hover': {
              backgroundColor: '#7077A1',
              borderColor: 'white',
              color: 'white',
            },
          }}
          className='transition-colors duration-300 ease-in-out'
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  )
}

export default ProfileModal
