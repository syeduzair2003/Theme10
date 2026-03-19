import { apiGetAllPromotion } from '@/apis/user';
import { getPromotionHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { Promotion } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import Footer from './Footer';
import Header from './Header';

const PromotionsPage = async ({ promotionSlug }: { promotionSlug: string }) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promotions = (await apiGetAllPromotion(companyDomain)).data;

    return (
        <>
            <Header
                title="Our Trending Promotions"
                subtitle=""
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Promotions' }
                ]}
            />

            <section className="py-20 bg-white min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {promotions?.length > 0 && promotions?.map((promotion: Promotion, index: number) => (
                            <Link
                                key={index}
                                href={getPromotionHref(promotion, promotionSlug)}
                                className="group block bg-white border border-slate-200 rounded-[2rem] p-8 transition-all duration-300 hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1"
                            >
                                <h3 className="text-xl font-black text-slate-900 mb-4 text-center group-hover:text-indigo-600 transition-colors">
                                    {promotion?.name}
                                </h3>
                                <div className="flex justify-center">
                                    <span className="text-sm font-bold text-slate-600 group-hover:text-indigo-600 transition-colors">
                                        View Offers
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}

export default PromotionsPage