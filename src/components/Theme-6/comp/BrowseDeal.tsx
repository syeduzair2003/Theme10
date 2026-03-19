// app/components/OfferCard.tsx
import cookieService from "@/services/CookiesService";
import { Offer } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";
import RenderRating from "./RenderRating";
import { discardHTMLTags, getBaseImageUrl, getRandomRating } from "@/constants/hooks";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import OfferDetailsToggle from "./OfferDetailsToggle";

interface Props {
    item: Offer
    merchant_name: string;
    merchantHref: string;
    merchant_logo: string;
    productDetailUrl?: string | null;
}


const BrowseDeal = async ({ item, merchant_logo, merchant_name, merchantHref, productDetailUrl }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const type = item?.offer_type?.name
    const imageSrc =
        type === "product"
            ? getBaseImageUrl(domain, item?.product_image, "")
            : getBaseImageUrl(domain, merchant_logo, "");
    // const discount = 
    return (

        <div className="browse-deal-card card p-3 " style={{ borderRadius: "12px" }}>

            <div className="d-flex flex-column flex-sm-row align-items-center gap-3 w-100">

                {/* Left: Image */}
                <div
                    style={{
                        width: "140px",
                        height: "140px",
                        minWidth: "140px",
                        minHeight: "140px",
                        flexShrink: 0,
                        overflow: "hidden",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Image
                        src={imageSrc}
                        alt=""
                        width={140}
                        height={140}
                        sizes="140px"
                        className="w-100 h-100"
                        style={{
                            objectFit: "contain",
                            maxWidth: "100%",
                            maxHeight: "100%",
                        }}
                    />
                </div>

                {/* Middle: Text Section */}
                <div className="d-flex flex-column justify-content-between">

                    {/* Title */}
                    {item?.is_detail === 1 ? (
                        (productDetailUrl && (
                            <Link href={productDetailUrl} className="truncate-3-lines browse-card__title">
                                {discardHTMLTags(item?.offer_title)}
                            </Link>
                        ))
                    ) : (
                        <p className="truncate-3-lines browse-card__title">
                            {discardHTMLTags(item?.offer_title)}
                        </p>
                    )}

                    {/* Expiry + Rating Row */}
                    <div className="d-flex align-items-center gap-3 mt-2">

                        <span className="product-item__prevPrice">
                            {item?.end_date == null ? "Lifetime" : `Expire at ${item?.end_date}`}
                        </span>

                        <div className="d-flex align-items-center rating-text flex-wrap">
                            <RenderRating rating={getRandomRating(item?.rating)} />
                            <span className="ms-1">({getRandomRating(item?.rating)})</span>
                        </div>
                    </div>

                    <div className="deal-button d-flex align-items-center justify-content-between mt-2">
                        <OfferDetailsToggle domain={domain} imageSrc={imageSrc} merchantHref={imageSrc} offer={item} type='anchor' />

                        <OfferOutUrl
                            outUrl={item?.url}
                            merchantHref={merchantHref}
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
    )
}

export default BrowseDeal