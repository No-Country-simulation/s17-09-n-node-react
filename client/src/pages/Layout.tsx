import { Outlet } from 'react-router-dom'

import { useAuth } from '../hooks'
import { Loading, NavBar } from '../components'

const Layout = () => {
  const { status } = useAuth()

  if (status === 'loading') return <Loading />

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

export default Layout
