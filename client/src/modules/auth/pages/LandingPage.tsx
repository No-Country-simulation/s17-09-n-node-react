import React, { useState } from 'react';



const LandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      {/* Sección de presentación */}
      <section className="hero bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenido a nuestra página</h1>
          <p className="text-lg mb-8">Descubre nuestros increíbles productos y servicios</p>
          <button className="bg-white text-blue-500 font-bold py-2 px-4 rounded">
            ¡Comienza ahora!
          </button>
        </div>
      </section>

      {/* Sección de beneficios */}
      <section className="benefits py-12">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Nuestros beneficios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="benefit">
              <h3 className="text-xl font-bold mb-2">Calidad garantizada</h3>
              <p>
                Nuestros productos son de la más alta calidad, asegurando tu satisfacción.
              </p>
            </div>
            <div className="benefit">
              <h3 className="text-xl font-bold mb-2">Precios competitivos</h3>
              <p>
                Ofrecemos los mejores precios del mercado, sin comprometer la calidad.
              </p>
            </div>
            <div className="benefit">
              <h3 className="text-xl font-bold mb-2">Excelente servicio al cliente</h3>
              <p>
                Nuestro equipo está siempre dispuesto a ayudarte y resolver tus dudas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de testimonios */}
      <section className="testimonials bg-gray-100 py-12">
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
          <p>&copy; 2023 Tu Empresa. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;