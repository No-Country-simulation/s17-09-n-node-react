import { useEffect, useState } from 'react'
import axios from 'axios'
import { LiaEdit } from 'react-icons/lia'
import ProfileModal from '../components/ProfileModal'
import { useSession } from '../../../hooks'

const ProfilePage: React.FC = () => {
  const { session, loading } = useSession() // Get session and loading state
  const [user, setUser] = useState({
    id: '',
    name: '',
    lastName: '',
    email: '',
    role: '',
  })
  const [profilePic, setProfilePic] = useState('https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg')
  const [open, setOpen] = useState(false) // Modal state
  const [editMode, setEditMode] = useState(false) // Edit mode state
  const [newName, setNewName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newProfilePic, setNewProfilePic] = useState('')

  // Update user data from session when it's loaded
  useEffect(() => {
    if (!loading && session?.user) {
      setUser(session.user) // Set user from session
      setNewProfilePic(session.user.profilePic || profilePic)
    }
  }, [session, loading])

  const handleOpen = () => setOpen(true) // Open modal
  const handleClose = () => setOpen(false) // Close modal

  // Handle profile picture update
  const handleProfilePicUpdate = (newUrl: string) => {
    setProfilePic(newUrl)
    setNewProfilePic(newUrl) // Sync new profile pic
  }

  // Save changes to user profile
  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(`/api/v1/user/${user.id}`, {
        name: newName || user.name,
        lastName: newLastName || user.lastName,
        profilePic: newProfilePic || profilePic,
      })
      setUser(response.data) // Update user state
      setEditMode(false) // Exit edit mode
    } catch (error) {
      console.error('Error updating user:', error)
    }
  }

  return (
    <main className="min-h-screen bg-bg flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="self-start text-3xl font-bold">Mi perfil</h1>
        <div className="flex gap-10 text-white">
          {/* Profile section */}
          <section className="bg-policeBlue px-20 py-14 rounded-lg flex flex-col justify-center items-center relative">
            <img src={profilePic} alt="Perfil" className="w-40" />
            <button className="absolute top-0 right-0 mt-16 mr-16" onClick={handleOpen}>
              <LiaEdit className="w-7 text-white" />
            </button>
            <h3 className="text-3xl mt-20">{user.name} {user.lastName}</h3>
            <p>{user.email}</p>
          </section>

          {/* Edit section */}
          <section className="bg-policeBlue px-12 py-14 pr-32 rounded-lg flex flex-col gap-6 relative">
            <h2 className="text-3xl font-semibold">Detalles de perfil</h2>

            {editMode ? (
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nombre"
                  className="p-2 rounded border"
                />
                <input
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder="Apellido"
                  className="p-2 rounded border"
                />
                <button className="bg-green-500 text-white p-2 rounded" onClick={handleSaveChanges}>
                  Guardar cambios
                </button>
                <button className="bg-red-500 text-white p-2 rounded" onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
              </div>
            ) : (
              <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setEditMode(true)}>
                Editar perfil
              </button>
            )}
          </section>
        </div>
        {/* Profile picture modal */}
        <ProfileModal
          open={open}
          onClose={handleClose}
          currentProfilePic={profilePic}
          onProfilePicUpdate={handleProfilePicUpdate}
        />
      </div>
    </main>
  )
}

export default ProfilePage
