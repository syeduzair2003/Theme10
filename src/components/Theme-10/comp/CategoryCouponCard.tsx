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
    <div className="group relative bg-white/70 backdrop-blur-xl border border-[#800000]/10 rounded-[2.5rem] p-8 flex flex-col h-full transition-all duration-700 hover:bg-white hover:border-[#800000]/30 hover:shadow-[0_30px_60px_rgba(128,0,0,0.08)] hover:-translate-y-3">
      {/* Discount Badge */}
      {finalDiscountTag && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-[#800000] to-[#520000] text-[#FFFDF5] text-[11px] font-black px-5 py-2 rounded-2xl shadow-xl shadow-[#800000]/20 z-20 flex items-center gap-2 border border-[#A52A2A]/20">
          <Zap size={12} className="fill-[#FFFDF5]" />
          {finalDiscountTag}
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-8">
          <div className="relative w-16 h-16 bg-white rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.05)] flex items-center justify-center group-hover:scale-110 group-hover:border-[#800000]/20 border border-transparent transition-all duration-500">
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
            <div className="flex items-center gap-1.5 text-[#800000] font-black text-[10px] uppercase tracking-widest bg-[#800000]/5 px-3 py-1.5 rounded-full mb-2 border border-[#800000]/10">
              <ShieldCheck size={12} strokeWidth={3} /> Verified
            </div>
            <OfferDuration endDate={product?.end_date} />
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-3">
          <h4 className="text-xl font-black text-[#1A1A1A] leading-tight group-hover:text-[#800000] transition-colors line-clamp-2 min-h-[56px] tracking-tight">
            {splitOfferTitle(product?.offer_title).join(" / ")}
          </h4>

          <div className="flex items-center gap-4">
            <div className="flex items-center scale-90 origin-left">
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

        {(salePrice > 0 || originalPrice > 0) && (
          <div className="mt-8 flex items-baseline gap-3">
            {salePrice > 0 && (
              <span className="text-3xl font-black text-[#1A1A1A]">
                <span className="text-[#800000] text-xl mr-0.5">
                  {getCurrencySymbol(product?.currency)}
                </span>
                {salePrice}
              </span>
            )}
            {originalPrice > 0 && (
              <span className="text-sm text-[#1A1A1A]/30 line-through font-bold italic">
                {getCurrencySymbol(product?.currency)}
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-10 space-y-5">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass={`w-full relative h-14 flex items-center justify-center rounded-2xl font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-500 active:scale-95 overflow-hidden shadow-sm ${
            product?.coupon_code
              ? "bg-transparent border-2 border-dashed border-[#800000]/30 text-[#800000] hover:bg-[#800000]/5 hover:border-[#800000]"
              : "bg-[#1A1A1A] text-white hover:bg-[#800000] no-underline shadow-lg shadow-[#1A1A1A]/10"
          }`}
        >
          {product?.coupon_code ? (
            <div className="flex items-center gap-3">
              <span className="bg-[#800000]/10 px-3 py-1.5 rounded-lg border border-[#800000]/10">
                {product.coupon_code.trim().slice(0, 7)}...
              </span>
              <span className="font-black">Copy Code</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span>
                {product?.offer_type?.name === "product"
                  ? "Buy Now"
                  : "Get Deal"}
              </span>
              <ArrowRight
                size={16}
                strokeWidth={3}
                className="group-hover:translate-x-1.5 transition-transform"
              />
            </div>
          )}
        </OfferOutUrl>

        {pageType !== "events" && (
          <Link
            href={merchantHref}
            className="no-underline block text-center group/link mt-2"
          >
            <span className="text-[10px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.3em] group-hover/link:text-[#800000] transition-all duration-300">
              Visit {merchant_name} Store
            </span>
            <div className="mx-auto mt-1 w-0 h-[1.5px] bg-[#800000]/30 group-hover/link:w-20 transition-all duration-500 rounded-full" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
