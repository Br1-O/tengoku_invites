import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Registro',
  description: 'Registrate para participar del evento.',
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
        <div className="w-full lg:w-4/5 flex items-center justify-center flex-col py-5 px-2 mx-auto">
          {/* Bg and Overlay */}
          <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-anime overlay-shadow"></div>
          {children}
        </div>
    );
};

export default RegisterLayout;