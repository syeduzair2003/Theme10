"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { apiGetAllKeywords, apiSearchResult } from "@/apis/user";
import { getCategoryHref, getMerchantHref } from "@/constants/hooks";
import { SearchCategories, SearchMerchant } from "@/services/dataTypes";
import { FaStore, FaTags, FaListUl, FaSearch } from "react-icons/fa";

interface Props {
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
}

let timeoutId: any = null;

const HeaderSearchBar = ({ companyId, mer_slug, slug_type, cat_slug }: Props) => {
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
        params.delete("query");
        if (pathName) router.replace(pathName);
        setMerchantData([]);
        setCategoriesData([]);
      } else {
        params.set("query", search);
        router.replace(`${pathName || "/"}?query=${search}`);
        handleSearch();
      }
    }, 500);
  }, [search]);

  return (
  <div className="relative w-full max-w-md">

    {/* SEARCH BAR */}
    <div className="flex items-center bg-white rounded-full shadow-md border border-gray-200 focus-within:ring-2 focus-within:ring-[var(--primary-color)] transition px-4 py-2">

      <FaSearch className="text-gray-400 mr-3" />

      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder="Search stores, deals, categories..."
        className="flex-1 bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
      />

      <button
        onClick={() => search && router.push(`/search?query=${search}`)}
        className="bg-[var(--primary-color)] text-white px-4 py-1.5 rounded-full text-sm hover:opacity-90 transition"
      >
        Search
      </button>
    </div>

    {/* DROPDOWN */}
    {isOpen && (tagsData.length > 0 || merchantData.length > 0 || categoriesData.length > 0) && (
      <div className="absolute left-0 mt-3 w-[600px] bg-white rounded-3xl shadow-2xl z-50 max-h-[520px] overflow-y-auto border border-gray-100 animate-fadeIn gradient-scroll">

        <div className="p-6 space-y-8 text-[15px]">

          {/* STORES */}
          {merchantData.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <FaStore className="text-[var(--primary-color)]" /> Stores
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {merchantData.map((merchant, i) => (
                  <Link
                    key={i}
                    href={getMerchantHref(merchant, mer_slug, slug_type)}
                    className="no-underline flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[var(--primary-color)] hover:shadow-md transition group"
                  >
                    <div className="w-12 h-10 relative">
                      <Image src={merchant.merchant_logo} alt={merchant.merchant_name} fill className="object-contain" />
                    </div>
                    <span className="font-medium text-gray-800 group-hover:text-[var(--primary-color)]">
                      {merchant.merchant_name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* CATEGORIES */}
          {categoriesData.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <FaListUl className="text-[var(--primary-color)]" /> Categories
              </h3>

             <div className="flex flex-wrap gap-2">
  {categoriesData.map((category, i) => (
    <Link
      key={i}
      href={getCategoryHref(category, cat_slug, slug_type)}
      className="no-underline !text-black px-4 py-2 bg-gray-100 rounded-full text-sm 
                 hover:bg-[var(--primary-color)] hover:!text-white transition"
    >
      {category.name}
    </Link>
  ))}
</div>

            </div>
          )}

          {/* TAGS */}
          {tagsData.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold mb-4">
                <FaTags className="text-[var(--primary-color)]" /> Popular Tags
              </h3>

              <div className="flex flex-wrap gap-2">
                {tagsData.map((item, i) => (
                  <Link
                    key={i}
                    href={`/search?query=${item}`}
                    className="no-underline !text-black px-4 py-2 bg-gray-100 rounded-full text-sm 
                              hover:bg-[var(--primary-color)] hover:!text-white transition"
                  >
                    {item}
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

export default HeaderSearchBar;
