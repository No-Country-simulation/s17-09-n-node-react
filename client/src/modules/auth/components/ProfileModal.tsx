import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button, Avatar, CircularProgress, TextField } from '@mui/material'
import { styled } from '@mui/system'
import axios from 'axios'

// Configura Cloudinary
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dx0htqhaq/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'zwtk1tj5'

// Estilos del modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

// Contenedor del avatar
const AvatarContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '1rem',
})

type ProfileModalProps = {
  open: boolean
  onClose: () => void
  currentProfilePic: string
  onProfilePicUpdate: (newUrl: string) => void
}

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, currentProfilePic, onProfilePicUpdate }) => {
  const [uploading, setUploading] = useState(false)
  const [newProfilePic, setNewProfilePic] = useState<string | null>(null)
  const [customProfilePic, setCustomProfilePic] = useState<string>(currentProfilePic)

  // Manejador de cambio de archivo
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Comienza el proceso de subida
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    try {
      const response = await axios.post(CLOUDINARY_URL, formData)
      const newImageUrl = response.data.secure_url
      setNewProfilePic(newImageUrl)
      setCustomProfilePic(newImageUrl)
    } catch (error) {
      console.error('Error subiendo la imagen a Cloudinary:', error)
    } finally {
      setUploading(false)
    }
  }

  // Actualiza el customProfilePic cuando newProfilePic cambia
  useEffect(() => {
    if (newProfilePic) {
      setCustomProfilePic(newProfilePic)
    }
  }, [newProfilePic])

  // Manejador para actualizar la imagen de perfil con URL personalizada
  const handleCustomUrlChange = () => {
    if (customProfilePic !== currentProfilePic) {
      onProfilePicUpdate(customProfilePic)
    }
    onClose()
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <Typography id="profile-modal-title" variant="h6" component="h2" gutterBottom>
          Actualiza tu foto de perfil
        </Typography>

        <AvatarContainer>
          {uploading ? (
            <CircularProgress />
          ) : (
            <Avatar
              alt="Foto de perfil"
              src={newProfilePic || currentProfilePic}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </AvatarContainer>

        <Button
          variant="contained"
          component="label"
          color="primary"
          disabled={uploading}
          fullWidth
        >
          Subir nueva foto
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <TextField
          label="URL de la imagen de perfil"
          variant="outlined"
          fullWidth
          margin="normal"
          value={customProfilePic}
          onChange={(e) => setCustomProfilePic(e.target.value)}
        />

        <Button
          variant="contained"
          color="primary"
          onClick={handleCustomUrlChange}
          sx={{ mt: 2 }}
          fullWidth
        >
          Guardar cambios
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          sx={{ mt: 2 }}
          fullWidth
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  )
}

export default ProfileModal
