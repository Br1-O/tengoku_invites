"use client"
import { CustomAccordion, CustomAccordionItem } from "@/app/components/accordion/accordion"
import { useEffect, useState } from "react"

interface QuestionAnswer{
  question: string,
  answer: string
}

export default function FaqSection() {
  const [questionAnswer, setQuestionAnswer] = useState<QuestionAnswer[]>([])

  useEffect(() => {
    const fetchQuestionAnswer = async () => {
      const res = await fetch("/data/preguntas-frecuentes.json")
      const data = await res.json()
      setQuestionAnswer(data)
    }

    fetchQuestionAnswer()
  }, [])

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