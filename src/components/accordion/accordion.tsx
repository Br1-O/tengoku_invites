"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

interface CustomAccordionProps {
  children: React.ReactNode
  className?: string
}

interface CustomAccordionItemProps {
  question: string
  answer: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
}

export function CustomAccordion({ children, className = "" }: CustomAccordionProps) {
  return <div className={className}>{children}</div>
}

export function CustomAccordionItem({
  question,
  answer,
  className = "",
  triggerClassName = "",
  contentClassName = "",
}: CustomAccordionItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`border-b ${className}`}>
      <div className="flex">
        <button
          onClick={toggleAccordion}
          className={`flex flex-1 items-center justify-between py-4 font-semibold transition-all hover:underline ${triggerClassName}`}
          aria-expanded={isOpen}
        >
          {question}
          <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
      </div>
      <div
        className={`overflow-hidden text-sm transition-all ${contentClassName}`}
        style={{
          maxHeight: isOpen ? "1000px" : "0",
          opacity: isOpen ? 1 : 0,
          transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
        }}
      >
        <div className="pb-4 pt-0">{answer}</div>
      </div>
    </div>
  )
}