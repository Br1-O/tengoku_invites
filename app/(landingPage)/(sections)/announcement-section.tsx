"use client"
import DownArrow from "@/app/components/arrow/downArrow";
import AnnouncementCarousel from "@/app/components/carrousels/annoucement-carrousel"
import { useState } from "react"

interface Announcement {
  id: number,
  image: string,
  title: string,
  description: string
}

const Announcements =
[
  {
    "id": 1,
    "image": "/images/poster_promo.webp",
    "title": "Inscripciones Abiertas",
    "description": "Regístrate ahora para la próxima temporada de Tengoku Game"
  },
  {
    "id": 2,
    "image": "/images/poster_promo.webp",
    "title": "Nuevos Desafíos",
    "description": "Descubre los nuevos juegos que te esperan en esta temporada"
  },
  {
    "id": 3,
    "image": "/images/poster_promo.webp",
    "title": "Premio Récord",
    "description": "El pozo acumulado ha alcanzado una cifra histórica"
  }
];

export default function AnnouncementSection() {
  const [announcements] = useState<Announcement[]>(Announcements);

  return (
    <section id="novedades" className="relative w-full pt-1 pb-14 xl:pb-20 bg-black">
      <div className="container mx-auto">
        <AnnouncementCarousel items={announcements} />
      </div>
      <DownArrow href='#faq' />
    </section>
  )
}