import Image from "next/image";
import { calculateOfferDuration, getMerchantHref, getRandomRating } from "@/constants/hooks";
import { Merchant, MerchantWithOffers, OffersMerchant } from "@/services/dataTypes";
import Badge from "./Badge";
import RenderRating from "./RenderRating";
import SocialShare from "./SocialShare";
import Button from "./Button";
import OfferOutUrl from "@/components/shared/OfferOutUrl";

interface DealCardProp {
    image: string;
    title: string;
    description: string;
    expiry: string | null;
    rating?: number;
    href: string;
    coupon_code?: string | null;
    unique_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
    id: number;
    merchant: Merchant | MerchantWithOffers | OffersMerchant;
}

export default function DealCard({
    image,
    title,
    description,
    expiry,
    rating,
    href,
    coupon_code,
    unique_id,
    domain,
    mer_slug,
    slug_type,
    id,
    merchant
}: DealCardProp) {
    const timeLeft = calculateOfferDuration(expiry);
    const finalRating = getRandomRating(rating);



    return (
        <div className="group relative md:max-w-[300px] w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md 
  hover:shadow-xl hover:scale-[1.03] transition-all duration-500 flex flex-col">
            {/* Image Section */}
            <div className="relative h-36 w-full flex items-center justify-center bg-gradient-to-r from-gray-50 to-gray-100">
                <div className="w-[90%] h-full relative">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        loading="lazy"
                        className="object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                </div>

                {/* Expiry Badge */}
                <Badge timeLeft={timeLeft} />
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-1 p-3">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-[var(--primary-color)] transition-colors mb-2">
                    {title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    {description}
                </p>

                {/* Bottom section: Rating + Social + Button */}
                <div className="mt-auto pt-6 flex flex-col items-center justify-center text-center space-y-6">
                    
                    <div className="flex">
                        <OfferOutUrl
                            outUrl={href}
                            merchantHref={getMerchantHref(merchant, mer_slug, slug_type)}
                            unique_id={unique_id} // or some unique offer ID
                            domain={domain}
                            customClass="block"
                        >
                            <Button
                                variant="primary"
                                size="lg"
                                className="py-2 text-sm rounded-lg bg-[var(--primary-color)] hover:bg-gradient-to-r hover:from-[#f73a17] hover:via-[#fb4717] hover:to-[#e71c17] hover:text-white shadow-md transition-all duration-300"
                                label={coupon_code ? "Show Coupon" : "Get Deal"}
                            >
                            </Button>
                        </OfferOutUrl>
                    </div>
                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <RenderRating rating={finalRating} />
                        <span className="text-sm text-gray-600">({finalRating})</span>
                    </div>

                    {/* Social + Button */}
                    <SocialShare href={href} title={title} />
                    
                </div>
            </div>
        </div>
    );
}
