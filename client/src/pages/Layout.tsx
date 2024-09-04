import { Outlet } from "react-router-dom"


const Layout = () => {
  return (
    <>
      <header className="fixed bg-red-600 w-full text-center">
        navbar
      </header>
      <Outlet />
      <footer className="bg-red-600 w-full text-center">
        footer
      </footer>
    </>
  )
}

export default Layout
