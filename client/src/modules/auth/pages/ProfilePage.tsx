import { useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import ProfileModal from '../components/ProfileModal'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { lawCaseApi } from '../../../apis/index'
import { useAuth } from '../../../hooks'
import Cookies from 'js-cookie'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { user, setUser } = useAuth()

  const [profilePic, setProfilePic] = useState(user?.imageUrl || '/profile.png')
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState(user?.name || '')
  const [newLastName, setNewLastName] = useState(user?.lastName || '')
  const [newEmail, setNewEmail] = useState(user?.email || '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  Aos.init()

  // Llamada a la API para obtener los datos del usuario logueado

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleProfilePicUpdate = async (newUrl: string) => {
    setProfilePic(newUrl)

    if (user) {
      const updatedUser = {
        ...user,
        imageUrl: newUrl,
      }
      setUser(updatedUser)
      try {
        const res = await lawCaseApi.put('/user', updatedUser)
        if (res.status === 200 || res.status === 201) {
          setUser(res.data)
        }
      } catch (error) {
        console.error('Error actualizando el perfil:', error)
      }
    }
  }

  const saveUserToCookies = (updatedUser: any) => {
    Cookies.set('user', JSON.stringify(updatedUser), { expires: 7 })
  }

  const handleSaveChanges = async (e: any) => {
    e.preventDefault()
    try {
      const updatedUser = {
        name: newName || user?.name,
        lastName: newLastName || user?.lastName,
        email: newEmail || user?.email,
        imageUrl: profilePic || user?.imageUrl,
      }

      const res = await lawCaseApi.put('/user', updatedUser)

      if (res.status === 200 || res.status === 201) {
        setUser(res.data)
        saveUserToCookies(res.data)
        setEditMode(false)
        alert('Perfil actualizado exitosamente')
      }
    } catch (error) {
      console.error('Error actualizando el perfil:', error)
    }
  }

  const handleChangePassword = async () => {
    if (currentPassword && newPassword) {
      try {
        const response = await lawCaseApi.put(
          '/user/change-password',
          { currentPassword, newPassword },
          { withCredentials: true },
        )

        if (response.status === 200) {
          alert('Contraseña actualizada exitosamente')
          setCurrentPassword('')
          setNewPassword('')
        } else {
          alert('Error al cambiar la contraseña.')
        }
      } catch (error) {
        console.error('Error actualizando la contraseña:', error)
      }
    }
  }

  return (
    <main className='min-h-screen bg-[#424769] flex justify-center items-center w-full'>
      <div className='flex flex-col w-full lg:w-3/4 p-6 bg-[#7077A1] m-8 mt-20 shadow-lg rounded-md h-3/4'>
        <div className='flex w-full p-8 justify-between items-center'>
          <h1 className='text-3xl text-[#2D3250] font-semibold'>Mi perfil</h1>
          <button
            onClick={() => navigate('/home')}
            className='text-white hover:text-[#7077A1]'
          >
            X
          </button>
        </div>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-2 text-white px-4 lg:px-10 w-full lg:h-1/2'>
          <section className='bg-[#424769] rounded-lg flex flex-col justify-center items-center gap-2 w-full lg:w-1/2 p-8'>
            <button onClick={handleOpen}>
              <LiaEdit className='w-8 text-[#F6B17A] ml-44 mb-[-18px]' />
            </button>
            <div className='hover:scale-105'>
              <Avatar
                data-aos='fade-zoom-in'
                alt='LawCase profile picture'
                src={profilePic || './profile.png'}
                sx={{ width: 200, height: 200 }}
                className='transition-transform w-full duration-500 ease-in-out border-4 border-[#F6B17A] shadow-xl'
              />
            </div>
            <h3 className='text-2xl mt-4 text-center font-semibold text-white'>
              {newName || user?.name} {newLastName || user?.lastName}
            </h3>
            <p className='text-white'>{newEmail || user?.email}</p>
            <button
              className={`bg-[#F6B17A] border-[#2D3250] text-[#2D3250] border-2 p-2 rounded hover:bg-[#7077A1] hover:border-white hover:text-white m-4 ${editMode ? 'opacity-50' : ''}`}
              onClick={() => setEditMode(!editMode)}
              disabled={editMode}
            >
              Editar Perfil
            </button>
          </section>

          <section className='bg-[#424769] rounded-lg flex flex-col justify-center items-center gap-2 w-full lg:w-1/2'>
            {editMode ? (
              <div className='flex flex-col w-[80%] gap-2 p-4'>
                <img
                  data-aos='zoom-out'
                  data-aos-duration='1000'
                  src='/logo.png'
                  alt='logo'
                  className='w-2/6 mx-auto transition-transform duration-1500 ease-in-out'
                />
                <input
                  type='text'
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder='Nuevo Nombre'
                  className='p-1 rounded border text-white border-gray-300'
                />
                <input
                  type='text'
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder='Nuevo Apellido'
                  className='p-1 rounded border text-white border-gray-300'
                />
                <input
                  type='email'
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder='Nuevo Email'
                  className='p-1 rounded border text-white border-gray-300'
                />
                <input
                  type='password'
                  placeholder='Contraseña actual'
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type='password'
                  placeholder='Nueva contraseña'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button onClick={handleChangePassword}>
                  Actualizar Contraseña
                </button>

                <button
                  className='bg-[#F6B17A] border-[#2D3250] text-[#2D3250] border-2 rounded p-0 m-0 hover:bg-[#7077A1] hover:border-white hover:text-white'
                  onClick={handleSaveChanges}
                >
                  Guardar cambios
                </button>
                <button
                  className='bg-[#F6B17A] border-[#2D3250] text-[#2D3250] border-2 rounded mt-0 hover:bg-[#7077A1] hover:border-white hover:text-white'
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <img
                data-aos='zoom-in'
                data-aos-duration='1500'
                src='/logo.png'
                alt='logo'
                className='w-2/6'
              />
            )}
          </section>
        </div>
      </div>
      <ProfileModal
        open={open}
        onClose={handleClose}
        handleProfilePicUpdate={handleProfilePicUpdate}
      />
    </main>
  )
}

export default ProfilePage
