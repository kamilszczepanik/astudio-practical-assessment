import { Button } from "../ui/button";
import { useTable } from "../../context/TableContext";

export const Pagination = () => {
  const { currentPage, setCurrentPage, totalItems, entriesPerPage } = useTable();
  const totalPages = Math.ceil(totalItems / entriesPerPage);

  const getPageNumbers = () => {
    const maxVisibleButtons = 5;
    const array = [];

    if (totalPages <= maxVisibleButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      array.push(1);
      array.push("...");
      for (let i = totalPages - 3; i <= totalPages; i++) {
        array.push(i);
      }
    } else {
      array.push(1);
      array.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPages);
    }

    return array;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      >
        ←
      </Button>

      {getPageNumbers().map((pageNumber, idx) =>
        pageNumber === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-1">
            ...
          </span>
        ) : (
          <Button
            key={`page-${pageNumber}`}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPage(pageNumber as number)}
            className={currentPage === pageNumber ? "pb-4" : ""}
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        →
      </Button>
    </div>
  );
}; 