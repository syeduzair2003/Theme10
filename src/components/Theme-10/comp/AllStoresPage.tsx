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
import { Reveal, ScaleReveal } from './MotionWrapper'; // Import wrappers

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

    const response = await apiGetMerchantsAlphabetically(company_id, apiSlug, PAGE_SIZE, currentPage);
    const merchantData: MerchantResponse = response?.data;

    const filteredMerchants = slug === "other"
        ? merchantData?.merchants?.filter(item => !item.merchant_name || !/^[A-Z]/i.test(item.merchant_name.trim()))
        : merchantData?.merchants?.filter(item => item.merchant_name?.toUpperCase().startsWith(slug.toUpperCase()));

    const totalPages = merchantData?.pagination.last_page;
    const paginatedMerchants = (filteredMerchants || [])
        .sort((a, b) => a.merchant_name.localeCompare(b.merchant_name))
        .slice(0, PAGE_SIZE);

    return (
        <main className="min-h-screen bg-slate-50/50">
            {/* --- Hero Banner Section --- */}
            <section className="relative overflow-hidden bg-[#1a212e] border-b border-white/5 py-16 md:py-24 rounded-b-[3rem]">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                        <Reveal x={-50} y={0}>
                            <div className="max-w-2xl text-center md:text-left">
                                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                                    Popular <span className="text-blue-600">Merchants</span>
                                </h1>
                                
                                <nav className="flex justify-center md:justify-start" aria-label="Breadcrumb">
                                    <ol className="flex items-center space-x-3 text-sm font-medium">
                                        <li><Link href="/" className="no-underline uppercase text-slate-500 hover:text-blue-600 transition-colors">Home</Link></li>
                                        <li className="flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-400" />
                                            <Link href="/all-stores/A" className="no-underline uppercase text-slate-500 hover:text-blue-600 transition-colors">All Stores</Link>
                                        </li>
                                        <li className="flex items-center space-x-3">
                                            <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-400" />
                                            <span className="text-blue-600 capitalize bg-blue-50 px-3 py-1 rounded-full font-bold">{slug}</span>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </Reveal>
                        
                        <Reveal x={50} y={0}>
                            <div className="hidden md:block relative w-72 h-60">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-8.png" 
                                    alt="Store illustration" 
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* --- Alphabet Navigation --- */}
            <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm">
                <div className="container mx-auto">
                    <Reveal y={-20} delay={0.2}>
                        <div className="flex items-center justify-center gap-1 md:gap-2 py-4 overflow-x-auto no-scrollbar">
                            {ALPHABETS.map((alpha, idx) => (
                                <Link
                                    key={alpha}
                                    href={`/all-stores/${alpha}`}
                                    className={`no-underline flex-shrink-0 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl text-sm md:text-base font-bold transition-all duration-200 
                                    ${slug === alpha 
                                        ? "bg-blue-600 text-white scale-110" 
                                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                                >
                                    {alpha}
                                </Link>
                            ))}
                            <Link
                                href={`/all-stores/other`}
                                className={`no-underline flex-shrink-0 w-9 h-9 md:w-11 md:h-11 flex items-center justify-center rounded-xl text-lg font-bold transition-all duration-200
                                ${slug === "other" 
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200 scale-110" 
                                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"}`}
                            >
                                #
                            </Link>
                        </div>
                    </Reveal>
                </div>
            </div>

            {/* --- Stores Grid --- */}
            <div className="container mx-auto px-4 py-12">
                {paginatedMerchants.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {paginatedMerchants.map((item, i) => (
                            <ScaleReveal key={i} delay={(i % 12) * 0.05}> {/* Stagger effect for cards */}
                                <MerchantCard
                                    merchant_name={item?.merchant_name}
                                    merchant_logo={item?.merchant_logo || ""}
                                    companyDomain={companyDomain}
                                    merchant_href={getMerchantHref(item, store_slug, slug_type)}
                                />
                            </ScaleReveal>
                        ))}
                    </div>
                ) : (
                    <Reveal>
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300">
                            <div className="text-slate-400 text-5xl mb-4">📭</div>
                            {/* Quotes Fixed Here */}
                            <h3 className="text-xl font-bold text-slate-800">No merchants found for &quot;{slug}&quot;</h3>
                            <p className="text-slate-500">Try selecting a different alphabet.</p>
                        </div>
                    </Reveal>
                )}

                {/* --- Pagination --- */}
                {totalPages > 1 && (
                    <Reveal delay={0.4}>
                        <div className="mt-16 flex justify-center">
                            <Pagination 
                                currentPage={currentPage} 
                                totalPages={totalPages} 
                                baseUrl={`/all-stores/${slug}`} 
                            />
                        </div>
                    </Reveal>
                )}
            </div>

            <MerchantPageSchema 
                PAGE_SIZE={PAGE_SIZE} 
                apiSlug={apiSlug} 
                company_id={company_id} 
                domain={companyDomain} 
                currentPage={currentPage} 
                mer_slug={store_slug} 
                slug_type={slug_type} 
            />
        </main>
    );
};

export default AllStoresPage;