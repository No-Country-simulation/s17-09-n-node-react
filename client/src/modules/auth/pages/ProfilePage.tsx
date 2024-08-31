import { LiaEdit } from "react-icons/lia";

const ProfilePage: React.FC = () => {
  return (
    <main className="min-h-screen bg-bg flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-12">
        <h1 className="self-start text-3xl font-bold">Mi perfil</h1>
        <div className="flex gap-10">
          <section className="bg-policeBlue px-20 py-14 rounded-lg flex flex-col justify-center items-center">
            <img
              src="https://aui.atlassian.com/aui/8.8/docs/images/avatar-person.svg"
              alt=""
              className="w-40"
            />
            <h3 className="text-3xl">Clara Gomez</h3>
            <p>C.Gomez@gmail.com</p>
          </section>
          <section className="bg-policeBlue px-12 py-14 pr-32 rounded-lg flex flex-col gap-6 relative">
          <button className="absolute top-0 right-0 mt-6 mr-6"><LiaEdit className="w-7"/></button>
            <h2 className="text-3xl font-semibold">Detalles de perfil</h2>
            <div className="flex gap-10">
              <div className="flex flex-col gap-2">
                <span className="font-semibold">Apellido</span>
                <span className="font-semibold">Nombre</span>
                <span className="font-semibold">Email</span>
              </div>
              <div className="flex flex-col gap-2">
                <span>Gomez</span>
                <span>Clara</span>
                <span>C.Gomez@gmail.com</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
