"use client"
import DownArrow from "@/app/components/arrow/downArrow";
import AnnouncementCarousel from "@/app/components/carrousels/annoucement-carrousel"
import { useState } from "react"

interface Announcement {
  id: number,
  image: string,
  title: string,
  description: string,
  href: string
}

const Announcements =
[  
  {
    "id": 4,
    "image": "/images/announcements/poster_entradas.webp",
    "title": "Entradas a la venta",
    "description": "Ya podes comprar tus entradas anticipadas para la Tengoku Imperial. ¡Enterate dónde hacerlo!",
    "href": "https://www.instagram.com/p/DHJAxb9xGMe/?hl=es-la&img_index=1"
  },
  {
    "id": 3,
    "image": "/images/announcements/poster_tengoku_game_2.webp",
    "title": "Inscripciones Abiertas",
    "description": "Regístrate ahora para la próxima temporada de Tengoku Game.",
    "href": "https://www.instagram.com/p/DG6q43aPJSm/?img_index=1"
  },
  {
    "id": 2,
    "image": "/images/announcements/poster_dandadan_announcement.webp",
    "title": "Fecha Confirmada",
    "description": "Una nueva convención de Tengoku Imperial Anime fue confirmada. ¡Enterate de todo!",
    "href": "https://www.instagram.com/p/DFsv-Jfvv5k/?img_index=1"
  },
  {
    "id": 1,
    "image": "/images/announcements/poster_dandadan_announcement.webp",
    "title": "Premio confirmado",
    "description": "¡El pozo acumulado para el premio es de $100000!",
    "href": ""
  }
];


export default function AnnouncementSection() {
  const [announcements] = useState<Announcement[]>(Announcements);

  return (
    <section id="novedades" className="relative w-full pt-14 pb-24 bg-black">
      <div className="fading-border"></div>
      <div className="container mx-auto">
        <AnnouncementCarousel items={announcements} />
      </div>
      <DownArrow href='#participar' />
    </section>
  )
}