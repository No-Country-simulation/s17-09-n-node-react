import { Link } from "react-router-dom";
import { Input} from "@mui/material";

const Footer = () => {
  return (
    <footer className='bg-policeBlue w-full'>
      <div className="container mx-auto p-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Ubicación y contacto */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-4 text-mellowApricot">Contacto</h4>
          <p className="mb-2 flex items-center text-white">
            <i className="fa fa-map-marker-alt mr-3 text-white hover:underline"></i>
            Avenida Principal 123, Ciudad Legal, AR
          </p>
          <p className="mb-2 flex items-center text-white">
            <i className="fa fa-phone-alt mr-3 text-white"></i>
            +61 0 2904 62-9470 | +51 9 2953 4245088
          </p>
          <p className="mb-2 flex items-center">
            <i className="fa fa-envelope mr-3"></i>
            <Link to="mailto:contacto@caseslaw.com" className="text-white hover:underline">
              contacto@caseslaw.com
            </Link>
          </p>
        </div>

        {/* Links Rápidos */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-4 text-mellowApricot">Enlaces útiles</h4>
          <div className="flex flex-col space-y-2">
            <Link to="/about" className="text-white hover:underline">Acerca de</Link>
            <Link to="/services" className="text-white hover:underline">Servicios</Link>
            <Link to="/terms" className="text-white hover:underline">Términos y Condiciones</Link>
            <Link to="/privacy" className="text-white hover:underline">Política de Privacidad</Link>
            <Link to="/support" className="text-white hover:underline">Soporte</Link>
          </div>
        </div>

        {/* Newsletter */}
        <div className="flex flex-col items-center md:items-start">
          <h4 className="mb-4 text-mellowApricot">Suscripción al Newsletter</h4>
          <p className="mb-4 text-white ">Recibe actualizaciones sobre nuestras herramientas y servicios.</p>
          <div className="relative w-full mt-4">
            <Input className="py-2" placeholder="Tu correo electrónico" fullWidth />
            <button color="primary" className="mt-2 w-full" onClick={()  => alert("Gracias por suscribirse a nuesto  Newsletter")}>Suscribirse</button>
          </div>
        </div>
      </div>

      {/* Copyright y créditos */}
      <div className="container mx-auto mt-10 text-center border-t border-gray-700 pt-5 text-white">
        <p>&copy; {new Date().getFullYear()} Cases Law ⚖️ - Todos los derechos reservados.</p>
        <p>
          Diseño y desarrollo por{" "}
          <Link to="https://github.com/No-Country-simulation/s17-09-n-node-react" className="text-blue-400 hover:underline">
          s17-09-n-node-react 
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
