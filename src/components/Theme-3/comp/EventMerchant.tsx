import React from "react";
import { MerchantWithOffers, OffersOffer } from "@/services/dataTypes";
import cookieService from "@/services/CookiesService";
import Banner from "@/components/shared/Banner/Banners";
import { filterOfferBanners, getMerchantHref, getProductDetailHref, splitHeadingFromDetails } from "@/constants/hooks";
import EventOfferCard from "./EventOfferCard";
import { off } from "process";

interface Props {
    merchant: MerchantWithOffers;
    mer_slug: string;
    mer_slug_type: string;
    offerBanners: OffersOffer[];
}

const EventMerchant = async ({ merchant, mer_slug, mer_slug_type, offerBanners }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const offers = merchant?.offers
    const bannerDisplayAfter = 4;
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);

    if (offers?.length > 1) {
        return (
            <section className="section-sidebar">
                <div className="container">
                    <div className="row g-2">
                        {offers?.length > 0 && offers
                            // .slice(0, offers.length % 2 === 0 ? offers.length : offers.length - 1)
                            .map((offer, index) => (
                                <>
                                    <div key={index} className="col-xl-4 col-lg-4 col-md-6 col-12 cus-z1">
                                        <EventOfferCard product={offer}
                                            merchantHref={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                                            domain={domain}
                                            merchant_name={merchant?.merchant_name}
                                            merchant_logo={merchant?.merchant_logo}
                                            productDetailUrl={offer?.slug ? getProductDetailHref(merchant, mer_slug_type, offer?.slug, offer?.category?.slug) : null}
                                        />
                                    </div>
                                    {(index + 1) % bannerDisplayAfter === 0 && filteredOfferBanners.length > 0 && filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (
                                        <div className="col-xl-12 col-lg-12 col-12 banner-container" key={`banner-${Math.floor(index / bannerDisplayAfter)}`}>
                                            <Banner data={filteredOfferBanners[Math.floor(index / bannerDisplayAfter)]} height={100} offerLink={null} domain={domain} mer_slug={mer_slug} slug_type={mer_slug_type} />
                                        </div>
                                    )}
                                </>
                            )
                            )}
                    </div>
                </div>
            </section>
        );
    }
};

export default EventMerchant;
