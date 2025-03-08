"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

interface AnnouncementItem {
  id: number
  image: string
  title: string
  description: string
  href: string
}

interface AnnouncementCarouselProps {
  items: AnnouncementItem[]
}

export default function AnnouncementCarousel({ items }: AnnouncementCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null)

  const startAutoSlide = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)

    timerRef.current = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
      }
    }, 3000)
  }, [isPaused, items])

  useEffect(() => {
    startAutoSlide()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    }
  }, [startAutoSlide])

  const handleDotClick = (index: number) => {
    setCurrentIndex(index)
    setIsPaused(true)

    // Resume auto-sliding after 10 seconds
    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current)
    pauseTimerRef.current = setTimeout(() => {
      setIsPaused(false)
    }, 10000)
  }

  return (
    <div className="relative w-full pt-5 h-[50vh] mx-auto flex flex-col justify-center items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-center my-5 text-white">
        Últimas <span className="text-[#ff0080]"> Novedades </span> 
      </h2>
      <div className="relative h-4/5 overflow-hidden w-full flex justify-center items-center">
        {items.map((item, index) => {
          const Content = (
            <div
              key={item.id}
              className={`absolute inset-0 transition-opacity duration-500 w-3/4 mx-auto flex flex-col items-center bg-black/70 ${
                index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative w-full h-full flex justify-center">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain mx-auto"
                  draggable="false"
                />
              </div>
              <div className="w-full p-4 text-center">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                <p className="text-gray-200">{item.description}</p>
              </div>
            </div>
          )

          return item.href ? (
            <Link key={item.id} href={item.href} target="_blank" rel="noopener noreferrer">
              {Content}
            </Link>
          ) : (
            Content
          )
        })}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-sm transition-colors ${
              index === currentIndex ? "bg-[#ff0080]" : "bg-gray-500 hover:bg-gray-400"
            }`}
            aria-label={`Ir a anuncio ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}