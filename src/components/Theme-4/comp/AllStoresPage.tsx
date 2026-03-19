import React from 'react';
import Link from 'next/link';
import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import { getMerchantHref } from '@/constants/hooks';
import { MerchantResponse } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import PageBanner from './PageBanner';
import MerchantCard from './MerchantCard';
import Pagination from './Pagination';

interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
    slug: string; // This is the alphabet, e.g. "A", "B", "other"
    page?: string;
}

const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const PAGE_SIZE = 15;

const AllStoresPage = async ({ store_slug, slug_type, company_id, slug, page }: Props) => {
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const apiSlug = slug === "other" ? "#" : slug;

    if (slug.length > 1 && slug !== "other") {
        return notFound();
    }

    const merchantData: MerchantResponse = (await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage))?.data;

    const filteredMerchants = slug === "other"
        ? merchantData?.merchants?.filter(item => !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()))
        : merchantData?.merchants?.filter(item => item.merchant_name?.toUpperCase().startsWith(slug));

    const totalPages = merchantData?.pagination.last_page;
    const paginatedMerchants = filteredMerchants.slice(0, PAGE_SIZE)

    return (
        <>
            <section className="pb-16 bg-gray-50">
                <PageBanner
                    title="Popular Merchants"
                    image="/themes/Theme_3/images/banner-illus-1.png"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "All Stores", href: "/all-stores/A" },
                        {
                            label: slug === "other" ? "Other" : slug.toUpperCase(),
                            href: `/all-stores/${slug}`,
                        },
                    ]}
                />

                {/* Alphabet Nav */}
                <nav aria-label="Alphabet Navigation" className="px-8 mt-6">
                    <div className="rounded-2xl bg-white/70 backdrop-blur-md shadow-lg px-2 py-3 border border-gray-100">
                        <ul className="flex flex-wrap justify-center gap-3 p-0">
                            {ALPHABETS.map((letter) => (
                                <li key={letter}>
                                    <Link href={`/all-stores/${letter}`} className='no-underline inline-flex items-center justify-center w-10 h-10 rounded-full 
                         text-sm font-semibold text-gray-700 
                         bg-gray-50 shadow-sm hover:bg-gradient-to-r 
                         hover:from-[var(--primary-color)] hover:to-orange-500 
                         hover:text-white hover:shadow-md transition-all duration-300'>
                                        {letter}
                                    </Link>

                                </li>
                            ))}

                            {/* Other */}
                            <li>
                                <Link
                                    href="/all-stores/other"
                                    className="no-underline inline-flex items-center justify-center w-10 h-10 rounded-full 
                                    text-sm font-semibold text-gray-700 
                                    bg-gray-50 shadow-sm hover:bg-gradient-to-r 
                                    hover:from-[var(--primary-color)] hover:to-orange-500 
                                    hover:text-white hover:shadow-md transition-all duration-300">
                                    #
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>

                {/* Merchant Cards Grid */}
                <div className="max-w-[1400px] mx-auto mt-10 px-2 md:px-6">
                    {paginatedMerchants.length ? (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                            {paginatedMerchants.map((item, index) => (
                                <MerchantCard
                                    key={index}
                                    merchant_logo={item.merchant_logo}
                                    merchant_name={item.merchant_name}
                                    href={getMerchantHref(item, store_slug, slug_type)}
                                />
                            ))}
                        </div>
                    ) :
                        <p className="text-gray-500 text-center italic mt-8">
                            No stores found starting with “{slug === "other" ? "#" : slug.toUpperCase()}”.
                        </p>
                    }
                </div>
                {/* Pagination */}
                {totalPages > 1 && (
                    <Pagination
                        page={currentPage.toString()}
                        pagination={{
                            last_page: totalPages
                        }} basePath={`/all-stores/${slug}`} 
                    />
                )}
            </section>
        </>
    );
};

export default AllStoresPage;
