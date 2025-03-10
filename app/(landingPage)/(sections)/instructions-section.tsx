import DownArrow from "@/app/components/arrow/downArrow";
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
          
            <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-6 xl:grid-cols-3 xl:grid-rows-4 gap-y-1 md:gap-y-4 gap-x-5 w-11/12 md:w-3/4 min-h-[50vh]">

                <div className="md:col-start-1 md:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                    icon={IdCardIcon} 
                    title="Edad" 
                    description="Debes tener 18 años o más al día del evento." 
                    border="blue" 
                    shadow= {true} 
                    cornerContent="*" 
                    corner="top-left" 
                    />
                </div>

                <div className="md:col-start-1 md:row-start-2 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                    icon={TicketIcon} 
                    title="Entrada" 
                    description="Debes poseer una entrada de Tengoku Imperial." 
                    border="blue" 
                    shadow= {true} 
                    cornerContent="*" 
                    corner="top-left" 
                    />
                </div>

                <div className="md:row-span-2 md:col-start-2 md:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                  icon={TicketCheckIcon} 
                  title="Código" 
                  description="Escaneá el código QR en tu entrada para saber si es una de las elegidas para participar del evento." 
                  border="blue" 
                  shadow= {true} 
                  cornerContent="1" 
                  corner="top-left" 
                  />
                </div>
                
                <div className="md:row-span-2 md:row-start-3 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                  icon={FilePenLineIcon} 
                  title="Inscripción" 
                  description="Tu entrada fue una de las elegidas, ¡Felicidades! Llená el formulario de inscripción hasta el día Viernes 10/04 inclusive. Ten en cuenta que al llenarlo aceptaras a todos los términos y condiciones especificados en el apartado pertinente." 
                  border="blue" 
                  shadow= {true} 
                  cornerContent="2" 
                  corner="top-left" 
                  />
                </div>

                <div className="md:row-span-2 md:row-start-3 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                  icon={CalendarClockIcon} 
                  title="Asistencia" 
                  description="Deberas presentarte en el evento para confirmar tu inscripción con tu entrada y DNI en mano hasta media hora ANTES del inicio de los juegos. Así mismo deberas estar presente en el sector del escenario en los horarios que se informaran según el cronograma para poder participar." 
                  border="blue" 
                  shadow= {true} 
                  cornerContent="3" 
                  corner="top-left" 
                  />
                </div>

                <div className="md:col-span-2 md:row-span-2 md:row-start-5 xl:row-span-4 xl:col-start-3 xl:row-start-1 relative flex flex-col justify-center items-center p-1 rounded-xl">
                  <IconTitleDescriptionCard 
                  icon={MedalIcon} 
                  title="Ganar" 
                  description={`Para ganar el premio sólo debes salir victorioso en cada juego. Para esto deberás cumplir con los requisitos especificos para pasar a cada nueva etapa, y si eres quien lo haga en todos los juegos... \n ¡Ganaste! ¡Felicidades! \n...fácil, ¿no?`}
                  border="blue" 
                  shadow= {true} 
                  cornerContent="4" 
                  corner="top-left" 
                  />
                </div>
            </div>
        </div>
        <DownArrow href='#faq' />
      </section>
    )
}