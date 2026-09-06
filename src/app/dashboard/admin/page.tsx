// src/app/dashboard/admin/page.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AdminCard } from "@/src/components/admin/AdminCard";
import { SurveyCard, SurveyData } from "@/src/components/admin/SurveyCard";
import { Pagination } from "@/src/components/pagination/Pagination";

export default function DashboardAdminPage() {
  const [surveys, setSurveys] = useState<SurveyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de Paginación (por defecto 6 o 9 para llenar grillas de 2 o 3 columnas)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const res = await fetch("/api/admin/surveys/fetchAll");
        if (!res.ok) throw new Error("Error en la petición");
        const data = await res.json();
        if (data && Array.isArray(data.encuestas)) {
          setSurveys(data.encuestas);
        }
      } catch (err) {
        console.error("Error al cargar encuestas:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const totalPages = Math.ceil(surveys.length / pageSize) || 1;

  const currentSurveys = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return surveys.slice(start, start + pageSize);
  }, [surveys, currentPage, pageSize]);

  return (
    <div className="w-full mt-10 space-y-6">
      {/* Banner / Header */}
      <div className="text-center my-6">
        <h1 className="inline-block bg-[#ff0080] text-white text-2xl md:text-3xl font-extrabold px-8 py-2 rounded-md shadow-lg uppercase tracking-wider">
          Dashboard de Encuestas
        </h1>
        <p className="text-gray-400 text-sm mt-3">
          Total respuestas recibidas: <span className="text-white font-bold">{surveys.length}</span>
        </p>
      </div>

      {/* Contenido principal */}
      {loading ? (
        <AdminCard className="text-center py-10">
          <p className="text-gray-400">Cargando encuestas...</p>
        </AdminCard>
      ) : surveys.length === 0 ? (
        <AdminCard className="text-center py-10">
          <p className="text-gray-400">No hay encuestas registradas todavía.</p>
        </AdminCard>
      ) : (
        <div className="space-y-6 w-full">
          {/* Barra de Paginación Superior */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={[6, 12, 24, 48]}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />

         {/* Grilla responsiva adaptada según ancho */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
            {currentSurveys.map((survey) => (
              <SurveyCard key={survey.id || survey.email} survey={survey} />
            ))}
          </div>

          {/* Barra de Paginación Inferior */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            pageSize={pageSize}
            pageSizeOptions={[6, 12, 24, 48]}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}
    </div>
  );
}