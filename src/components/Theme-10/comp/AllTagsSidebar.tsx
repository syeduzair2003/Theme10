import { apiGetAllKeywords } from "@/apis/user";
import Link from "next/link";

const AllTagsSidebar = async ({ company_id }: any) => {
  const all_tags = (await apiGetAllKeywords(company_id)).data;

  if (!all_tags?.length) return null;

  return (
    <div className="bg-white rounded-[2rem] p-8 border border-[#800000]/5 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.03)]">
  {/* Header with Elite Line Style */}
  <div className="flex items-center gap-4 mb-8">
    <h3 className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-[0.4em] whitespace-nowrap">
      Signature <span className="text-[#800000] font-serif italic lowercase font-normal tracking-normal text-xs">Tags</span>
    </h3>
    <div className="h-[1px] w-full bg-gradient-to-r from-[#800000]/10 to-transparent" />
  </div>

  {/* Tags Container */}
  <div className="flex flex-wrap gap-3">
    {all_tags.map((tag: string, i: number) => (
      <Link
        key={i}
        href={`/search?query=${tag}`}
        className="group relative no-underline inline-flex items-center"
      >
        {/* Elite Maroon Glow Effect */}
        <div className="absolute inset-0 bg-[#800000]/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Main Tag Body */}
        <div
          className="relative px-5 py-2.5 bg-[#FDFCF0]/30 border border-[#800000]/5 rounded-xl 
                     flex items-center gap-2 transition-all duration-500 
                     group-hover:-translate-y-1.5 group-hover:bg-white group-hover:border-[#800000]/20 
                     group-hover:shadow-[0_15px_30px_-10px_rgba(128,0,0,0.15)]"
        >
          <span className="text-[#800000]/30 font-black text-[10px] group-hover:text-[#800000] transition-colors duration-300">
            #
          </span>

          <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-[#1A1A1A] transition-colors duration-300">
            {tag}
          </span>
        </div>
      </Link>
    ))}
  </div>

  {/* Subtle Footer Suggestion */}
  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center gap-2">
     <div className="w-1 h-1 bg-[#800000]/30 rounded-full animate-pulse"></div>
     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest opacity-70">
       Select a tag to filter premium deals
     </p>
  </div>
</div>
  );
};

export default AllTagsSidebar;
