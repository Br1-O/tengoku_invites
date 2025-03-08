import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'No encontrado',
  description: '¡No existe la página solicitada en este sitio!',
};

export const revalidate = false; // Fully static, no revalidation
 
export default function NotFound() {
  return (
    <div className="w-full min-h-[100vh] flex items-center justify-center flex-col overlay-shadow">
        <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
            ¡No existe esta página!
        </h1>
    </div>
  )
}