import React, { useState, useEffect } from 'react'
import { Modal, Box, Typography, Button, Avatar, CircularProgress } from '@mui/material'
import axios from 'axios'

// Configura Cloudinary
const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dx0htqhaq/image/upload'
const CLOUDINARY_UPLOAD_PRESET = 'zwtk1tj5'

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

const ProfileModal: React.FC<ProfileModalProps> = ({ open, onClose, currentProfilePic, onProfilePicUpdate }) => {
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
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <Typography id="profile-modal-title" variant="h6" gutterBottom>
          Actualiza tu foto de perfil
        </Typography>

        <div className="flex justify-center items-center mb-4">
          {uploading ? (
            <CircularProgress />
          ) : (
            <Avatar
              alt="Foto de perfil"
              src={newProfilePic || currentProfilePic}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </div>

        <Button
          variant="contained"
          component="label"
          fullWidth
          disabled={uploading}
        >
          Subir nueva foto
          <input type="file" hidden onChange={handleFileChange} />
        </Button>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onClose}
        >
          Cerrar
        </Button>
      </Box>
    </Modal>
  )
}

export default ProfileModal
