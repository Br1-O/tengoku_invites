import { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
  title: 'Términos y condiciones',
  description: 'Bases, términos y condiciones para participar del evento.',
};

export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

export default function Terms() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[100vh]">
      {/* Bg and Overlay */}
      <div className="absolute top-0 left-0 w-full h-full z-[-1] bg-anime overlay-shadow"></div>
      <div className="bg-gray-900 p-5 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Términos y Condiciones</h1>
        
        <p className="text-lg mb-4 text-white">Al participar en el evento, aceptas los siguientes términos y condiciones:</p>
        
        <ol className="list-inside space-y-4 text-lg">
          <li>
            <h2 className="font-semibold text-xl text-gray-500">1. Requisitos para Participar</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>El participante debe ser mayor de 18 años para participar en el evento.</li>
              <li>Se requiere una inscripción completa y válida para participar en las pruebas.</li>
            </ul>
          </li>
          
          <li>
            <h2 className="font-semibold text-xl text-gray-500">2. Pruebas Físicas, Riesgos y Salud</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Las pruebas podrían ser de carácter físico (saltar, correr, fuerza, movimientos bruscos) y de esta forma implicar algún riesgo para la salud del participante.</li>
              <li>Es responsabilidad del participante asegurarse de estar en condiciones físicas adecuadas para participar.</li>
              <li>Al inscribirse, el participante asume toda responsabilidad por posibles perjuicios, lesiones o daños derivados de su participación en las pruebas.</li>
              <li>El organizador se deslinda de cualquier responsabilidad en caso de lesiones o accidentes durante el evento.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">3. Premio</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>El premio total es de 100.000 pesos, el cual será entregado al ganador al final del evento.</li>
              <li>El premio no es transferible ni canjeable.</li>
              <li>El premio se otorgará SOLAMENTE al ganador del evento. Cualquier trato por fuera del evento no será reconocido por la organización.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">4. Decisiones Aleatorias, Cambios en el Evento y Derecho de Admisión</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Las decisiones de los organizadores, que incluyen posibles elecciones aleatorias, no serán debatibles ni argumentables.</li>
              <li>Nos reservamos el derecho de admisión y participación, pudiendo excluir a aquellos participantes que no cumplan con las normas establecidas.</li>
              <li>El evento está sujeto a cambios sin previo aviso, incluyendo modificaciones en el cronograma, reglas y formato.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">5. Comportamiento en el Evento</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>No se permitirá ninguna forma de violencia física ni verbal entre los participantes o hacia los organizadores.</li>
              <li>Las actitudes consideradas antideportivas, como el mal comportamiento o el uso de lenguaje inapropiado, serán motivo de descalificación inmediata.</li>
            </ul>
          </li>
        </ol>

        <div className="mt-6 text-center">
          <p className="text-lg text-red-500 text-left">
            Al participar en este evento, confirmas que has leído, entendido y aceptas estos términos y condiciones. 
          </p>
          <p className="text-lg text-red-500 text-left">
            También reconoces que el evento puede estar sujeto a cambios y que participas bajo tu propia responsabilidad en cuanto a salud y aptitud física.
          </p>
        </div>
      </div>
    </div>
  );
}