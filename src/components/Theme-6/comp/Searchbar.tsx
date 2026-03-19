"use client";
import { apiGetAllKeywords, apiSearchResult } from '@/apis/user';
import { getCategoryHref, getMerchantHref } from '@/constants/hooks';
import { Merchant, SearchCategories, SearchMerchant } from '@/services/dataTypes';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { faDice, faSearch, faStore, FontAwesomeIcon } from '@/constants/icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

interface Props {
  companyId: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
}
let timeoutId: any = null;

const SearchBar = ({ companyId, mer_slug, slug_type, cat_slug }: Props) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [search, setSearch] = useState<string>(params.get('query') || "");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [tagsData, setTagsData] = useState<any>([]);
  const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
  const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
  const [errMsg, setErrMessage] = useState({ show: false, err: false, msg: '' });
  const pathName = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchWrapperRef = useRef<HTMLDivElement>(null);

  const handleKeywords = async () => {
    const response = await apiGetAllKeywords(companyId);
    if (response.data) setTagsData(response.data);
  };

  useEffect(() => { handleKeywords(); }, [companyId]);

  const handleSearch = async () => {
    try {
      if (search.trim().length >= 3) {
        const response = await apiSearchResult(search, companyId);
        if (response.data.merchants.length > 0 || response.data.categories.length > 0) {
          setCategoriesData(response.data?.categories || []);
          setMerchantData(response.data?.merchants || []);
          setIsDropdownVisible(!!(pathName !== '/search' && (response.data?.merchants.length || response.data?.categories.length)));
          setErrMessage({ show: false, err: false, msg: '' });
        } else {
          setErrMessage({ show: true, err: true, msg: 'No result found.' });
          setTimeout(() => setErrMessage({ show: false, err: false, msg: '' }), 5000);
        }
      } else {
        setErrMessage({ show: true, err: true, msg: 'Input should be atleast three characters long.' });
        setTimeout(() => setErrMessage({ show: false, err: false, msg: '' }), 5000);
      }
    } catch {
      setErrMessage({ show: true, err: true, msg: 'Something went wrong.' });
    }
  };


  const renderItems = (items: any[], renderFunc: (item: any) => JSX.Element) => (
    <div className="custom-search-result px-3" style={{ display: "contents" }}>{items.map(renderFunc)}</div>
  );

  const renderMerchant = (merchant: Merchant) => (
    <div className="d-flex flex-row">
      <Link
        key={merchant.merchant_name}
        href={getMerchantHref<Merchant>(merchant, mer_slug, slug_type)}
        className="custom-search-item-card"
      >
        <div className="merchant-logo-box">
          <Image
            src={merchant.merchant_logo}
            alt={merchant.merchant_name}
            width={100}
            height={60}
            style={{ objectFit: "contain" }}
            className="mx-auto d-block"
          />
        </div>
        <div className="merchant-name-box">
          <strong>{merchant.merchant_name}</strong>
        </div>
      </Link>
    </div>
  );

  const renderCategories = (category: SearchCategories) => (
    <Link
      key={category.name}
      href={getCategoryHref<SearchCategories>(category, cat_slug, slug_type)}
      className="d-inline-flex text-decoration-none"
    >
      <div className="category-pill-item">
        <span className="category-pill-text">
          {category.name}
        </span>
      </div>
    </Link>
  );

  useEffect(() => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (search.trim() === "") {
        if (params.has("query")) {
          params.delete("query");
          router.replace(`${pathName}?${params.toString()}`);
          setMerchantData([]);
          setCategoriesData([]);
        }
      } else {
        params.set("query", search);
        router.replace(`${pathName}?${params.toString()}`);
        handleSearch();
      }
    }, 1000);
  }, [search]);

  useEffect(() => {
    const query = params.get('query') || "";
    if (query !== search && document.activeElement !== inputRef.current) {
      setSearch(query);
    }
  }, [params]);

  useEffect(() => {
    if (pathName === '/search') setIsDropdownVisible(false);
  }, [pathName]);

  // Submit helper used by the inline search button / Enter key
  const submitSearchNow = () => {
    if (search.trim()) {
      router.push(`/search?query=${encodeURIComponent(search.trim())}`);
      setIsDropdownVisible(false);
    }
  };
  // Click outside to close dropdown
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

  // closes whenever the path changes
  useEffect(() => {
    setIsDropdownVisible(false);
  }, [pathName]);

  return (
    <div ref={searchWrapperRef} className="searchbar-wrapper position-relative w-100 justify-content-end">
      {/* Search Icon (stays in navbar) */}
      <button
        type="button"
        className={`btn btn-search-icon ${isDropdownVisible ? 'active' : ''}`}
        style={{ background: "#066168" }}
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling
          // Toggle visibility of expanded input and dropdown
          setIsDropdownVisible(prev => !prev);

          // Focus the input when opening
          if (!isDropdownVisible) {
            setTimeout(() => inputRef.current?.focus(), 150);
          }
        }}
        aria-label="Toggle search"
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: "#ffffffff" }} />
        {/* <FontAwesomeIcon icon={faSearch} /> */}
      </button>

      {/* <div
        className={`expanding-search-box ${isDropdownVisible ? 'expanded' : ''
          }`}
      >
        
      </div> */}

      {/* Popup Box (only results, input moved above) */}
      {
        isDropdownVisible && (
          <div className="search-popup-box position-absolute shadow-lg rounded-4 p-4 bg-white">
            <div className="modern-search-bar mx-auto" style={{ width: '80%', maxWidth: '800px' }}>

              {/* Optional: Add a Search Icon for a premium feel */}
              <span className="search-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </span>

              <input
                type="text"
                className="form-control modern-input"
                placeholder="Search coupons, deals and more..."
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && search.trim()) {
                    submitSearchNow();
                  }
                }}
                aria-label="Search"
              />

              <button
                type="button"
                className="modern-search-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  submitSearchNow();
                }}
                aria-label="Search submit"
              >
                Search
              </button>
            </div>

            {/* Results Area */}
            <div className="custom-search-body">
              {errMsg.show && (
                <p className={`${errMsg.err ? 'text-danger' : 'text-success'}`}>{errMsg.msg}</p>
              )}

              {tagsData.length > 0 && (
                <div className="custom-search-result-body mb-3">
                  <p className="custom-search-heading fw-semibold mb-2">Popular Tags:</p>
                  <div className="tags-container d-flex flex-wrap gap-2">
                    {tagsData.map((item: string, i: number) => (
                      <Link
                        key={i}
                        href={`/search?query=${item}`}
                        className="cus-tags"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {merchantData.length > 0 && (
                <div className="custom-search-result-body mt-3">
                  <p className="custom-search-heading fw-semibold mb-2">
                    <FontAwesomeIcon size="lg" icon={faStore} className="me-2" />
                    Stores:
                  </p>

                  {/* This wrapper is what creates the Row layout and prevents overlap */}
                  <div className="d-flex flex-row flex-wrap gap-3">
                    {renderItems(merchantData, renderMerchant)}
                  </div>
                </div>
              )}

              {categoriesData.length > 0 && (
                <div className="custom-search-result-body mt-3">
                  <p className="custom-search-heading fw-semibold mb-2">
                    Categories:
                  </p>

                  {/* FIX: This wrapper handles the spacing and prevents overlap */}
                  <div className="d-flex flex-wrap gap-2">
                    {renderItems(categoriesData, renderCategories)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      }
    </div >
  );
};

export default SearchBar;
