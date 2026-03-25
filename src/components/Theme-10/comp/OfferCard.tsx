import React from "react";
import Image from "next/image"; // Image import kiya
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
      <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] p-8 flex flex-col justify-between shadow-2xl h-full border border-[#FFFDF5]/5 transition-all duration-700 group-hover:shadow-[0_20px_50px_rgba(128,0,0,0.15)] group-hover:border-[#800000]/40 group-hover:bg-[#1E1E1E]/50">
        {/* Background Optimized with Next.js Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {imageSrc && (
            <Image
              src={imageSrc}
              alt={brandName}
              fill
              className="object-contain p-12 transition-transform duration-700 group-hover:scale-125 opacity-20"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-[#0D0D0D] opacity-95" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-[#800000]/10 to-transparent transition-opacity duration-700 group-hover:via-[#800000]/20 group-hover:opacity-90" />
        </div>

        {/* Top Section */}
        <div className="relative z-10">
          <Link href={merchantHref} className="no-underline">
            <p className="text-white/90 text-sm font-bold tracking-widest uppercase hover:text-blue-400 transition-colors inline-block">
              {brandName}
            </p>
          </Link>
          <div className="flex items-center gap-1 mt-1">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-white/80 text-xs font-medium">{rating}</span>
          </div>
        </div>

        {/* Middle Section */}
        <div className="relative z-10">
          {finalDiscountTag && (
            <span className="inline-block bg-[#800000]/10 backdrop-blur-md text-[#A52A2A] text-[10px] font-bold px-3 py-1 rounded-full mb-3 border border-[#800000]/20 group-hover:bg-[#800000] group-hover:text-[#FFFDF5] transition-all duration-300">
              {finalDiscountTag}
            </span>
          )}
          <h3 className="text-white text-2xl font-extrabold leading-tight mb-2 line-clamp-3 group-hover:text-blue-50 transition-colors">
            {type === "product"
              ? `${product?.offer_title}`
              : `${discardHTMLTags(offer?.offer?.offer_title)}`}
          </h3>
          <p className="text-white/60 text-sm font-medium line-clamp-2 italic">
            {getRandomStoreSeoTitle(brandName)}
          </p>
        </div>

        {/* Bottom Section (CTA) */}
        <div className="relative z-10 translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          {/* <OfferOutUrl
                        unique_id={product?.unique_id}
                        outUrl={product?.url}
                        merchantHref={merchantHref}
                        domain={domain}
                        customClass="no-underline w-full !bg-white !text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 overflow-hidden relative"
                    > */}
          <OfferOutUrl
            unique_id={product?.unique_id}
            outUrl={product?.url}
            merchantHref={merchantHref}
            domain={domain}
            // '!font-extrabold' use karein taake bold lazmi ho, aur text color ko group hover se handle karein
            customClass="no-underline w-full !bg-white !text-black py-4 rounded-2xl !font-extrabold flex items-center justify-center gap-2 shadow-lg hover:!bg-[#800000] hover:!text-white transition-all duration-300 overflow-hidden relative group/btn"
          >
            {product?.coupon_code ? (
              <>
                <Copy
                  size={16}
                  className="transition-transform group-hover/btn:rotate-12 group-hover/btn:text-white"
                />
                <span className="tracking-wider uppercase text-sm !font-extrabold group-hover/btn:text-white">
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
                <ExternalLink
                  size={16}
                  className="group-hover/btn:text-white"
                />
                <span className="tracking-wider uppercase text-sm !font-extrabold group-hover/btn:text-white">
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
