import {
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomRating,
  getRandomStoreSeoTitle,
  splitOfferTitle,
} from "@/constants/hooks";
import { Offer } from "@/services/dataTypes";
import Image from "next/image";
import React from "react";
import RenderRating from "./RenderRating";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDuration from "./OfferDuration";
import Link from "next/link";
import SocialMediaShare from "./SocialMediaShare";
import { ShieldCheck, Zap, ArrowRight } from "lucide-react";

const CouponCard = async ({
  product,
  merchantHref,
  domain,
  merchant_name,
  merchant_logo,
  pageType,
}: any) => {
  const rating = getRandomRating(product?.rating);
  const originalPrice = product?.original_price
    ? parseFloat(product?.original_price)
    : 0;
  const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;
  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent,
  );

  return (
    <div className="group relative bg-white/70 backdrop-blur-xl border border-[#800000]/10 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 flex flex-col h-full transition-all duration-700 hover:bg-white hover:border-[#800000]/30 hover:shadow-[0_30px_60px_rgba(128,0,0,0.08)] hover:-translate-y-3">
      {/* Discount Badge */}
      {finalDiscountTag && (
        <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-gradient-to-br from-[#800000] to-[#520000] text-[#FFFDF5] text-[9px] md:text-[11px] font-black px-3 md:px-5 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-xl shadow-[#800000]/20 z-20 flex items-center gap-1.5 md:gap-2 border border-[#A52A2A]/20">
          <Zap size={12} className="fill-[#FFFDF5]" />
          {finalDiscountTag}
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-6 md:mb-8">
          {/* Merchant Logo */}
          <div className="relative w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl p-2 md:p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-110 group-hover:border-[#800000]/20 border border-transparent transition-all duration-500">
            <Image
              src={
                product?.offer_type?.name === "product" &&
                product?.product_image
                  ? getBaseImageUrl(domain, product?.product_image, "")
                  : getBaseImageUrl(domain, merchant_logo, "")
              }
              alt={merchant_name}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
          <div className="flex flex-col items-end">
            {/* Fix: Icon size fixed to standard, responsive via wrapper div if needed */}
            <div className="flex items-center gap-1.5 text-[#800000] font-black text-[8px] md:text-[10px] uppercase tracking-widest bg-[#800000]/5 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full mb-2 border border-[#800000]/10">
              <ShieldCheck size={12} strokeWidth={3} /> Verified
            </div>
            <div className="scale-90 md:scale-100 origin-right">
              <OfferDuration endDate={product?.end_date} />
            </div>
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-3">
          <h4 className="text-lg md:text-xl font-black text-[#1A1A1A] leading-tight group-hover:text-[#800000] transition-colors line-clamp-2 min-h-[48px] md:min-h-[56px] tracking-tight">
            {splitOfferTitle(product?.offer_title).join(" / ")}
          </h4>

          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <div className="flex items-center scale-75 md:scale-90 origin-left">
              <RenderRating rating={rating} />
              <span className="ml-2 text-[#1A1A1A]/40 text-xs font-black">
                ({rating})
              </span>
            </div>
            <SocialMediaShare
              offerUrl={`/${product?.url}`}
              offerTitle={product?.offer_title}
              merchantHref={merchantHref}
              unique_id={product?.unique_id}
              domain={domain}
            />
          </div>
        </div>

        {/* Price Section */}
        {(salePrice > 0 || originalPrice > 0) && (
          <div className="mt-6 md:mt-8 flex items-baseline gap-2 md:gap-3">
            {salePrice > 0 && (
              <span className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
                <span className="text-[#800000] text-lg md:text-xl mr-0.5">
                  {getCurrencySymbol(product?.currency)}
                </span>
                {salePrice}
              </span>
            )}
            {originalPrice > 0 && (
              <span className="text-xs md:text-sm text-[#1A1A1A]/30 line-through font-bold italic">
                {getCurrencySymbol(product?.currency)}
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-8 md:mt-10 space-y-4 md:space-y-5">
        <OfferOutUrl
  unique_id={product?.unique_id}
  outUrl={product?.url}
  merchantHref={merchantHref}
  domain={domain}
  // FIXED: Coupon wale button ke styles ko full deal button jesa kar diya hai (Black base)
  customClass={`w-full relative h-12 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] md:tracking-[0.25em] transition-all duration-500 active:scale-95 overflow-hidden shadow-sm ${
    product?.coupon_code
      ? "bg-[#1A1A1A] text-white hover:bg-[#800000] no-underline shadow-lg shadow-[#1A1A1A]/10 border border-transparent"
      : "bg-[#1A1A1A] text-white hover:bg-[#800000] no-underline shadow-lg shadow-[#1A1A1A]/10 border border-transparent"
  }`}
>
  {product?.coupon_code ? (
    <div className="flex items-center gap-2 md:gap-3 group">
      {/* Design standardizing: text and background simplified */}
      
      <span className="font-black text-white group-hover:text-white transition-colors">Copy Code</span>
      {/* Arrow also added for design matching */}
      <ArrowRight
        size={16}
        strokeWidth={3}
        className="text-white group-hover:translate-x-1.5 transition-transform"
      />
    </div>
  ) : (
    <div className="flex items-center gap-2 group">
      <span className="font-black text-white">
        {product?.offer_type?.name === "product"
          ? "Buy Now"
          : "Get Deal"}
      </span>
      <ArrowRight
        size={16}
        strokeWidth={3}
        className="text-white group-hover:translate-x-1.5 transition-transform"
      />
    </div>
  )}
</OfferOutUrl>

        {pageType !== "events" && (
          <Link
            href={merchantHref}
            className="no-underline block text-center group/link mt-2"
          >
            <span className="text-[9px] md:text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.2em] md:tracking-[0.3em] group-hover/link:text-[#800000] transition-all duration-300">
              Visit Store
            </span>
            <div className="mx-auto mt-1 w-0 h-[1.5px] bg-[#800000]/30 group-hover/link:w-16 md:group-hover/link:w-20 transition-all duration-500 rounded-full" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
