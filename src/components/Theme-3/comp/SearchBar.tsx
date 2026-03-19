import { apiGetAllKeywords, apiSearchResult } from '@/apis/user';
import { getCategoryHref, getMerchantHref, Timer } from '@/constants/hooks';
import { Merchant, SearchCategories, SearchMerchant } from '@/services/dataTypes';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { faDice, faSearch, faStore, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    companyId: string;
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
}
let timeoutId: any = null

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

    const handleKeywords = async () => {
        const response = await apiGetAllKeywords(companyId);
        if (response.data) {
            setTagsData(response.data);
        }
    }
    useEffect(() => {
        handleKeywords();
    }, [companyId]);

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
                setErrMessage({ show: true, err: true, msg: 'Input should be atleast three characters long.' });
                setTimeout(() => {
                    setErrMessage({ show: false, err: false, msg: '' });
                }, 5000);
            }
        } catch (error) {
            setErrMessage({ show: true, err: true, msg: 'Something went wrong.' });
        }
    }
    const renderItems = (items: any[], renderFunc: (item: any) => JSX.Element) => (
        <div className="custom-search-result px-3">{items.map(renderFunc)}</div>
    );

    const renderMerchant = (merchant: Merchant) => (
        <Link
            key={merchant.merchant_name}
            href={getMerchantHref<Merchant>(merchant, mer_slug, slug_type)}
            className="custom-search-item-card"
        >
            <Image src={merchant.merchant_logo} className="mx-auto d-block" width={100} height={70} alt={merchant.merchant_logo} objectFit='contain' />
            <p className="text-center"><strong>{merchant.merchant_name}</strong></p>
        </Link>
    );
    const renderCategories = (category: SearchCategories) => (
        <Link
            key={category.name}
            href={getCategoryHref<SearchCategories>(category, cat_slug, slug_type)}
            className="zoom-list-item pill"
            style={{ fontSize: '14px' }}
        >
            {category.name}
        </Link>
    );

    useEffect(() => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            if (search.trim() === "") {
                params.delete("query");
                router.replace(pathName);
                setMerchantData([]);
                setCategoriesData([]);
                // setIsDropdownVisible(false);
            } else {
                params.set("query", search);
                router.replace(`${pathName}?query=${search}`);
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

    useEffect(() => {

    }, [errMsg]);

    return (
        <div className="input-group wd-btn-group header-search-option" style={{ overflow: `${isDropdownVisible ? "visible" : "hidden"}` }}>
            <input
                type="text"
                className="form-control blurb-search hidden-input"
                style={{ border: "1px solid #cccc" }}
                placeholder="Search coupon, deals and more..."
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search.trim() && router.push(`/search?query=${search}`)}
                onBlur={() => setTimeout(() => setIsDropdownVisible(false), 150)}
                onFocus={() => setIsDropdownVisible(true)}
            />
            {(
                <div className="dropdown-menu show" id="search-results">
                    <div className="custom-search-body">
                        {errMsg.show ?
                            <p className={`${errMsg.err ? 'text-danger' : 'text-succes'}`}>{errMsg.msg}</p>
                            :
                            <></>
                        }
                        {tagsData.length > 0 && (
                            <div className="custom-search-result-body mb-3">
                                <span className="custom-search-span mb-3">
                                    <p className="custom-search-heading">Popular Tags:</p>
                                </span>
                                <div className="tags-container mx-4 mb-3">
                                    {tagsData.map((item: string, i: number) => (
                                        <Link
                                            key={i}
                                            href={`/search?query=${item}`}
                                            className="zoom-list-item"
                                        >
                                            {item}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                        {merchantData.length > 0 && (
                            <div className="custom-search-result-body">
                                <span className="custom-search-span mb-3">
                                    <FontAwesomeIcon size="lg" icon={faStore} color="rgba(30,30,30,0.9)" />
                                    <p className="custom-search-heading">Stores:</p>
                                </span>
                                {renderItems(merchantData, renderMerchant)}
                            </div>
                        )}
                        {categoriesData.length > 0 && (
                            <div className="custom-search-result-body">
                                <span className="custom-search-span my-3">
                                    <FontAwesomeIcon size="lg" icon={faDice} color="rgba(30,30,30,0.9)" />
                                    <p className="custom-search-heading">Categories:</p>
                                </span>
                                {renderItems(categoriesData, renderCategories)}
                            </div>
                        )}
                    </div>
                </div>
            )}
            <FontAwesomeIcon icon={faSearch} style={{ width: '16px', height: '16px', color: 'black' }}/>
        </div>
    )
}

export default SearchBar
