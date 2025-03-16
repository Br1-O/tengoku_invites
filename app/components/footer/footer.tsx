import Link from "next/link";
import SocialMediaBar from "../btns/socialMediaBar";
import Image from "next/image";

export default function Footer() {
    return (
      <section id="contacto" className="w-full bg-black pt-8 pb-2 border-t border-[#ff0080]/20">

        <div className="mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col justify-center items-center">
              <Link href="/#home">
                <Image
                  src="/logo-tengoku-game.webp"
                  alt= "logo Tengoku Games"
                  className="logo object-contain max-w-[10rem] h-auto cursor-pointer mt-2 mb-5"
                  layout="responsive"
                  width={1} 
                  height={1}
                />
              </Link>
              <p className="text-gray-400 mb-4 text-center">¿Estás listo para el desafio?</p>
                <SocialMediaBar />
            </div>
  
            <div className="lg:ml-5">
              <h3 className="text-white font-bold mb-4">Enlaces</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#home" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="#novedades" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Novedades
                  </Link>
                </li>
                <li>
                  <Link href="#participar" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    ¿Cómo participo?
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#ff0080] transition-colors">
                    Sobre nosotros
                  </Link>
                </li>
              </ul>
            </div>
  
            <div>
              <h3 className="text-white font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms" 
                    className="text-gray-400 hover:text-[#ff0080] transition-colors"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Términos y Condiciones
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" 
                  className="text-gray-400 hover:text-[#ff0080] transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  >
                    Política de Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" 
                  className="text-gray-400 hover:text-[#ff0080] transition-colors"
                  target="_blank" 
                  rel="noopener noreferrer" 
                  >
                    Renuncia de Responsabilidad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
  
          <div className="group mt-5 pt-5 border-t border-gray-800 text-center text-gray-500">
            <p className="text-wrap">&copy; {new Date().getFullYear()} Tengoku Game. Todos los derechos reservados. | 
              <span className="whitespace-nowrap group-hover:text-gray-400"> Diseño y desarrollo web por: {" "}
                <Link href="https://bruno-ortuno.vercel.app" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-blue-500 hover:underline group-hover:text-blue-400">
                  br1
                </Link>
                {" "} |
              </span>
            </p>
          </div>
        </div>
      </section>
    )
}