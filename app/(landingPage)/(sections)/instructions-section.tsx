import Image from "next/image"

export default function InstructionsSection() {

    return (
      <section id="participar" className="relative py-20 text-white w-full">
        {/* Bg and Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-voting-room overlay-shadow"></div>
        {/* red-line */}
        <div className="absolute top-0 left-0 w-full h-full fading-border z-[-1] trans-red-line-simple-bg"></div>

        <div className="px-4 w-full flex flex-col justify-center items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            ¿Cómo <span className="text-[#ff0080]">participar?</span> (...y ganar)
          </h2>
          
            <div className="grid grid-cols-3 grid-rows-4 gap-4 w-3/4 min-h-[70vh]">
                <div className="col-start-1 row-start-1 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">1</div>
                <div className="col-start-1 row-start-2 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">2</div>
                <div className="row-span-2 col-start-2 row-start-1 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">3</div>
                <div className="row-span-2 row-start-3 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">4</div>
                <div className="row-span-2 row-start-3 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">5</div>
                <div className="row-span-4 col-start-3 row-start-1 relative bg-lime-500 flex flex-col justify-center items-center p-5 rounded-xl">6</div>
            </div>

    
            {/* <div className="relative h-48 md:h-64">
                  <Image src={game.image || "/placeholder.svg"} alt={game.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-[#00ffff]">{game.title}</h3>
                  <p className="text-gray-300">{game.description}</p>
                </div> */}

        </div>

      </section>
    )
}