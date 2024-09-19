import { Outlet } from 'react-router-dom'

import { NavBar, Footer } from '../components'

export default function Layout() {
  return (
    <>
      <header className='fixed bg-policeBlue w-full z-10'>
        <NavBar />
      </header>
      <Outlet />
      <Footer />
    </>
  )
}
