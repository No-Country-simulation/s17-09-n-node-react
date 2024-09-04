import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction } from "react"
import { IoMdCloseCircleOutline } from "react-icons/io"
import { INPUTS_FORM, MODEL_STATUS, MODEL_TYPE } from "../libs/utils"
import { useForm } from "react-hook-form"


export const UpdateCase = ({setUpdateModal}:{setUpdateModal: Dispatch<SetStateAction<boolean>>}) => {
 
    const {register, handleSubmit } = useForm()
 

    const onSubmit =  handleSubmit( async(data) =>{
        console.log(data)
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
            INPUTS_FORM.map((item) =>(
                <TextField
                label={item.label}
                variant="outlined"
                fullWidth
                margin="normal"     
                defaultValue={item.defaultVal}
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

    <div className="flex gap-2 justify-between">
    <FormControl required sx={{ my:1,  minWidth: '45%'}}>
    <InputLabel id="demo">Tipo</InputLabel>
        <Select sx={{minWidth: '45%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo"
         // id="demo-simple-select-required"
         defaultValue={'TERMINATION'}
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
        <FormControl required sx={{ my:1,  minWidth: '45%'}}>
        <InputLabel id="demo-simple-select-required-label">Estado</InputLabel>
        <Select sx={{minWidth: '45%',  backgroundColor: 'white',  color: 'black',}}
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-requiredd"
          defaultValue={'INITIATED'}
         {...register('status')} 
          label="Estado *"
          required
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

    </Container>
  )
}
