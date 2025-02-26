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

export const dynamic = "force-dynamic"; 

const RegisterLayout = ({
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

export default RegisterLayout;