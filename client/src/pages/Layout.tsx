import { Outlet } from 'react-router-dom'
import NavBar from '../components/ui/NavBar'
import { NavBar } from '../components'

export default function Layout() {
  return (
    <>
      <header className='fixed bg-policeBlue w-full'>
        <NavBar />
      </header>
      <Outlet />
      <footer className='bg-red-600 w-full text-center'>footer</footer>
    </>
  )
}
