"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiGetAllKeywords, apiSearchResult } from "@/apis/user";
import { getCategoryHref, getMerchantHref } from "@/constants/hooks";
import { SearchCategories, SearchMerchant } from "@/services/dataTypes";
import { FaStore, FaTags, FaListUl, FaSearch, FaTimes } from "react-icons/fa";

interface Props {
  companyId: string; mer_slug: string; slug_type: string; cat_slug: string;
}

let timeoutId: any = null;

const NavSearch = ({ companyId, mer_slug, slug_type, cat_slug }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const [search, setSearch] = useState<string>(params.get("query") || "");
  const [tagsData, setTagsData] = useState<string[]>([]);
  const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
  const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeywords = async () => {
      const response = await apiGetAllKeywords(companyId);
      if (response?.data) setTagsData(response.data);
    };
    handleKeywords();
  }, [companyId]);

  const handleSearch = async () => {
    try {
      if (search.trim().length >= 3) {
        const response = await apiSearchResult(search, companyId);
        setCategoriesData(response.data?.categories || []);
        setMerchantData(response.data?.merchants || []);
        setIsOpen(!!(pathName !== "/search" && (response.data?.merchants.length || response.data?.categories.length)));
      } else {
        setCategoriesData([]);
        setMerchantData([]);
      }
    } catch (error) { console.error("Search error:", error); }
  };

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (search.trim() === "") { setMerchantData([]); setCategoriesData([]); }
      else { handleSearch(); }
    }, 500);
  }, [search]);

  const clearSearch = () => { setSearch(""); setIsOpen(false); };

  return (
    <div className="relative w-full group/search">
      <div className="flex items-center bg-white/50 backdrop-blur-sm rounded-2xl border border-[#800000]/10 focus-within:bg-white focus-within:border-[#800000]/40 focus-within:shadow-[0_10px_30px_rgba(128,0,0,0.05)] transition-all duration-500 px-4 py-1.5">
        <FaSearch className="text-slate-400 group-focus-within/search:text-[#800000] transition-colors mr-3 text-sm" />
        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 250)}
          placeholder="Search stores or deals..."
          className="flex-1 bg-transparent outline-none text-[14px] text-slate-700 placeholder-slate-400 font-medium py-2"
        />
        {search && (
          <button onClick={clearSearch} className="p-1 hover:bg-slate-100 rounded-full transition-colors mr-2">
            <FaTimes className="text-slate-400 text-[10px]" />
          </button>
        )}
        <button
          onClick={() => search && router.push(`/search?query=${search}`)}
          className="bg-[#800000] hover:bg-[#600000] text-white px-5 py-2 rounded-xl text-[13px] font-bold transition-all active:scale-95 shadow-md shadow-[#800000]/10"
        >
          Search
        </button>
      </div>

      {isOpen && (tagsData.length > 0 || merchantData.length > 0 || categoriesData.length > 0) && (
        <div className="absolute left-0 mt-4 w-[520px] bg-[#FEF9E7] backdrop-blur-xl rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.15)] z-[999] max-h-[480px] overflow-y-auto no-scrollbar border border-white/60 p-2 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="p-5 space-y-7">
            {merchantData.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">
                  <FaStore className="text-[#800000]/60" /> Top Merchants
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {merchantData.map((merchant, i) => (
                    <Link key={i} href={getMerchantHref(merchant, mer_slug, slug_type)} className="no-underline flex items-center gap-3 p-3 rounded-2xl bg-white/40 hover:bg-white transition-all group border border-transparent hover:border-[#800000]/10 hover:shadow-sm">
                      <div className="w-11 h-11 relative bg-white rounded-xl p-2 border border-slate-50 group-hover:scale-105 transition-transform shadow-sm">
                        <Image src={merchant.merchant_logo} alt={merchant.merchant_name} fill className="object-contain p-1.5" />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-[#800000] truncate text-[13px]">{merchant.merchant_name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
            {tagsData.length > 0 && (
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-700 delay-150">
                <h3 className="flex items-center gap-2 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">
                  <FaTags className="text-[#800000]/60" /> Trending Keywords
                </h3>
                <div className="flex flex-wrap gap-2 px-2">
                  {tagsData.slice(0, 8).map((item, i) => (
                    <Link key={i} href={`/search?query=${item}`} className="no-underline text-slate-600 px-4 py-2 bg-white/60 rounded-xl text-[11px] font-bold hover:bg-[#800000] hover:text-white transition-all shadow-sm">
                      #{item}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <style jsx global>{` .no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; } `}</style>
    </div>
  );
};

export default NavSearch;