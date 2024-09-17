import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SocialMediaSection from './SocialMediaSection'
import { Footer } from '../components'

// Componente para el carrusel de testimonios
const TestimonialCarousel: React.FC = () => {
  const testimonials = [
    {
      name: 'Juan Pérez',
      quote: 'Excelente App, ¡lo recomiendo!',
      photo: './Abogado1.png',
    },
    {
      name: 'María González',
      quote: 'Muy satisfecha, muy amigable e intuitiva.',
      photo: './Abogado2.png',
    },
    {
      name: 'Manuel Filgueira',
      quote: 'El calendario es excelente.',
      photo: './Abogado5.png',
    },
    // Agrega más testimonios aquí
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1,
    )
  }

  return (
    <div className='testimonial-carousel mx-auto text-center'>
      <div className='testimonial mx-auto text-center flex flex-col items-center'>
        <img
          src={testimonials[activeIndex].photo}
          alt={testimonials[activeIndex].name}
          className='testimonial-photo max-w-xs p-3'
        />
        <h3 className='text-lg font-semibold mb-2'>
          {testimonials[activeIndex].name}
        </h3>
        <p className='quote'>"{testimonials[activeIndex].quote}"</p>
      </div>
      <div className='controls flex justify-center mt-4'>
        <button
          onClick={prevTestimonial}
          className='mr-4 bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Anterior
        </button>
        <button
          onClick={nextTestimonial}
          className='mr-4 bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Siguiente
        </button>
      </div>
    </div>
  )
}

const LandingPage: React.FC = () => {
  const navigate = useNavigate()
  const redirigir = () => {
    navigate('./register')
  }
  return (
    <div className='landing-page'>
      {/* Sección de presentación */}
      <section className="hero bg-policeBlue text-white py-20">
        <div className="container mx-auto">
          <img src="./logo.png" className="testimonial-photo max-w-xl mx-auto" title='logo'/>
          <h1 className="text-4xl font-bold mb-8 text-center">Organiza y agiliza tus casos con nuestra app. Centraliza información, automatiza tareas y colabora en tiempo real para lograr resultados óptimos.</h1>
          <button onClick={redirigir} className=" flex bg-white text-blue-500 font-bold py-2 px-4 rounded mx-auto justify-center"> 
            ¡Comienza ahora!
          </button>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className='benefits py-12'>
        <div className='container mx-auto text-center '>
          <h2 className='text-4xl font-bold mb-6 '>Nuestros beneficios</h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='benefit'>
              <h3 className='text-3xl  font-bold mb-2'>Calidad garantizada</h3>
              <p>lleva el control de todos tus casos en un solo lugar.</p>
            </div>
            <div className='benefit'>
              <h3 className='text-3xl font-bold  mb-2'>Precios competitivos</h3>
              <p>Organiza Tu agenda y optimiza el tiempo.</p>
            </div>
            <div className='benefit'>
              <h3 className='text-3xl text-center font-bold mb-2'>
                Excelente servicio al cliente
              </h3>
              <p className='text 2xl font-bold'>
                Nuestro equipo está siempre dispuesto a ayudarte y resolver tus
                dudas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className='testimonials text-center p-4 bg-gray-100 py-12'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold mb-6 text-center'>
            Lo que dicen nuestros clientes
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Sccion de Redes Sociales*/}
      <section className='SocialMediaSection text-center p-4 bg-gray-100 py-12 '>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-bold mb-6 text-center'>Encuentranos</h2>
          <div className='flex justify-center'>
            <SocialMediaSection />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}

export default LandingPage;