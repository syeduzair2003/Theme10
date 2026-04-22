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
    <div className="group relative  bg-[#F5F5DC] border border-[#EADDCA] rounded-tr-[3rem] rounded-bl-[3rem] p-8 flex flex-col h-full transition-all duration-700 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:border-[#800000]/30 hover:shadow-[0_30px_60px_rgba(128,0,0,0.12)] hover:-translate-y-3">
      {/* Discount Badge */}
      {finalDiscountTag && (
        <div className="absolute -top-3 -right-3 bg-gradient-to-br from-[#800000] to-[#520000] text-[#FFFDF5] text-[11px] font-black px-5 py-2 rounded-2xl shadow-xl shadow-[#800000]/20 z-20 flex items-center gap-2 border border-[#A52A2A]/20">
          <Zap size={12} className="fill-[#FFFDF5]" />
          {finalDiscountTag}
        </div>
      )}

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-8">
          <div className="relative w-16 h-16 bg-[#F5F5DC] rounded-2xl p-3 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 border border-[#EADDCA]/30">
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
            <div className="flex items-center gap-1.5 text-[#A52A2A] font-bold text-[10px] uppercase tracking-widest bg-[#800000]/10 px-3 py-1.5 rounded-full mb-2">
              <ShieldCheck size={12} className="stroke-[#A52A2A]" /> Verified
            </div>
            <OfferDuration endDate={product?.end_date} />
          </div>
        </div>

        {/* Title Section */}
        <div className="space-y-3">
          <h4 className="text-xl font-black text-[#1A1A1A]/80 leading-tight group-hover:text-[#800000] transition-colors duration-500 line-clamp-2 min-h-[56px] tracking-tight">
            {splitOfferTitle(product?.offer_title).join(" / ")}
          </h4>

          <div className="flex items-center justify-between w-full gap-1 mt-3">
  {/* Left Side: Rating - Fully Responsive */}
  <div className="flex items-center min-w-0 shrink">
    <div className="scale-[0.7] xs:scale-90 origin-left shrink-0">
      <RenderRating rating={rating} />
    </div>
    <span className="ml-1 text-slate-500 text-[10px] font-bold whitespace-nowrap">
      ({rating})
    </span>
  </div>

  {/* Right Side: Social Media - Pushed to the edge */}
  <div className="flex-none flex justify-end">
    <SocialMediaShare
      offerUrl={`/${product?.url}`}
      offerTitle={product?.offer_title}
      merchantHref={merchantHref}
      unique_id={product?.unique_id}
      domain={domain}
    />
  </div>
</div>
        </div>

        {(salePrice > 0 || originalPrice > 0) && (
          <div className="mt-6 flex items-baseline gap-3">
            {salePrice > 0 && (
              <span className="text-3xl font-black text-[#1A1A1A]">
                {getCurrencySymbol(product?.currency)}
                {salePrice}
              </span>
            )}
            {originalPrice > 0 && (
              <span className="text-sm text-slate-500 line-through font-medium italic">
                {getCurrencySymbol(product?.currency)}
                {originalPrice}
              </span>
            )}
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="mt-10 space-y-4">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass={`w-full relative h-14 flex items-center justify-center rounded-2xl font-black text-xs uppercase tracking-[0.3em] transition-all duration-500 active:scale-95 overflow-hidden group/btn ${
            product?.coupon_code
              ? "bg-transparent border-2 border-dashed border-[#800000]/30 text-[#800000] hover:bg-gradient-to-r hover:from-[#800000] hover:to-[#5D0E0E] hover:text-white hover:border-solid hover:shadow-[0_15px_35px_rgba(128,0,0,0.3)]"
              : "bg-transparent border border-[#800000]/40 text-[#800000] hover:bg-gradient-to-br hover:from-[#800000] hover:to-[#4A0000] hover:text-white hover:border-transparent hover:shadow-[0_15px_35px_rgba(128,0,0,0.35)] no-underline"
          }`}
        >
          {product?.coupon_code ? (
            <div className="flex items-center gap-3">
              <span className="bg-blue-500/20 px-3 py-1 rounded-lg">
                {product.coupon_code.trim().slice(0, 7)}...
              </span>
              <span>Copy Code</span>
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
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          )}
        </OfferOutUrl>

        {pageType !== "events" && (
          <Link
            href={merchantHref}
            className="no-underline block text-center group/link py-2"
          >
            <span className="text-[11px] font-black text-[#1A1A1A]/40 uppercase tracking-[0.25em] group-hover/link:text-[#1A1A1A] transition-all duration-500 relative inline-block">
              Visit{" "}
              <span className="text-[#800000] group-hover/link:text-[#800000] transition-colors">
                {merchant_name}
              </span>{" "}
              Store
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#800000] group-hover/link:w-full transition-all duration-500 opacity-0 group-hover/link:opacity-100"></span>
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CouponCard;
