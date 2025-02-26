"use client";

import { useParams } from "next/navigation";
  
const RegisterPage = () => {

        const inviteValue = useParams().inv;
        const inviteNumber = inviteValue as string;

    return (
        <div className="w-full flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    ¡Gracias por inscribirte, jugador {inviteNumber}!
                </h1>
            </div>

            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                Te esperamos a las 14:00 hs. en la base del escenario para confirmar tu participación. Ten en cuenta que de no hacerlo tu lugar será liberado y sorteado entre los asistentes.
            </div>

            <div className="flex items-center justify-center flex-col my-3">
                <div className="text-xl md:text-3xl text-white px-4 p-2 rounded-md pb-4 w-fit text-center">
                    Ante cualquier duda contactanos por alguna de las siguientes vías:
                </div>
            </div>

            <div className="w-full md:w-1/2 text-white my-4 mx-auto">
            <button className="relative font-medium text-lg tracking-wide rounded-lg cursor-pointer border-none bg-gradient-to-r from-purple-600 to-purple-900 text-ghostwhite overflow-hidden group">
  <span className="relative z-10 flex items-center px-5 py-3 transition-colors duration-400 group-hover:text-gray-300">
    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path
        d="M24 12l-5.657 5.657-1.414-1.414L21.172 12l-4.243-4.243 1.414-1.414L24 12zM2.828 12l4.243 4.243-1.414 1.414L0 12l5.657-5.657L7.07 7.757 2.828 12zm6.96 9H7.66l6.552-18h2.128L9.788 21z"
        fill="currentColor"
      ></path>
    </svg>
    Code
  </span>
  <div className="absolute inset-0 w-[120%] -left-[10%] skew-x-[30deg] bg-black transition-transform duration-400 ease-[cubic-bezier(0.3,1,0.8,1)] group-hover:translate-x-full"></div>
</button>

            </div>
        </div>
    );
};

export default RegisterPage;