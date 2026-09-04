export const metadata = {
    title: "Encuesta no disponible - Tengoku Animé",
    description: "Página de encuesta no disponible o código inválido",
};

export const dynamic = 'force-static';
export const revalidate = false;

const SurveyRejectPage = () => {
    return (
        <div className="min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
            {/* Bg y Overlay */}
            <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-anime overlay-shadow"></div>

            <div className="flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-16 px-5 rounded-lg border-2 border-slate-700 max-w-3xl text-center">
                <div className="flex items-center justify-center flex-col">
                    <h1 className="text-3xl md:text-5xl text-neutral-200 font-bold mb-4">
                        ¡El enlace de la encuesta no es válido o expiró!
                    </h1>
                    <div className="text-2xl md:text-4xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 py-2 rounded-md font-bold w-fit">
                        No te preocupes
                    </div>
                </div> 

                <div className="text-base md:text-xl text-neutral-300 mt-6 max-w-xs md:max-w-xl mx-auto leading-relaxed">
                    Es posible que el enlace enviado por correo esté incompleto, que el código ya haya sido utilizado o que el período para completar la encuesta haya finalizado.
                </div>

                <div className="text-sm md:text-base text-neutral-400 mt-4 max-w-xs md:max-w-lg mx-auto">
                    Si consideras que esto es un error, podés contactarnos por nuestras redes sociales oficiales o hablar con el staff del evento para ayudarte. ¡Igualmente te agradecemos por formar parte de <span className="text-fuchsia-400 font-semibold">Tengoku Animé</span>!
                </div>
            </div>
        </div>
    );
};

export default SurveyRejectPage;