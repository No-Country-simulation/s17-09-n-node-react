import { useState } from 'react'
import { NewCase } from '../components/NewCase'
import { Modal } from '../../../components/Modal'
import { UpdateCase } from '../components/UpdateCase';
//import { CaseForm } from '../components/CaseForm';


export const Cases = () => {
    const [openNewCase, setOpenNewCase] = useState<boolean>(false);
    const [updateCase, setUpdateCase] = useState<boolean>(false);

    const id = '66de70c1b40072153d42795d'

  return (
    <div>
        <h1>Página para vista de casos</h1>
      

        <div className='flex justify-center mt-56'>
        <button onClick={()=>{setOpenNewCase(true)}} className='border-solid border-2 bg-blue-500 '>Nuevo caso</button>
        <button onClick={()=>{setUpdateCase(true)}}  className='border-solid border-2 bg-green-500 '>Actualizar</button> 
        </div>
       
{ openNewCase && (
    <div>
         <div
            className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "
            onClick={() => setOpenNewCase(false)}
          />
        <Modal>
        <NewCase setOpenModal={setOpenNewCase}/>
        </Modal>
      
    </div>
)}

{ updateCase && (
  <div>
   <div
   className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30 "
   onClick={() => setUpdateCase(false)}
 />
    <Modal>
    <UpdateCase setUpdateModal={setUpdateCase} id={id} />
  </Modal>
  </div>
  
)}
 
    </div>
  )
  
}


