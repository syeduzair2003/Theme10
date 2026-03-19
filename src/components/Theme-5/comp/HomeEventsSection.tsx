import { apiGetHomeEventDetails } from '@/apis/user';
import { discardHTMLTags, getEventsHref, splitHeading } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';
import HomeEventsCard from './HomeEventsCard';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const HomeEventSection = async ({ companyId }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;
    const allOffers: MerchantOfferItem[] =
        eventMerchants?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    const [first, second] = splitHeading(eventMerchants?.event?.name || "Trending Events");
    const couponData = allOffers.slice(0, 8);

    if (allOffers?.length === 0) {
        return null;
    }

    return (
        <section className="py-24 bg-[#fafafa] relative overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Clean, Centered Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-l-4 border-indigo-600 pl-6 animate-fade-in-up">
                    <div>
                        <div className='flex justify-between items-center mb-[10px]'>
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3 animate-fade-in-up animation-delay-200">
                                {first} <span className='text-indigo-600'>{second}</span>
                            </h2>
                            <Link
                                href={getEventsHref(eventMerchants?.event?.slug || "", "event")}
                                className="hidden md:flex ml-auto w-max group items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap animate-fade-in-up animation-delay-300">
                                View All
                                <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </span>
                            </Link>
                        </div>
                        <p className='text-lg text-slate-500 font-medium animate-fade-in-up animation-delay-400'>
                            {eventMerchants?.event?.description ? discardHTMLTags(eventMerchants.event.description) : "Discover exclusive deals and offers"}
                        </p>

                    </div>
                </div>

                {/* The 8-Tile Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {couponData.map((item, index) => (
                        <div key={item.offer.unique_id || item.offer.id || index} className="animate-fade-in-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
                            <HomeEventsCard
                                item={item}
                                companyDomain={companyDomain}
                                index={index}
                            />
                        </div>
                    ))}
                </div>

                {/* Mobile View All Button */}
                <div className="md:hidden flex justify-center mt-8">
                    <Link
                        href={getEventsHref(eventMerchants?.event?.slug || "", "event")}
                        className="w-max group flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap">
                        View All
                        <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default HomeEventSection;