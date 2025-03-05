interface Sponsor {
  id: number
  name: string
  logo: string
}

interface SponsorCarouselProps {
  sponsors: Sponsor[]
}

export default function SponsorCarousel({ sponsors }: SponsorCarouselProps) {
  return (
    <div className="w-full overflow-hidden bg-black/50 py-4 rounded-lg relative">
      <div className="animate-scroll flex space-x-8">
        {/* Duplicate images to ensure seamless looping */}
        {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
          <div key={`${sponsor.id}-${index}`} className="flex-shrink-0 h-12 w-32">
            <img src={sponsor.logo} alt={sponsor.name} className="w-full h-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}