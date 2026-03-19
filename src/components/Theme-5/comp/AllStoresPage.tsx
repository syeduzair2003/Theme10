import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { apiGetMerchantsAlphabetically } from '@/apis/merchant';
import cookieService from '@/services/CookiesService';
import { getMerchantHref, getBaseImageUrl } from '@/constants/hooks';
import { MerchantResponse } from '@/services/dataTypes';
import { notFound } from 'next/navigation';
import Pagination from './Pagination';
import Footer from './Footer';
import Header from './Header';

interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
    slug: string;
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
        ?.sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
        .slice(0, PAGE_SIZE) || [];

    return (
        <>
            {/* Banner Section */}
            <Header
                title="Popular Merchants"
                subtitle=""
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'All Stores', href: '/all-stores/A' },
                    { label: slug.toUpperCase() }
                ]}
            />

            {/* Main Content Section */}
            <section className="py-12 md:py-16 lg:py-20 bg-slate-100/50 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Alphabet Filter - Horizontal on Mobile, Top on Desktop */}
                    <div className="mb-8 md:mb-12 flex justify-center px-4">
                        <div
                            className="flex flex-nowrap md:flex-wrap items-center gap-0 p-1.5 rounded-2xl overflow-x-auto scrollbar-hide max-w-full"
                            style={{
                                background: "rgba(255, 255, 255, 0.19)",
                                backdropFilter: "blur(20px)",
                                WebkitBackdropFilter: "blur(20px)",
                                boxShadow: "0 8px 32px rgba(99, 101, 241, 0.27)",
                            }}
                        >
                            {[...ALPHABETS, { id: "other", label: "#" }].map((item) => {
                                const isString = typeof item === "string";
                                const val = isString ? item : item.id;
                                const label = isString ? item : item.label;
                                const isActive = slug === val;

                                return (
                                    <Link
                                        key={val}
                                        href={`/all-stores/${val}`}
                                        className={`
                                                flex-shrink-0 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center
                                                text-sm font-semibold transition-all duration-200 rounded-xl
                                                ${isActive
                                                ? "text-indigo-600 font-bold"
                                                : "text-slate-500 hover:text-slate-800"
                                            }
                                        `}
                                        style={isActive ? {
                                            background: "rgba(255, 255, 255, 0.85)",
                                            boxShadow: "0 2px 12px rgba(99, 102, 241, 0.2), inset 0 1px 0 rgba(255,255,255,1)",
                                            border: "1px solid rgba(99, 102, 241, 0.15)",
                                        } : {}}
                                    >
                                        {label}
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Merchants Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-6 lg:gap-8 mb-12">
                        {paginatedMerchants.length > 0 ? (
                            paginatedMerchants.map((item, i) => (
                                <Link key={i} href={getMerchantHref(item, store_slug, slug_type)} className="group">
                                    <div className="relative h-full bg-white rounded-lg md:rounded-2xl lg:rounded-[2rem] p-3 md:p-6 lg:p-8 transition-all duration-500 hover:shadow-[0_22px_50px_-12px_rgba(79,70,229,0.15)] border border-slate-100 hover:border-indigo-100 hover:-translate-y-2">

                                        {/* Logo Wrapper */}
                                        <div className="relative mb-3 md:mb-6 lg:mb-8 aspect-[4/3] rounded-lg md:rounded-2xl lg:rounded-3xl bg-slate-50 flex items-center justify-center p-3 md:p-6 lg:p-8 overflow-hidden group-hover:bg-white transition-colors">
                                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 to-transparent" />
                                            <Image
                                                src={getBaseImageUrl(companyDomain, item?.merchant_logo, "")}
                                                alt={item?.merchant_name}
                                                width={140}
                                                height={80}
                                                className="relative z-10 object-contain max-h-full transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>

                                        {/* Merchant Info */}
                                        <div className="text-center">
                                            <h3 className="text-sm md:text-lg lg:text-xl font-bold text-slate-900 mb-1 md:mb-2 group-hover:text-indigo-600 transition-colors">
                                                {item.merchant_name}
                                            </h3>

                                            <div className="flex items-center justify-center gap-1 md:gap-2 mb-3 md:mb-4 lg:mb-6">
                                                <div className="h-1 w-1 md:h-1.5 md:w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[9px] md:text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                    Active Deals
                                                </span>
                                            </div>

                                            {/* Button */}
                                            <div className="w-full py-2 md:py-3 lg:py-4 rounded-lg md:rounded-xl lg:rounded-2xl bg-slate-900 group-hover:bg-indigo-600 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-1 md:gap-2 group-hover:gap-4">
                                                View Offers
                                                <svg className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <h3 className="text-xl font-semibold text-gray-600">No merchants found.</h3>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={`/all-stores/${slug}`} />
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AllStoresPage;