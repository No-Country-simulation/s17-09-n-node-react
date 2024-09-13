import Calendar from '../components/ui/Calendar'

const Home = () => {
  return (
    <div className='bg-bg flex justify-center items-center min-h-screen'>
      <div className='bg-policeBlue flex flex-col gap-8 items-center justify-center w-5/6 h-full px-2 py-8 mt-[85px] rounded-lg max-w-[1000px]'>
        <div>
          <h1 className='self-start text-2xl font-bold mb-2'>
            Tareas para hoy
          </h1>
          <Calendar />
        </div>
      </div>
    </div>
  )
}

export default Home
