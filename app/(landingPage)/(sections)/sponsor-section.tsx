"use client"
import SponsorCarousel from "@/app/components/carrousels/sponsor-carrousel"
import { useState } from "react"

interface Sponsor {
  id: number
  name: string
  logo: string
}

const Sponsors =
[
  { "id": 1, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png" },
  { "id": 2, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png" },
  { "id": 3, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png" },
  { "id": 4, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png" },
  { "id": 5, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png" }
];

export default function SponsorSection() {
  const [sponsors] = useState<Sponsor[]>(Sponsors);

  return (
    <section id="contacto" className="py-8 bg-black border-y border-[#ff0080]/20 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Nuestros <span className="text-[#ff0080]">Patrocinadores</span>
        </h2>

        <SponsorCarousel sponsors={sponsors} />
      </div>
    </section>
  )
}