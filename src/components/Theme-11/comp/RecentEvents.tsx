import { apiGetHomeEventDetails } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import React from 'react';
import Link from 'next/link';
import {
    discardHTMLTags,
    getEventsHref,
    getMerchantHref,
    getProductDetailHref,
    splitHeading,
} from '@/constants/hooks';
import EventsOfferCard, { EventsGrid } from './EventsOfferCard';


interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const RecentEvents = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    const companyDomain = (await cookieService.get('domain')).domain;
    const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;

    const allOffers: MerchantOfferItem[] =
        eventMerchants?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];

    if (allOffers.length === 0) return null;

    const count = 8;
    const event = eventMerchants?.event;
    const heading = event?.name ?? 'Recent Events';
    const subText = discardHTMLTags(event?.description) ?? 'Exclusive deals and limited time offers from our latest events';
    const [firstWord, restWords] = splitHeading(heading);

    return (
        <section
            aria-label="Recent Events Section"
            className="relative w-full py-12 md:py-16 lg:py-20"
            style={{
                background: 'linear-gradient(180deg, #fffcf8 0%, #ffffff 40%, #f4fbee 100%)',
            }}
        >
            {/* ── Subtle horizontal rule ── */}
            <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{
                    background:
                        'linear-gradient(90deg, transparent 0%, #ffd4a8 30%, #d4f0b0 70%, transparent 100%)',
                }}
                aria-hidden="true"
            />

            <div className="container mx-auto px-4">
                {/* ── Section header row ── */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
                    <div className="flex-1 min-w-0">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-2 mb-1.5">
                            <span
                                className="w-[3px] h-4 rounded-full inline-block"
                                style={{ background: '#8bc94a' }}
                                aria-hidden="true"
                            />
                            <span
                                className="text-[10px] font-bold uppercase tracking-widest"
                                style={{ color: '#ff912f' }}
                            >
                                Trending Events
                            </span>
                        </div>

                        {/* Heading */}
                        <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight m-0">
                            {firstWord && (
                                <span style={{ color: '#8bc94a' }}>{firstWord} </span>
                            )}
                            <span className="text-gray-800">{restWords || heading}</span>
                        </h2>

                        {/* Sub-text */}
                        {subText && (
                            <p className="mt-1.5 text-[13px] text-gray-400 leading-relaxed m-0 max-w-2xl">
                                {subText}
                            </p>
                        )}
                    </div>

                    {/* Right: View All button */}
                    <div className="flex items-start pt-1 shrink-0">
                        <Link
                            href={getEventsHref(event, mer_slug_type)}
                            className="inline-flex items-center gap-1.5 text-[13px] font-semibold no-underline px-5 py-2.5 rounded-full border transition-all duration-200 group"
                            style={{
                                borderColor: '#e8e8e8',
                                color: '#ff912f',
                                background: '#ffffff',
                            }}
                        >
                            View All Deals
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-200"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* ── Thin gradient divider ── */}
                <div
                    className="w-full h-px "
                    style={{
                        background:
                            'linear-gradient(90deg, #ff912f30, #8bc94a30, #ff912f30)',
                    }}
                    aria-hidden="true"
                />

                {/* ── Grid of Cards ── */}
                <EventsGrid>
                    {allOffers.slice(0, count).map((item, i) => (
                        <EventsOfferCard
                            key={i}
                            product={item.offer}
                            merchantHref={getMerchantHref(item.merchant, mer_slug, mer_slug_type)}
                            domain={companyDomain}
                            merchant_name={item.merchant?.merchant_name}
                            merchant_logo={item.merchant?.merchant_logo}
                            productDetailUrl={
                                item.offer?.slug
                                    ? getProductDetailHref(
                                        item.merchant,
                                        mer_slug_type,
                                        item.offer.slug,
                                        item.offer.category?.slug
                                    )
                                    : null
                            }
                        />
                    ))}
                </EventsGrid>
            </div>
        </section>
    );
};

export default RecentEvents;