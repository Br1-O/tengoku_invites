import Link from "next/link";
import SocialMediaBar from "../btns/socialMediaBar";
import Image from "next/image";

export default function Footer() {
    return (
      <footer id="contacto" className="w-full bg-black pt-8 pb-2 border-t border-[#ff0080]/20">
        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center items-center">
              <Link href="/#cover">
                <Image
                  src="/logo-tengoku-game.webp"
                  alt= "logo Tengoku Games"
                  className="logo object-contain max-w-[10rem] h-auto cursor-pointer mt-2 mb-5"
                  layout="responsive"
                  width={1} 
                  height={1}
                />
              </Link>
              <p className="text-gray-400 mb-4 text-center">El juego definitivo de supervivencia.</p>
                <SocialMediaBar />
            </div>
  
            <div className="lg:ml-5">
              <h3 className="text-white font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#inicio" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#juego" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Juegos
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="#nosotros" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Sobre Nosotros
                  </Link>
                </li>
                <li>
                  <Link href="#contacto" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Contacto
                  </Link>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Renuncia de Responsabilidad
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Acuerdo de Participante
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Contacto Legal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="mt-5 pt-5 border-t border-gray-800 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} Tengoku Game. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    )
}