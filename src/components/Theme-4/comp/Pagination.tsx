"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface PaginationProps {
  page?: string;
  pagination: { last_page: number };
  basePath: string;
}

const Pagination = ({ page = "1", pagination, basePath }: PaginationProps) => {
  const totalPages = Math.max(1, pagination?.last_page || 1);
  const currentPage = Math.max(1, parseInt(page || "1", 10));

  // mobile -> 4, desktop -> 6
  const [maxVisible, setMaxVisible] = useState<number>(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 639px)").matches ? 4 : 6
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setMaxVisible(mq.matches ? 4 : 6);

    // Initial set (in case SSR hydration differs)
    update();

    // Add listener (modern + fallback)
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    } else {
      mq.addListener(update);
      return () => {
        mq.removeListener(update);
      };
    }
  }, []);

  const createPageLink = (pageNum: number) =>
    pageNum === 1 ? basePath : `${basePath}/page/${pageNum}`;

  const getPages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible + 2) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const half = Math.floor(maxVisible / 2);
    let start = Math.max(2, currentPage - half);
    let end = Math.min(totalPages - 1, currentPage + half);

    if (currentPage <= half + 1) {
      start = 2;
      end = maxVisible;
    } else if (currentPage >= totalPages - half) {
      start = totalPages - maxVisible + 1;
      end = totalPages - 1;
    }

    pages.push(1);
    if (start > 2) pages.push("...");
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push("...");
    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex items-center space-x-2" aria-label="Pagination">
        {/* Prev */}
        {currentPage > 1 && (
          <Link
            href={currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300  no-underline text-black font-medium"
            aria-label="Previous page"
          >
            Prev
          </Link>
        )}

        {/* Page buttons */}
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`dots-${i}`} className="px-3 py-2 rounded bg-gray-200">
              ...
            </span>
          ) : (
            <Link
              key={p}
              href={createPageLink(p as number)}
              className={`px-3 py-2 rounded  no-underline text-black font-medium ${
                currentPage === p ? "bg-[var(--primary-color)] text-white" : "bg-gray-200 hover:bg-gray-300"
              }`}
              aria-current={currentPage === p ? "page" : undefined}
            >
              {p}
            </Link>
          )
        )}

        {/* Next */}
        {currentPage < totalPages && (
          <Link
            href={`${basePath}/page/${currentPage + 1}`}
            className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300  no-underline text-black font-medium"
            aria-label="Next page"
          >
            Next
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
