"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Offer, OffersOffer } from "@/services/dataTypes";
import RenderRating from "./RenderRating";
import OfferModal from "./OfferModal";
import SimpleOfferModal from "./SimpleOfferModal";
import {
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getMerchantHref,
  getRandomRating,
} from "@/constants/hooks";
import { apiOfferDetails } from "@/apis/offers";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDuration from "./OfferDuration";
import SocialMediaShare from "./SocialMediaShare";
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
  product: OffersOffer;
  companyId: string;
  awaited_p_id?: string;
  mer_slug_type: string;
  mer_slug: string;
  domain: string;
  ads_campaign: boolean;
}

let renderCount = 0;
const OffersListView = ({
  product,
  companyId,
  awaited_p_id,
  mer_slug_type,
  mer_slug,
  domain,
  ads_campaign,
}: Props) => {
  const [p_data, setP_data] = useState<Offer | null>(null);
  const [showModal, setShowModal] = useState(false);
  const merchantHref = getMerchantHref(
    product.merchant,
    mer_slug,
    mer_slug_type,
  );

  useEffect(() => {
    if (!awaited_p_id || !companyId) return;
    let cancelled = false;
    const fetchOfferDetails = async () => {
      try {
        const offer_details = await apiOfferDetails(awaited_p_id, companyId);
        if (!cancelled) {
          setP_data(offer_details.data);
          renderCount += 1;
          if (renderCount === 1) setShowModal(true);
        }
      } catch (error) {}
    };
    fetchOfferDetails();
    return () => {
      cancelled = true;
    };
  }, [awaited_p_id, companyId]);

  const originalPrice = product?.offer?.original_price
    ? parseFloat(product?.offer?.original_price)
    : 0;
  const salePrice = product?.offer?.sale_price
    ? parseFloat(product?.offer?.sale_price)
    : 0;
  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;
  const finalDiscountTag = getFinalDiscountTag(
    product?.offer?.offer_title || product?.offer?.offer_detail,
    discountPercent,
  );

  return (
    <div className="group relative mb-6">
      {" "}
      <div className="absolute -inset-0.5 bg-[#800000]/10 rounded-[1.8rem] blur-lg opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
      <div className="relative flex flex-col lg:flex-row bg-white rounded-[1.8rem] shadow-sm overflow-hidden border border-[#800000]/5 transition-all duration-300 group-hover:border-[#800000]/20">
        {/* --- Left Part: Branding --- */}
        <div className="lg:w-[22%] bg-[#FDFCF0]/40 p-5 flex flex-col items-center justify-center relative border-b lg:border-b-0 lg:border-r border-dashed border-[#800000]/10">
          <div className="hidden lg:block absolute -top-3 -right-3 w-6 h-6 bg-[#FDFCF0] rounded-full border border-[#800000]/5 shadow-inner"></div>
          <div className="hidden lg:block absolute -bottom-3 -right-3 w-6 h-6 bg-[#FDFCF0] rounded-full border border-[#800000]/5 shadow-inner"></div>

          <div className="relative w-20 h-20 lg:w-24 lg:h-24 bg-white rounded-2xl p-3 shadow-sm group-hover:scale-105 transition-transform duration-500 flex items-center justify-center border border-[#800000]/5">
            <Image
              src={getBaseImageUrl(
                domain,
                product?.offer?.product_image ||
                  product?.offer?.merchant?.merchant_logo,
                "",
              )}
              alt="Offer"
              width={80}
              height={80}
              className="object-contain"
            />
          </div>

          {finalDiscountTag && (
            <div className="mt-3 px-3 py-1 bg-[#800000] text-[#FDFCF0] text-[8px] font-black uppercase tracking-widest rounded-full">
              {finalDiscountTag}
            </div>
          )}
        </div>

        {/* Middle Part */}
        <div className="lg:w-[53%] p-6 flex flex-col justify-center bg-white">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
              <span className="text-[7px] font-black text-emerald-600 uppercase tracking-widest">
                Verified
              </span>
            </div>
            <div className="text-[10px] scale-90 origin-left">
              <OfferDuration endDate={product?.offer?.end_date} />
            </div>
          </div>

          {/* Heading */}
          <h4 className="text-lg lg:text-xl font-black text-[#1A1A1A] leading-tight tracking-tighter uppercase line-clamp-2 transition-colors group-hover:text-[#800000] min-h-[3rem] lg:min-h-0">
            {discardHTMLTags(product?.offer?.offer_title?.replaceAll("_", " "))}
          </h4>

          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center bg-[#FDFCF0] px-2 py-1 rounded-lg border border-[#800000]/5 scale-90 origin-left">
              <RenderRating rating={getRandomRating(product.offer?.rating)} />
              <span className="ml-1.5 text-[11px] font-black text-[#800000]">
                {getRandomRating(product?.offer?.rating)}
              </span>
            </div>

            <OfferDetailsToggle
              domain={domain}
              imageSrc={product?.offer?.product_image}
              merchantHref={merchantHref}
              offer={product?.offer}
              type="anchor"
              buttonClass="text-[11px] font-bold text-slate-400 hover:text-[#800000] transition-colors"
            />
          </div>

          {product?.offer?.offer_type?.name === "product" && (
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-xl font-black text-[#1A1A1A]">
                {getCurrencySymbol(product?.offer?.currency)}
                {product?.offer?.sale_price}
              </span>
              <span className="text-[10px] font-bold text-slate-400 line-through decoration-[#800000]/40">
                {getCurrencySymbol(product?.offer?.currency)}
                {product?.offer?.original_price}
              </span>
            </div>
          )}
        </div>

        {/* Right Part */}
        <div className="lg:w-[25%] p-6 bg-[#FDFCF0]/20 flex items-center justify-center border-t lg:border-t-0 lg:border-l border-[#800000]/5">
          <div className="w-full">
  {product?.offer?.coupon_code ? (
    <OfferOutUrl
      unique_id={product?.offer?.unique_id}
      outUrl={product?.offer?.url}
      merchantHref={merchantHref}
      domain={domain}
      customClass="relative w-full h-14 bg-[#1A1A1A] rounded-xl flex items-center justify-center group/btn overflow-hidden transition-all hover:bg-[#800000] shadow-sm"
    >
      {/* --- DEFAULT STATE (Bina hover ke ye dikhega) --- */}
      <span className="text-[#FDFCF0] font-black text-[10px] tracking-widest uppercase transition-all duration-300 group-hover/btn:opacity-0 group-hover/btn:-translate-y-2">
        Get Deal
      </span>
      
      {/* --- HOVER STATE (Slide up hokar stars dikhayega) --- */}
      <div className="absolute inset-0 bg-[#800000] flex flex-col items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300">
        <span className="text-[7px] font-black text-white/60 uppercase tracking-widest mb-0.5">
          CODE
        </span>
        <span className="text-white font-mono font-black text-sm tracking-[0.2em]">
          ********
        </span>
      </div>
    </OfferOutUrl>
  ) : (
    /* Simple Deal Button (Bina coupon wala) */
    <OfferOutUrl
      unique_id={product.offer.unique_id}
      outUrl={product.offer.url}
      merchantHref={merchantHref}
      domain={domain}
      customClass="no-underline w-full h-12 bg-[#1A1A1A] text-[#FDFCF0] font-black rounded-xl flex items-center justify-center hover:bg-[#800000] shadow-sm transition-all duration-300 text-[10px] tracking-widest uppercase"
    >
      {product?.offer?.offer_type?.name === "product"
        ? "Buy Now"
        : "Get Deal"}
    </OfferOutUrl>
  )}
</div>
        </div>
      </div>
      {showModal && p_data != null && !ads_campaign && (
        <OfferModal
          data={p_data}
          companyId={companyId}
          onClose={() => setShowModal(false)}
          domain={domain}
          merchantHref={merchantHref}
        />
      )}
      {showModal && ads_campaign && p_data != null && (
        <SimpleOfferModal
          data={p_data}
          onClose={() => setShowModal(false)}
          domain={domain}
          merchantHref={merchantHref}
          finalDiscountTag={finalDiscountTag}
        />
      )}
    </div>
  );
};

export default OffersListView;
