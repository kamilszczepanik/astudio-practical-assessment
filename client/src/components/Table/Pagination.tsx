import { Button } from "../ui/button";

interface Props {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  setCurrentPage,
}: Props) => {
  const totalPagesCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getPageNumbers = () => {
    const maxVisibleButtons = 5;
    const array = [];

    if (totalPagesCount <= maxVisibleButtons) {
      return Array.from({ length: totalPagesCount }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPagesCount);
    } else if (currentPage >= totalPagesCount - 2) {
      array.push(1);
      array.push("...");
      for (let i = totalPagesCount - 3; i <= totalPagesCount; i++) {
        array.push(i);
      }
    } else {
      array.push(1);
      array.push("...");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        array.push(i);
      }
      array.push("...");
      array.push(totalPagesCount);
    }

    return array;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
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
            onClick={() => handlePageChange(pageNumber as number)}
            className={currentPage === pageNumber ? "pb-4" : ""}
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() =>
          handlePageChange(Math.min(totalPagesCount, currentPage + 1))
        }
        disabled={currentPage === totalPagesCount}
      >
        →
      </Button>
    </div>
  );
};
