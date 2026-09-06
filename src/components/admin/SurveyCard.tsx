// src/components/admin/SurveyCard.tsx
import React from "react";
import { AdminCard } from "./AdminCard";

export interface SurveyData {
  id: string;
  email: string;
  calificacionEvento: number;
  actividadesGustadas: string[];
  opinionPrecio: number;
  comodidadLugar: number;
  facilidadLlegada: number;
  recomendacionTengoku: number;
  sugerencias?: string | null;
  suscribirNovedades: boolean;
  createdAt: string | Date;
}

export const SurveyCard: React.FC<{ survey: SurveyData }> = ({ survey }) => {
  const formattedDate = new Date(survey.createdAt).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <AdminCard className="h-full flex flex-col justify-between text-left p-4">
      <div className="space-y-3">
        {/* Header: Manejo limpio de overflow y layout flexible */}
        <div className="border-b border-[#1e293b] pb-3">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span 
              className="text-[#ff0080] font-bold text-sm sm:text-base truncate min-w-0" 
              title={survey.email}
            >
              {survey.email}
            </span>
            <span className="text-[11px] text-gray-400 shrink-0 font-medium">
              {formattedDate}
            </span>
          </div>

          {survey.suscribirNovedades && (
            <span className="inline-block text-[10px] bg-[#ff0080]/15 text-[#ff0080] border border-[#ff0080]/30 px-2 py-0.5 rounded-full font-semibold">
              Newsletter
            </span>
          )}
        </div>

        {/* Métricas: Grid adaptativo de 2 a 3 columnas para evitar texto apretado */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-center text-xs">
          <div className="bg-[#0b0f19] p-1.5 rounded border border-[#1e293b]">
            <p className="text-[10px] text-gray-400">Evento</p>
            <p className="font-bold text-white">{survey.calificacionEvento}/10</p>
          </div>
          <div className="bg-[#0b0f19] p-1.5 rounded border border-[#1e293b]">
            <p className="text-[10px] text-gray-400">Precio</p>
            <p className="font-bold text-white">{survey.opinionPrecio}/10</p>
          </div>
          <div className="bg-[#0b0f19] p-1.5 rounded border border-[#1e293b]">
            <p className="text-[10px] text-gray-400">Comodidad</p>
            <p className="font-bold text-white">{survey.comodidadLugar}/10</p>
          </div>
          <div className="bg-[#0b0f19] p-1.5 rounded border border-[#1e293b]">
            <p className="text-[10px] text-gray-400">Llegada</p>
            <p className="font-bold text-white">{survey.facilidadLlegada}/10</p>
          </div>
          <div className="bg-[#0b0f19] p-1.5 rounded border border-[#1e293b] col-span-2 sm:col-span-2">
            <p className="text-[10px] text-gray-400">Recomendación</p>
            <p className="font-bold text-[#ff0080]">{survey.recomendacionTengoku}/10</p>
          </div>
        </div>

        {/* Actividades Destacadas */}
        {survey.actividadesGustadas && survey.actividadesGustadas.length > 0 && (
          <div>
            <p className="text-[11px] font-semibold text-gray-400 mb-1">Destacadas:</p>
            <div className="flex flex-wrap gap-1">
              {survey.actividadesGustadas.map((act, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-[#1e293b] text-gray-200 px-2 py-0.5 rounded border border-[#334155] break-words max-w-full"
                >
                  {act}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sugerencias */}
      {survey.sugerencias && (
        <div className="mt-3 pt-2 border-t border-[#1e293b]/60">
          <p className="text-[11px] font-semibold text-gray-400 mb-1">Sugerencia:</p>
          <p className="text-xs text-gray-300 italic bg-[#0b0f19]/70 p-2 rounded border border-[#1e293b] break-words">
            &quot;{survey.sugerencias}&quot;
          </p>
        </div>
      )}
    </AdminCard>
  );
};