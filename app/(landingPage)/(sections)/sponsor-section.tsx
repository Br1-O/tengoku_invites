"use client"
import SponsorCarousel from "@/app/components/carrousels/sponsor-carrousel"
import { useEffect, useState } from "react"

interface Sponsor {
  id: number
  name: string
  logo: string
}

export default function SponsorSection() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([])

  useEffect(() => {
    const fetchSponsors = async () => {
      const res = await fetch("/data/sponsors.json")
      const data = await res.json()
      setSponsors(data)
    }

    fetchSponsors()
  }, [])

  return (
    <section className="py-8 bg-black border-y border-[#ff0080]/20 w-full">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          Nuestros <span className="text-[#ff0080]">Patrocinadores</span>
        </h2>

        <SponsorCarousel sponsors={sponsors} />
      </div>
    </section>
  )
}