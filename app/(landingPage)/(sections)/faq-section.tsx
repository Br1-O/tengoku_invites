"use client"
import { CustomAccordion, CustomAccordionItem } from "@/app/components/accordion/accordion"
import { useState } from "react"

interface QuestionAnswer{
  question: string,
  answer: string
}

const QuestionAnswer =
[
  {
    "question": "¿Cómo puedo participar en Tengoku Game?",
    "answer":
      "Para participar, debes escanear el QR de tu entrada, y de ser válida para competir deberás completar el formulario de inscripción. La confirmación de inscripción se enviará a tu correo electrónico."
  },
  {
    "question": "¿Cuál es el costo de inscripción?",
    "answer": "La inscripción y participación del evento no tiene ningún tipo de costo adicional."
  },
  {
    "question": "¿Hay límite de edad para participar?",
    "answer": "Sí, todos los participantes deben ser mayores de 18 años y firmar un acuerdo de consentimiento."
  },
  {
    "question": "¿Cómo se determina el ganador?",
    "answer": "Se estipularán reglas en cada juego, y los guardias serán los jueces de que dichas reglas se cumplan. En caso de que alguno determine que un jugador no cumplió con los requisitos para pasar una prueba su decisión será irrefutable."
  },
  {
    "question": "¿Cómo se entrega el premio al ganador?",
    "answer": "El premio se entrega ÚNICAMENTE al ganador del juego final, se realizará al concluir la convención y en el medio de pago que se paute con el jugador."
  },
  {
    "question": "¿Dónde se realizan los juegos?",
    "answer": "Los juegos se realizaran en el sector escenario del evento."
  }
];

export default function FaqSection() {
  const [questionAnswer, setQuestionAnswer] = useState<QuestionAnswer[]>(QuestionAnswer);

return (
  <section id="faq" className="trans-red-bg py-20 text-white">
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
              className="border border-[#ff0080]/20 rounded-lg overflow-hidden bg-[var(--red-light)]"
              triggerClassName="px-6 py-4 text-slate-300 hover:text-[#FFF] hover:no-underline"
              contentClassName="px-6 pb-4 text-gray-300"
            />
          ))}
        </CustomAccordion>
      </div>
    </div>
  </section>
)
}