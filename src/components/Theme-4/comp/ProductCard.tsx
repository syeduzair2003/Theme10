import Image from "next/image";
import { calculateOfferDuration, getMerchantHref } from "@/constants/hooks";
import { FaShoppingCart } from "react-icons/fa";
import { Merchant, MerchantWithOffers } from "@/services/dataTypes";
import Badge from "./Badge";
import RenderRating from "./RenderRating";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Button from "./Button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  expiry: string;
  originalPrice?: string;
  discountedPrice?: string;
  rating: number;
  href: string;
  unique_id: string;
  domain: string;
  mer_slug: string;
  slug_type: string;
  id: number;
  merchant: MerchantWithOffers | Merchant;
}

export default function ProductCard({
  image,
  title,
  description,
  expiry,
  originalPrice,
  discountedPrice,
  rating,
  href,
  unique_id,
  domain,
  mer_slug,
  slug_type,
  id,
  merchant
}: ProductCardProps) {
  const timeLeft = calculateOfferDuration(expiry);
  const hasDiscount = discountedPrice && originalPrice;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image with Sale Ribbon Badge */}
      <div className="relative w-full h-52 bg-gray-50 flex items-center justify-center">
        <Image fill src={image} alt={title} className="object-contain p-4 w-[200px] h-[200px]" />

        {hasDiscount && (
          <div className="absolute top-4 left-[-35px] rotate-[-45deg] bg-red-600 text-white text-xs font-bold px-12 py-1 shadow-md">
            SALE
          </div>
        )}
        <Badge timeLeft={timeLeft} />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-3">
          {title}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <RenderRating rating={rating} />
          <span className="text-xs text-gray-500">({rating})</span>
        </div>

        {/* Description */}
        {/* <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {description}
        </p> */}

        {/* Price + Button aligned at bottom */}
         {/* Price + Button aligned at bottom */}
      <div className="mt-auto space-y-3">

        {/* Price Row */}
        <div className="flex items-center justify-between">

          {/* Price */}
          <div className="flex items-baseline gap-2">
            {hasDiscount ? (
              <>
                <span className="text-xl font-bold text-gray-900">
                  ${discountedPrice}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${originalPrice}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${originalPrice || discountedPrice}
              </span>
            )}
          </div>

        </div>

        {/* CTA Button - FULL WIDTH */}
        <OfferOutUrl
          outUrl={href}
          merchantHref={getMerchantHref(merchant, mer_slug, slug_type)}
          unique_id={unique_id}
          domain={domain}
          customClass="block w-full"
        >
          <Button
            size="sm"
            className="btn-hover-gradient shadow-md flex items-center justify-center w-full"
            label={
              <>
                <FaShoppingCart className="h-4 w-4 mr-2" />
                <span>Buy Now</span>
              </>
            }
          />
        </OfferOutUrl>

      </div>

    </div>
    </div >
  );
}
