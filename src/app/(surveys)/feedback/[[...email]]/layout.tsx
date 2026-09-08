import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Encuesta",
  description: "¡Decinos qué opinas y ayudanos a mejorar el evento!",
  openGraph: {
    title: "Encuesta | Tengoku Imperial",
    description: "¡Decinos qué opinas y ayudanos a mejorar el evento!",
  },
};

const RegisterLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="relative w-full lg:w-4/5 flex items-center justify-center flex-col py-5 px-2 mx-auto min-h-screen">
          {/* 
            En mobile inline styles para forzar:
            1. backgroundSize: '350% auto' -> Agranda la imagen un 350% del ancho del viewport (zoom masivo).
            2. backgroundPosition: 'left top' -> Clava el encuadre únicamente en el margen izquierdo.
            3. backgroundRepeat: 'no-repeat' -> Evita que la imagen intente repetirse.
          */}
          <div 
            className="fixed inset-0 z-[-1] bg-anime overlay-shadow md:!bg-cover md:!bg-center"
            style={{
              backgroundSize: '350% auto',
              backgroundPosition: 'left top',
              backgroundRepeat: 'no-repeat',
            }}
          />
          
          {children}
        </div>
    );
};

export default RegisterLayout;