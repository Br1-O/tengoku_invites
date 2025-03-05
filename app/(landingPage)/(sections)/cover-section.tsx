import { Trophy, Users } from "lucide-react";
import Image from "next/image";

export default function CoverSection() {
  return (
    <section id="cover" className="trans-red-bg relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center z-5">
        <div className="flex flex-col justify-center items-center gap-8 text-center py-2">
          <div className="flex flex-col justify-center items-center space-y-4">
            <div className="w-7/12 md:w-1/2">
              <Image
                src="/logo-tengoku-game.webp" 
                className="logo object-contain"
                alt="logo Tengoku Game"
                layout="responsive"
                width={1} 
                height={1}
              >
              </Image>
            </div>
            <p id="text-cover" className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              ¿Estás listo para el desafío definitivo?
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12">
            <div className="bg-black/60 backdrop-blur-sm border border-[#00ffff]/30 rounded-xl p-6 w-64 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-[#00ffff]" />
              </div>

              <p className="text-3xl font-bold text-[#00ffff]">100</p>
              <h3 className="text-xl font-bold text-white mb-2">Jugadores</h3>
              <p className="text-sm text-gray-400">...compitiendo hasta el final </p>
            </div>

            <div className="bg-black/60 backdrop-blur-sm border border-[#ff0080]/30 rounded-xl p-6 w-64 transform hover:scale-105 transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                <Trophy className="h-10 w-10 text-[#ff0080]" />
              </div>
              <p className="text-3xl font-bold text-[#ff0080]">$100.000</p>
              <h3 className="text-xl font-bold text-white mb-2">de Premio</h3>
              <p className="text-sm text-gray-400">...para el último en pie.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}