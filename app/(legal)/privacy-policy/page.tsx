import { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
  title: 'Politica de privacidad',
  description: 'Politica de privacidad para el manejo de datos al inscribirse.',
};

export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

export default function PrivacyPolicy() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[100vh] overlay-shadow">
      <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Política de Privacidad</h1>
        
        <p className="text-lg mb-4 text-white">Al participar en el evento &quot;Tengoku Game&quot;, aceptas los siguientes términos relacionados con el uso y protección de tus datos personales:</p>
        
        <ol className="list-inside space-y-4 text-lg">
          <li>
            <h2 className="font-semibold text-xl text-gray-500">1. Recopilación de Datos Personales</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Recopilamos tu nombre completo, dirección de correo electrónico y edad para confirmar tu inscripción al evento.</li>
              <li>La información recopilada se utilizará exclusivamente para la gestión del evento y el envío de información relevante.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">2. Protección de la Información</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Nos comprometemos a proteger tus datos personales utilizando medidas de seguridad adecuadas para evitar accesos no autorizados.</li>
              <li>No compartiremos tus datos con terceros sin tu consentimiento, salvo que sea necesario para la realización del evento.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">3. Uso de los Datos Personales</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Usaremos tus datos para confirmar tu participación, enviarte actualizaciones sobre el evento y cumplir con las normativas legales.</li>
              <li>Podrás ejercer tus derechos sobre tus datos personales contactándonos si deseas actualizarlos o eliminarlos.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">4. Consentimiento</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Al registrarte en el evento, consientes el uso de tus datos personales según lo indicado en esta Política de Privacidad.</li>
            </ul>
          </li>
        </ol>

        <div className="mt-6 text-center">
          <p className="text-lg text-red-500">
            Al participar en este evento, confirmas que has leído, entendido y aceptas nuestra Política de Privacidad.
          </p>
        </div>
      </div>
    </div>
  );
}
