// La página será estática y cacheada permanentemente hasta el próximo deploy
export const dynamic = 'force-static';

const RegisterPage = () => {

    return (
        <div className="w-full flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700">
            <div className="flex items-center justify-center flex-col">
                <h1 className="text-3xl md:text-6xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit">
                    ¡Sólo puedes inscribirte una vez!
                </h1>
            </div>

            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                Si vos no realizaste la carga de tus datos anteriormente, por favor comunicate con la organización para poder registrar tus datos apropiadamente.
                Ten en cuenta que se te pedirá la entrada durante el evento.
            </div>

            <div className="flex items-center justify-center flex-col my-3">
                <div className="text-xl md:text-3xl text-white px-4 p-2 rounded-md pb-4 w-fit text-center">
                    Contactanos por alguna de las siguientes vías:
                </div>
            </div>

            <div className="w-full md:w-1/2 text-white my-4 mx-auto">

            </div>
        </div>
    );
};

export default RegisterPage;