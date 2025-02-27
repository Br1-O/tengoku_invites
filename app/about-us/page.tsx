import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Youtube, Mail, MapPin, Calendar, MapPinned, HomeIcon, InstagramIcon } from "lucide-react"

export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

export default function AboutUs() {
  return (
    <>
      <div className="relative h-full w-full flex items-center justify-center p-4">
        <div className="bg-gray-900/90 rounded-xl w-5xl xl:w-9/12 p-8 md:p-14 flex flex-col md:flex-row gap-5 md:gap-2">
          {/* Left Column - Logo and Info */}
          <div className="flex flex-col items-start md:items-start md:w-1/2">
            {/* Logo */}
            <div className="mb-6">
              <Image
                src="/logo-tengoku.png"
                alt="Tengoku Imperial Logo"
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>

            <p className="text-gray-400 uppercase tracking-widest text-sm mb-2 self-center md:self-auto">CONVENCIÓN</p>

            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 text-center md:text-left scale-y-125 self-center lg:self-auto">
              TENGOKU IMPERIAL<span className="text-xl align-top">®</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl lg:text-2xl my-5 text-center md:text-left">
              ¡Convención de Anime, <span className="whitespace-nowrap">J-POP</span>, <span className="whitespace-nowrap">K-POP</span> y Videojuegos!
            </p>

            <div className="flex items-center gap-2 text-gray-300 mb-5 md:text-lg lg:text-xl">
              <Calendar className="w-5 h-5 text-red-500" />
              <p>Evento Presencial: <span className="whitespace-nowrap font-bold"> 13 de Abril, 2025</span></p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-300 md:text-lg lg:text-xl">
              <MapPinned className="w-5 h-5 text-red-500" />
              <p><span className="font-bold"> Club Einstein (IAE), </span> <span className="whitespace-nowrap font-bold"> Saavedra 3002-3100 </span> <span className="whitespace-nowrap"> (Mar del Plata)</span></p>
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="md:w-1/2 flex flex-col gap-5 md:gap-8 xl:gap-7 items-center md:items-end">
            {/* Social Media Buttons */}
            <SocialButton
              icon={<InstagramIcon className="w-8 h-8" />}
              text="NUESTRO INSTAGRAM"
              href="https://www.instagram.com/tengokuanime"
            />

            <SocialButton
              icon={<Facebook className="w-8 h-8" />}
              text="NUESTRO FACEBOOK"
              href="https://www.facebook.com/ConvencionTengoku"
            />

            <SocialButton
              icon={<Youtube className="w-8 h-8" />}
              text="CANAL DE YOUTUBE"
              href="https://www.youtube.com/@Tengokuimperial23"
            />

            <SocialButton
              icon={<Mail className="w-8 h-8" />}
              text="VENTA DE ENTRADAS"
              href="https://www.instagram.com/p/DFsv-Jfvv5k/?img_index=1"
            />

            <SocialButton
              icon={<MapPin className="w-8 h-8" />}
              text="PRÓXIMO EVENTO"
              href="https://www.google.com/maps/place/Saavedra+3050,+B7600+Mar+del+Plata,+Provincia+de+Buenos+Aires/@-38.0123555,-57.5636693,17z/data=!4m6!3m5!1s0x9584dea2c34d3b01:0x6401d2133bdaa294!8m2!3d-38.0123555!4d-57.5636693!16s%2Fg%2F11f_knfqqs?entry=ttu&g_ep=EgoyMDI1MDIyNC4wIKXMDSoASAFQAw%3D%3D"
            />

            <SocialButton 
                icon={<HomeIcon className="w-8 h-8" />} 
                text="PÁGINA WEB" 
                href="https://tengoku.com.ar/" 
            />
          </div>
        </div>
      </div>
    </>
  )
}

// Social Button Component
function SocialButton({
  icon,
  text,
  href,
}: {
  icon: React.ReactNode
  text: string
  href: string
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between w-full max-w-md bg-gradient-to-r from-[rgb(200,0,0)] to-[#380000] hover:brightness-110 text-white px-6 py-3 rounded-full transition-colors gap-2"
    >
      <span className="font-bold md:text-xl scale-y-125">{text}</span>
      <span className="text-white">{icon}</span>
    </Link>
  )
}

