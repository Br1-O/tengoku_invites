"use client"
import DownArrow from "@/app/components/arrow/downArrow";
import { Trophy, Users } from "lucide-react";
import Image from "next/image";

export default function CoverSection() {

  return (
    <section id="home"       
    className="trans-red-line-simple-bg relative min-h-screen flex items-center justify-center overflow-hidden pt-14 pb-20">
      {/* Video Background */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] md:fixed md:top-0 md:left-0 md:w-full md:h-full">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto" // Preload the video
        >
          <source src="/videos/stairs.mp4" type="video/mp4" />
          Tu navegador no soporta este video.
        </video>
      </div>
      
      {/* Overlay */}
      <div className="overlay-shadow"></div>

      <div    
        className= "flex items-center justify-center z-10 transition-opacity duration-500" >
        <div className="flex flex-col justify-center items-center gap-8 text-center py-2">
            <div className= "flex flex-col justify-center items-center space-y-4">
              <div className="w-80 sm:w-[25rem] md:w-[28rem] lg:w-[35rem] xl:w-[39rem]">
                <Image
                  src="/logo-tengoku-game.webp" 
                  className="logo object-contain"
                  alt="logo Tengoku Game"
                  layout="responsive"
                  width={1} 
                  height={1}
                  priority // Prioritize loading
                  draggable="false"
                >
                </Image>
              </div>

              <p id="text-cover" className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                ¿Estás listo para el desafío?
              </p>
            </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-14 md:gap-20 mt-5 md:mt-14">
            <div className="transform-to-left bg-black/60 backdrop-blur-sm border border-[#00ffff]/30 rounded-xl p-6 w-52 md:w-64 hover:scale-105 hover:shadow-[2px_2px_10px_#00ffff] transition-transform duration-300">
              <div className="flex items-center justify-center mb-4">
                <Users className="h-10 w-10 text-[#00ffff]" />
              </div>

              <p className="text-3xl font-bold text-[#00ffff]">100</p>
              <h3 className="text-xl font-bold text-white mb-2">Jugadores</h3>
              <p className="text-sm text-gray-400">...y un solo ganador. </p>
            </div>

            <div className="transform-to-right bg-black/60 backdrop-blur-sm border border-[#ff0080]/30 rounded-xl p-6 w-52 md:w-64 hover:scale-105 hover:shadow-[2px_2px_10px_#ff0080] transition-transform duration-300">
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

      <DownArrow href='#novedades' />
    </section>
  )
}