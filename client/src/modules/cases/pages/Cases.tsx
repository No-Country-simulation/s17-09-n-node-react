import { useState } from 'react'
import { NewCase } from '../components/NewCase'
import { Modal } from '../../../components/Modal'
import { UpdateCase } from '../components/UpdateCase';
//import { CaseForm } from '../components/CaseForm';


export const Cases = () => {
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [updateModal, setUpdateModal] = useState<boolean>(false);


  return (
    <div>
        <h1>Página para vista de casos</h1>
      

        <div className='flex justify-center'>
        <button onClick={()=>{setOpenModal(true)}} className='border-solid border-2 bg-blue-500 '>Nuevo caso</button>
        <button onClick={()=>{setUpdateModal(true)}}  className='border-solid border-2 bg-green-500 '>Actualizar</button> 
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
)}

{ updateModal && (
  <div>
   <div
   className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "
   onClick={() => setUpdateModal(false)}
 />
    <Modal>
    <UpdateCase setUpdateModal={setUpdateModal}  />
  </Modal>
  </div>
  
)}
 
    </div>
  )
  
}


