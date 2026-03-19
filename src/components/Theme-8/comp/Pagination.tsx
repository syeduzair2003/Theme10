import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageUrl = (page: number) =>
    page === 1 ? baseUrl : `${baseUrl}/page/${page}`;

  const buildPages = (): (number | string)[] => {
    const items: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 2; i <= totalPages - 1; i++) items.push(i);
    } else {
      if (currentPage <= 4) {
        items.push(2, 3, 4, 5, "...", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        items.push("...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        items.push("...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
      }
    }
    return items;
  };

  return (
    <nav className="flex justify-center items-center py-10" aria-label="Pagination">
      <div className="flex items-center gap-2 p-2 bg-white/60 backdrop-blur-md border border-gray-100 rounded-[2rem] shadow-sm">
        
        {/* Previous Button */}
        <Link
          href={getPageUrl(currentPage - 1)}
          className={`no-underline flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            currentPage > 1 
            ? "text-gray-600 hover:bg-gray-100 hover:scale-110 active:scale-95" 
            : "text-gray-300 pointer-events-none"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </Link>

        <div className="flex items-center gap-1">
          {/* First Page */}
          <Link
            href={getPageUrl(1)}
            className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
              currentPage === 1
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                : "text-gray-500 hover:bg-gray-50 hover:text-black"
            }`}
          >
            1
          </Link>

          {/* Dynamic Middle Pages */}
          {buildPages().map((p, idx) =>
            p === "..." ? (
              <span
                key={`dots-${idx}`}
                className="flex items-center justify-center w-8 h-10 text-gray-400 font-bold"
              >
                •••
              </span>
            ) : (
              <Link
                key={p}
                href={getPageUrl(p as number)}
                className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
                  currentPage === p
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                }`}
              >
                {p}
              </Link>
            )
          )}

          {/* Last Page */}
          {totalPages > 1 && (
            <Link
              href={getPageUrl(totalPages)}
              className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${
                currentPage === totalPages
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110"
                  : "text-gray-500 hover:bg-gray-50 hover:text-black"
              }`}
            >
              {totalPages}
            </Link>
          )}
        </div>

        {/* Next Button */}
        <Link
          href={getPageUrl(currentPage + 1)}
          className={`no-underline flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
            currentPage < totalPages
            ? "text-gray-600 hover:bg-gray-100 hover:scale-110 active:scale-95"
            : "text-gray-300 pointer-events-none"
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Pagination;