import React from 'react';
import Link from 'next/link';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
}

const Pagination = ({ currentPage, totalPages, baseUrl }: PaginationProps) => {
    if (totalPages <= 1) return null;

    const prevPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;

    return (
        <div className="flex justify-center items-center gap-4 mt-8 pt-10 border-t border-gray-100 pb-10">
            <Link 
                href={`${baseUrl}/page/${prevPage}`}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 no-underline ${currentPage === 1 ? 'border-gray-100 text-gray-300 pointer-events-none' : 'border-[#8bc94a]/30 text-[#8bc94a] hover:bg-[#8bc94a] hover:text-white hover:border-[#8bc94a] shadow-sm hover:shadow-[#8bc94a]/20 hover:-translate-y-1'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" /></svg>
            </Link>
            
            <div className="flex flex-col items-center px-4">
                <span className="text-[14px] font-bold text-gray-700">Page {currentPage}</span>
                <span className="text-[12px] font-medium text-gray-400">out of {totalPages}</span>
            </div>
            
            <Link 
                href={`${baseUrl}/page/${nextPage}`}
                className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 no-underline ${currentPage === totalPages ? 'border-gray-100 text-gray-300 pointer-events-none' : 'border-[#ff912f]/30 text-[#ff912f] hover:bg-[#ff912f] hover:text-white hover:border-[#ff912f] shadow-sm hover:shadow-[#ff912f]/20 hover:-translate-y-1'}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" /></svg>
            </Link>
        </div>
    );
};

export default Pagination;