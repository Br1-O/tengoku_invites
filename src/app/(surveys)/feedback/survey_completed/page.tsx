"use client";

import SocialMediaBar from "@/src/components/btns/socialMediaBar";

const RegisteredSuccessPage = () => {
    return (
        <div className="flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-2 md:px-10 rounded-lg border-2 border-slate-700">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit font-bold">
                    ¡Gracias por tu opinión!
                </h1>
            </div>

            <div className="text-base md:text-2xl text-slate-200 mt-6 max-w-xs md:max-w-2xl text-center mx-auto leading-relaxed">
                Tus respuestas de la encuesta de satisfacción han sido registradas exitosamente. 
            </div>

            <div className="text-sm md:text-lg text-neutral-400 mt-3 max-w-xs md:max-w-xl text-center mx-auto">
                Valoramos mucho tu tiempo y sugerencias para seguir haciendo de <span className="text-fuchsia-400 font-semibold">Tengoku Animé</span> una experiencia cada vez más genial. 
                ¡Esperamos verte en la próxima edición!
            </div>

            <div className="flex items-center justify-center flex-col my-6">
                <div className="text-lg md:text-2xl text-white px-4 p-2 rounded-md text-center">
                    Ante cualquier duda o consulta, podés escribirnos por nuestras redes:
                </div>
            </div>

            <SocialMediaBar />
        </div>
    );
};

export default RegisteredSuccessPage;