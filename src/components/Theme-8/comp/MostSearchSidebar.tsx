import { apiMostSearch } from '@/apis/user';
import Link from 'next/link';

const MostSearchSidebar = async ({ company_id }: any) => {
    const most_search = (await apiMostSearch(company_id))?.data;
    if (!most_search?.length) return null;

    return (
        <div className="space-y-4">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Frequent Searches</h3>
            <div className="flex flex-wrap gap-2">
                {most_search.map((tag: string, i: number) => (
                    <Link key={i} href={`/search?query=${tag}`} 
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200">
                        {tag}
                    </Link>
                ))}
            </div>
        </div>
    )
}
export default MostSearchSidebar;