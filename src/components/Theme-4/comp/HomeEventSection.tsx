import { apiGetEventDetails, apiGetHomeEventDetails } from '@/apis/user';
import { discardHTMLTags, getEventsHref, getMerchantHref } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { MerchantWithOffers, Offer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import EventOfferCard from './EventOfferCard';
import OfferCard from './OfferCard';
import { title } from 'process';

interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}

type MerchantOfferItem = {
    offer: Offer;
    merchant: MerchantWithOffers;
};

const HomeEventSection = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
   const companyDomain = (await cookieService.get("domain")).domain;
    const eventMerchants = (await apiGetHomeEventDetails(companyId)).data;
    console.log("eventMerchants",eventMerchants, "companyId", companyId)
    const allOffers: MerchantOfferItem[] =
        eventMerchants?.merchants?.flatMap((merchant) =>
            (merchant?.offers || []).map((offer) => ({
                offer,
                merchant,
            }))
        ) || [];
    const count = 8
    const firstHalf = "Recent Event: ";
    const secondHalf = eventMerchants?.event?.name;
    const content = eventMerchants?.event?.description
    const couponData = allOffers;
    console.log("couponData",couponData)

  if (!allOffers.length) return null;

  return (
    <section className="bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] py-16 px-4 md:px-10 text-white">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-4xl font-extrabold">
            <span>{firstHalf ? firstHalf : `Trending`}</span>
            <span>{secondHalf ? secondHalf : `Products`}</span>
          </h2>

          <p className="text-center text-white/90 mb-10 max-w-4xl mx-auto">
            {discardHTMLTags(content)}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {allOffers.slice(0, count).map((item, i) => (
            <EventOfferCard
              key={i}
              product={item.offer}
              merchantHref={getMerchantHref(item.merchant, mer_slug, mer_slug_type)}
              domain={companyDomain}
              merchant_name={item.merchant?.merchant_name}
              merchant_logo={item.merchant?.merchant_logo}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 flex justify-center">
          <Link
            href={getEventsHref(eventMerchants?.event, mer_slug_type)}
            className="inline-flex text-sm font-medium text-center no-underline rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer bg-white text-gray-700 border border-gray-300 px-5 py-2 text-sm rounded-lg btn-hover-gradient"
          >
            View All Events
            {/* <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" /> */}
          </Link>
        </div>

      </div>
    </section>
  );
};


export default HomeEventSection
