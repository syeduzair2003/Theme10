import React from 'react'
import Image from "next/image";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getCurrencySymbol,getRandomRating, getFinalDiscountTag, getRandomStoreSeoTitle } from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import OfferOutUrl from '@/components/shared/OfferOutUrl';
import Link from 'next/link';
import { faCalendarDays, FontAwesomeIcon } from '@/constants/icons';
import Badge from "./Badge";
import RenderRating from "./RenderRating";
import SocialShare from "./SocialShare";

interface Props {
    product: Offer;
    domain: string;
    merchantHref: string;
    merchant_name: string;
    merchant_logo: string;
}

const EventOfferCard = ({ product, merchantHref, domain, merchant_name, merchant_logo }: Props) => {

  const type = product?.offer_type?.name;
  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, merchant_logo, "");

  const finalRating = getRandomRating();

  return (
    <div className="relative bg-white backdrop-blur-sm rounded-xl shadow-lg 
      overflow-hidden transition-all duration-300 hover:shadow-2xl 
      hover:-translate-y-1 flex flex-col justify-between max-w-sm w-full mx-auto">

      {/* Expiry Badge */}
      <Badge timeLeft={calculateOfferDuration(product?.end_date)} />

      {/* Top Logo + Title */}
      <div className="flex flex-col items-center justify-between gap-2 pt-4 px-4">
        <div className="relative w-32 h-28 flex-shrink-0">
          <Image 
            src={imageSrc}
            alt={merchant_name}
            fill className="object-contain" 
            // height={200}
            // width={300}
            />
        </div>

        <div className="w-full h-px bg-gray-300 my-2"></div>

        <div className="px-4 pt-3 flex-1 text-center">
          <p className="text-sm font-bold text-gray-900">
            {type === "product" ? product?.offer_title : `${merchant_name} - ${discardHTMLTags(product?.offer_title)}`}
          </p>
        </div>
      </div>

      {/* Price + Time */}
      <div className="px-4 text-center space-y-2 mt-2">
        {/* <span className="inline-flex items-center gap-2 text-xs bg-orange-100 text-orange-600 px-3 py-1 rounded-full">
          <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
          {calculateOfferDuration(product?.end_date)}
        </span> */}

        {type === "product" && (
          <div className="flex justify-center gap-3">
            {product?.sale_price && (
              <span className="font-bold text-green-600 text-lg">
                {getCurrencySymbol(product?.currency)}{product?.sale_price}
              </span>
            )}
            {product?.original_price && (
              <span className="line-through text-sm text-gray-400">
                {getCurrencySymbol(product?.currency)}{product?.original_price}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA Button */}
      <div className="px-4 pb-4 text-center mt-3">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass="block"
        >
          <button className="w-full text-white py-2 text-sm rounded-lg bg-[var(--primary-color)] 
            hover:bg-gradient-to-r hover:from-[#f73a17] hover:via-[#fb4717] hover:to-[#e71c17] 
            hover:text-white shadow-md transition-all duration-300 font-semibold">
            {product?.coupon_code ? "Show Coupon" : type === "product" ? "Buy Now" : "Get Deal"}
          </button>
        </OfferOutUrl>
      </div>

      <div className="w-full h-px bg-gray-300 my-2"></div>

      {/* Rating + Social */}
      <div className="px-2 pb-3">
        <div className="flex items-center justify-between gap-3">

          {/* Rating */}
          <div className="flex items-center gap-2">
            <RenderRating rating={finalRating} />
            {/* <span className="text-sm text-gray-600">({finalRating})</span> */}
          </div>

          {/* Social Icons */}
          <div className="flex justify-end">
            <SocialShare href={product?.url} title={product?.offer_title} />
          </div>

        </div>
      </div>

    </div>
  );
};



export default EventOfferCard
