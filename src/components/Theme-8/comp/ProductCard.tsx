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
  const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
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
    discountPercent
  );

  return (
    <div className="group relative w-[260px] min-h-[420px] flex-shrink-0 
      rounded-3xl bg-[#151b28] border border-white/10 
      p-5 flex flex-col transition-all duration-500 
      hover:-translate-y-2 hover:border-blue-500/40 
      shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">

      {/* IMAGE */}
      <div className="relative h-44 rounded-2xl bg-white overflow-hidden flex items-center justify-center">
        <Image
          src={imageSrc}
          alt="Product"
          fill
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-110"
        />

        {finalDiscountTag && (
          <div className="absolute top-3 right-3 flex items-center gap-1 
            rounded-full bg-black/80 px-3 py-1 text-[10px] 
            font-black text-blue-400 border border-blue-500/30">
            <Flame size={12} className="fill-blue-400" />
            {finalDiscountTag}
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-1 text-yellow-400/80">
          <Star size={10} fill="currentColor" />
          <span className="text-[10px] uppercase tracking-widest text-white/60 font-bold">
            Top Rated
          </span>
        </div>

        <h3 className="text-sm font-bold text-white leading-snug line-clamp-2 min-h-[40px] group-hover:text-blue-400 transition">
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
            buttonClass="text-slate-400 font-semibold hover:text-white transition"
          />

          {salePrice > 0 && (
            <span className="text-blue-400 font-black text-sm">
              ${salePrice}
            </span>
          )}
        </div>
      </div>

      {/* BUTTON FIXED (NO STICKING) */}
      <div className="mt-auto pt-6">
        <OfferOutUrl
          unique_id={product?.unique_id}
          outUrl={product?.url}
          merchantHref={merchantHref}
          domain={domain}
          customClass="no-underline block w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 
          py-3 text-center text-xs font-black uppercase tracking-widest text-white 
          hover:from-blue-500 hover:to-indigo-500 transition-all 
          active:scale-95 shadow-lg shadow-blue-900/30"
        >
          Get Deal
        </OfferOutUrl>
      </div>
    </div>
  );
};

export default ProductCard;
