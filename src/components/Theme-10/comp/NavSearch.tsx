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
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
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
        setIsOpen(
          !!(
            pathName !== "/search" &&
            (response.data?.merchants.length || response.data?.categories.length)
          )
        );
      } else {
        setCategoriesData([]);
        setMerchantData([]);
      }
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        setMerchantData([]);
        setCategoriesData([]);
      } else {
        handleSearch();
      }
    }, 500);
  }, [search]);

  const clearSearch = () => {
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-lg">
      {/* SEARCH BAR */}
      <div className="group flex items-center bg-slate-50 rounded-2xl border border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300 px-4 py-3">
        <FaSearch className="text-slate-400 group-focus-within:text-blue-500 transition-colors mr-3" />

        <input
          ref={inputRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 250)}
          placeholder="Search stores, deals, categories..."
          className="flex-1 bg-transparent outline-none text-[15px] text-slate-700 placeholder-slate-400 font-medium"
        />

        {search && (
          <button onClick={clearSearch} className="p-1 hover:bg-slate-200 rounded-full transition-colors mr-2">
            <FaTimes className="text-slate-400 text-xs" />
          </button>
        )}

        <button
          onClick={() => search && router.push(`/search?query=${search}`)}
          // 1. Inline style hamesha kaam karega chahe Tailwind config kuch bhi ho
          style={{ backgroundColor: '#7992f8' }} 
          className="text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-200 transition-all active:scale-95 hover:opacity-90"
        >
          Search
        </button>
      </div>

      {/* DROPDOWN */}
      {isOpen && (tagsData.length > 0 || merchantData.length > 0 || categoriesData.length > 0) && (
        <div className="absolute left-0 mt-4 w-[550px] bg-white/95 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[999] max-h-[550px] overflow-y-auto border border-white p-2 animate-in fade-in slide-in-from-top-4 duration-300">
          
          <div className="p-4 space-y-6">
            
            {/* STORES SECTION */}
            {merchantData.length > 0 && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-75">
                <div className="flex items-center justify-between mb-3 px-2">
                   <h3 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
                    <FaStore className="text-blue-500" /> Stores
                  </h3>
                  <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">MATCHES</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {merchantData.map((merchant, i) => (
                    <Link
                      key={i}
                      href={getMerchantHref(merchant, mer_slug, slug_type)}
                      className="no-underline flex items-center gap-3 p-3 rounded-2xl bg-slate-50 hover:bg-blue-600 transition-all group border border-transparent hover:shadow-lg hover:shadow-blue-200"
                    >
                      <div className="w-12 h-10 relative bg-white rounded-lg p-1 border border-slate-100 group-hover:border-white/20 transition-colors">
                        <Image src={merchant.merchant_logo} alt={merchant.merchant_name} fill className="object-contain p-1" />
                      </div>
                      <span className="font-bold text-slate-700 group-hover:text-white truncate text-sm">
                        {merchant.merchant_name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CATEGORIES SECTION */}
            {categoriesData.length > 0 && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-150">
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
                  <FaListUl className="text-indigo-500" /> Top Categories
                </h3>

                <div className="flex flex-wrap gap-2 px-2">
                  {categoriesData.map((category, i) => (
                    <Link
                      key={i}
                      href={getCategoryHref(category, cat_slug, slug_type)}
                      className="no-underline text-slate-600 px-4 py-2 bg-slate-100 rounded-xl text-xs font-bold hover:bg-indigo-500 hover:text-white transition-all hover:-translate-y-0.5"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* POPULAR TAGS SECTION */}
            {tagsData.length > 0 && (
              <div className="animate-in fade-in slide-in-from-left-2 duration-500 delay-200">
                 <h3 className="flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest mb-3 px-2">
                  <FaTags className="text-emerald-500" /> Popular
                </h3>

                <div className="flex flex-wrap gap-2 px-2 pb-2">
                  {tagsData.slice(0, 10).map((item, i) => (
                    <Link
                      key={i}
                      href={`/search?query=${item}`}
                      className="no-underline text-slate-500 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium hover:border-emerald-500 hover:text-emerald-600 transition-all"
                    >
                      #{item}
                    </Link>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
};

export default NavSearch;