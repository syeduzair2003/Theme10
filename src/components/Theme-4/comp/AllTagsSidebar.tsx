
import { apiGetAllKeywords } from "@/apis/user";
import Link from "next/link";

interface AllTagsSidebarProps {
    company_id: string;
}

const AllTagsSidebar = async ({ company_id }: AllTagsSidebarProps) => {
    const tagRes = (await apiGetAllKeywords(company_id)).data;
    console.log("tagRes :", tagRes)
    const tags = tagRes || [];

    if (!tags || tags.length === 0) return null;

    return (
    <>
      {/* Mobile Horizontal Scroll */}
      <div className="md:hidden bg-white border border-gray-100 shadow-sm rounded-xl p-3 md:mb-5">
        <h3 className="text-base font-semibold text-gray-900 mb-3">All Tags</h3>
        <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-5">
          {tags.map((tag: string, idx: number) => (
            <Link
              key={idx}
              href={`/search?query=${encodeURIComponent(tag)}`}
              className="
                px-3 py-1.5 
                text-sm font-medium 
                text-gray-700 
                bg-gray-100 
                rounded-full 
                shadow-sm 
                whitespace-nowrap 
                hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-orange-500 
                hover:text-white 
                hover:shadow-md 
                transition-all 
                duration-300 
                ease-in-out
              "
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Vertical List */}
      <aside className="hidden md:block w-72 bg-white shadow-md rounded-2xl border border-gray-100 p-6 h-fit sticky top-24">
        <h3 className="text-lg font-bold text-gray-900 mb-5 flex items-center justify-between border-b pb-3">
          <span>All Tags</span>
        </h3>

        <div className="flex flex-wrap gap-2 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent pr-1">
          {tags.map((tag: string, idx: number) => (
            <Link
              key={idx}
              href={`/search?query=${encodeURIComponent(tag)}`}
              className="
                px-3 py-1.5 
                text-sm font-medium 
                text-gray-700 
                bg-gray-100 
                rounded-full 
                shadow-sm 
                hover:bg-gradient-to-r hover:from-[var(--primary-color)] hover:to-orange-500 
                hover:text-white 
                hover:shadow-md 
                transition-all 
                duration-300 
                ease-in-out
              "
            >
              {tag}
            </Link>
          ))}
        </div>
      </aside>
    </>
  );
};

export default AllTagsSidebar;
