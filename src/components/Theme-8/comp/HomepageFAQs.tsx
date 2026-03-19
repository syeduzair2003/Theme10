import React from 'react'
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import StoreCardHorizontal from './StoreCardHorizontal';
import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';

interface Props {
    slug_type: string;
    store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;
    const faqs = (await apiHomePageFaqs(companyDomain)).data;

    return (
        <section className="bg-[#f8fafc] py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-16">
                    
                    {/* FAQ SECTION (Left Side) */}
                    {faqs?.length > 0 && (
                        <div className="w-full lg:w-7/12">
                            <div className="mb-12">
                                <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
                                    Support Center
                                </span>
                                <h2 className="text-5xl font-black text-gray-900 mt-6 tracking-tight leading-tight">
                                    Everything you <br/> <span className="text-blue-600">need to know.</span>
                                </h2>
                            </div>
                            <div className="space-y-3">
                                {faqs.map((faq: any, idx: number) => (
                                    <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* RECENTLY UPDATED (Right Side - Sticky) */}
                    {promoMerchants?.length > 0 && (
                        <div className="w-full lg:w-5/12">
                            <div className="sticky top-10 bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="text-2xl font-extrabold text-gray-900">Fresh Deals</h3>
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                </div>
                                
                                <div className="space-y-4">
                                    {promoMerchants?.slice(0, 6).map((merchant: any, i: number) => (
                                        <StoreCardHorizontal 
                                            key={i} 
                                            merchant={merchant} 
                                            mer_slug={store_slug} 
                                            mer_slug_type={slug_type} 
                                        />
                                    ))}
                                </div>

                                <button className="w-full mt-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-blue-600 transition-all shadow-lg">
                                    Explore More Stores
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default HomepageFAQs