import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl } from '@/constants/hooks';

interface Props {
    slug_type: string;
    store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
    const companyDomainObj = await cookieService.get("domain");
    const companyDomain = companyDomainObj?.domain || '';
    
    // Fetch both datasets concurrently
    const [faqsRes, promoMerchantsRes] = await Promise.all([
        apiHomePageFaqs(companyDomain),
        apiRecentlyUpdatedStores(companyDomain)
    ]);

    const faqs = faqsRes?.data;
    const promoMerchants = promoMerchantsRes?.data;

    // Only render if we have at least one data source
    const hasFaqs = faqs && faqs.length > 0;
    const hasMerchants = promoMerchants && promoMerchants.length > 0;

    if (!hasFaqs && !hasMerchants) return null;

    return (
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 relative overflow-hidden bg-white">
            {/* Background design elements */}
            <div className="absolute top-0 right-0 -mr-20 w-72 h-72 rounded-full bg-[#8bc94a] opacity-5 blur-3xl"></div>
            <div className="absolute bottom-10 left-0 -ml-20 w-80 h-80 rounded-full bg-[#ff912f] opacity-5 blur-3xl"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    
                    {/* LEFT COLUMN: FAQs */}
                    {hasFaqs && (
                        <div className="w-full">
                            {/* Matching HomeCategories Header */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                        className="w-[3px] h-4 rounded-full inline-block bg-[#8bc94a]"
                                        aria-hidden="true"
                                    />
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff912f]">
                                        Need Help?
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                                    <span className="text-[#8bc94a]">Frequently </span>
                                    <span className="text-gray-800">Asked Questions</span>
                                </h2>
                            </div>
                            
                            <div className="space-y-4">
                                {faqs.map((faq, index) => (
                                    <details 
                                        key={index} 
                                        className="group rounded-2xl bg-white border border-gray-100 shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden hover:shadow-[0_8px_24px_rgba(139,201,74,0.08)] hover:border-[#8bc94a]/30 transition-all duration-300"
                                    >
                                        <summary className="list-none [&::-webkit-details-marker]:hidden flex justify-between items-center p-5 md:p-6 cursor-pointer select-none">
                                            <span className="font-semibold text-base text-slate-800 pr-6 group-open:text-[#8bc94a] transition-colors leading-snug">
                                                {faq.question}
                                            </span>
                                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-[#ff912f] group-open:bg-[#ff912f] group-open:text-white transition-all duration-300 shadow-inner group-hover:bg-[#ff912f]/10 group-open:group-hover:bg-[#ff912f]">
                                                <svg className="w-5 h-5 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </summary>
                                        <div className="px-5 md:px-6 pb-6 text-base text-gray-600 leading-relaxed overflow-hidden">
                                            <div className="pt-4 border-t border-gray-100" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RIGHT COLUMN: Recently Updated Stores */}
                    {hasMerchants && (
                        <div className="w-full relative lg:pl-6">
                            {/* Matching HomeCategories Header - Pulled outside card for perfect horizontal alignment */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span
                                        className="w-[3px] h-4 rounded-full inline-block bg-[#8bc94a]"
                                        aria-hidden="true"
                                    />
                                    <span className="relative flex h-2 w-2 ml-0.5">
                                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff912f] opacity-75"></span>
                                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ff912f]"></span>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff912f]">
                                        Live Updates
                                    </span>
                                </div>
                                <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                                    <span className="text-[#8bc94a]">Recently </span>
                                    <span className="text-gray-800">Updated Stores</span>
                                </h2>
                            </div>

                            {/* Decorative background block */}
                            <div className="absolute right-0 top-[70px] bottom-0 w-4/5 bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2.5rem] transform translate-x-4 translate-y-4 -z-10 hidden sm:block"></div>
                            
                            <div className="bg-white rounded-[2rem] border border-gray-100/80 p-6 sm:p-8 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative z-10 w-full flex flex-col space-y-1">
                                {promoMerchants.slice(0, 5).map((mer: any, m: number) => {
                                    const href = slug_type === "1" ? `/${store_slug}/${mer?.slug}` : `/${mer?.slug}`;
                                    
                                    return (
                                        <Link 
                                            key={m} 
                                            href={href}
                                            className="group flex flex-row items-center p-3 sm:px-4 -mx-3 sm:-mx-4 rounded-2xl hover:bg-slate-50 hover:shadow-sm transition-all duration-300 relative overflow-hidden bg-white border border-transparent hover:border-gray-100"
                                        >
                                            {/* Left Accent Line on Hover */}
                                            <div className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-[#ff912f] scale-y-0 group-hover:scale-y-100 transition-transform origin-center duration-300"></div>

                                            <div className="flex items-center gap-4 sm:gap-5 w-full">
                                                <div className="w-14 h-14 relative rounded-[1rem] border border-gray-200 bg-white shadow-sm flex items-center justify-center shrink-0 overflow-hidden group-hover:border-[#8bc94a]/40 transition-colors">
                                                    {mer?.merchant_logo ? (
                                                        <Image
                                                            src={getBaseImageUrl(companyDomain, mer.merchant_logo, '')}
                                                            alt={mer?.merchant_name || 'Store'}
                                                            fill
                                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                            sizes="56px"
                                                        />
                                                    ) : (
                                                        <span className="text-[#8bc94a] font-bold text-xl uppercase">{mer?.merchant_name?.[0]}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0 pr-2 pb-0.5">
                                                    <h4 className="text-base font-bold text-slate-800 group-hover:text-[#8bc94a] transition-colors leading-tight truncate">
                                                        {mer?.merchant_name}
                                                    </h4>
                                                    {mer?.total_offers && (
                                                         <span className="text-sm font-medium text-slate-500 mt-1 flex items-center gap-1.5 opacity-80">
                                                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 text-[#ff912f]">
                                                              <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5v2.879a2.5 2.5 0 00.732 1.767l6.5 6.5a2.5 2.5 0 003.536 0l2.878-2.878a2.5 2.5 0 000-3.536l-6.5-6.5A2.5 2.5 0 008.38 3H5.5zM6 7a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                                            </svg>
                                                             {mer.total_offers} Offers
                                                         </span>
                                                    )}
                                                </div>
                                                
                                                <div className="shrink-0 flex items-center pl-2">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#ff912f] group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-[#ff912f]/20">
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5">
                                                            <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })}

                                <div className="mt-8 pt-4 border-t border-gray-50 text-center shrink-0">
                                     <Link 
                                         href={`/${store_slug}`}
                                         className="flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-bold text-slate-700 bg-slate-50 hover:bg-[#8bc94a] hover:text-white transition-all duration-300 border border-slate-200 hover:border-[#8bc94a]"
                                     >
                                         Explore All Stores
                                     </Link>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    );
};

export default HomepageFAQs;