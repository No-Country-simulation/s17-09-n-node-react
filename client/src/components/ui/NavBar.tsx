import { useState } from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'
import { Avatar, Menu, MenuItem } from '@mui/material'
import ListItemIcon from '@mui/material/ListItemIcon'
import HomeIcon from '@mui/icons-material/Home'
//import ContactsIcon from '@mui/icons-material/Contacts'
import WorkIcon from '@mui/icons-material/Work'
import MenuIcon from '@mui/icons-material/Menu'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { startLogout } = useAuth()

  // // Obtener la información del usuario autenticado

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen)
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const DrawerList = (
    <Box
      role='presentation'
      onClick={toggleDrawer(false)}
      className='bg-bg h-full text-white p-12'
    >
      <List>
        {[
          {
            title: 'Inicio',
            icon: <HomeIcon className='text-inherit' />,
            path: '/',
          },
          {
            title: 'Casos',
            icon: <WorkIcon className='text-inherit' />,
            path: '/cases',
          },
          /*           {
            title: 'Contactos',
            icon: <ContactsIcon className='text-inherit' />,
            path: '/contacts',
          }, */
        ].map((item, index) => (
          <ListItem key={index}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center ${isActive ? 'text-mellowApricot' : 'text-white'}`
              }
            >
              <ListItemIcon className='!text-inherit'>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const Mobile = () => (
    <>
      <button onClick={toggleDrawer(true)} title='OpenDrawer'>
        <MenuIcon className='text-white' />
      </button>
      <NavLink to={'/'} className='flex'>
        <img src='/logo.png' alt='' className='w-20 sm:w-24' />
      </NavLink>
      <Drawer anchor='left' open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </>
  )

  const Desktop = () => (
    <div className='flex items-center lg:gap-20 md:gap-12'>
      <NavLink to={'/'} className='flex'>
        <img src='/logo.png' alt='' className='w-24' />
      </NavLink>
      <div>
        <ul className='flex gap-10 lg:gap-12'>
          {[
            {
              title: 'Inicio',
              icon: <HomeIcon />,
              path: '/home',
            },
            {
              title: 'Casos',
              icon: <WorkIcon />,
              path: '/cases',
            },
            /*             {
              title: 'Contactos',
              icon: <ContactsIcon />,
              path: '/contacts',
            }, */
          ].map((item, index) => (
            <li key={index} className='!w-none'>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center hover:scale-125 transition-all duration-100 ${
                    isActive ? 'text-mellowApricot' : 'text-white'
                  }`
                }
              >
                <ListItemIcon className='!text-inherit !min-w-0 mr-2'>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  const AvatarMenu = () => (
    <Menu
      id='menu-appbar'
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={Boolean(anchorEl)}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#7077A1',
            color: '#fff',
            borderRadius: '0.375rem',
            marginTop: '.375rem',
            width: '8rem',
            boxShadow: '0px 4px 6px rgba(0,0,0,0.1)',
          },
        },
      }}
    >
      <MenuItem
        component={NavLink}
        to='/profile'
        onClick={handleClose}
        color='inherit'
        className='hover:!bg-policeBlue hover:!text-mellowApricot'
      >
        Mi perfil
      </MenuItem>
      <MenuItem
        onClick={startLogout}
        color='inherit'
        className='hover:!text-red-600 hover:!bg-policeBlue'
      >
        Cerrar sesión
      </MenuItem>
    </Menu>
  )

  return (
    <nav className='h-[85px] w-full flex items-center justify-between px-6 sm:px-12 lg:px-16'>
      {isMobile ? <Mobile /> : <Desktop />}
      <div>
        <button onClick={handleMenu}>
          {/* Muestra la imagen del usuario autenticado o un perfil por defecto */}

          <Avatar src={user ? user.imageUrl : '/profile.png'} />
        </button>
        {<AvatarMenu />}
      </div>
    </nav>
  )
}
