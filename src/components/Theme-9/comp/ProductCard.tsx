import React from "react";
import Image from "next/image";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDetailsToggle from "./OfferDetailsToggle";
import { Flame, Star } from "lucide-react";
import {
  getBaseImageUrl,
  getFinalDiscountTag,
  getMerchantHref,
  discardHTMLTags,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";

const ProductCard = async ({ offer, mer_slug, mer_slug_type, type }: any) => {
  const merchantHref = getMerchantHref(offer, mer_slug, mer_slug_type);
  const domain = (await cookieService.get("domain")).domain;
  const product = offer?.offer || offer;

  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");

  const originalPrice = Number(product?.original_price || 0);
  const salePrice = Number(product?.sale_price || 0);

  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent,
  );

  return (
    <div
      className="group relative w-full min-h-[420px] flex-shrink-0 
      rounded-tr-[3rem] rounded-bl-[3rem] bg-[#F5F5DC] border border-[#EADDCA] 
      p-5 flex flex-col transition-all duration-500 
      hover:-translate-y-2 hover:border-[#800000]/40"
    >
      {/* IMAGE */}
      <div className="relative h-44 rounded-tr-[2rem] rounded-bl-[2rem] bg-white border border-[#EADDCA] overflow-hidden flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="Product"
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />

        {finalDiscountTag && (
          <div
            className="absolute top-3 right-3 flex items-center gap-1.5 
            rounded-full bg-gradient-to-r from-[#800000] to-[#5D0E0E] px-3.5 py-1.5 text-[10px] 
            font-black text-[#FFFDF5] border border-white/10 shadow-[0_8px_20px_rgba(128,0,0,0.25)] z-20 tracking-widest uppercase animate-in fade-in zoom-in duration-300"
          >
            <Flame size={12} className="fill-[#FFFDF5] animate-pulse" />
            <span className="drop-shadow-sm">{finalDiscountTag}</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-1 text-yellow-400/80">
          <Star size={10} fill="currentColor" />
          <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]/50 font-bold">
            Top Rated
          </span>
        </div>

        <h3 className="text-sm font-black text-gray-500 leading-snug line-clamp-2 min-h-[40px] group-hover:text-[#800000] transition-colors duration-500 tracking-tight">
          {type === "product"
            ? product?.offer_title
            : discardHTMLTags(product?.offer_title)}
        </h3>

        <div className="flex justify-between items-center text-xs">
          <OfferDetailsToggle
            domain={domain}
            imageSrc={imageSrc}
            merchantHref={merchantHref}
            offer={product}
            type="anchor"
            buttonClass="text-slate-400 font-semibold hover:text-[#800000] transition"
          />

          {salePrice > 0 && (
            <span className="text-[#1A1A1A] font-black text-sm">
              ${salePrice}
            </span>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass="no-underline block w-full rounded-xl bg-gradient-to-r from-[#800000] to-[#4A0000] 
          py-3 text-center text-xs font-black uppercase tracking-widest text-[#FFFDF5] 
          hover:from-[#A52A2A] hover:to-[#800000] transition-all 
          active:scale-95 shadow-lg shadow-[#4A0000]/40"
        >
          Get Deal
        </OfferOutUrl>
      </div>
    </div>
  );
};

export default ProductCard;
