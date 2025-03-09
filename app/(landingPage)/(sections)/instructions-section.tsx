// import Image from "next/image"

import IconTitleDescriptionCard from "@/app/components/cards/iconTitleDescriptionCard";
import { CalendarClockIcon, FilePenLineIcon, IdCardIcon, MedalIcon, TicketCheckIcon, TicketIcon } from "lucide-react";

export default function InstructionsSection() {

    return (
      <section id="participar" className="relative py-20 text-white w-full">
        {/* Bg and Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-voting-room overlay-shadow"></div>
        {/* red-line */}
        <div className="absolute top-0 left-0 w-full h-full fading-border z-[-1] trans-red-line-simple-bg"></div>

        <div className="px-4 w-full flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-14 text-white">
            ¿Cómo <span className="text-[#ff0080]">participar?</span> (...y ganar)
          </h2>
          
            <div className="grid grid-cols-1 grid-rows-6 md:grid-cols-2 md:grid-rows-6 lg:grid-cols-3 lg:grid-rows-4 gap-4 w-3/4 min-h-[50vh]">

                <div className="bg-md:col-start-1 md:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={IdCardIcon} title="Edad" description="Tener 18 años o más al día del evento." border="red" shadow= {true} />
                </div>

                <div className="md:col-start-1 md:row-start-2 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={TicketIcon} title="Entrada" description="Poseer una entrada de Tengoku Imperial." border="red" shadow= {true} />
                </div>

                <div className="md:row-span-2 md:col-start-2 md:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={TicketCheckIcon} title="Código" description="Escaneá el código QR en tu entrada para saber si tu entrada es una de las elegidas para participar del evento." border="blue" shadow= {true} />
                </div>
                
                <div className="md:row-span-2 md:row-start-3 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={FilePenLineIcon} title="Inscripción" description="Si tu entrada fue una de las elegidas llená el formulario de inscripción hasta el día Viernes 10/04 inclusive. Ten en cuenta que al llenarlo aceptaras a todos los términos y condiciones especificados en el apartado pertinente de dicho formulario." border="red" shadow= {true} />
                </div>

                <div className="md:row-span-2 md:row-start-3 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={CalendarClockIcon} title="Asistencia" description="Deberas presentarte en el evento para confirmar tu inscripción con tu entrada y DNI en mano hasta media hora ANTES del inicio de los juegos. Así mismo deberas estar presente en el sector del escenario en los horarios que se informaran según el cronograma para poder participar." border="blue" shadow= {true} />
                </div>

                <div className="md:col-span-2 md:row-span-2 md:row-start-5 lg:row-span-4 lg:col-start-3 lg:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard icon={MedalIcon} title="Ganar" description="Si saliste victorioso de todas y cada una de las pruebas, ¡ganaste! ¡Felicidades!" border="red" shadow= {true} />
                </div>
            </div>

    
            {/* <div className="relative h-48 md:h-64">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#00ffff]">{game.title}</h3>
                  <p className="text-gray-300">{game.description}</p>
                </div> */}

        </div>

      </section>
    )
}