import React from "react";
import Image from "next/image";
import { Copy, Star, ExternalLink } from "lucide-react";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getFinalDiscountTag,
  getMerchantHref,
  getRandomRating,
  getRandomStoreSeoTitle,
} from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Link from "next/link";
import { OffersOffer } from "@/services/dataTypes";

interface Props {
  offer: OffersOffer;
  mer_slug_type: string;
  mer_slug: string;
  type?: string;
}

const OfferCard = async ({ offer, mer_slug_type, mer_slug, type }: Props) => {
  const domainData = await cookieService.get("domain");
  const domain = domainData?.domain;

  const merchantHref = getMerchantHref(offer.merchant, mer_slug, mer_slug_type);
  const product = offer?.offer || offer;

  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, offer?.merchant?.merchant_logo, "");

  const rating = getRandomRating(offer?.offer?.rating);
  const brandName = offer?.merchant?.merchant_name || "Store";

  const originalPrice = product?.original_price
    ? parseFloat(product.original_price)
    : 0;
  const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const finalDiscountTag = getFinalDiscountTag(
    product?.offer_title || product?.offer_detail,
    discountPercent,
  );

  return (
    <div className="group relative h-full">
      {/* Container */}
      <div className="relative overflow-hidden rounded-[2rem] p-5 md:p-6 flex flex-col justify-between h-full bg-[#FDFCF0] border border-[#800000]/10 transition-all duration-500 hover:border-[#800000]/30 hover:shadow-[0_15px_35px_rgba(128,0,0,0.08)] hover:-translate-y-1.5">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={brandName}
              fill
              className="object-contain p-10 transition-transform duration-1000 group-hover:scale-110 opacity-[0.05]"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          )}
        </div>

        {/* Top Section: Brand & Rating */}
        <div className="relative z-10 mb-3">
          <Link href={merchantHref} className="no-underline">
            <p className="text-[#1A1A1A]/50 text-[10px] font-black tracking-[0.2em] uppercase hover:text-[#800000] transition-all duration-500 inline-block cursor-pointer relative group/brand">
              {brandName}
              <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-[#800000] transition-all duration-500 group-hover/brand:w-full" />
            </p>
          </Link>
          <div className="flex items-center gap-1 mt-0.5">
            <Star size={10} className="fill-yellow-400 text-yellow-400" />
            <span className="text-[#1A1A1A]/60 text-[10px] font-bold">
              {rating}
            </span>
          </div>
        </div>

        {/* Middle Section: Title & Tag */}
        <div className="relative z-10 flex-1">
          {finalDiscountTag && (
            <span className="inline-block bg-[#800000] text-[#FDFCF0] text-[9px] font-black px-2.5 py-1 rounded-lg mb-3 tracking-wider shadow-sm">
              {finalDiscountTag}
            </span>
          )}
          <h3 className="text-[#1A1A1A] text-base md:text-lg font-black leading-snug mb-2 line-clamp-2 group-hover:text-[#800000] transition-colors duration-300">
            {type === "product"
              ? `${product?.offer_title}`
              : `${discardHTMLTags(offer?.offer?.offer_title)}`}
          </h3>
          <p className="text-[#1A1A1A]/40 text-[11px] font-medium line-clamp-1 italic">
            {getRandomStoreSeoTitle(brandName)}
          </p>
        </div>

        {/* Bottom Section: CTA Button */}
        <div className="relative z-10 mt-5 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <OfferOutUrl
            unique_id={product?.unique_id}
            outUrl={product?.url}
            merchantHref={merchantHref}
            domain={domain}
            customClass="no-underline w-full !bg-[#800000] !text-[#FDFCF0] py-3 rounded-xl !font-black flex items-center justify-center gap-2 shadow-lg hover:!bg-[#600000] transition-all duration-300 relative group/btn"
          >
            {product?.coupon_code ? (
              <>
                <Copy
                  size={14}
                  className="transition-transform group-hover/btn:rotate-12"
                />
                <span className="tracking-widest uppercase text-[11px] !font-black">
                  {(() => {
                    const code = product.coupon_code.trim();
                    const spaceIndex = code.indexOf(" ");
                    const endIndex = spaceIndex !== -1 ? spaceIndex : 5;
                    return code.slice(0, endIndex);
                  })()}
                </span>
              </>
            ) : (
              <>
                <ExternalLink size={14} />
                <span className="tracking-widest uppercase text-[11px] !font-black">
                  {type === "product" ? "Buy Now" : "Get Deal"}
                </span>
              </>
            )}
          </OfferOutUrl>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
