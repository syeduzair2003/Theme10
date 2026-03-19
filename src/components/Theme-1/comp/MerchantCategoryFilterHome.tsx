"use client"
import { CategoryData, categoryMinimalData, Merchant, minimalMerchantData } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import AllMerchants from './AllMerchants';
import { getMerchantHref } from '@/constants/hooks';
import { apiMerchantDetailsByCategory } from '@/apis/merchant';

interface Props {
    categories: categoryMinimalData[],
    merchants: minimalMerchantData[],
    slug_type: string;
    cat_slug: string;
    merchant_slug: string;
    companyId: string;
    domain: string;
}
const MerchantCategoryFilterHome = ({ categories, merchants, slug_type, merchant_slug, companyId, domain }: Props) => {
    const [merchant, setMerchants] = useState<minimalMerchantData[]>([]);
    const [activeCategory, setActiveCategory] = useState<string | null>(null);


    useEffect(() => {
        setMerchants(merchants);
    }, [])

    const fetchMerchants = async (categoryId: string) => {
        try {
            const response: any = await apiMerchantDetailsByCategory(categoryId, companyId);
            // console.log(response);
            setMerchants(response.data?.merchants || []);
        } catch (error) {
            // console.error("Error fetching merchants:", error);
            setMerchants([]);
        }
    };
    const handleCategoryClick = (categoryId: string) => {
        fetchMerchants(categoryId);
        setActiveCategory(categoryId); // Set active category
    };
    const handleAllClick = () => {
        setMerchants(merchants);
        setActiveCategory(null);
    };
    return (
        <>
            <ul
                className="nav common-tab justify-content-center nav-pills mb-4"
                id="pills-tab"
                role="tablist"
            >
                <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link ${activeCategory === null ? "active" : ""}`}
                        id="pills-all-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#pills-all"
                        type="button"
                        role="tab"
                        aria-controls="pills-all"
                        aria-selected={activeCategory === null}
                        onClick={handleAllClick}
                    >
                        All Category Merchants
                    </button>
                </li>
                {categories?.length > 0 && categories.map((item: categoryMinimalData, i: number) => {
                    return (
                        <li key={i} className="nav-item" role="presentation">
                            <button
                                className={`nav-link shadow ${activeCategory === item.unique_id ? "active" : ""}`}
                                id={`pills-${item.unique_id}-tab`}
                                data-bs-toggle="pill"
                                data-bs-target={`#pills-${item.unique_id}`}
                                type="button"
                                role="tab"
                                aria-controls={`pills-${item.unique_id}`}
                                aria-selected={activeCategory === item.unique_id}
                                onClick={() => handleCategoryClick(item.unique_id)}
                            >
                                {item.name}
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div className="tab-content" id="pills-tabContent">
                <div
                    className="tab-pane fade show active"
                    id="pills-all"
                    role="tabpanel"
                    aria-labelledby="pills-all-tab"
                    tabIndex={0}
                >
                    <div className="row gy-4">
                        {merchant.map((item: minimalMerchantData, i: number) => {
                            const href = getMerchantHref<minimalMerchantData>(item, merchant_slug, slug_type);
                            return (
                                <div key={i} className="col-xl-3 col-lg-3 col-sm-6" style={{borderRadius: 5}}>
                                    <AllMerchants data={item} href={href} domain={domain}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MerchantCategoryFilterHome
