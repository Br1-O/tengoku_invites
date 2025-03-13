import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sobre nosotros',
  description: 'Enlaces de contacto y medios de comunicación para la convención de Anime, J-POP, K-POP y videojuegos Tengoku Imperial.',
};

const RegisterLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <>
            <div className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2 relative">
                {/* Bg and Overlay */}
                <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-anime overlay-shadow"></div>
                {children}
            </div>
        </>
    );
};

export default RegisterLayout;

