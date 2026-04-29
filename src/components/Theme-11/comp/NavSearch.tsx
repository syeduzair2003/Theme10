"use client";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState, Suspense } from "react";
import Image from "next/image";
import {
  Merchant,
  SearchCategories,
  SearchMerchant,
} from "@/services/dataTypes";
import { keywordsAction, searchAction } from "@/app/actions/index";
import { getCategoryHref, getMerchantHref } from "@/constants/hooks";
import { FontAwesomeIcon } from "@/constants/icons";
import { faStore, faTags, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

interface Props {
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
}

const SearchBar = ({ companyId, mer_slug, slug_type, cat_slug }: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState<string>(params.get("query") || "");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [tagsData, setTagsData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
  const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
  const [errMsg, setErrMessage] = useState({
    show: false,
    err: false,
    msg: "",
  });
  const [loading, setLoading] = useState(false);

  const pathName = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleKeywords = async () => {
    const response = await keywordsAction(companyId);
    if (response?.data) setTagsData(response.data);
  };

  useEffect(() => {
    handleKeywords();
  }, [companyId]);

  const handleSearch = async (searchTerm: string) => {
    try {
      if (searchTerm.trim().length >= 3) {
        setLoading(true);
        const response = await searchAction(searchTerm, companyId);
        if (
          response?.data?.merchants?.length > 0 ||
          response?.data?.categories?.length > 0
        ) {
          setCategoriesData(response.data?.categories || []);
          setMerchantData(response.data?.merchants || []);
          setIsDropdownVisible(!!(pathName !== "/search"));
          setErrMessage({ show: false, err: false, msg: "" });
        } else {
          setMerchantData([]);
          setCategoriesData([]);
          setErrMessage({ show: true, err: true, msg: "No result found." });
        }
      } else {
        setMerchantData([]);
        setCategoriesData([]);
        setErrMessage({
          show: true,
          err: true,
          msg: "Input should be at least three characters long.",
        });
      }
    } catch {
      setErrMessage({ show: true, err: true, msg: "Something went wrong." });
    } finally {
      setLoading(false);
    }
  };

  const renderMerchant = (merchant: SearchMerchant) => (
    <Link
      key={merchant.merchant_name}
      href={getMerchantHref<SearchMerchant>(merchant, mer_slug, slug_type)}
      className="flex flex-col items-center justify-center p-2 border border-gray-100 rounded-xl bg-white hover:bg-[#f4f9f0] hover:border-[#8bc94a]/30 hover:shadow-sm transition-all w-[100px] h-[100px]"
    >
      <div className="h-[50px] w-full flex items-center justify-center mb-1">
        {merchant.merchant_logo ? (
          <Image
            src={merchant.merchant_logo}
            alt={merchant.merchant_name}
            width={70}
            height={40}
            style={{ objectFit: "contain" }}
            className="block"
          />
        ) : (
          <span className="text-gray-300 text-[10px]">No logo</span>
        )}
      </div>
      <div className="text-center w-full px-1">
        <strong className="text-[11px] text-[#8bc94a] line-clamp-2 leading-tight">
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
      <div className="px-3 py-1 border border-gray-200 rounded-full bg-gray-50 group-hover:bg-[#8bc94a] group-hover:border-[#8bc94a] transition-colors duration-200">
        <span className="text-[12px] font-medium text-gray-600 group-hover:text-white transition-colors">
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
        setErrMessage({ show: false, err: false, msg: "" });
      } else {
        handleSearch(search);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search, companyId]);

  useEffect(() => {
    const query = params.get("query") || "";
    if (query !== search && document.activeElement !== inputRef.current) {
      setSearch(query);
    }
  }, [searchParams]);

  useEffect(() => {
    if (pathName === "/search") setIsDropdownVisible(false);
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
    <div
      ref={searchWrapperRef}
      className="relative w-full max-w-[400px] xl:max-w-[450px]"
    >
      <div className="relative flex items-center bg-white/60 backdrop-blur-md rounded-full px-4 py-[8px] shadow-sm border border-[#8bc94a]/20 transition-all focus-within:border-[#8bc94a]/50 focus-within:shadow-md w-full">
        <input
          type="text"
          placeholder="Search stores, categories..."
          className="bg-transparent border-none outline-none text-[13px] w-full text-gray-700 placeholder-gray-400 font-medium z-10"
          ref={inputRef}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsDropdownVisible(true);
          }}
          onFocus={() => setIsDropdownVisible(true)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && search.trim()) {
              submitSearchNow();
            }
          }}
          aria-label="Search"
        />
        <button
          className="text-[#8bc94a] hover:text-[#ff912f] transition-colors ml-2 z-10"
          onClick={submitSearchNow}
          aria-label="Search submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-[16px] h-[16px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>

        {isDropdownVisible &&
          (search.trim().length > 0 || tagsData.length > 0) && (
            <div className="absolute left-0 right-0 sm:right-auto top-full mt-2 w-full sm:w-[420px] md:w-[480px] opacity-100 visible transition-all z-50">
              <div className="bg-white p-4 sm:p-5 rounded-2xl shadow-[0_10px_40px_-10px_rgba(139,201,74,0.15)] border border-gray-100 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar">
                {loading &&
                  search.trim().length >= 3 &&
                  merchantData.length === 0 &&
                  categoriesData.length === 0 &&
                  !errMsg.show && (
                    <div className="text-center text-[13px] py-4 text-[#8bc94a] font-semibold flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-[#8bc94a] border-t-transparent animate-spin"></div>
                      Searching...
                    </div>
                  )}

                {errMsg.show && search.trim().length > 0 && !loading && (
                  <p
                    className={`text-[13px] mb-4 text-center font-medium ${errMsg.err ? "text-[#ff912f]" : "text-[#8bc94a]"}`}
                  >
                    {errMsg.msg}
                  </p>
                )}

                {/* Stores / Merchants */}
                {merchantData.length > 0 && !loading && (
                  <div className="mb-5">
                    <p className="text-[13px] font-bold text-gray-800 mb-3 flex items-center">
                      <FontAwesomeIcon
                        icon={faStore}
                        className="mr-2 text-[#8bc94a] w-3.5 h-3.5"
                      />
                      Stores
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {merchantData.slice(0, 8).map(renderMerchant)}
                    </div>
                  </div>
                )}

                {/* Categories */}
                {categoriesData.length > 0 && !loading && (
                  <div className="mb-5">
                    <p className="text-[13px] font-bold text-gray-800 mb-3 flex items-center">
                      <FontAwesomeIcon
                        icon={faBoxOpen}
                        className="mr-2 text-[#8bc94a] w-3.5 h-3.5"
                      />
                      Categories
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {categoriesData.slice(0, 10).map(renderCategories)}
                    </div>
                  </div>
                )}

                {/* Popular Tags */}
                {tagsData.length > 0 && search.trim().length === 0 && (
                  <div className="mb-2">
                    <p className="text-[13px] font-bold text-gray-800 mb-3 flex items-center">
                      <FontAwesomeIcon
                        icon={faTags}
                        className="mr-2 text-[#8bc94a] w-3.5 h-3.5"
                      />
                      Popular Searches
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {tagsData.map((item: string, i: number) => (
                        <Link
                          key={i}
                          href={`/search?query=${item}`}
                          className="px-3 py-1.5 bg-[#f8f9fa] text-gray-600 border border-gray-100 text-[12px] font-medium rounded-full hover:bg-[#8bc94a] hover:text-white hover:border-[#8bc94a] transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {search.trim().length >= 3 &&
                  !loading &&
                  (merchantData.length > 0 || categoriesData.length > 0) && (
                    <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                      <button
                        onClick={submitSearchNow}
                        className="text-[13px] font-bold text-[#ff912f] hover:text-[#8bc94a] transition-colors"
                      >
                        View All Results &rarr;
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
