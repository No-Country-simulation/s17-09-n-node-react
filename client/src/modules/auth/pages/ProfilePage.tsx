import { useEffect, useState } from 'react';
import axios from 'axios';
import { LiaEdit } from 'react-icons/lia';
import ProfileModal from '../components/ProfileModal';
import { useSession } from '../../../hooks'; // Ajusta la ruta si es necesario

const ProfilePage: React.FC = () => {
  const { user, loading, createSession } = useSession();
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(user?.name || '');
  const [newLastName, setNewLastName] = useState(user?.lastName || '');
  const [newProfilePic, setNewProfilePic] = useState(user?.profilePic || '');

  useEffect(() => {
    if (!loading && user) {
      console.log('User loaded:', user); // Verifica que el usuario se carga correctamente
      setNewName(user.name);
      setNewLastName(user.lastName);
      setNewProfilePic(user.profilePic || '');
    }
  }, [user, loading]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleProfilePicUpdate = (newUrl: string) => {
    setNewProfilePic(newUrl);
  };

  const handleSaveChanges = async () => {
    console.log('Saving changes with:', {
      id: user?.id,
      name: newName,
      lastName: newLastName,
      profilePic: newProfilePic,
    }); // Verifica los datos que se envían a la API

    if (!user?.id) {
      console.error('User ID is not defined.');
      return;
    }

    try {
      const response = await axios.put(`/api/v1/user/${user.id}`, {
        name: newName,
        lastName: newLastName,
        profilePic: newProfilePic,
      });
      console.log('Update response:', response.data); // Verifica la respuesta de la API
      createSession(response.data);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className="min-h-screen bg-bg flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="self-start text-3xl font-bold">Mi perfil</h1>
        <div className="flex gap-10 text-white">
          <section className="bg-policeBlue px-20 py-14 rounded-lg flex flex-col justify-center items-center relative">
            <img
              src={newProfilePic || 'https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg'}
              alt="Perfil"
              className="w-40"
            />
            <button className="absolute top-0 right-0 mt-16 mr-16" onClick={handleOpen}>
              <LiaEdit className="w-7 text-white" />
            </button>
            <h3 className="text-3xl mt-20">{newName} {newLastName}</h3>
            <p>{user?.email}</p>
          </section>

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
        <ProfileModal
          open={open}
          onClose={handleClose}
          currentProfilePic={newProfilePic}
          onProfilePicUpdate={handleProfilePicUpdate}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
