import { calculateOfferDuration, getMerchantHref, getRandomRating } from "@/constants/hooks";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaTelegram } from "react-icons/fa";
import { Merchant, MerchantWithOffers, OffersMerchant, OffersOffer } from "@/services/dataTypes";
import Badge from "./Badge";
import RenderRating from "./RenderRating";
import SocialShare from "./SocialShare";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import Button from "./Button";
import OfferDetailsToggle from './OfferDetailsToggle';
import { Offer } from "@/services/dataTypes";
interface OfferCardProps {
    image?: string;
    title: string;
    expiry: string | null;
    rating?: number;
    href: string;
    coupon_code?: string;
    unique_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
    id: number;
    merchant: MerchantWithOffers | Merchant | OffersMerchant;
    
}

export default function OfferCard({ image, title, expiry, rating, href, coupon_code, unique_id, domain, id, mer_slug, slug_type, merchant }: OfferCardProps) {
    const timeLeft = calculateOfferDuration(expiry);
    const finalRating = getRandomRating(rating);
    // const merchant = {
    //     unique_id: unique_id,
    //     id: id,
    //     slug: mer_slug
    // }
    // const merchantHref = getMerchantHref(merchant, mer_slug, slug_type);
    return (
        // <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between">
            <div className="relative bg-white/95 backdrop-blur-sm rounded-xl shadow-lg 
                overflow-hidden transition-all duration-300 hover:shadow-2xl 
                hover:-translate-y-1 flex flex-col justify-between
                max-w-sm w-full mx-auto">
            {/* Expiry Badge */}
            <Badge timeLeft={timeLeft} />

            {/* Top: Logo + Title */}
            <div className="flex flex-col items-center justify-between gap-2 pt-4 md:py-2 px-4">
                <div className="relative w-28 h-28 flex-shrink-0">
                    <Image
                        src={image || ""}
                        alt={title}
                        fill
                        className="object-contain"
                    />
                </div>
                <div className="w-full h-px bg-gray-300 my-2"></div>
                <div className="px-4 pt-3 flex-1 text-center">
                    <p className="text-sm font-bold text-gray-900">{title}</p>
                </div>
            </div>

            {/* Middle: Description
            <div className="px-4 py-3 flex-1">
                <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
            </div> */}

            <div className="px-4 pb-4 text-center">
                <OfferOutUrl
                    outUrl={href}
                    merchantHref={getMerchantHref(merchant, mer_slug, slug_type)}
                    unique_id={unique_id} // or some unique offer ID
                    domain={domain}
                    customClass="block"
                >
                    <Button
                        variant="primary"
                        size="md"
                        className="py-2 text-sm rounded-lg bg-[var(--primary-color)] hover:bg-gradient-to-r hover:from-[#f73a17] hover:via-[#fb4717] hover:to-[#e71c17] hover:text-white shadow-md transition-all duration-300"
                        label={coupon_code ? "Show Coupon" : "Get Deal"}
                    >
                    </Button>
                </OfferOutUrl>

                {/* <OfferDetailsToggle domain={domain}
                 imageSrc={imageSrc} 
                 merchantHref={merchantHref} 
                 offer={product} 
                 type='anchor' /> */}
                
            </div>
            <div className="w-full h-px bg-gray-300 my-2"></div>
            {/* Bottom: Rating + Button */}
            <div className="px-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
                    {/* Rating Section */}
                    <div className="flex items-center gap-2">
                        <RenderRating rating={finalRating} />
                        <span className="text-sm text-gray-600">({finalRating})</span>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-start sm:justify-end">
                        <SocialShare href={href} title={title} />
                    </div>
                </div>
            </div>
            
        </div>
    )
}