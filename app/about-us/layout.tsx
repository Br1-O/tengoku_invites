import { Metadata } from 'next';
import NavBar from '../components/navbar/navbar';

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
            <NavBar />
            <main className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2 relative">
                {children}
            </main>
        </>
    );
};

export default RegisterLayout;

