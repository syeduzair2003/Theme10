import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import cookieService from '@/services/CookiesService';
import { MerchantResponse } from '@/services/dataTypes';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'
import StoreCardTwo from './StoreCardTwo';
import Pagination from './Pagination';
import { generateBreadcrumbs } from '@/constants/hooks';
import BreadcrumbSection from './BreadcrumbSection';

interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
    slug: string; // This is the alphabet, e.g. "A", "B", "other"
    page?: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 32;

const AllStoresPage = async ({ store_slug, slug_type, company_id, slug, page }: Props) => {
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const apiSlug = slug === "other" ? "#" : slug;

    if (slug.length > 1 && slug !== "other") {
        return notFound();
    }

    const merchantData: MerchantResponse = (await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage))?.data;

    const filteredMerchants = slug === "other"
        ? merchantData?.merchants?.filter(item => !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()))
        : merchantData?.merchants?.filter(item => item.merchant_name?.toUpperCase().startsWith(slug.toUpperCase()));

    const totalPages = merchantData?.pagination?.last_page;
    const paginatedMerchants = filteredMerchants
        .sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
        .slice(0, PAGE_SIZE);

    const breadcrumbs = generateBreadcrumbs(slug, "/all-stores/A", "All Stores");

    return (
        <>
            <BreadcrumbSection
                title={`Top Online Stores & Popular Merchants Starting with ${slug}`}
                breadcrumbs={breadcrumbs}
                imageSrc="/themes/Theme_3/img/website.png"
            />
            <div className="Store-Search bg padTB60">
                <div className="container">
                    <div className="row g-3">
                        <div className="col-md-8 col-sm-9 col-xs-9 col-lg-8">
                            <h3>Browse Coupons by Store – Find Discounts Alphabetically</h3>
                        </div>
                        <div className="col-md-4 col-sm-3 col-xs-3 col-lg-4 text-end">
                            <div className="seo-alpha-dropdown">
                                <button className="seo-alpha-toggle">{slug} (Selected)</button>
                                <div className="seo-alpha-menu text-center">
                                    {ALPHABETS.map((alpha) => (
                                        <Link
                                            key={alpha}
                                            href={`/all-stores/${alpha}`}
                                            className={`fw-bold seo-alpha-link${slug === alpha ? " active" : ""}`}
                                            title={`Stores starting with ${alpha}`}
                                        >
                                            {alpha}
                                        </Link>
                                    ))}
                                    <Link
                                        href={`/all-stores/other`}
                                        className={`fw-bold seo-alpha-link${slug === "other" ? " active" : ""}`}
                                        title="Stores starting with other characters"
                                    >
                                        #
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {paginatedMerchants.length > 0 ? (
                            paginatedMerchants.map((item, i) => (
                                <div key={i} className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                    <StoreCardTwo merchant={item} mer_slug={store_slug} mer_slug_type={slug_type} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-100 py-5">No merchants found.</div>
                        )}
                        {totalPages > 1 && (
                            <Pagination currentPage={merchantData?.pagination?.current_page} totalPages={totalPages} baseUrl={`/all-stores/${slug}`} />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default AllStoresPage
