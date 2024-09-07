import { Alert, Box, Button, Container, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { INPUTS_FORM_UPD, MODEL_STATUS, MODEL_TYPE } from "../libs/utils"
import { useForm } from "react-hook-form"
import { Case, getCase, updateCase } from "../libs/caseActions"

interface AlertState {
  message: string;
  tipe: 'success' | 'error';
}
export const UpdateCase = ({setUpdateModal}:{setUpdateModal: Dispatch<SetStateAction<boolean>>}) => {
 
 
    const {register, handleSubmit, reset } = useForm<Case>({
      defaultValues: {
        caseName: '',
        jury:       '',
        caseNumber: '',
        applicant:  '',
        respondent: '',
        type:       '' ,
        status:     'CLOSED',
      }
    })
    const [alert, setAlert] = useState<AlertState>({message: '', tipe: 'error' })
    const [show, setShow] = useState(false)
 
       const id = '66db5fc124b09a44d6c1f6a7'

  useEffect (()=>{
    const fetchData = async () =>{
      try {
        const caseData = await getCase(id)
        if(caseData){
          reset({
            caseName: caseData.caseName,
            jury:       caseData.jury,
            caseNumber: caseData.caseNumber,
            applicant:  caseData.applicant,
            respondent: caseData.respondent,
            type:      caseData.type ,
            status:     caseData.status , // TO DO añadir  valor por defecto        
         
          })
          console.log('update data: ', caseData )
        }
      } catch (error) {
      //  setShow(true)
     //   setAlert({...alert, message: "Error al cargar los datos", tipe: 'error' })
        console.error(error)
     //   console.log(alert)
      }
    }
    fetchData()
  }, [id, reset])


    useEffect(() => {
      const timeId = setTimeout(() => {
        
        setShow(false)
      }, 3000)
  
      return () => clearTimeout(timeId)
    }, [alert]);

   

    const onSubmit =  handleSubmit( async(data) =>{
        console.log(data)
       
       

           const res = await updateCase(data, id);
     
           if (!res?.ok) {
            setAlert({...alert, message: "No se pudo actualizar el caso", tipe: 'error' })
             setShow(true)
             console.log('hola hola',alert)
           
             throw new Error('No se pudo actualizarrr el caso');
           
           } else {
            setAlert({...alert, message: "El caso fue actualizado", tipe: 'success' })
             setShow(true)
             reset()
           }


    })

    return (
    <Container maxWidth="md" sx={{ backgroundColor: '#424769', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
   
   <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', my: 3}}> 
          <IoMdCloseCircleOutline className='hover:text-red-600 h-8 w-8 text-white' onClick={()=>setUpdateModal(false)}  />
      </Box>
          <Typography variant="h3" component="h3" sx={{color: 'white'}}>
        Actualizar datos del Caso
        </Typography>


        <form  onSubmit={onSubmit}>
        {
          
            INPUTS_FORM_UPD.map((item) =>(

                <TextField
                label={item.label}
                variant="outlined"
                {...register(item.name)}  
                fullWidth
                margin="normal"     
               defaultValue=''
               InputLabelProps={{ shrink: true }} 
                key={item.name}
                type='string'
                  
                sx={{
                  backgroundColor: 'white', 
                  color: 'black',
                }}
                required
              />
            ))
        }

    <div className="flex gap-6 justify-between">
    <div className=" w-full">
    <InputLabel id="demo">Tipo</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo"
         //id="demo"
         defaultValue= ''
         {...register('type')} 
          label="Tipo *"
          required
        >
          {
              
            MODEL_TYPE.options.map((item)=>(
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))
          }
        </Select>
        </div>
      
      { //  <FormControl required sx={{ my:1,  minWidth: '45%'}}>  
       }
       <div className=" w-full">
        <InputLabel id="demo-simple-select-required-label" >Estado</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black'}}
        labelId="demo-simple-select-required-label"
        // id="demo-simple-select-required-label"
          defaultValue=''
           {...register('status', {required: true})} 
          label="Estado *"
      
        >
          {
            MODEL_STATUS.options.map((item)=>(
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))
          }
          
             {/*      <MenuItem value='INITIATED' >Iniciado</MenuItem>
                   <MenuItem value='EVIDENCE' >Evidencia</MenuItem>
                   <MenuItem value='JUDGMENT' >Juicio</MenuItem>
                   <MenuItem value='CLOSED' >Cerrado</MenuItem> */ }
                   
        </Select>
        </div>
      { //  </FormControl> 
      }
    </div>
       
        <Button sx={{my: 3}} type="submit" variant="contained" color="primary" fullWidth >
        Actualizar
        </Button>   
      </form>
      {
      alert && show &&
      <Alert severity={alert.tipe} >{alert.message}</Alert>

      }

    </Container>
  )
}
