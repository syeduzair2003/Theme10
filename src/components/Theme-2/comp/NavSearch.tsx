"use client";
import React, { useRef, useState, useEffect } from "react";
import {
    apiGetAllUpdatedKeywords,
    apiSearchResult,
} from "@/apis/user";
import {
    getBaseImageUrl,
    getMerchantHref,
} from "@/constants/hooks";
import {
    MetaKeywordsResponse,
    SearchCategories,
    SearchMerchant,
} from "@/services/dataTypes";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
    companyId: string;
    mer_slug: string;
    slug_type: string;
    domain: string;
}

const NavSearch = ({ companyId, mer_slug, slug_type, domain }: Props) => {
    const [search, setSearch] = useState<string>("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [tagsData, setTagsData] = useState<MetaKeywordsResponse[]>([]);
    const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
    const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
    const [errMsg, setErrMessage] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"all" | "stores" | "categories">("all");
    const dropdownRef = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const pathName = usePathname();
    const searchParams = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    // fetch popular keywords
    const handleKeywords = async () => {
        const res = await apiGetAllUpdatedKeywords(domain);
        if (res.data) setTagsData(res.data);
    };

    // search api
    const handleSearch = async () => {
        if (search.trim().length < 3) {
            setErrMessage("Please enter at least 3 characters.");
            return;
        }
        const res = await apiSearchResult(search, companyId);
        if (res.data) {
            setCategoriesData(res.data.categories || []);
            setMerchantData(res.data.merchants || []);
            if (!res.data.categories.length && !res.data.merchants.length) {
                setErrMessage("No results found.");
            } else {
                setErrMessage("");
            }
            setIsDropdownVisible(pathName !== "/search");
        }
    };

    // debounce search
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (search) handleSearch();
            else {
                setCategoriesData([]);
                setMerchantData([]);
                setErrMessage("");
            }
        }, 500);
        return () => clearTimeout(timeout);
    }, [search]);

    useEffect(() => {
        handleKeywords();
    }, []);

    const handleSubmit = () => {
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            setIsDropdownVisible(false);
            setIsOpen(false);
        }
    };

    // Close dropdown on outside click
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownVisible(false);
                setIsOpen(false);
            }
        }
        // if (isDropdownVisible) document.addEventListener("mousedown", handleClickOutside);
        if (isOpen) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const toggleDropdown = () => setIsOpen((prev) => !prev);

    const MerchantCard = ({ merchant }: { merchant: SearchMerchant }) => {
        return (
            <Link className="card rounded-3 shadow-sm  h-100" href={getMerchantHref(merchant, mer_slug, slug_type)}>
                <div className="d-center flex-column">
                    <div className="nav-search-merchant">
                    <Image
                        src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
                        alt={merchant?.merchant_name}
                        className="merchant-logo"
                        height={100}
                        width={100}
                        objectFit="contain"
                    />
                    </div>
                    <h5 className="merchant-name f-14">{merchant?.merchant_name}</h5>
                </div>
            </Link>
        );
    };

    const CategoryItem = ({ category }: { category: SearchCategories }) => {
        return (
            <Link href={category?.url} className="card rounded-3 shadow-sm d-center flex-column">
                <div className="category-icon-wrap">
                    <Image
                        src={getBaseImageUrl(domain, category?.category_image, "")}
                        alt={category?.name}
                        width={60}
                        height={60}
                        className="category-icon"
                        objectFit="contain"
                    />
                </div>
                <span className="category-title">{category?.name}</span>
            </Link>
        );
    };

    return (
        <div className="navsearch-container" ref={dropdownRef}>
            {/* 🔍 Search Button */}
            <button className="icon-btn" onClick={toggleDropdown} aria-expanded={isOpen}>
                <i className="fa fa-search"></i>
            </button>

            {/* Dropdown */}
            {isOpen && (
                <div className="navsearch-dropdown active">
                    <div className="navsearch-dropdown-container">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="searchbox-bar w-100">
                                    <input
                                        type="text"
                                        placeholder="Search for stores or categories..."
                                        value={search}
                                        ref={inputRef}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onFocus={() => setIsDropdownVisible(true)}
                                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                                    />
                                    <button className="searchbox-btn" onClick={handleSubmit}>
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="col-12 col-lg-12 py-3">
                                <div className="d-flex">
                                    {/* Left Section - Tags */}
                                    <div className="navsearch-tags scroll-vertical">
                                        <h5 className="navsearch-section-title">Popular Tags</h5>
                                        <ul className="navsearch-tags-list d-flex flex-column gap-2">
                                            {tagsData?.length > 0 &&
                                                tagsData?.map((item: MetaKeywordsResponse, i: number) => (
                                                    <li key={i} className="navsearch-tag-item m-0">
                                                        <Link
                                                            href={
                                                                item?.merchant
                                                                    ? getMerchantHref(item?.merchant, mer_slug, slug_type)
                                                                    : `/search?query=${item?.keyword}`
                                                            }
                                                        >
                                                            {item?.keyword}
                                                        </Link>
                                                    </li>
                                                ))}
                                        </ul>
                                    </div>

                                    {/* Right Section - Results */}
                                    <div className="navsearch-results">
                                        <div className="navsearch-result-options">
                                            {["all", "stores", "categories"].map((tab) => (
                                                <button
                                                    key={tab}
                                                    className={`navsearch-tab ${activeTab === tab ? "active" : ""}`}
                                                    onClick={() => setActiveTab(tab as any)}
                                                >
                                                    {tab === "all"
                                                        ? "All Results"
                                                        : tab === "stores"
                                                            ? "Stores"
                                                            : "Categories"}
                                                </button>
                                            ))}
                                        </div>

                                        <div className="navsearch-result-list">
                                            {activeTab === "all" && (
                                                <div className="all-results">
                                                    {merchantData?.length > 0 && (
                                                        <>
                                                            <h4 className="my-2">Top Stores</h4>                                                            
                                                            <div className="row g-3 ">
                                                                {merchantData?.map((m) => (
                                                                    <div key={m?.unique_id} className="col-lg-6 col-md-6 col-sm-12">
                                                                        <MerchantCard merchant={m} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                    {categoriesData?.length > 0 && (
                                                        <>
                                                            <h4 className="mt-3">Popular Categories</h4>
                                                            <div className="row g-3 mb-4">
                                                                {categoriesData?.map((c) => (
                                                                    <div key={c?.unique_id} className="col-lg-6 col-md-6 col-sm-12">
                                                                        <CategoryItem key={c.id} category={c} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </>
                                                    )}
                                                    {errMsg && (
                                                        <p className="text-danger fw-bold">{errMsg}</p>
                                                    )}
                                                </div>
                                            )}
                                            {activeTab === "stores" && (
                                                <div className="row g-3 mb-5">
                                                    {merchantData?.length > 0 ? (
                                                        merchantData.map((m) => (
                                                            <div key={m?.unique_id} className="col-lg-6 col-md-6 col-sm-12">
                                                                <MerchantCard key={m.id} merchant={m} />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-danger fw-bold">No Stores Found</p>
                                                    )}
                                                </div>
                                            )}
                                            {activeTab === "categories" && (
                                                <div className="row g-3 mb-5">
                                                    {categoriesData?.length > 0 ? (
                                                        categoriesData.map((c) => (
                                                            <div key={c?.unique_id} className="col-lg-6 col-md-6 col-sm-12">
                                                                <CategoryItem key={c.id} category={c} />
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-danger fw-bold">No Categories Found</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavSearch;
