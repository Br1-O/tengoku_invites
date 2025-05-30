"use client"
import SponsorCarousel from "@/app/components/carrousels/sponsor-carrousel"
import { useState } from "react"

interface Sponsor {
  id: number
  name: string
  logo: string
  href: string
}

const Sponsors =
[
  { "id": 1, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png", "href": "https://www.cemenglish.com" },
  { "id": 2, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png", "href": "https://www.cemenglish.com"  },
  { "id": 3, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png", "href": "https://www.cemenglish.com"  },
  { "id": 4, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png", "href": "https://www.cemenglish.com"  },
  { "id": 5, "name": "Cem English", "logo": "/images/sponsors/sponsor-1.png", "href": "https://www.cemenglish.com"  }
];

export default function SponsorSection() {
  const [sponsors] = useState<Sponsor[]>(Sponsors);

  return (
    <section id="sponsors" className="relative py-8 bg-black w-full">
      <div className="fading-border"></div>
      <div className="mx-auto px-4 z-10">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Nuestros <span className="text-[#ff0080]">Patrocinadores</span>
        </h2>

        <SponsorCarousel sponsors={sponsors} />
      </div>
    </section>
  )
}