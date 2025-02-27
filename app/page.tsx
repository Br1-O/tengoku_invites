export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { Facebook, Youtube, Mail, MapPin, Calendar, MapPinned, HomeIcon, InstagramIcon } from "lucide-react"

export default function Home() {
  return (
    <>
      <div className="min-h-[100vh] w-full relative flex items-center justify-center p-4">
        <div className="bg-gray-900/90 rounded-xl shadow-2xl max-w-5xl w-full p-8 md:p-12 flex flex-col md:flex-row gap-8">
          {/* Left Column - Logo and Info */}
          <div className="flex flex-col items-center md:items-start md:w-1/2">
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

            <p className="text-gray-400 uppercase tracking-widest text-sm mb-2">CONVENCIÓN</p>

            <h1 className="text-white text-4xl md:text-5xl font-bold mb-6 text-center md:text-left">
              TENGOKU IMPERIAL<span className="text-xl align-top">®</span>
            </h1>

            <p className="text-gray-300 text-lg mb-6 text-center md:text-left">
              ¡Convención de Anime, J-POP, K-POP y Videojuegos!
            </p>

            <div className="flex items-center gap-2 text-gray-300 mb-3">
              <Calendar className="w-5 h-5 text-red-500" />
              <p>Evento Presencial: ¡13 de Abril, 2025!</p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-300">
              <MapPinned className="w-5 h-5 text-red-500" />
              <p>Club Einstein (IAE), Mar del Plata</p>
            </div>
          </div>

          {/* Right Column - Social Links */}
          <div className="md:w-1/2 flex flex-col gap-4 items-center md:items-end">
            {/* Social Media Buttons */}
            <SocialButton
              icon={<InstagramIcon className="w-6 h-6" />}
              text="NUESTRO INSTAGRAM"
              href="https://instagram.com/tengokuimperial"
            />

            <SocialButton
              icon={<Facebook className="w-6 h-6" />}
              text="NUESTRO FACEBOOK"
              href="https://facebook.com/tengokuimperial"
            />

            <SocialButton
              icon={<Youtube className="w-6 h-6" />}
              text="CANAL DE YOUTUBE"
              href="https://youtube.com/tengokuimperial"
            />

            <SocialButton
              icon={<Mail className="w-6 h-6" />}
              text="VENTA DE ENTRADAS"
              href="mailto:entradas@tengokuimperial.com"
            />

            <SocialButton
              icon={<MapPin className="w-6 h-6" />}
              text="UBICACIÓN PRÓXIMO EVENTO"
              href="https://maps.google.com"
            />

            <SocialButton 
                icon={<HomeIcon className="w-6 h-6" />} 
                text="PÁGINA WEB" 
                href="https://tengokuimperial.com" 
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
      className="flex items-center justify-between w-full max-w-md bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full transition-colors"
    >
      <span className="font-bold">{text}</span>
      <span className="text-white">{icon}</span>
    </Link>
  )
}