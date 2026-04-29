import { apiGetPopularDeals } from '@/apis/page_optimization';
import { discardHTMLTags, splitHeading } from '@/constants/hooks';
import { OffersOffer } from '@/services/dataTypes';
import React from 'react';
import OfferCard from './offerCard';

interface Props {
  companyId: string;
  mer_slug_type: string;
  mer_slug: string;
}

const BestOffers = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
  const response = await apiGetPopularDeals(companyId);
  const bestOffers = response.data;
  const heading = response?.data?.popular_deals_widget?.widget_heading || 'Best Offers';
  const subText = discardHTMLTags(response?.data?.popular_deals_widget?.widget_text) || 'Handpicked deals and exclusive coupons just for you';
  const [firstWord, restWords] = splitHeading(heading);

  const count = 8;
  const offersList = bestOffers?.offers || [];

  if (offersList.length === 0) return null;

  return (
    <section
      aria-label="Best Offers Section"
      className="relative w-full py-12 md:py-16 lg:py-20"
      style={{
        background: 'linear-gradient(180deg, #f4fbee 0%, #ffffff 60%, #fffcf8 100%)',
      }}
    >
      {/* ── Decorative Element ── */}
      <div 
        className="absolute top-0 right-0 w-64 h-64 bg-[#8bc94a10] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" 
        aria-hidden="true" 
      />

      <div className="container mx-auto px-4">
        {/* ── Section header row (Matching RecentEvents style but slightly elevated) ── */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8 md:mb-12">
          <div className="flex-1 min-w-0">
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-3">
              <span
                className="w-1.5 h-6 rounded-full inline-block"
                style={{ background: '#8bc94a' }}
                aria-hidden="true"
              />
              <span
                className="text-[11px] font-black uppercase tracking-[0.25em]"
                style={{ color: '#ff912f' }}
              >
                Today&apos;s Best Picks
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 leading-tight m-0 tracking-tight">
              {firstWord && (
                <span className="text-[#8bc94a]">{firstWord} </span>
              )}
              <span className="text-gray-800">{restWords || heading}</span>
            </h2>

            {/* Sub-text */}
            {subText && (
              <p className="mt-4 text-[15px] text-gray-500 leading-relaxed m-0 max-w-2xl font-medium">
                {subText}
              </p>
            )}
          </div>
        </div>

        {/* ── Grid of Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {offersList.slice(0, count).map((offer: OffersOffer, i: number) => (
            <OfferCard
              key={i}
              offer={offer}
              mer_slug_type={mer_slug_type}
              mer_slug={mer_slug}
            />
          ))}
        </div>
      </div>

      {/* ── Decorative Element ── */}
      <div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#ff912f08] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" 
        aria-hidden="true" 
      />
    </section>
  );
};

export default BestOffers;