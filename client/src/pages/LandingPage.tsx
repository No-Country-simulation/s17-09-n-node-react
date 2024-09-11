import React, { useState } from 'react';

// Componente para el carrusel de testimonios
const TestimonialCarousel: React.FC = () => {
    const testimonials = [
      { name: "Juan Pérez", quote: "Excelente App, ¡lo recomiendo!", photo:"" },
      { name: "María González", quote: "Muy satisfecha, muy amigable e intuitiva.", photo: ""},
      { name: "Manuel Filgueira", quote: "El calendario es excelente.", photo:"" },
      // Agrega más testimonios aquí
    ];
  
    const [activeIndex, setActiveIndex] = useState(0);
  
    const nextTestimonial = () => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };
  
    const prevTestimonial = () => {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
      );
    };
  
    return (
      <div className="testimonial-carousel">
        <div className="testimonial text-center">
          <img src={testimonials[activeIndex].photo} alt={testimonials[activeIndex].name} className="testimonial-photo" />
          <p className="quote">"{testimonials[activeIndex].quote}"</p>
          
        </div>
        <div className="controls">
          <button onClick={prevTestimonial}>Anterior</button>
          <button onClick={nextTestimonial}>Siguiente</button>
        </div>
      </div>
    );
  };

const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Sección de presentación */}
      <section className="hero bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra página</h1>
          <p className="text-lg mb-8">Descubre nuestros increíbles productos y servicios</p>
          <button  className="bg-white text-blue-500 font-bold py-2 px-4 rounded"> 
            ¡Comienza ahora!
          </button>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className="benefits py-12">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 ">Nuestros beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit">
              <h3 className="text-xl  font-bold mb-2">Calidad garantizada</h3>
              <p>
                lleva el control de todos tus casos en un solo lugar.
              </p>
            </div>
            <div className="benefit">
              <h3 className="text-xl font-bold  mb-2">Precios competitivos</h3>
              <p>
                Organiza Tu agenda y optimiza el tiempo.
              </p>
            </div>
            <div className="benefit">
              <h3 className="text-xl text-center font-bold mb-2">Excelente servicio al cliente</h3>
              <p>
                Nuestro equipo está siempre dispuesto a ayudarte y resolver tus dudas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className="testimonials text-center p-4 bg-gray-100 py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Lo que dicen nuestros clientes
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; S17-09-N-NODE-REACT</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;