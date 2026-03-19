"use client";

import React, { useEffect, useRef, useState } from "react";
import { apiGetAllKeywords, apiSearchResult } from "@/apis/user";
import { getCategoryHref, getMerchantHref } from "@/constants/hooks";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
    companyId: string;
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
    closeMenu: () => void;
}

let timeoutId: any = null;

export default function MobileSearchBar({
    companyId,
    mer_slug,
    slug_type,
    cat_slug,
    closeMenu,
}: Props) {
    const [search, setSearch] = useState("");
    const [categoriesData, setCategoriesData] = useState<any[]>([]);
    const [merchantData, setMerchantData] = useState<any[]>([]);
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();
    const pathName = usePathname();

    const handleSearch = async () => {
        if (search.trim().length < 3) {
            setCategoriesData([]);
            setMerchantData([]);
            setIsDropdownVisible(false);
            return;
        }

        const response = await apiSearchResult(search, companyId);

        const hasResults =
            response.data.merchants.length > 0 ||
            response.data.categories.length > 0;

        if (hasResults) {
            setCategoriesData(response.data.categories || []);
            setMerchantData(response.data.merchants || []);
            setIsDropdownVisible(true);
        } else {
            setCategoriesData([]);
            setMerchantData([]);
            setIsDropdownVisible(false);
        }
    };

    // Debounce Search
    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            if (search.trim() === "") {
                setCategoriesData([]);
                setMerchantData([]);
                setIsDropdownVisible(false);
            } else {
                handleSearch();
            }
        }, 500);
    }, [search]);

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(e.target as Node)
            ) {
                setIsDropdownVisible(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goToSearchPage = () => {
        if (search.trim().length > 0) {
            closeMenu();
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
        }
    };

    return (
        <div ref={wrapperRef} className="mnav-search-wrapper">
            {/* INPUT */}
            <input
                ref={inputRef}
                type="text"
                value={search}
                placeholder="Search stores, categories..."
                className="mnav-search-input"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && goToSearchPage()}
            />

            {/* SEARCH BUTTON */}
            <button
                className="mnav-search-btn"
                onClick={goToSearchPage}
                aria-label="Search"
            >
                <i className="las la-search"></i>
            </button>

      {/* DROPDOWN RESULTS */ }
    {
        isDropdownVisible && (
            <div className="mnav-search-dropdown">
                {/* Merchants */}
                {merchantData.length > 0 && (
                    <>
                        <p className="mnav-s-title">Stores</p>
                        <div className="mnav-s-grid">
                            {merchantData.map((m, i) => (
                                <Link
                                    key={i}
                                    href={getMerchantHref(m, mer_slug, slug_type)}
                                    onClick={closeMenu}
                                    className="mnav-s-card"
                                >
                                    <Image
                                        src={m.merchant_logo}
                                        width={70}
                                        height={45}
                                        alt={m.merchant_name}
                                    />
                                    <span>{m.merchant_name}</span>
                                </Link>
                            ))}
                        </div>
                    </>
                )}

                {/* Categories */}
                {categoriesData.length > 0 && (
                    <>
                        <p className="mnav-s-title mt-2">Categories</p>
                        <div className="mnav-tags">
                            {categoriesData.map((c, i) => (
                                <Link
                                    key={i}
                                    href={getCategoryHref(c, cat_slug, slug_type)}
                                    onClick={closeMenu}
                                    className="mnav-tag"
                                >
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </>
                )}
            </div>
        )
    }

    <style jsx>{`
        .mnav-search-wrapper {
          position: relative;
          width: 100%;
        }

        .mnav-search-input {
        width: 100%;
        padding: 10px 42px 10px 14px; 
        border-radius: 10px;
        border: 1px solid #ddd;
        font-size: 14px;
        outline: unset;
        color: black;
        }
        .mnav-search-input:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
        }

                
        .mnav-search-btn {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        background: linear-gradient(90deg, #0284c7 0%, #0369a1 100%);
        color: #fff;
        border: none;
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;  
        }

        .mnav-search-btn i {
        font-size: 18px;
        }

        .mnav-search-btn:active {
        transform: translateY(-50%) scale(0.95);
        }

      `}</style>
    </div >
  );
}
