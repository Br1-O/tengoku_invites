import Image from "next/image"

export default function GamesSection() {
    const games = [
      {
        title: "Luz Roja, Luz Verde",
        description:
          "Muévete cuando sea luz verde, detente cuando sea luz roja. Si te mueves en luz roja, serás eliminado.",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Dalgona Challenge",
        description: "Recorta la forma perfecta de la galleta de azúcar sin romperla. Precisión y paciencia son clave.",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Tira y Afloja",
        description:
          "Trabaja en equipo para ganar el juego de la cuerda. La estrategia es tan importante como la fuerza.",
        image: "/placeholder.svg?height=300&width=400",
      },
      {
        title: "Canicas",
        description:
          "Gana todas las canicas de tu oponente antes de que se acabe el tiempo. Elige sabiamente tu estrategia.",
        image: "/placeholder.svg?height=300&width=400",
      },
    ]
  
    return (
      <section id="juego" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Los <span className="text-[#ff0080]">Juegos</span>
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {games.map((game, index) => (
              <div
                key={index}
                className="game-card bg-black border border-[#00ffff]/20 rounded-xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:border-[#00ffff]"
              >
                <div className="relative h-48 md:h-64">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#00ffff]">{game.title}</h3>
                  <p className="text-gray-300">{game.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
}