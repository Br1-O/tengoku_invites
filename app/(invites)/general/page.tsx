export const metadata = {
    title: "No participa",
    description: "Pagina de rechazo para participar de los juegos de Tengoku",
};

export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

const RejectPage = () => {
    return (
        <div className="min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
            <div className='flex items-center justify-center flex-col bg-black bg-opacity-80 py-10 lg:py-20 px-5 rounded-lg border-2 border-slate-700'>
            <div className='flex items-center justify-center flex-col'>
                <h1 className='text-3xl md:text-6xl text-center text-neutral-200 mb-6'>
                    ¡Tu entrada NO es una de las elegidas para participar! :(
                </h1>
                <div className='text-3xl md:text-6xl bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 p-2 rounded-md pb-4 w-fit text-center'>
                    Pero no te desanimes...
                </div>
            </div> 
            <div className='text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto'>
                    Durante el evento podrás anotarte para participar en caso de que la totalidad de puestos no hayan sido ocupados previamente, 
                    o no se hayan presentado para inscribirse al comienzo del evento. 
            </div>

            </div>
        </div>
    );
};

export default RejectPage;