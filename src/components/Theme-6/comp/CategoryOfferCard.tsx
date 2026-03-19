// app/components/OfferCard.tsx
import cookieService from "@/services/CookiesService";
import { Offer } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";
import RenderRating from "./RenderRating";
import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getRandomRating } from "@/constants/hooks";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
    item: Offer
    merchant_name: string;
    merchantHref: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}

const CategoryOfferCard = async ({
    item,
    merchant_logo,
    merchant_name,
    merchantHref,
    productDetailUrl,
}: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name;

    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, item?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");

    return (
        <div className="Category-offer-card card offer-card p-3 mb-3 overflow-hidden">
            {/* Added mx-0 and w-100 to force the row to stay inside the card boundaries */}
            <div className="Catoffer-card-inner row align-items-center g-0 g-lg-4 mx-0 w-100">

                {/* LEFT – IMAGE (col-12 on mobile, col-lg-auto on desktop) */}
                <div className="col-12 col-lg-auto mb-3 mb-lg-0 d-flex justify-content-center">
                    <div className="Catoffer-image-wrapper" style={{ width: '120px' }}>
                        <Image
                            src={imageSrc}
                            alt=""
                            width={120}
                            height={120}
                            className="Catoffer-image img-fluid rounded"
                        />
                    </div>
                </div>

                {/* CENTER – CONTENT */}
                <div className="col-12 col-lg text-center text-lg-start">
                    {/* Added flex-wrap to prevent the merchant name and date from pushing the width out on small screens */}
                    <div className="d-flex justify-content-between align-items-center mb-1 flex-wrap">
                        <span className="fw-bold text-muted small">{merchant_name}</span>
                        <span className="product-item__prevPrice">
                            {item?.end_date == null
                                ? "Lifetime"
                                : `Expires: ${item?.end_date}`}
                        </span>
                    </div>

                    {/* Title */}
                    <div className="mb-2">
                        {item?.is_detail === 1 && productDetailUrl ? (
                            <Link href={productDetailUrl} className="Catoffer-title d-block mb-0 text-break">
                                {discardHTMLTags(item?.offer_title)}
                            </Link>
                        ) : (
                            <p className="Catoffer-title mb-0 text-break">
                                {discardHTMLTags(item?.offer_title)}
                            </p>
                        )}
                    </div>

                    {/* Meta/Price/Rating Row */}
                    <div className="d-flex flex-wrap justify-content-center justify-content-lg-start align-items-center gap-3">
                        <div className="price-section">
                            {type === "product" && item?.sale_price ? (
                                <div className="d-flex align-items-center gap-2">
                                    {item?.original_price && (
                                        <span className="text-decoration-line-through text-muted small">
                                            {getCurrencySymbol(item?.currency)}{item?.original_price}
                                        </span>
                                    )}
                                    <span className="fw-bold text-success fs-5">
                                        {getCurrencySymbol(item?.currency)}{item?.sale_price}
                                    </span>
                                </div>
                            ) : (
                                <OfferDetailsToggle
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    imageSrc={imageSrc}
                                    offer={item}
                                    type="anchor"
                                />
                            )}
                        </div>

                        <div className="rating d-flex align-items-center gap-1 border-start ps-3 d-none d-sm-flex">
                            <RenderRating rating={getRandomRating(item?.rating)} />
                            <small className="text-muted">({getRandomRating(item?.rating)})</small>
                        </div>
                    </div>
                </div>

                {/* RIGHT – ACTION BUTTON */}
                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                    <div className="d-grid d-lg-block">
                        <OfferOutUrl
                            merchantHref={merchantHref}
                            outUrl={item?.url}
                            unique_id={item?.unique_id}
                            customClass="event-card__btn"
                            domain={domain}
                        >
                            {item?.offer_type.name.includes("Coupon") ? "Show Code" : "Get Deal"}
                        </OfferOutUrl>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CategoryOfferCard;
