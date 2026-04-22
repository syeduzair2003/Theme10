import React from "react";
import { apiNavCategory } from "@/apis/page_optimization";
import { apiGetNavMerchants } from "@/apis/merchant";
import { apiGetEvents, apiGetAllPromotion } from "@/apis/user";
import { getBaseImageUrl } from "@/constants/hooks";
import StickyHeader from "./StickyHeader";
import HeaderClient from "./HeaderClient"; // Our new client component

interface Props {
  company_id: string;
  domain: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  promotion_slug: string;
  logo: string | null;
}

const Header = async ({
  company_id,
  domain,
  mer_slug,
  slug_type,
  cat_slug,
  logo,
  promotion_slug,
}: Props) => {
  // 1. Fetch all data on the Server
  const [categories, merchants, events, promotions] = await Promise.all([
    apiNavCategory(company_id).then((res) => res?.data),
    apiGetNavMerchants(company_id).then((res) => res?.data),
    apiGetEvents(company_id).then((res) => res?.data),
    apiGetAllPromotion(domain).then((res) => res?.data),
  ]);

  // 2. Process Logo URL
  const companyLogo = getBaseImageUrl(
    domain,
    logo,
    "/themes/Theme_2/images/logo/logo-dark.png"
  );

  return (
    <StickyHeader>
      {/* 3. Pass data to the Client Component */}
      <HeaderClient
        company_id={company_id}
        mer_slug={mer_slug}
        slug_type={slug_type}
        cat_slug={cat_slug}
        promotion_slug={promotion_slug}
        companyLogo={companyLogo}
        categories={categories}
        merchants={merchants}
        events={events}
        promotions={promotions}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,
        }}
      />
    </StickyHeader>
  );
};

export default Header;