import { Outlet } from 'react-router-dom'

import { useAuth } from '../hooks'
import { Loading } from '../components'

const Layout = () => {
  const { status } = useAuth()

  if (status === 'loading') return <Loading />

  return (
    <>
      <header className='fixed bg-red-600 w-full text-center'>navbar</header>
      <Outlet />
      <footer className='bg-red-600 w-full text-center'>footer</footer>
    </>
  )
}

export default Layout
