import { useState } from 'react'
import { NewCase } from '../components/NewCase'
import { Modal } from '../../../components/Modal'


export const Cases = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <div>
        <h1>Página para vista de casos</h1>

        <div className='flex justify-center'>
        <button onClick={()=>{setOpenModal(true)}} className='border-solid border-2 bg-blue-200 '>Nuevo caso</button>
        <button  className='border-solid border-2 bg-green-200 '>Actualizar</button>
        </div>
       
{ openModal && (
    <div>
         <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "
            onClick={() => setOpenModal(false)}
          />
        <Modal>
        <NewCase setOpenModal={setOpenModal}/>
        </Modal>
    </div>
)

}
       
    </div>
  )
}


