import Link from "next/link";
import TodaysOfferClient from "./TodaysOfferClient";
import {  apiCompanyUpdatedData } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import { apiBestOffers } from "@/apis/offers";

const TodaysOffer = async () => {
  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response.data;
  const best_offers = await apiBestOffers(companyData?.unique_id, 10);

  return (
    <section className="popular padding-y-60 overflow-hidden">
      <div className="container container-two">
        <div className="section-heading style-left" style={{ marginBottom: 15 }}>
          <h5 className="section-heading__title">Today&#39;s Best Deals</h5>
        </div>
        <TodaysOfferClient offersData={best_offers.data} mer_slug_type={companyData?.slug_type} mer_slug={companyData?.store_slug} />
        <div className="popular__button text-center">
          <Link
            href={`/${companyData?.store_slug}`}
            className="font-18 fw-600 text-heading hover-text-main text-decoration-underline font-heading"
          >
            Explore More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TodaysOffer;
