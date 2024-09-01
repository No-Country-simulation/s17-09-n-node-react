
import {Typography, Box, OutlinedInput, Button, Container, TextField, Select, MenuItem, InputLabel} from '@mui/material'
import { useForm } from 'react-hook-form';
import { IoMdCloseCircleOutline } from "react-icons/io";


export const NewCase = () =>  {

  const {register, handleSubmit } = useForm()

 const onSubmit =  handleSubmit( async(data) =>{ // TO-DO: validar y procesar  los datos del caso 
   
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
   
    // TO-DO: Establecer el tema para el background
    <Container maxWidth="md" sx={{ backgroundColor: '#9f7cbc', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', my: 3}}> 
          <IoMdCloseCircleOutline style={{ width: '2rem', height: '2rem', color: 'white'}}/>
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

<InputLabel id="demo-simple-select-helper-label">Tipo</InputLabel>
        <Select style={{width: '100%' }}
          label="Tipo"
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
  
          input={<OutlinedInput label="Name" />}
          {...register('type')} 
          sx={{
            backgroundColor: 'white', 
            color: 'black',
          }}
          required
        >
          <MenuItem value="">   // TO-DO cambiar por los tipos correctos 
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Tipo 1</MenuItem>
          <MenuItem value={20}>Tipo 2</MenuItem>
          <MenuItem value={30}>Tipo 3</MenuItem>
        </Select>
        
        <Button sx={{my: 3}} type="submit" variant="contained" color="primary" fullWidth >
        Crear
          </Button>
      </form>

      
    </Container>
  
  )
}

