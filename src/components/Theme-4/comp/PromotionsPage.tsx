import { apiGetAllPromotion } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import PageBanner from './PageBanner';
import { getPromotionHref } from '@/constants/hooks';
import { Promotion } from '@/services/dataTypes';

const PromotionsPage = async ({promotionSlug}: { promotionSlug: string }) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promotions = (await apiGetAllPromotion(companyDomain)).data;

    return (
        <>
            <section className="pb-16 bg-gray-50">
                <PageBanner
                    title='Our Trending Promotions'
                    image="/themes/Theme_3/images/banner-illus-5.png"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "Promotions", href: "/promotions" },
                    ]}
                />

                <div className='max-w-[1200px] mx-auto mt-10 px-6'>
                    {promotions?.length ? (
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
                            {promotions.map((promotion: Promotion, index: number) => (
          
                                <Link
                                    key={index}
                                    href={getPromotionHref(promotion, promotionSlug)}
                                    className=" no-underline group relative block p-6 rounded-2xl bg-white border border-gray-100 shadow-sm 
                                    hover:shadow-xl hover:border-[var(--primary-color)] 
                                    transition-all duration-300 ease-in-out"
                                >
                                    <h3 className="no-underline text-lg font-semibold text-gray-800 text-center mb-3 
                                    group-hover:text-[var(--primary-color)] transition-colors">
                                        {promotion.name}
                                    </h3>

                                    <div className="flex justify-center items-center">
                                        <p className="no-undereline text-sm font-medium text-[var(--primary-color)] text-center opacity-80 
                                        group-hover:opacity-100 transition-opacity">
                                            View Offers
                                        </p>

                                        <FaArrowRight
                                            size={18}
                                            className="hidden sm:flex ml-4 text-[var(--primary-color)] opacity-0 translate-x-[-6px] 
                                            group-hover:opacity-100 group-hover:translate-x-0 
                                            transition-all duration-300"
                                        />
                                    </div>

                                    <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r 
                                    from-[var(--primary-color)] to-orange-500 
                                    transition-all duration-300 group-hover:w-full rounded-b-2xl" />
                                </Link>
                                
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center italic mt-8">
                            Looks like there are no promotions right now — check back soon!
                        </p>
                    )}
                </div>
            </section>
        </>
    )
}

export default PromotionsPage;
