import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string; // e.g. "/all-products" or `/category/${slug}`
}

const Pagination = async ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) =>
    page === 1 ? baseUrl : `${baseUrl}/page/${page}`;

  // Build pagination items
  const buildPages = (): (number | string)[] => {
    const items: (number | string)[] = [];

    if (totalPages <= 7) {
      // Show all pages
      for (let i = 2; i <= totalPages - 1; i++) items.push(i);
    } else {
      if (currentPage <= 4) {
        items.push(2, 3, 4, 5, "...", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        items.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        items.push(2, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
      }
    }
    return items;
  };

  return (
    <nav className="d-flex justify-content-center my-4" aria-label="Pagination">
      <div className="alphabet-toggle-outer">
        <div
          className="alphabet-toggle-inner d-flex flex-nowrap align-items-center px-2 py-2"
          style={{ gap: 8 }}
        >
          {/* Back Button */}
          {currentPage > 1 && (
            <Link href={getPageUrl(currentPage - 1)} className="alpha-btn-circle">
              <span aria-hidden="true">&larr;</span>
            </Link>
          )}

          {/* Always show first page */}
          <Link
            href={getPageUrl(1)}
            className={`alpha-btn-circle${currentPage === 1 ? " active" : ""}`}
          >
            1
          </Link>

          {/* Dynamic middle */}
          {buildPages().map((p, idx) =>
            p === "..." ? (
              <span
                key={`dots-${idx}`}
                className="alpha-btn-circle disabled"
                style={{
                  pointerEvents: "none",
                  background: "transparent",
                  border: "none",
                }}
              >
                ...
              </span>
            ) : (
              <Link
                key={p}
                href={getPageUrl(p as number)}
                className={`alpha-btn-circle${currentPage === p ? " active" : ""}`}
              >
                {p}
              </Link>
            )
          )}

          {/* Always show last page */}
          {totalPages > 1 && (
            <Link
              href={getPageUrl(totalPages)}
              className={`alpha-btn-circle${currentPage === totalPages ? " active" : ""}`}
            >
              {totalPages}
            </Link>
          )}

          {/* Next Button */}
          {currentPage < totalPages && (
            <Link href={getPageUrl(currentPage + 1)} className="alpha-btn-circle">
              <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Pagination;
