import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Pagination as PaginationType } from "../../types";
import { SelectLimit } from "./SelectLimit";
interface PaginationProps {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
  onLimitChange?: (limit: number) => void;
}

export const Pagination = ({ pagination, onPageChange, onLimitChange }: PaginationProps) => {
  const { page, total, limit, totalPages, hasNext, hasPrev } = pagination;

  // Calcular rango de elementos mostrados
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-6 border-t border-gray-200">
      <div className="text-sm text-gray-700 order-2 md:order-1">
        <span>Listando </span>
        <span className="font-medium">{startItem}</span>
        <span> - </span>
        <span className="font-medium">{endItem}</span>
        <span> de </span>
        <span className="font-medium">{total}</span>
        <span> usuarios</span>
      </div>
      <div className="flex items-center justify-center md:justify-end gap-2 order-1 md:order-2">
        {onLimitChange && (
          <SelectLimit
            currentLimit={pagination.limit}
            onLimitChange={onLimitChange}
          />
        )}

        <button
          onClick={() => onPageChange(page - 1)}
          disabled={!hasPrev}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers(page, totalPages).map((pageNum, index) => (
            <button
              key={index}
              onClick={() =>
                typeof pageNum === "number" ? onPageChange(pageNum) : undefined
              }
              disabled={pageNum === "..."}
              className={`
                flex items-center justify-center w-8 h-8 rounded-lg text-sm font-medium transition-colors
                ${
                  pageNum === page
                    ? "bg-blue-600 text-white"
                    : pageNum === "..."
                    ? "bg-transparent text-gray-400 cursor-default"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              {pageNum}
            </button>
          ))}
        </div>

        {/* Botón Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={!hasNext}
          className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        {/* Info de página actual */}
        <div className="text-sm text-gray-700 ml-4">
          <span>Página </span>
          <span className="font-medium">{page}</span>
          <span> de </span>
          <span className="font-medium">{totalPages}</span>
        </div>
      </div>
    </div>
  );
};

// Función helper para generar números de página con puntos suspensivos
function getPageNumbers(
  currentPage: number,
  totalPages: number
): (number | "...")[] {
  if (totalPages <= 1) {
    return [1];
  }

  if (totalPages <= 7) {
    // Si hay 7 páginas o menos, mostrar todas
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [];

  // Siempre mostrar la primera página
  pages.push(1);

  if (currentPage > 3) {
    pages.push("...");
  }

  // Mostrar páginas alrededor de la actual
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (currentPage < totalPages - 2) {
    pages.push("...");
  }

  // Siempre mostrar la última página si no está ya incluida
  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
}
