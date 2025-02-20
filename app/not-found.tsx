 export default function NotFound() {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700">
        <div className="flex items-center justify-center flex-col">
            <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                ¡No existe esta página!
            </h1>
        </div>
    </div>
  )
}