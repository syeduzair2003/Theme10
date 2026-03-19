import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import cookieService from '@/services/CookiesService';
import { MerchantResponse } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';
import AlphabetMobileSelect from './AlphabetMobileSelect';
import AlphabetDropdown from './AlphabetDropdown';
import MerchantPageSchema from '@/components/shared/SchemaScripts/MerchantPageSchema';

interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
    slug: string; // alphabet or "other"
    page?: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 33;


//  dynamic visible alphabet window
function getVisibleRange(slug: string) {
    const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    const index =
        slug === "other"
            ? 25 // treat "#" as after Z
            : ALPHA.indexOf(slug);

    const start = Math.max(0, index - 2);
    const end = Math.min(25, index + 2);

    return { start, end };
}


//  previous / next logic
function getPrev(slug: string) {
    if (slug === "A") return null;
    if (slug === "other") return "Z";
    const idx = ALPHABETS.indexOf(slug);
    return ALPHABETS[idx - 1];
}

function getNext(slug: string) {
    if (slug === "other") return null;
    if (slug === "Z") return "other";
    const idx = ALPHABETS.indexOf(slug);
    return ALPHABETS[idx + 1];
}



const AllStoresPage = async ({ store_slug, slug_type, company_id, slug, page }: Props) => {
    const companyDomain = (await cookieService.get("domain"))?.domain || "";
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const apiSlug = slug === "other" ? "#" : slug;

    if (slug.length > 1 && slug !== "other") return notFound();

    const merchantData: MerchantResponse =
        (await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage))?.data;

    const filteredMerchants =
        slug === "other"
            ? merchantData?.merchants?.filter(item => !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()))
            : merchantData?.merchants?.filter(item =>
                item.merchant_name?.toUpperCase().startsWith(slug.toUpperCase())
            );

    const totalPages = merchantData?.pagination.last_page;

    const paginatedMerchants = filteredMerchants
        .sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
        .slice(0, PAGE_SIZE);



    //  build alphabet window
    const { start, end } = getVisibleRange(slug);
    const visible = ALPHABETS.slice(start, end + 1);

    const prev = getPrev(slug);
    const next = getNext(slug);

    return (
        <>
            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">

                <div className="breadcrumb-two">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern" className="bg-pattern"
                        width={1000} height={400}
                    />
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">

                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href={`/`} className="breadcrumb-list__link text-body hover-text-main">Home</a>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text">All-Stores</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">Our Popular Stores</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">

                <div className="alphabet-nav-container d-none d-xl-flex d-lg-flex justify-content-between align-items-center my-4 px-3 py-3 rounded-4 shadow-sm">

                    <div className="d-flex justify-content-center flex-grow-1 gap-2 align-items-center">

                        {/* Previous */}
                        {prev && (
                            <Link href={`/all-stores/${prev}`} className="alpha-page-btn">
                                Previous
                            </Link>
                        )}

                        {/* Visible letters */}
                        {visible.map((alpha) => (
                            <Link
                                key={alpha}
                                href={`/all-stores/${alpha}`}
                                className={`alpha-page-btn ${slug === alpha ? "active" : ""}`}
                            >
                                {alpha}
                            </Link>
                        ))}

                        {/* Ellipsis */}
                        {end < 25 && <span className="alpha-ellipsis">…</span>}

                        {/* Z */}
                        {end < 25 && (
                            <Link
                                href={`/all-stores/Z`}
                                className={`alpha-page-btn ${slug === "Z" ? "active" : ""}`}
                            >
                                Z
                            </Link>
                        )}

                        {/* # */}
                        <Link
                            href={`/all-stores/other`}
                            className={`alpha-page-btn ${slug === "other" ? "active" : ""}`}
                        >
                            #
                        </Link>

                        {/* Next */}
                        {next && (
                            <Link href={`/all-stores/${next}`} className="alpha-page-btn">
                                Next
                            </Link>
                        )}
                    </div>

                    <AlphabetDropdown slug={slug} />
                </div>



                {/* MOBILE FILTER (<=1024px) */}
                <div className="d-xl-none  d-lg-none my-4 text-center">
                    <AlphabetMobileSelect slug={slug} />
                </div>

                <section>
                    <div className="row">

                        {paginatedMerchants.length > 0 ? (
                            paginatedMerchants.map((mer, i) => (
                                <div
                                    key={i}
                                    className="col-12 col-sm-6 col-md-4 col-lg-4 flex-shrink-0 px-3 mb-4"
                                >
                                    <div className="mer-card card border-0 shadow-sm text-center h-100">
                                        <div
                                            className="card-body d-flex flex-column align-items-center justify-content-between gap-1"
                                            style={{
                                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                                borderRadius: "16px",
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            <div className="mer-logo">
                                                <Image
                                                    src={`/${mer?.merchant_logo}`}
                                                    alt={mer?.merchant_name}
                                                    width={120}
                                                    height={120}
                                                    className="img-fluid"
                                                    unoptimized
                                                />
                                            </div>
                                            <Link
                                                href={`/store/${mer?.slug}`}
                                                className="mer-btn text-decoration-none fw-semibold"
                                            >
                                                {mer?.merchant_name}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-100 py-5">No merchants found.</div>
                        )}
                    </div>
                </section>
                {totalPages > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/all-stores/${slug}`} />
                )}
            </div>
             <MerchantPageSchema PAGE_SIZE={PAGE_SIZE} apiSlug={apiSlug} company_id={company_id} domain={companyDomain} currentPage={currentPage} mer_slug={store_slug} slug_type={slug_type} />
        </>
    );
};

export default AllStoresPage
