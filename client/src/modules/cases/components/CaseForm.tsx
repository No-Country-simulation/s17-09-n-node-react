import { Alert, Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { IoMdCloseCircleOutline } from 'react-icons/io'
import { MODEL_TYPE } from '../libs/utils'
import { Case, newCase } from '../libs/caseActions'

export const CaseForm = ({setOpenModal}:{setOpenModal: Dispatch<SetStateAction<boolean>>}) => {

    const {register, handleSubmit, reset } = useForm<Case>()
    const [alert, serAlert] = useState<null | string>(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
      const timeId = setTimeout(() => {
        
        setShow(false)
      }, 3000)
  
      return () => clearTimeout(timeId)
    }, [alert]);



    const INPUTS_FORM: { label: string; name: keyof Case }[] = 
        [
        {label: "Nombre del caso", name: 'caseName' },
        {label: "Jurado", name: 'jury' },
        {label: "Numero del caso", name: 'caseNumber' },
        {label: "Solicitante", name: 'applicant' },
        {label: "Demandado", name: 'respondent' }
            ] as const
   
    const onSubmit =  handleSubmit( async(data) => {
        //console.log("data del form ", data)
        console.log('hola hook')
         data.userId = '66d3b52c06804da30eb2c9c6'
         data.status = 'INITIATED'
    
      
            const res = await newCase(data);
            console.log('hola hook 2', alert, 'la res', res)
            if (!res?.ok) {
              serAlert("No pudo crear el caso")
              setShow(true)
              console.log('hola hola',alert)
            
              throw new Error('No se pudo crear el caso');
            
            } else {
              serAlert("Nuevo caso creado")
              setShow(true)
              reset()
            }
    })
  /*  console.log(res)
    if(!res.ok){
      console.log('No se pudo crear el caso')  // TO-DO: Cambair por las notificaciones
     
    } else {
      console.log('El nuevo caso fue creado')
    }
   } catch (error) {
    console.error('Error del server: ', error)*/
        
  return (
    <Container maxWidth="md" sx={{ backgroundColor: '#424769', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
   
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', my: 3}}> 
          <IoMdCloseCircleOutline className='hover:text-red-600 h-8 w-8 text-white' onClick={()=>setOpenModal(false)}  />
      </Box>
          <Typography variant="h3" component="h3" sx={{color: 'white'}}>
              Formulario
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
      {/*error && show &&
      <Alert severity="error" >{error}</Alert>*/
      alert && show &&
      <Alert severity="error" >{"Error de caso"}</Alert>

      }
      
    </Container>
  )
}
