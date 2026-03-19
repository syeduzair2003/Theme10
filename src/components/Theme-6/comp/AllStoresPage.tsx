import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import cookieService from '@/services/CookiesService';
import { MerchantResponse } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Pagination from './Pagination';
import MerchantPageSchema from '@/components/shared/SchemaScripts/MerchantPageSchema';
import AlphabetMobileSelect from './AlphabetMobileSelect';
import AlphabetDropdown from './AlphabetDropdown';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
            <section className="breadcrumb-green">
                <div className="container"> {/* Added container for alignment consistency */}
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="text-center">
                                <ul className="flx-align gap-2 mb-2 justify-content-center">
                                    {/* Home */}
                                    <li className="font-14 text-body">
                                        <Link href="/" className="text-body hover-text-main">Home</Link>
                                    </li>

                                    {/* Divider */}
                                    <li className="font-14 text-body">
                                        <span className="font-10">
                                            <FontAwesomeIcon
                                                icon={faGreaterThan}
                                                style={{ width: '10px', height: '10px', color: 'white' }}
                                            />
                                        </span>
                                    </li>

                                    {/* Current Page: All-Stores */}
                                    <li className="font-14 text-body">
                                        <span className="text-white">All-Stores</span>
                                    </li>
                                </ul>

                                <h1 className="mb-0 text-capitalize">Our Popular Stores</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="container">

                <div className="alpha-nav-container d-none d-lg-block">
                    <div className="alpha-nav-wrapper d-flex justify-content-center align-items-center flex-wrap gap-2">

                        {/* Previous Arrow */}
                        {prev && (
                            <Link href={`/all-stores/${prev}`} className="alpha-nav-btn arrow-btn">
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </Link>
                        )}

                        {/* Alphabet Map */}
                        {visible.map((alpha) => (
                            <Link
                                key={alpha}
                                href={`/all-stores/${alpha}`}
                                className={`alpha-nav-btn ${slug === alpha ? "active" : ""}`}
                            >
                                {alpha}
                            </Link>
                        ))}

                        {/* Ellipsis */}
                        {end < 25 && <span className="alpha-nav-dots">...</span>}

                        {/* Z */}
                        {end < 25 && (
                            <Link
                                href={`/all-stores/Z`}
                                className={`alpha-nav-btn ${slug === "Z" ? "active" : ""}`}
                            >
                                Z
                            </Link>
                        )}

                        {/* # */}
                        <Link
                            href={`/all-stores/other`}
                            className={`alpha-nav-btn ${slug === "other" ? "active" : ""}`}
                        >
                            #
                        </Link>

                        {/* Next Arrow */}
                        {next && (
                            <Link href={`/all-stores/${next}`} className="alpha-nav-btn arrow-btn">
                                <FontAwesomeIcon icon={faChevronRight} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* <AlphabetDropdown slug={slug} /> */}




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
                                    {/* 1. Main Card Container */}
                                    <div className="merchant-card">

                                        {/* 2. Logo Area */}
                                        <div className="merchant-logo-container">
                                            <Image
                                                src={`/${mer?.merchant_logo}`}
                                                alt={mer?.merchant_name}
                                                width={120}
                                                height={120}
                                                className="img-fluid"
                                                style={{ objectFit: "contain", maxHeight: "80px" }} // Ensures logos don't get too tall
                                                unoptimized
                                            />
                                        </div>

                                        {/* 3. Footer Link Button */}
                                        <Link
                                            href={`/store/${mer?.slug}`}
                                            className="merchant-link-btn"
                                        >
                                            {mer?.merchant_name} Discount Offers
                                        </Link>
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
