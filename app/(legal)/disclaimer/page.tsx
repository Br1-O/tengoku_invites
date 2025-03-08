import { Metadata } from 'next';
import React from "react";

export const metadata: Metadata = {
  title: 'Renuncia de responsabilidad',
  description: 'Renuncia de responsabilidad al participar del evento.',
};

export const dynamic = 'force-static'; // Forces static behavior
export const revalidate = false;

export default function Disclaimer() {
  return (
    <div className="flex items-center justify-center p-8 min-h-[100vh] overlay-shadow">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-500 mb-4">Renuncia de Responsabilidad</h1>
        
        <p className="text-lg mb-4">Al registrarte para participar en el evento &quot;Tengoku Game&quot;, aceptas los siguientes términos de exoneración de responsabilidad:</p>
        
        <ol className="list-inside space-y-4 text-lg">
          <li>
            <h2 className="font-semibold text-xl text-gray-500">1. Riesgos de Participación</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>Las actividades del evento pueden implicar riesgos físicos, como lesiones, accidentes o daños a la propiedad.</li>
              <li>El participante asume toda la responsabilidad por cualquier lesión o daño que pueda ocurrir durante su participación en las pruebas físicas.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">2. Exoneración de Responsabilidad</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>La organización del evento no será responsable por cualquier tipo de perjuicio, daño o lesión que ocurra durante el evento.</li>
              <li>El participante acepta que la organización no será responsable por las consecuencias de su participación en las actividades físicas del evento.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">3. Salud del Participante</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>El participante confirma que está en buenas condiciones físicas y que tiene la capacidad para participar en las actividades del evento.</li>
              <li>Si el participante tiene alguna condición médica que podría afectar su rendimiento, es su responsabilidad consultar con un profesional de la salud antes de participar.</li>
            </ul>
          </li>

          <li>
            <h2 className="font-semibold text-xl text-gray-500">4. Uso de Imágenes</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-200">
              <li>La organización podrá tomar fotografías y videos durante el evento, los cuales pueden ser utilizados con fines promocionales sin compensación adicional al participante.</li>
            </ul>
          </li>
        </ol>

        <div className="mt-6 text-center">
          <p className="text-lg text-red-500">
            Al participar en este evento, confirmas que has leído, entendido y aceptas esta Renuncia de Responsabilidad.
          </p>
        </div>
      </div>
    </div>
  );
}
