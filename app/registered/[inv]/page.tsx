"use client";

import SocialMediaBar from "@/app/components/btns/socialMediaBar";
import { useParams } from "next/navigation";
  
const RegisterPage = () => {

        const inviteValue = useParams().inv;
        const inviteNumber = inviteValue as string;

    return (
        <div className="flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-2 md:px-10 rounded-lg border-2 border-slate-700">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    ¡Gracias por inscribirte, jugador {inviteNumber}!
                </h1>
            </div>

            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                Te esperamos media hora antes del inicio de los juegos, en la base del escenario para confirmar tu participación. Ten en cuenta que de no hacerlo tu lugar será liberado y sorteado entre los asistentes.
            </div>

            <div className="flex items-center justify-center flex-col my-3">
                <div className="text-xl md:text-3xl text-white px-4 p-2 rounded-md pb-4 w-fit text-center">
                    Ante cualquier duda contactanos por alguna de las siguientes vías:
                </div>
            </div>

            <SocialMediaBar />
        </div>
    );
};

export default RegisterPage;