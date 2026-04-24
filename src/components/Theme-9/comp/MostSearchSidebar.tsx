import { apiMostSearch } from "@/apis/user";
import Link from "next/link";

const MostSearchSidebar = async ({ company_id }: any) => {
  const most_search = (await apiMostSearch(company_id))?.data;
  if (!most_search?.length) return null;

  return (
    <div className="space-y-5">
      {/* Header Section */}
      <h3 className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-[0.3em] flex items-center gap-3">
        Frequent{" "}
        <span className="text-[#800000] font-serif italic lowercase font-normal tracking-normal text-xs">
          Queries
        </span>
        <span className="h-[1px] w-8 bg-[#800000]/20"></span>
      </h3>

      <div className="flex flex-wrap gap-2.5">
        {most_search.map((tag: string, i: number) => (
          <Link
            key={i}
            href={`/search?query=${tag}`}
            className="px-4 py-1.5 bg-[#FDFCF0]/40 border border-[#800000]/5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-[#800000] hover:text-[#FDFCF0] hover:border-[#800000] hover:shadow-lg hover:shadow-[#800000]/10 transition-all duration-500 active:scale-95"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default MostSearchSidebar;
