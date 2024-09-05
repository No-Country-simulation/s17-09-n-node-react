import { useEffect, useState } from 'react'
import axios from 'axios'
import { LiaEdit } from 'react-icons/lia'
import ProfileModal from '../components/ProfileModal'

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
  })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/v1/user/{id}')
        setUser(response.data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    }

    fetchUserData()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <main className='min-h-screen bg-bg flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-12'>
        <h1 className='self-start text-3xl font-bold'>Mi perfil</h1>
        <div className='flex gap-10'>
          <section className='bg-policeBlue px-20 py-14 rounded-lg flex flex-col justify-center items-center'>
            <img
              src='https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg'
              alt=''
              className='w-40'
            />
            <h3 className='text-3xl'>{user.name} {user.lastName}</h3>
            <p>{user.email}</p>
          </section>
          <section className='bg-policeBlue px-12 py-14 pr-32 rounded-lg flex flex-col gap-6 relative'>
            <button
              className='absolute top-0 right-0 mt-6 mr-6'
              onClick={handleOpen}
            >
              <LiaEdit className='w-7' />
            </button>
            <h2 className='text-3xl font-semibold'>Detalles de perfil</h2>
            <div className='flex gap-10'>
              <div className='flex flex-col gap-2'>
                <span className='font-semibold'>Apellido</span>
                <span className='font-semibold'>Nombre</span>
                <span className='font-semibold'>Email</span>
              </div>
              <div className='flex flex-col gap-2'>
                <span>{user.lastName}</span>
                <span>{user.name}</span>
                <span>{user.email}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ProfileModal handleClose={handleClose} open={open} user={user} setUser={setUser} />
    </main>
  )
}

export default ProfilePage
