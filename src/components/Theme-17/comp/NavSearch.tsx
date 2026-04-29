"use client";
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState, Suspense } from 'react';
import Image from "next/image";
import { SearchCategories, SearchMerchant } from '@/services/dataTypes';
import { keywordsAction, searchAction } from '@/app/actions/index';
import { getCategoryHref, getMerchantHref } from '@/constants/hooks';
import { FontAwesomeIcon } from '@/constants/icons';
import { faStore, faTags, faBoxOpen, faSearch, faArrowRight } from '@fortawesome/free-solid-svg-icons';

interface Props {
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
}

const SearchBar = ({ companyId, mer_slug, slug_type, cat_slug }: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState<string>(params.get('query') || "");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [tagsData, setTagsData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
  const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
  const [errMsg, setErrMessage] = useState({ show: false, err: false, msg: '' });
  const [loading, setLoading] = useState(false);
  
  const pathName = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleKeywords = async () => {
    const response = await keywordsAction(companyId);
    if (response?.data) setTagsData(response.data);
  };

  useEffect(() => { handleKeywords(); }, [companyId]);

  const handleSearch = async (searchTerm: string) => {
    try {
      if (searchTerm.trim().length >= 3) {
        setLoading(true);
        const response = await searchAction(searchTerm, companyId);
        if (response?.data?.merchants?.length > 0 || response?.data?.categories?.length > 0) {
          setCategoriesData(response.data?.categories || []);
          setMerchantData(response.data?.merchants || []);
          setIsDropdownVisible(!!(pathName !== '/search'));
          setErrMessage({ show: false, err: false, msg: '' });
        } else {
          setMerchantData([]);
          setCategoriesData([]);
          setErrMessage({ show: true, err: true, msg: 'No gear found matching your search.' });
        }
      } else {
        setMerchantData([]);
        setCategoriesData([]);
        setErrMessage({ show: true, err: true, msg: 'Search requires at least 3 characters.' });
      }
    } catch {
      setErrMessage({ show: true, err: true, msg: 'Connectivity issue. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderMerchant = (merchant: SearchMerchant) => (
    <Link
      key={merchant.merchant_name}
      href={getMerchantHref<SearchMerchant>(merchant, mer_slug, slug_type)}
      className="flex flex-col items-center justify-center p-2 border border-white/5 rounded-2xl bg-[#0F172A]/40 backdrop-blur-sm hover:bg-indigo-500/10 hover:border-indigo-500/40 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)] transition-all w-[105px] h-[105px] group/item"
    >
      <div className="h-[55px] w-full flex items-center justify-center mb-1.5 p-1">
        {merchant.merchant_logo ? (
          <Image
            src={merchant.merchant_logo}
            alt={merchant.merchant_name}
            width={75}
            height={45}
            style={{ objectFit: "contain" }}
            className="block group-hover/item:scale-110 transition-transform duration-300"
          />
        ) : (
          <span className="text-slate-600 text-[10px] uppercase font-bold">No Image</span>
        )}
      </div>
      <div className="text-center w-full px-1">
        <strong className="text-[11px] text-slate-300 group-hover/item:text-indigo-400 line-clamp-2 leading-tight font-medium">
          {merchant.merchant_name}
        </strong>
      </div>
    </Link>
  );

  const renderCategories = (category: SearchCategories) => (
    <Link
      key={category?.name}
      href={getCategoryHref<SearchCategories>(category, cat_slug, slug_type)}
      className="inline-flex no-underline group"
    >
      <div className="px-4 py-1.5 border border-white/10 rounded-xl bg-white/5 group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-300 shadow-sm">
        <span className="text-[12px] font-semibold text-slate-300 group-hover:text-white transition-colors">
          {category?.name}
        </span>
      </div>
    </Link>
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        setMerchantData([]);
        setCategoriesData([]);
        setErrMessage({ show: false, err: false, msg: '' });
      } else {
        handleSearch(search);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, companyId]);

  useEffect(() => {
    const query = params.get('query') || "";
    if (query !== search && document.activeElement !== inputRef.current) {
      setSearch(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (pathName === '/search') setIsDropdownVisible(false);
  }, [pathName]);

  const submitSearchNow = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchWrapperRef} className="relative w-full max-w-[400px] xl:max-w-[480px]">
      {/* Input Container - Electric Indigo Focus */}
      <div className="relative flex items-center bg-[#1E293B]/60 backdrop-blur-2xl rounded-2xl px-5 py-[10px] shadow-2xl border border-white/10 transition-all duration-300 focus-within:border-indigo-500/50 focus-within:shadow-[0_0_20px_rgba(99,102,241,0.15)] w-full">
        <input 
          type="text" 
          placeholder="Search for pro gear, drones, cameras..." 
          className="bg-transparent border-none outline-none text-[14px] w-full text-white placeholder-slate-400 font-medium z-10"
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && search.trim()) {
              submitSearchNow();
            }
          }}
          aria-label="Search tech gear"
        />
        <button 
          className="text-slate-400 hover:text-indigo-400 transition-all ml-2 z-10 active:scale-90" 
          onClick={submitSearchNow}
          aria-label="Search submit"
        >
          <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
        </button>

        {/* Dropdown - Tech-Rent Night Mode */}
        {isDropdownVisible && (search.trim().length > 0 || tagsData.length > 0) && (
          <div className="absolute left-0 right-0 top-full mt-3 w-full sm:w-[500px] opacity-100 visible transition-all z-[60]">
            <div className="bg-[#0F172A] p-5 sm:p-6 rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] border border-white/10 max-h-[75vh] overflow-y-auto custom-scrollbar backdrop-blur-3xl">
              
              {loading && search.trim().length >= 3 && merchantData.length === 0 && categoriesData.length === 0 && !errMsg.show && (
                <div className="text-center text-[13px] py-6 text-indigo-400 font-bold flex items-center justify-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin"></div>
                  Scanning Database...
                </div>
              )}

              {errMsg.show && search.trim().length > 0 && !loading && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                  <p className={`text-[13px] text-center font-semibold ${errMsg.err ? 'text-red-400' : 'text-indigo-400'}`}>
                    {errMsg.msg}
                  </p>
                </div>
              )}

              {/* Stores / Merchants - Professional Grid */}
              {merchantData.length > 0 && !loading && (
                <div className="mb-6">
                  <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center">
                    <FontAwesomeIcon icon={faStore} className="mr-2 text-indigo-500 w-3.5 h-3.5" />
                    Authorized Merchants
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {merchantData.slice(0, 8).map(renderMerchant)}
                  </div>
                </div>
              )}

              {/* Categories - Chip Style */}
              {categoriesData.length > 0 && !loading && (
                <div className="mb-6">
                  <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center">
                    <FontAwesomeIcon icon={faBoxOpen} className="mr-2 text-indigo-500 w-3.5 h-3.5" />
                    Gear Categories
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {categoriesData.slice(0, 10).map(renderCategories)}
                  </div>
                </div>
              )}

              {/* Popular Tags - Tech Icons style */}
              {tagsData.length > 0 && search.trim().length === 0 && (
                <div className="mb-2">
                  <p className="text-[12px] font-black text-slate-500 uppercase tracking-[0.15em] mb-4 flex items-center">
                    <FontAwesomeIcon icon={faTags} className="mr-2 text-indigo-500 w-3.5 h-3.5" />
                    Trending Rentals
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {tagsData.map((item: string, i: number) => (
                      <Link
                        key={i}
                        href={`/search?query=${item}`}
                        className="px-4 py-2 bg-white/5 text-slate-300 border border-white/5 text-[12px] font-bold rounded-xl hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {search.trim().length >= 3 && !loading && (merchantData.length > 0 || categoriesData.length > 0) && (
                <div className="mt-5 pt-5 border-t border-white/5 text-center">
                  <button 
                    onClick={submitSearchNow}
                    className="group text-[13px] font-black text-indigo-400 hover:text-indigo-300 transition-all flex items-center justify-center mx-auto gap-2"
                  >
                    View All Technical Results
                    <FontAwesomeIcon icon={faArrowRight} className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;