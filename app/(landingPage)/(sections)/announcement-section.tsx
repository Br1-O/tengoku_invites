"use client"
import AnnouncementCarousel from "@/app/components/carrousels/annoucement-carrousel"
import { useEffect, useState } from "react"

interface Announcement {
  id: number,
  image: string,
  title: string,
  description: string
}

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const res = await fetch("/data/anuncios.json")
      const data = await res.json()
      setAnnouncements(data)
    }

    fetchAnnouncements()
  }, [])

  return (
    <section className="w-full py-1 bg-black">
      <div className="container mx-auto">
        <AnnouncementCarousel items={announcements} />
      </div>
    </section>
  )
}