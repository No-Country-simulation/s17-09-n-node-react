
import {Typography, Box, Button, Container, TextField, Select, MenuItem, InputLabel, FormControl, Alert, styled} from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { INPUTS_FORM, MODEL_TYPE } from '../libs/utils';
import caseService, { Case } from "../services/cases.service"

interface AlertState {
  message: string;
  tipe: 'success' | 'error' | 'info';
}

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInputLabel-shrink': {
    backgroundColor: '#424769', 
    padding: '0 5px',    
    color: 'white',      
  }
});
const CustomFormControl = styled(FormControl)({
  '& label.Mui-focused': {
    color: 'white', 
  },
  '& .MuiInputLabel-shrink': {
    backgroundColor: '#424769', 
    padding: '0 5px',       
    color: 'white',           
  }
});

export const NewCase = ({setOpenModal}:{setOpenModal: Dispatch<SetStateAction<boolean>>}) =>  {

  const {register, handleSubmit, reset } = useForm<Case>()
  const [alert, setAlert] = useState<AlertState>({message: '', tipe: 'info' })
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeId = setTimeout(() => {
      
      setShow(false)
    }, 3000)
    return () => clearTimeout(timeId)
  }, [alert]);



const onSubmit =  handleSubmit( async(data) => {
 
   data.status = 'INITIATED'
      const axioData = await caseService.createCase(data)

      const res = axioData
      console.log( 'la res', res)
      if (res.status !== 201) {
        setAlert({...alert, message: "No se pudo crear el caso", tipe: 'error' })
        setShow(true)
        throw new Error('No se pudo crear el caso');
      
    } else {
      setAlert({...alert, message: "El caso fue creado", tipe: 'success' })
      setShow(true)
      reset()
    }
})


  return (

    <Container maxWidth="md" sx={{ backgroundColor: '#424769', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
   
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', my: 3}}> 
          <IoMdCloseCircleOutline className='hover:text-red-600 h-8 w-8 text-white' onClick={()=>setOpenModal(false)}  />
      </Box>
          <Typography variant="h3" component="h3" sx={{color: 'white'}}>
        Datos del Caso
        </Typography>
      <form onSubmit={onSubmit}>
        {
            INPUTS_FORM.map((item) =>(
                <CustomTextField
                label={item.label}
                variant="outlined"
                fullWidth
                margin="normal"     
                key={item.name}
                type='string'
                {...register(item.name)}     
                sx={{
                  backgroundColor: 'white', 
                  color: 'black',
                }}
                required
              />
            ))
        }
 <CustomFormControl  required      sx={{ my:2,  minWidth: '100%'}}> 
        <InputLabel id="demo-simple">Tipo</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black',}}
         
          labelId="demo-simple"
          id="demo-simple-select-required"
          defaultValue=''
         {...register('type', {required: true})} 
         label="Tipo *"
     
        >
          {
            MODEL_TYPE.options.map((item)=>(
              <MenuItem value={item.value} key={item.value}>{item.label}</MenuItem>
            ))
          }
        </Select>
        </CustomFormControl>

        <Button sx={{my: 2}} color="secondary" type="submit" variant="contained"  fullWidth >
        Crear
          </Button>
      </form>
      {
      alert && show &&
      <Alert severity={alert.tipe} >{alert.message}</Alert>
      }
    </Container>

  
  )
}

