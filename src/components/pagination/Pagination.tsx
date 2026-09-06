// src/components/admin/Pagination.tsx
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
}) => {
  if (totalPages <= 0) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#131b2e]/80 border border-[#1e293b] rounded-xl p-4 text-sm text-gray-300 backdrop-blur-md">
      {/* Control de registros por página */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">Mostrar:</span>
        <select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1); // Resetea a la primera página al cambiar tamaño
          }}
          className="bg-[#0b0f19] text-white border border-[#1e293b] rounded px-2 py-1 text-xs focus:outline-none focus:border-[#ff0080]"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option} por página
            </option>
          ))}
        </select>
      </div>

      {/* Navegación de páginas */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-[#0b0f19] border border-[#1e293b] rounded disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#ff0080] transition-colors text-xs font-semibold"
        >
          Anterior
        </button>

        <span className="text-xs text-gray-400">
          Página <strong className="text-white">{currentPage}</strong> de{" "}
          <strong className="text-white">{totalPages}</strong>
        </span>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-[#0b0f19] border border-[#1e293b] rounded disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#ff0080] transition-colors text-xs font-semibold"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};