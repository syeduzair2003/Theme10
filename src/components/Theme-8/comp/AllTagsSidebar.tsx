import { apiGetAllKeywords } from '@/apis/user';
import Link from 'next/link';

const AllTagsSidebar = async ({ company_id }: any) => {
    const all_tags = (await apiGetAllKeywords(company_id)).data;
    
    if (!all_tags?.length) return null;

    return (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
            {/* Header with decorative line */}
            <div className="flex items-center gap-3 mb-6">
                <h3 className="text-[11px] font-black text-black uppercase tracking-[0.2em] whitespace-nowrap">
                    Popular Tags
                </h3>
                <div className="h-[1px] w-full bg-slate-100" />
            </div>

            {/* Tags Container */}
            <div className="flex flex-wrap gap-2.5">
                {all_tags.map((tag: string, i: number) => (
                    <Link 
                        key={i} 
                        href={`/search?query=${tag}`} 
                        className="group relative no-underline inline-flex items-center"
                    >
                        {/* Shadow Glow Effect on Hover */}
                        <div className="absolute inset-0 bg-indigo-500/20 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Main Tag Body */}
                        <div className="relative px-4 py-2 bg-white border border-slate-200 rounded-full 
                                      flex items-center gap-1.5 transition-all duration-300 
                                      group-hover:-translate-y-1 group-hover:border-indigo-500 group-hover:shadow-[0_10px_20px_-10px_rgba(79,70,229,0.4)]">
                            
                            {/* Animated Hash Icon */}
                            <span className="text-slate-300 font-black text-xs group-hover:text-indigo-500 transition-colors duration-300">
                                #
                            </span>
                            
                            {/* Tag Text */}
                            <span className="text-[11px] font-bold text-slate-500 group-hover:text-slate-900 transition-colors duration-300">
                                {tag}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Subtle Footer Suggestion */}
            <p className="mt-5 text-[10px] text-slate-400 font-medium italic">
                Click a tag to explore related deals.
            </p>
        </div>
    )
}

export default AllTagsSidebar;