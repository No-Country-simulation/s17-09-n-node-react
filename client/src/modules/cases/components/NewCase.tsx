
import {Typography, Box, Button, Container, TextField, Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from "react-icons/io";

//import {useThemeSwitcher} from '../../../hooks/useThemeSwitcher'


export const NewCase = ({setOpenModal}:{setOpenModal: Dispatch<SetStateAction<boolean>>}) =>  {

  const {register, handleSubmit } = useForm()

 const onSubmit =  handleSubmit( async(data) =>{ // TO-DO: validar y procesar  los datos del caso 
  console.log(data)
 try {
  const res = await fetch('/cases', {  //TO-DO: cambair link
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(res)
  if(!res.ok){
    console.log('No se pudo crear el caso')  // TO-DO: Cambair por las notificaciones
  } else {
    console.log('El nuevo caso fue creado')
  }
 } catch (error) {
  console.error('Error del server: ', error)
 }
   
 })


  return (

    <Container maxWidth="md" sx={{ backgroundColor: '#9f7cbc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
       {// TO-DO: Establecer el tema para el background
   } 
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', my: 3}}> 
          <IoMdCloseCircleOutline className='hover:text-red-600 h-8 w-8 text-white' onClick={()=>setOpenModal(false)}  />
      </Box>
          <Typography variant="h3" component="h3">
        Datos del Caso
        </Typography>
      <form onSubmit={onSubmit}>
      <TextField
            label="Nombre del caso"
            variant="outlined"
            fullWidth
            margin="normal"     
            {...register('name')}     
            sx={{
              backgroundColor: 'white', 
              color: 'black',
            }}
            required
          />
          <TextField
            label="Jurado"
            variant="outlined"
            fullWidth
            margin="normal" 
            {...register('jury')}     
            sx={{
              backgroundColor: 'white', 
              color: 'black',
            }}     
            required
          />
          <TextField
            label="Número de caso"
            variant="outlined"
            fullWidth
            margin="normal" 
            {...register('caseNumber')}   
            sx={{
              backgroundColor: 'white', 
              color: 'black',
            }}       
            required
          />
          <TextField
            label="Solicitante"
            variant="outlined"
            fullWidth
            margin="normal"  
            {...register('applicant')}  
            sx={{
              backgroundColor: 'white', 
              color: 'black',
            }}       
            required
          />
          <TextField
            label="Demandado"
            variant="outlined"
            fullWidth
            margin="normal"   
            {...register('respondent')}   
            sx={{
              backgroundColor: 'white', 
              color: 'black',
            }}     
            required
          />

  <FormControl required sx={{ my:1,  minWidth: '100%'}}>
        <InputLabel id="demo-simple-select-required-label">Age</InputLabel>
        <Select sx={{minWidth: '100%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
         // value={age}
         {...register('type')} 
           
          label="Age *"
       //   onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
        </FormControl>
   
        <Button sx={{my: 3}} type="submit" variant="contained" color="primary" fullWidth >
        Crear
          </Button>
      </form>
      
    </Container>

  
  )
}

