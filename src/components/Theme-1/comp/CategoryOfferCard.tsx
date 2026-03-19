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
        <div className="browse-deal-card card offer-card p-3 mb-3">
            <div className="Catoffer-card-inner">

                {/* LEFT – DISCOUNT / IMAGE */}
                <div className="Catoffer-left">
                    <div className="Catoffer-image-wrapper">
                        <Image
                            src={imageSrc}
                            alt=""
                            width={120}
                            height={120}
                            className="Catoffer-image"
                        />
                    </div>
                </div>

                {/* CENTER – CONTENT */}
                <div className="Catoffer-center">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span>
                            {merchant_name}
                        </span>
                        {/* Badge */}
                        <span className="product-item__prevPrice">
                            {item?.end_date == null
                                ? "Lifetime"
                                : `Expire at ${item?.end_date}`}
                        </span>
                    </div>
                    {/* Title */}
                    {item?.is_detail === 1 && productDetailUrl ? (
                        <Link
                            href={productDetailUrl}
                            className="Catoffer-title"
                        >
                            {discardHTMLTags(item?.offer_title)}
                        </Link>
                    ) : (
                        <p className="Catoffer-title">
                            {discardHTMLTags(item?.offer_title)}
                        </p>
                    )}

                    {/* Meta */}
                    <div className="d-flex flex-wrap justify-content-between">
                        <div className="mb-2">
                            {type === "product" && item?.sale_price ? (
                                <>
                                    {/* PRICE FIRST */}
                                    <div className="price-info d-flex flex-row align-items-center gap-2 justify-content-center mb-1">
                                        {item?.original_price && (
                                            <span className="text-decoration-line-through f-14 text-muted">
                                                {getCurrencySymbol(item?.currency)}
                                                {item?.original_price}
                                            </span>
                                        )}

                                        <span className="fw-bold text-success f-15">
                                            {getCurrencySymbol(item?.currency)}
                                            {item?.sale_price}
                                        </span>
                                    </div>

                                    {/* DETAILS AFTER PRICE */}
                                    <OfferDetailsToggle
                                        domain={domain}
                                        imageSrc={imageSrc}
                                        merchantHref={imageSrc}
                                        offer={item}
                                        type="anchor"
                                    />
                                </>
                            ) : (
                                /* ONLY DETAILS – NO PRICE, NO SPACE */
                                <OfferDetailsToggle
                                    domain={domain}
                                    imageSrc={imageSrc}
                                    merchantHref={imageSrc}
                                    offer={item}
                                    type="anchor"
                                />
                            )}
                        </div>


                        <div className="rating">
                            <RenderRating rating={getRandomRating(item?.rating)} />
                            <span>({getRandomRating(item?.rating)})</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT – CTA */}
                <div className="Catoffer-right">
                    {/* <span className="product-item__prevPrice Catoffer-badge-top">
                        {item?.end_date == null
                            ? "Lifetime"
                            : `Expire at ${item?.end_date}`}
                    </span> */}

                    <OfferOutUrl
                        outUrl={item?.url}
                        merchantHref={merchantHref}
                        unique_id={item?.unique_id}
                        customClass="browse-button"
                        domain={domain}
                    >
                        {item?.offer_type.name.includes("Coupon")
                            ? "Show Code"
                            : "Get Deal"}
                    </OfferOutUrl>

                </div>

            </div>
        </div>
    );
};

export default CategoryOfferCard;
