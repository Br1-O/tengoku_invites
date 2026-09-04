import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro exitoso',
  description: '¡Te has registrado con éxito para participar del evento!',
};

const RegisteredLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
        {/* Bg and Overlay */}
        <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-anime overlay-shadow"></div>
            {children}
        </div>
    );
};

export default RegisteredLayout;