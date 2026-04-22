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
        items.push(
          "...",
          totalPages - 4,
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
        );
      } else {
        items.push(
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages - 1,
        );
      }
    }
    return items;
  };

  return (
   <nav
  className="flex justify-center items-center py-6 md:py-10 px-4 w-full"
  aria-label="Pagination"
>
  {/* Capsule Container: 'overflow-x-auto' for scrolling, 'whitespace-nowrap' to keep it in one line */}
  <div className="no-scrollbar flex items-center gap-1 md:gap-2 p-1.5 md:p-2 bg-[#FDFBE7]/60 backdrop-blur-md border border-[#EADDCA] rounded-full shadow-sm max-w-full overflow-x-auto whitespace-nowrap">
    
    {/* Previous Button */}
    <Link
      href={getPageUrl(currentPage - 1)}
      className={`no-underline flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
        currentPage > 1
          ? "text-[#1A1A1A] hover:bg-[#800000] hover:text-white hover:scale-110 active:scale-95 shadow-sm bg-white md:bg-transparent"
          : "text-[#EADDCA] pointer-events-none"
      }`}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </Link>

    <div className="flex items-center gap-1">
      {/* First Page */}
      <Link
        href={getPageUrl(1)}
        className={`flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-black transition-all duration-300 ${
          currentPage === 1
            ? "bg-[#800000] text-white shadow-lg shadow-[#800000]/20 scale-105 md:scale-110"
            : "text-[#4A4A4A] hover:bg-[#800000]/5 hover:text-[#800000]"
        }`}
      >
        1
      </Link>

      {/* Dynamic Middle Pages */}
      {buildPages().map((p, idx) =>
        p === "..." ? (
          <span
            key={`dots-${idx}`}
            className="flex-shrink-0 flex items-center justify-center w-6 md:w-8 h-9 md:h-10 text-[#EADDCA] font-bold text-xs"
          >
            •••
          </span>
        ) : (
          <Link
            key={p}
            href={getPageUrl(p as number)}
            className={`flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-black transition-all duration-300 ${
              currentPage === p
                ? "bg-[#800000] text-white shadow-lg shadow-[#800000]/20 scale-105 md:scale-110"
                : "text-[#4A4A4A] hover:bg-[#800000]/5 hover:text-[#800000]"
            }`}
          >
            {p}
          </Link>
        ),
      )}

      {/* Last Page */}
      {totalPages > 1 && (
        <Link
          href={getPageUrl(totalPages)}
          className={`flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full text-xs md:text-sm font-black transition-all duration-300 ${
            currentPage === totalPages
              ? "bg-[#800000] text-white shadow-lg shadow-[#800000]/20 scale-105 md:scale-110"
              : "text-[#4A4A4A] hover:bg-[#800000]/5 hover:text-[#800000]"
          }`}
        >
          {totalPages}
        </Link>
      )}
    </div>

    {/* Next Button */}
    <Link
      href={getPageUrl(currentPage + 1)}
      className={`no-underline flex-shrink-0 flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full transition-all duration-300 ${
        currentPage < totalPages
          ? "text-[#1A1A1A] hover:bg-[#800000] hover:text-white hover:scale-110 active:scale-95 shadow-sm bg-white md:bg-transparent"
          : "text-[#EADDCA] pointer-events-none"
      }`}
    >
      <svg
        className="w-4 h-4 md:w-5 md:h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  </div>
</nav>
  );
};

export default Pagination;
