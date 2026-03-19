"use client"
import React, { useRef, useState, useEffect } from 'react'
import { apiGetAllUpdatedKeywords, apiSearchResult } from '@/apis/user';
import { ellipse, getBaseImageUrl, getCategoryHref, getMerchantHref } from '@/constants/hooks';
import { MetaKeywordsResponse, SearchCategories, SearchMerchant } from '@/services/dataTypes';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from "next/image";
import { faSearch, FontAwesomeIcon } from '@/constants/icons';
interface Props {
    companyId: string;
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
    domain: string;
}
// let timeoutId: any = null
const NavSearch = ({ companyId, mer_slug, slug_type, cat_slug, domain }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const [search, setSearch] = useState<string>(params.get('query') || "");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [tagsData, setTagsData] = useState<any>([]);
    const [categoriesData, setCategoriesData] = useState<SearchCategories[]>([]);
    const [merchantData, setMerchantData] = useState<SearchMerchant[]>([]);
    const [errMsg, setErrMessage] = useState({ show: false, err: false, msg: '' });
    const [isStoreOpen, setIsStoreOpen] = useState(false);
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const pathName = usePathname();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);
    const handleKeywords = async () => {
        const response = await apiGetAllUpdatedKeywords(domain);
        if (response.data) {
            setTagsData(response.data);
        }
    }
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
                    setTimeout(() => {
                        setErrMessage({ show: false, err: false, msg: '' });
                    }, 5000);
                }
            } else {
                setCategoriesData([]);
                setMerchantData([]);
                setErrMessage({ show: true, err: true, msg: 'Input should be at least three characters long.' });
                setTimeout(() => {
                    setErrMessage({ show: false, err: false, msg: '' });
                }, 5000);
            }
        } catch (err) {
            console.error(err);
            setIsDropdownVisible(false);
        }
    }
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim() === "") {
                setMerchantData([]);
                setCategoriesData([]);
                setErrMessage({ show: false, err: false, msg: '' });
            } else {
                handleSearch();
            }
        }, 750);
        return () => clearTimeout(timeoutId);
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
    useEffect(() => {
        handleKeywords();
    }, [companyId]);
    const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && search.trim()) {
            e.preventDefault();
            router.push(`/search?query=${encodeURIComponent(search.trim())}`);
            setIsDropdownVisible(false);
        }
    };
    const handleClickSubmit = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(`/search?query=${encodeURIComponent(search.trim())}`);
        setIsDropdownVisible(true);
    };
    const RenderMerchant = () => {
        return (
            merchantData.length > 0 ? (
                merchantData.map((item, i) => (
                    <div key={i} className="col-lg-4 col-md-6 col-sm-12 top-merchant-card-nav">
                        <Link className="w-100" href={getMerchantHref<SearchMerchant>(item, mer_slug, slug_type)}>
                            <div className="list-merchants-image-nav">
                                <Image
                                    className="merchant-top-image w-100"
                                    src={getBaseImageUrl(domain, item.merchant_logo, "")}
                                    alt={item.merchant_name}
                                    width={100}
                                    height={80}
                                    objectFit="cover"
                                    layout='responsive'
                                />
                            </div>
                            <div className="custom-container mt-2 text-center">
                                <span className="discount-text f-13">{ellipse(item.merchant_name, 28)}</span>
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <div>No Store</div>
            )
        )
    }
    const RenderCategory = () => {
        return (
            categoriesData.length > 0 ? (
                <div className='custom-search-result-category'>
                    <ul className='d-flex flex-wrap gap-2 p-0 m-0'>
                        {categoriesData.map((item, i) => (
                            <Link key={i} href={getCategoryHref(item, cat_slug, slug_type)}>
                                <li className='px-3 py-1 rounded-pill border cus-border b-second'>{item.name}</li>
                            </Link>
                        ))
                        }
                    </ul>
                </div>
            ) : (
                <div>No Category</div>
            )
        )
    }
    const RenderAll = () => {
        return (
            <div className='d-flex flex-1 flex-column gap-3'>
                <div>
                    <h4 className='n15-color'>Stores</h4>
                    <div className='row g-3'>
                        <RenderMerchant />
                    </div>
                </div>
                <div>
                    <h4 className='n15-color'>Categories</h4>
                    <div className='d-flex flex-wrap'>
                        <RenderCategory />
                    </div>
                </div>
            </div>
        )
    }
    const handleHover = (e: React.MouseEvent, type: string) => {
        e.preventDefault();
        if (type == 'store') {
            setIsStoreOpen(true);
            setIsCategoryOpen(false);
        } else {
            setIsStoreOpen(false);
            setIsCategoryOpen(true);
        }
        // Set timer to close
        setTimeout(() => {
            setIsStoreOpen(false);
            setIsCategoryOpen(false);
        }, 10000);
    }
    return (
        <>
            <div className="input-area w-100 n1-bg-color rounded-pill ps-2 ps-md-6 p-2 transition cus-border border d-sm-block"
            >
                <form action="#" className="d-center justify-content-between" onSubmit={(e) => e.preventDefault()}>
                    <div className="d-center w-100 justify-content-between">
                        <div className="input-single w-100">
                            <input type="text" placeholder="Search here..." className="pe-3 pe-md-4 w-100"
                                ref={inputRef}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleSearchSubmit}
                                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
                                onFocus={() => setIsDropdownVisible(true)}
                            />
                        </div>
                        <button
                            onClick={(e) => handleClickSubmit(e)}
                            className="box-style box-second second-alt rounded-pill py-2 px-3 px-md-7 d-center"
                        >
                            {/* 1. FontAwesome Icon: Visible ONLY on small screens (hidden on lg) */}
                            <span className="d-lg-none d-flex align-items-center">
                                <FontAwesomeIcon icon={faSearch} />
                            </span>

                            {/* 2. Text: Hidden on mobile, visible on large screens */}
                            <span className="d-none d-lg-flex fs-seven">
                                Search
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            {isDropdownVisible && (
                <div className='custom-search-result-body container-fluid'>
                    <div className="row mb-2 pt-2 border cus-border b-second">
                        <h5 className='mt-1 mx-1 n15-color'>Popular Tags :</h5>
                        <div className="col-12 custom-search-result-tags pb-4 pt-2">
                            <ul className='d-flex n15-color flex-wrap p-0 m-0 gap-3 gy-3 gap-md-4'>
                                {tagsData?.length > 0 &&
                                    tagsData?.map((item: MetaKeywordsResponse, i: number) => (
                                        <li key={i}>
                                            <Link className='box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex' href={item?.merchant ? getMerchantHref(item?.merchant, mer_slug, slug_type) : `/search?query=${item?.keyword}`}>
                                                <span className="fs-eight text-nowrap transition sp-3 fw-5 n15-color">{item?.keyword}</span>
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="custom-search-result-content py-1">
                        <div className='custom-search-result-option'>
                            <ul>
                                <li className='sp-3 f-16' onMouseEnter={(e) => { handleHover(e, 'store') }}>Store</li>
                                <li className='sp-3 f-16' onMouseEnter={(e) => { handleHover(e, 'category') }}>Categories</li>
                            </ul>
                        </div>
                        <div className='custom-search-result-item d-flex flex-wrap px-4'>
                            {errMsg.show ? <p>{errMsg.msg}</p> : (
                                <>
                                    {isStoreOpen == false && isCategoryOpen == false &&
                                        <RenderAll />
                                    }
                                    {isStoreOpen && (
                                        <RenderMerchant />
                                    )}
                                    {isCategoryOpen && (
                                        <RenderCategory />
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
export default NavSearch