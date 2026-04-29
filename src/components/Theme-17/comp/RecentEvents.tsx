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
import { ArrowRight, Calendar } from 'lucide-react';

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
            className="relative w-full py-16 md:py-24 bg-[#020617] overflow-hidden"
        >
            {/* ── Top Border Divider (Consistent) ── */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
            
            {/* ── Background Subtle Glow ── */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container relative z-10 mx-auto px-4">
                {/* ── Section header row ── */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="flex-1 min-w-0">
                        {/* Eyebrow Badge */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                <Calendar size={12} />
                                Limited Time Events
                            </div>
                            <div className="h-px w-12 bg-slate-800" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-none m-0 uppercase">
                            {firstWord && (
                                <span className="text-indigo-500">{firstWord} </span>
                            )}
                            <span className="text-slate-200">{restWords || heading}</span>
                        </h2>

                        {/* Sub-text */}
                        {subText && (
                            <p className="mt-4 text-sm md:text-base text-slate-500 leading-relaxed font-medium max-w-2xl">
                                {subText}
                            </p>
                        )}
                    </div>

                    {/* Right: View All button - Match Theme Styling */}
                    <div className="shrink-0">
                        <Link
                            href={getEventsHref(event, mer_slug_type)}
                            className="group inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest px-6 py-3.5 rounded-xl border border-white/10 text-slate-300 bg-white/5 hover:bg-indigo-600 hover:text-white hover:border-indigo-500 transition-all duration-300 shadow-2xl"
                        >
                            <span>View All Deals</span>
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
               

                {/* ── Grid of Cards ── */}
                <div className="relative">
                    {/* Side decoration glow */}
                    <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-indigo-600/10 blur-[80px] pointer-events-none" />
                    
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
            </div>

            {/* ── Bottom fade for smooth transition ── */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-slate-950/40 to-transparent pointer-events-none" />
        </section>
    );
};

export default RecentEvents;