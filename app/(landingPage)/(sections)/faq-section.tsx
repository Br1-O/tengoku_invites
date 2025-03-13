"use client"
import { CustomAccordion, CustomAccordionItem } from "@/app/components/accordion/accordion"
import DownArrow from "@/app/components/arrow/downArrow";
import { useState } from "react"

interface QuestionAnswer{
  question: string,
  answer: string
}

const QuestionAnswer =
[
  {
    "question": "¿Cómo puedo participar?",
    "answer": "Para participar debes escanear el QR de tu entrada, y de ser válida para competir deberás completar el formulario de inscripción. La confirmación de inscripción se enviará a tu correo electrónico."
  },
  {
    "question": "¿Cuál es el costo de inscripción?",
    "answer": "La inscripción y participación del evento no tiene ningún tipo de costo adicional."
  },
  {
    "question": "¿Y si no confirmo mi inscripción?",
    "answer": "Tu lugar será liberado y sorteado entre los asistentes que hayan expresado su deseo de participar."
  },
  {
    "question": "¿Y si no estoy al inicio de algún juego?",
    "answer": "Serás descalificado y se te dará por eliminado, no pudiendo participar del juego en cuestión ni de ninguno de los posteriores dentro de esta competencia."
  },
  {
    "question": "¿Cómo se determina al ganador?",
    "answer": "Se estipularán reglas en cada juego, y los guardias serán los jueces de que dichas reglas se cumplan. En caso de que alguno determine que un jugador no cumplió con los requisitos para pasar una prueba su decisión será irrefutable y no estará abierta a discusión alguna."
  },
  {
    "question": "¿Cómo se entrega el premio?",
    "answer": "El premio se entrega ÚNICAMENTE al ganador del juego final, se realizará al concluir la convención y en el medio de pago que se paute con el jugador."
  },
  {
    "question": "¿Dónde se realizan los juegos?",
    "answer": "Los juegos se realizaran en el sector escenario del evento."
  }
];

export default function FaqSection() {
  const [questionAnswer] = useState<QuestionAnswer[]>(QuestionAnswer);

return (
  <section id="faq" className="relative py-20 text-white">
    {/* Bg and Overlay */}
    <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-beds overlay-shadow"></div>
    {/* red-line */}
    <div className="absolute top-0 left-0 w-full h-full fading-border z-[-1] trans-red-line-simple-bg"></div>

    <div className="container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
        Preguntas <span className="text-[#ff0080]">Frecuentes</span>
      </h2>

      <div className="max-w-3xl mx-auto">
        <CustomAccordion className="space-y-4">
          {questionAnswer.map((faq, index) => (
            <CustomAccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              className={`border ${index % 2 === 0 ? 'border-[#00ffff]/30' : 'border-[#ff0080]/30'} ${index % 2 === 0 ? 'hover:bg-[#00ffff]/30' : 'hover:bg-[#ff0080]/30'} rounded-lg overflow-hidden bg-black/60`}
              triggerClassName="px-6 py-4 text-slate-300 hover:text-[#FFF] hover:no-underline"
              contentClassName="px-6 pb-4 text-gray-300"
            />
          ))}
        </CustomAccordion>
      </div>
    </div>
    <DownArrow href='#contacto' />
  </section>
)
}