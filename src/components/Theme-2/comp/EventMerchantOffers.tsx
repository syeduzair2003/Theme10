import React from "react";
import { MerchantWithOffers, OffersOffer } from "@/services/dataTypes";
import cookieService from "@/services/CookiesService";
import Banner from "@/components/shared/Banner/Banners";
import { filterOfferBanners, getMerchantHref, getProductDetailHref, getRandomStoreSeoTitle } from "@/constants/hooks";
import CouponCard from "./CouponCard";

interface Props {
    merchant: MerchantWithOffers;
    mer_slug: string;
    mer_slug_type: string;
    offerBanners: OffersOffer[];
}

const EventMerchantOffers = async ({ merchant, mer_slug, mer_slug_type, offerBanners }: Props) => {
    const domain = (await cookieService.get("domain")).domain;
    const offers = merchant?.offers
    const bannerDisplayAfter = 2;
    const filteredOfferBanners = filterOfferBanners(offerBanners || [], 250, 600, 100, 200);
    if (offers?.length > 0) {
        return (
            <section className="section-sidebar">
                <div className="container">
                    <h3 className="py-3">By {getRandomStoreSeoTitle(merchant?.merchant_name)}</h3>
                    <div className="row g-3 mb-4">
                        {offers?.length > 0 && offers?.map((offer, index) => {
                            return (
                                <div key={index} className="col-lg-4 col-md-6 col-sm-12">
                                    <CouponCard
                                        merchantHref={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                                        merchant_logo={merchant?.merchant_logo}
                                        merchant_name={merchant?.merchant_name}
                                        offer={offer}
                                        type={offer?.offer_type?.name}
                                        pageType="event"
                                        productDetailUrl={offer?.slug ? getProductDetailHref(offer?.merchant, mer_slug_type, offer?.slug, offer?.category?.slug): null}
                                    />
                                    {(index + 1) % bannerDisplayAfter === 0 && filteredOfferBanners.length > 0 && filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (
                                        <div className="banner-container" key={`banner-${Math.floor(index / bannerDisplayAfter)}`}>
                                            <Banner data={filteredOfferBanners[Math.floor(index / bannerDisplayAfter)]} height={100} offerLink={null} domain={domain} mer_slug={mer_slug} slug_type={mer_slug_type} />
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        );
    }
};

export default EventMerchantOffers;
