import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Encuesta de Satisfaccion',
  description: 'Decinos tu opinión del evento.',
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico"
    }
  ],
};

const RegisterLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="relative w-full lg:w-4/5 flex items-center justify-center flex-col py-5 px-2 mx-auto">
          {/* Bg and Overlay fijo en pantalla */}
          <div className="fixed inset-0 z-[-1] bg-anime overlay-shadow"></div>
          {children}
        </div>
    );
};

export default RegisterLayout;