import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import cookieService from '@/services/CookiesService';
import MerchantCard from './MerchantCard';
import { getMerchantHref } from '@/constants/hooks';
import { MerchantResponse } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import MerchantPageSchema from '@/components/shared/SchemaScripts/MerchantPageSchema';
import Pagination from './Pagination';

interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
    slug: string; // This is the alphabet, e.g. "A", "B", "other"
    page?: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 33;

const AllStoresPage = async ({ store_slug, slug_type, company_id, slug, page }: Props) => {
    const companyDomain = (await cookieService.get("domain"))?.domain || "";
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const apiSlug = slug === "other" ? "#" : slug;

    if (slug.length > 1 && slug !== "other") {
        return notFound();
    }

    const merchantData: MerchantResponse = (await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage))?.data;

    const filteredMerchants = slug === "other"
        ? merchantData?.merchants?.filter(item => !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()))
        : merchantData?.merchants?.filter(item => item.merchant_name?.toUpperCase().startsWith(slug.toUpperCase()));

    const totalPages = merchantData?.pagination.last_page;
    const paginatedMerchants = filteredMerchants
        .sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
        .slice(0, PAGE_SIZE);

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">Popular Merchants</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2" aria-current="page">
                                                <Link href={`/all-stores/A`} className="n17-color">All Stores</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <span className="fw-mid f5-color text-capitalize">{slug}</span>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-8.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">
                <div className="alphabet-toggle-outer d-flex justify-content-center my-4">
                    <div className="alphabet-toggle-inner d-flex flex-nowrap align-items-center px-2 py-2">
                        {ALPHABETS.map((alpha) => (
                            <Link
                                key={alpha}
                                href={`/all-stores/${alpha}`}
                                className={`alpha-btn-circle${slug === alpha ? " active" : ""}`}
                                title={alpha}
                            >
                                {alpha}
                            </Link>
                        ))}
                        <Link
                            href={`/all-stores/other`}
                            className={`alpha-btn-circle${slug === "other" ? " active" : ""}`}
                            title="#"
                        >
                            #
                        </Link>
                    </div>
                </div>
                <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                                {paginatedMerchants.length > 0 ? (
                                    paginatedMerchants.map((item, i) => (
                                        <MerchantCard
                                            key={i}
                                            merchant_name={item?.merchant_name}
                                            merchant_logo={item?.merchant_logo || ""}
                                            companyDomain={companyDomain}
                                            merchant_href={getMerchantHref(item, store_slug, slug_type)}
                                        />
                                    ))
                                ) : (
                                    <div className="text-center w-100 py-5">No merchants found.</div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/all-stores/${slug}`} />
                )}
            </div>
            <MerchantPageSchema PAGE_SIZE={PAGE_SIZE} apiSlug={apiSlug} company_id={company_id} domain={companyDomain} currentPage={currentPage} mer_slug={store_slug} slug_type={slug_type} />
        </>
    );
};

export default AllStoresPage;
