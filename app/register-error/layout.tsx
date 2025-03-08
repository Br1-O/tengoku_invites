import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ya estás registrado',
  description: 'Ya se ha registrado un envio de datos para participar del evento con ese número de entrada.',
};

const RegisterErrorLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="h-full min-h-[100vh] w-full flex items-center justify-center flex-col py-5 px-2 overlay-shadow">
            {children}
        </div>
    );
};

export default RegisterErrorLayout;