import React from "react";
import Image from "next/image";
import {
  calculateOfferDuration,
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getRandomStoreSeoTitle
} from "@/constants/hooks";
import { Offer } from "@/services/dataTypes";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Link from "next/link";
import { faCalendarDays, FontAwesomeIcon } from "@/constants/icons";

interface Props {
  product: Offer;
  domain: string;
  merchantHref: string;
  merchant_name: string;
  merchant_logo: string;
}

const OfferCardThree = async ({ product, merchantHref, domain, merchant_name, merchant_logo }: Props) => {

  const type = product?.offer_type?.name;

  const imageSrc =
    type === "product"
      ? getBaseImageUrl(domain, product?.product_image, "")
      : getBaseImageUrl(domain, merchant_logo, "");

  const originalPrice = product?.original_price ? parseFloat(product?.original_price) : 0;
  const salePrice = product?.sale_price ? parseFloat(product?.sale_price) : 0;

  const discountPercent =
    originalPrice > 0 && salePrice > 0
      ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
      : null;

  const offerTitle =
    product?.offer_title || discardHTMLTags(product?.offer_detail || "Amazing Offer Available");

  const finalDiscountTag = getFinalDiscountTag(offerTitle, discountPercent);
  const offerBadgeText = finalDiscountTag || "LIMITED TIME OFFER";

  const expiryDateText = calculateOfferDuration(product?.end_date);

  return (
    <div className="h-full">
      <div className="flex flex-col justify-between h-full bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">

        {/* IMAGE SECTION */}
        <div className="relative flex justify-center items-center w-full h-48 bg-gray-50">

          <div className="relative w-32 h-32">
            <Image
              src={imageSrc || ""}
              alt={getRandomStoreSeoTitle(merchant_name)}
              fill
              className="object-contain p-2"
            />
          </div>

          {type === "product" && (
            <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-md shadow-sm">
              <Link href={merchantHref} className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                <Image
                  src={getBaseImageUrl(domain, merchant_logo, "/themes/Theme_3/images/fav.png")}
                  alt={merchant_name}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <span>{merchant_name}</span>
              </Link>
            </div>
          )}

          <span className="absolute top-2 right-2 bg-[var(--primary-color)] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
            {offerBadgeText}
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-3 text-center">
          <h3 className="text-sm font-semibold text-gray-800 line-clamp-3 mb-2">
            {offerTitle}
          </h3>

          {type === "product" && (
            <div className="flex justify-center items-center gap-3">
              {product?.sale_price && (
                <span className="text-green-600 font-bold text-lg">
                  {getCurrencySymbol(product?.currency)}{product?.sale_price}
                </span>
              )}
              {product?.original_price && (
                <span className="line-through text-gray-400 text-sm">
                  {getCurrencySymbol(product?.currency)}{product?.original_price}
                </span>
              )}
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center px-4 py-3 gap-2">

          {product?.coupon_code ? (
            <OfferOutUrl
              unique_id={product?.unique_id}
              outUrl={product?.url}
              merchantHref={merchantHref}
              domain={domain}
              customClass="relative inline-flex items-center justify-center px-4 py-2 border border-dashed rounded-full text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              <span>{product?.coupon_code.slice(0, 8)}</span>
              <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800 opacity-0 hover:opacity-100 transition">
                Show Coupon
              </span>
            </OfferOutUrl>
          ) : (
            <OfferOutUrl
              unique_id={product?.unique_id}
              outUrl={product?.url}
              merchantHref={merchantHref}
              domain={domain}
              customClass="no-underline inline-flex items-center justify-center px-5 py-2 text-sm font-semibold text-white rounded-md bg-[var(--primary-color)] hover:brightness-110 transition"
            >
              {type === "product" ? "Buy Now" : "Get Deal"}
            </OfferOutUrl>
          )}

          <div className="w-full border-t pt-2 text-xs text-gray-500 flex justify-center items-center gap-1">
            <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
            <span>Expires: {expiryDateText}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OfferCardThree;
