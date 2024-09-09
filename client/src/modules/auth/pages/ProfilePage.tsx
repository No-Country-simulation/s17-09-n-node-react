import { useEffect, useState } from 'react'
import { LiaEdit } from 'react-icons/lia'
import ProfileModal from '../components/ProfileModal'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@mui/material'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    const storedUser = Cookies.get('user')
    return storedUser
      ? JSON.parse(storedUser)
      : {
          id: '123',
          name: 'Josefa',
          lastName: 'Elifonzo',
          email: 'jose@mail.com',
          role: 'User',
          profilePic: './Abogada3.png',
          password: 'password123'
        }
  })

  const [profilePic, setProfilePic] = useState(() =>
    Cookies.get('profilePic') || user.profilePic
  )
  const [open, setOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newName, setNewName] = useState('')
  const [newLastName, setNewLastName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [error, setError] = useState('')

  useEffect(() => {
    if (profilePic) {
      setProfilePic(profilePic)
    }
  }, [profilePic])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleProfilePicUpdate = (newUrl: string) => {
    setProfilePic(newUrl)
    Cookies.set('profilePic', newUrl)
  }

  const handleSaveChanges = () => {
    if (oldPassword !== user.password) {
      setError('La contraseña actual es incorrecta.')
      return
    }

    const updatedUser = {
      ...user,
      name: newName || user.name,
      lastName: newLastName || user.lastName,
      email: newEmail || user.email,
      password: newPassword || user.password,
      profilePic: profilePic
    }

    setUser(updatedUser)
    Cookies.set('user', JSON.stringify(updatedUser))
    setEditMode(false)
    setNewName('')
    setNewLastName('')
    setNewEmail('')
    setOldPassword('')
    setNewPassword('')
    setError('')
  }

  return (
    <main className="min-h-screen z-0 bg-[#424769] flex justify-center items-center w-full">
      <div className="flex flex-col z-1 w-full lg:w-3/4 p-6 bg-[#7077A1] m-8 shadow-lg rounded-md h-full">
        <div className="flex w-full p-8 justify-between items-center">
          <h1 className="text-3xl text-white font-semibold">Mi perfil</h1>
          <button onClick={() => navigate('/register')} className="text-white hover:text-[#7077A1]">
            X
          </button>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-2 text-white px-4 lg:px-10 w-full lg:h-1/2">
          <section className="bg-[#424769] z-2 px-8 py-10 rounded-lg flex z-0 flex-col justify-center items-center relative w-full lg:w-1/2">
            <Avatar
              alt="Foto de perfil"
              src={profilePic}
              sx={{ width: 200, height: 200 }}
              className="transition-transform duration-500 ease-in-out"
            />
            <button className="absolute top-10 right-6 mt-2 mr-2" onClick={handleOpen}>
              <LiaEdit className="w-10 text-white" />
            </button>
            <h3 className="text-2xl mt-4 text-center font-semibold text-white">
              {user.name} {user.lastName}
            </h3>
            <p className="text-white">{user.email}</p>
            {!editMode ? ( <button
              className="bg-[#F6B17A] border-[#2D3250] text-[#2D3250] border-2 p-2 rounded
              hover:bg-[#7077A1] hover:border-white hover:text-white hover:border-2 m-4"
              onClick={() => setEditMode(true)}
            >
              Editar Perfil
            </button>) :  <button
              className="bg-[#F6B17A] border-[#2D3250] text-[#2D3250] border-2 p-2 rounded
              m-4 opacity-50"
              onClick={() => setEditMode(true)}
            disabled >
              Editar Perfil
            </button>}
          </section>
          <section className="bg-[#424769] rounded-lg flex z-2 flex-col justify-center items-center gap-2 w-full lg:w-1/2">
            {editMode ? (
              <div className="flex flex-col w-[80%] gap-2 p-4">
                <img
                  src="/logo.png"
                  alt="logo"
                  className={`w-2/6 mx-auto transition-transform duration-1500 ease-in-out ${
                    editMode ? 'scale-80' : 'scale-100'
                  }`}
                />
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Nuevo Nombre"
                  className="p-1 rounded border text-white border-gray-300"
                />
                <input
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  placeholder="Nuevo Apellido"
                  className="p-1 rounded border text-white border-gray-300"
                />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="Nuevo Email"
                  className="p-1 rounded border text-white border-gray-300"
                />
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Contraseña Actual"
                  className="p-1 rounded border text-white border-gray-300"
                />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nueva Contraseña"
                  className="p-1 rounded border text-white border-gray-300"
                />
                {error && <p className="text-red-500">{error}</p>}
                <button
                  className="bg-[#F6B17A] border-[#2D3250] text-[#2D3250]
                  border-2 rounded p-0 m-0
                  hover:bg-[#7077A1] hover:border-white hover:text-white hover:border-2"
                  onClick={handleSaveChanges}
                >
                  Guardar cambios
                </button>
                <button
                  className="bg-[#F6B17A] border-[#2D3250] text-[#2D3250]
                  border-2 rounded mt-0
                  hover:bg-[#7077A1] hover:border-white hover:text-white hover:border-2"
                  onClick={() => setEditMode(false)}
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <img
                src="/logo.png"
                alt="logo"
                className={`w-full transition-transform duration-1500 ease-in-out ${
                  editMode ? 'scale-150' : 'scale-100'
                }`}
              />
            )}
          </section>
        </div>
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

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { LiaEdit } from 'react-icons/lia';
// import ProfileModal from '../components/ProfileModal';
// import { useSession } from '../../../hooks'; // Ajusta la ruta si es necesario

// const ProfilePage: React.FC = () => {
//   const { user, loading, createSession } = useSession();
//   const [open, setOpen] = useState(false);
//   const [editMode, setEditMode] = useState(false);
//   const [newName, setNewName] = useState(user?.name || '');
//   const [newLastName, setNewLastName] = useState(user?.lastName || '');
//   const [newProfilePic, setNewProfilePic] = useState(user?.profilePic || '');

//   useEffect(() => {
//     if (!loading && user) {
//       console.log('User loaded:', user); // Verifica que el usuario se carga correctamente
//       setNewName(user.name);
//       setNewLastName(user.lastName);
//       setNewProfilePic(user.profilePic || '');
//     }
//   }, [user, loading]);

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const handleProfilePicUpdate = (newUrl: string) => {
//     setNewProfilePic(newUrl);
//   };

//   const handleSaveChanges = async () => {
//     console.log('Saving changes with:', {
//       id: user?.id,
//       name: newName,
//       lastName: newLastName,
//       profilePic: newProfilePic,
//     }); // Verifica los datos que se envían a la API

//     if (!user?.id) {
//       console.error('User ID is not defined.');
//       return;
//     }

//     try {
//       const response = await axios.put(`/api/v1/user/${user.id}`, {
//         name: newName,
//         lastName: newLastName,
//         profilePic: newProfilePic,
//       });
//       console.log('Update response:', response.data); // Verifica la respuesta de la API
//       createSession(response.data);
//       setEditMode(false);
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <main className="min-h-screen bg-bg flex justify-center items-center">
//       <div className="flex flex-col justify-center items-center gap-12">
//         <h1 className="self-start text-3xl font-bold">Mi perfil</h1>
//         <div className="flex gap-10 text-white">
//           <section className="bg-policeBlue px-20 py-14 rounded-lg flex flex-col justify-center items-center relative">
//             <img
//               src={newProfilePic || 'https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg'}
//               alt="Perfil"
//               className="w-40"
//             />
//             <button className="absolute top-0 right-0 mt-16 mr-16" onClick={handleOpen}>
//               <LiaEdit className="w-7 text-white" />
//             </button>
//             <h3 className="text-3xl mt-20">{newName} {newLastName}</h3>
//             <p>{user?.email}</p>
//           </section>

//           <section className="bg-policeBlue px-12 py-14 pr-32 rounded-lg flex flex-col gap-6 relative">
//             <h2 className="text-3xl font-semibold">Detalles de perfil</h2>

//             {editMode ? (
//               <div className="flex flex-col gap-4">
//                 <input
//                   type="text"
//                   value={newName}
//                   onChange={(e) => setNewName(e.target.value)}
//                   placeholder="Nombre"
//                   className="p-2 rounded border"
//                 />
//                 <input
//                   type="text"
//                   value={newLastName}
//                   onChange={(e) => setNewLastName(e.target.value)}
//                   placeholder="Apellido"
//                   className="p-2 rounded border"
//                 />
//                 <button className="bg-green-500 text-white p-2 rounded" onClick={handleSaveChanges}>
//                   Guardar cambios
//                 </button>
//                 <button className="bg-red-500 text-white p-2 rounded" onClick={() => setEditMode(false)}>
//                   Cancelar
//                 </button>
//               </div>
//             ) : (
//               <button className="bg-blue-500 text-white p-2 rounded" onClick={() => setEditMode(true)}>
//                 Editar perfil
//               </button>
//             )}
//           </section>
//         </div>
//         <ProfileModal
//           open={open}
//           onClose={handleClose}
//           currentProfilePic={newProfilePic}
//           onProfilePicUpdate={handleProfilePicUpdate}
//         />
//       </div>
//     </main>
//   );
// };

// export default ProfilePage;
