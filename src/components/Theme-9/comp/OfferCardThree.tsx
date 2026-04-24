import React from "react";
import Image from "next/image";
import {
  calculateOfferDuration,
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomStoreSeoTitle,
} from "@/constants/hooks";
import { Offer } from "@/services/dataTypes";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Link from "next/link";
import {
  faCalendarDays,
  faArrowRightLong,
  FontAwesomeIcon,
} from "@/constants/icons";
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
  product: Offer;
  domain: string;
  merchantHref: string;
  merchant_name: string;
  merchant_logo: string;
}

const OfferCardThree = async ({
  product,
  merchantHref,
  domain,
  merchant_name,
  merchant_logo,
}: Props) => {
  const type = product?.offer_type?.name;
  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, merchant_logo, "");

  const originalPrice = product?.original_price
    ? parseFloat(product?.original_price)
    : 0;
  const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const offerTitle =
    product?.offer_title ||
    discardHTMLTags(product?.offer_detail || "Amazing Offer Available");
  const offerBadgeText =
    getFinalDiscountTag(offerTitle, discountPercent) || "LIMITED";
  const expiryDateText = product?.end_date
    ? calculateOfferDuration(product?.end_date)
    : null;

  return (
    <div className="group relative mt-12 mb-6">
      {/* MERCHANT LOGO */}
      <div className="absolute -top-7 left-7 z-20 w-16 h-16 rounded-[1.5rem] bg-white shadow-xl border border-[#EADDCA]/50 flex items-center justify-center p-2.5 group-hover:-translate-y-3 group-hover:border-[#800000]/20 transition-all duration-500 hover:shadow-[0_25px_50px_-15px_rgba(128,0,0,0.2)]">
        <div className="relative w-full h-full">
          <Image
            src={imageSrc}
            alt={getRandomStoreSeoTitle(merchant_name)}
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* CONTENT CARD */}
      <div className="relative bg-white rounded-tl-[3rem] rounded-br-[3rem] border border-[#EADDCA]/40 p-7 pt-16 hover:border-[#800000]/30 hover:shadow-[0_30px_60px_-15px_rgba(128,0,0,0.08)] transition-all duration-700 flex flex-col h-full overflow-hidden">
        <div className="flex justify-end mb-4">
          <span className="text-[#800000] text-[8px] font-black uppercase tracking-[0.3em] bg-[#FDFBE7] px-3 py-1 rounded-full border border-[#800000]/5">
            {offerBadgeText}
          </span>
        </div>

        <div className="flex flex-col flex-grow">
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2 pl-1">
            {merchant_name}
          </span>

          <h3 className="text-[#1A1A1A] font-black text-xl leading-tight mb-5 group-hover:text-[#800000] transition-colors line-clamp-2 tracking-tight pl-1">
            {offerTitle}
          </h3>

          {type === "product" && (
            <div className="flex items-center gap-2 mb-7 pl-1">
              <span className="text-2xl font-black text-[#1A1A1A] tracking-tighter">
                {getCurrencySymbol(product?.currency)}
                {product?.sale_price}
              </span>
              <span className="text-[10px] text-slate-300 line-through font-bold">
                {getCurrencySymbol(product?.currency)}
                {product?.original_price}
              </span>
            </div>
          )}
        </div>

        <div className="mt-auto pt-5 border-t border-[#FDFBE7] flex items-center justify-between gap-4">
          {/* Expiry / Info */}
          <div className="flex flex-col">
            <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest">
              Valid Until
            </span>
            <span className="text-[10px] font-black text-[#1A1A1A] uppercase tracking-tight">
              {expiryDateText ? expiryDateText : "Limited"}
            </span>
          </div>

          <OfferOutUrl
            unique_id={product?.unique_id}
            outUrl={product?.url}
            merchantHref={merchantHref}
            domain={domain}
            customClass="no-underline group/btn relative h-10 px-5 bg-[#1A1A1A] rounded-xl flex items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-lg active:scale-95"
          >
            <div className="absolute inset-0 w-0 bg-[#800000] transition-all duration-500 ease-out group-hover/btn:w-full"></div>

            <span className="relative z-10 flex items-center gap-2 text-white font-black text-[9px] uppercase tracking-[0.2em]">
              {product?.coupon_code ? "Reveal" : "Claim"}
              <FontAwesomeIcon
                icon={faArrowRightLong}
                className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform"
              />
            </span>
          </OfferOutUrl>
        </div>

        <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-[#FDFBE7] rounded-full -z-10 group-hover:bg-[#800000]/5 transition-colors"></div>
      </div>
    </div>
  );
};

export default OfferCardThree;
