
import {Typography, Box, Button, Container, TextField, Select, MenuItem, InputLabel, FormControl, Alert} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from "react-icons/io";


export const NewCase = ({setOpenModal}:{setOpenModal: Dispatch<SetStateAction<boolean>>}) =>  {

  const {register, handleSubmit } = useForm()
  const [error, setError] = useState<null | string>(null)
  

  const MODEL_TYPE = {
    options:[
      { label: 'Sucesión', value: 'SUCCESSION' },
      { label: 'Ejecución', value: 'EXECUTION' },
      { label: 'Terminación', value: 'TERMINATION' },
      { label: 'Daños y pérdidas', value: 'DAMAGES_AND_LOSSES' },
      { label: 'Constrato de disputa', value: 'CONTRACT_DISPUTE' },
      { label: 'Criminal', value: 'CRIMINAL' },
      { label: 'Propiedad y disputa', value: 'PROPERTY_DISPUTE' },
      { label: 'Lesiones personales', value: 'PERSONAL_INJURY' },
      { label: 'Propiedad intelectual', value: 'INTELLECTUAL_PROPERTY' },
    ]
  } as const

  const INPUTS_FORM = 
        [
        {label: "Nombre del caso", name: 'caseName' },
        {label: "Jurado", name: 'jury' },
        {label: "Numero del caso", name: 'caseNumber' },
        {label: "Solicitante", name: 'applicant' },
        {label: "Demandado", name: 'respondent' }
            ] as const


 const onSubmit =  handleSubmit( async(data) =>{ // TO-DO: validar y procesar  los datos del caso 
  
  data.userId = '66d3b52c06804da30eb2c9c6'
  data.status = 'INITIATED'
  console.log(data)
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2ZDNiNTJjMDY4MDRkYTMwZWIyYzljNiIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTcyNTQwMjA0NCwiZXhwIjoxNzI1NDAyOTQ0fQ.mVK46exsB3GmMGe_SXP0Bv3Wl44Eccl1Z2ID4nJtxjA'

  try {
  const res = await fetch(`https://s17-09-n-node-react.onrender.com/api/v1/cases`, {  //TO-DO: cambair link
    method: "POST",
    headers: { "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
     },
    body: JSON.stringify(data),
  });
 
  console.log(res)
  if(!res.ok){
    console.log('No se pudo crear el caso')  // TO-DO: Cambair por las notificaciones
    setError('No se pudo crear el caso')
  } else {
    console.log('El nuevo caso fue creado')
  }
 } catch (error) {
  console.error('Error del server: ', error)
 
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
                <TextField
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
  <FormControl required sx={{ my:1,  minWidth: '100%'}}>
        <InputLabel id="demo-simple-select-required-label">Tipo</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
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
        </FormControl>
   
        <Button sx={{my: 3}} type="submit" variant="contained" color="primary" fullWidth >
        Crear
          </Button>
      </form>
      {error &&
      <Alert severity="error" >{error}</Alert>
      }
      
    </Container>

  
  )
}

