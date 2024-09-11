import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { INPUTS_FORM_UPD, MODEL_STATUS, MODEL_TYPE } from "../libs/utils"
import { useForm } from "react-hook-form"
import { Case, getCase, typeStatus, typeTipo, updateCase } from "../libs/caseActions"
import caseService from "../services/cases.service"
interface AlertState {
  message: string;
  tipe: 'success' | 'error';
}
export const UpdateCase = ({setUpdateModal, id}:{setUpdateModal: Dispatch<SetStateAction<boolean>>, id:string}) => {
 
 
    const {register, handleSubmit, reset } = useForm<Case>({
      defaultValues: {
        caseName: '',
        jury:       '',
        caseNumber: '',
        applicant:  '',
        respondent: '',
        type:       'SUCCESSION' ,
        status:     'INITIATED',
      }
    })
    const [alert, setAlert] = useState<AlertState>({message: '', tipe: 'error' })
    const [show, setShow] = useState(false)
    const [dataForm, setDataForm] = useState<Case>({
        userId: '',
        caseName: '',
        jury:       '',
        caseNumber: '',
        applicant:  '',
        respondent: '',
        type:       'SUCCESSION' ,
        status:     'INITIATED',
      
    })
  id='66de70c1b40072153d42795d'

  useEffect (()=>{
   
    const fetchData = async () =>{
      try {
        const axioData = await caseService.getCasesList()
        console.log("llamada axios:", axioData)
        console.log(import.meta.env.VITE_API_URL)
        const caseData: Case = await getCase(id)
        if(!caseData.applicant){
          setAlert({...alert, message: "No se pudo obtener los datos", tipe: 'error' })
          setShow(true)
        }
        
        if(caseData){
       //   console.log('data data: ', caseData )
          setDataForm(caseData)
          reset({
            caseName: caseData.caseName,
            jury:       caseData.jury,
            caseNumber: caseData.caseNumber,
            applicant:  caseData.applicant,
            respondent: caseData.respondent,
            type:      caseData.type ,
            status:     caseData.status , // TO DO añadir  valor por defecto        
         
          })
          console.log('data nuevo estado: ', dataForm )
        }
      } catch (error) {
        
          console.error('hubo un: ', error)

      }
    }
    fetchData()
  }, [])



    useEffect(() => {
      const timeId = setTimeout(() => {
        
        setShow(false)
      }, 3000)
  
      return () => clearTimeout(timeId)
    }, [alert]);

   

    const onSubmit =  handleSubmit( async(data) =>{
        console.log('form acutalizar: ', data)

           const res = await updateCase(data, id);
     
           if (!res?.ok) {
            setAlert({...alert, message: "No se pudo actualizar el caso", tipe: 'error' })
             setShow(true)
             console.log('hola hola',alert)
           
             throw new Error('No se pudo actualizarrr el caso');
           
           } else {
           // reset()
            setAlert({...alert, message: "El caso fue actualizado", tipe: 'success' })
             setShow(true)
             
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
    <FormControl required sx={{ my:1,  minWidth: '45%'}}>
    <InputLabel id="demo">Tipo</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo"
         id="demo"
        
         {...register('type')} 
          value={dataForm?.type || ''}
          label="Tipo *"
          onChange={(event) => {
    
               setDataForm({ ...dataForm, type: event.target.value as typeTipo });
           
        }}

        >
          {
              
            MODEL_TYPE.options.map((item)=>(
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))
          }
        </Select>
        </FormControl>
      
        <FormControl required sx={{ my:1,  minWidth: '45%'}}>  
       
        <InputLabel id="select-estado" >Estado</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black'}}
        labelId="select-estado"
 
          defaultValue={dataForm?.status}
           {...register('status', {required: true})} 
           value={dataForm?.status || ''}
    
          label="Estado *"
          onChange={(event) => {
            setDataForm({ ...dataForm, status: event.target.value as typeStatus });  
     }}
      
        >
          {
            MODEL_STATUS.options.map((item)=>(
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))
          }
      
        </Select>
        </FormControl> 
      
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
