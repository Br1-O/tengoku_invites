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
        <main className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2">
            {children}
        </main>
    );
};

export default RegisteredLayout;