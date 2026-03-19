import { notFound, redirect } from "next/navigation";
import cookieService from "@/services/CookiesService";
import { apiCompanyUpdatedData } from "@/apis/user";
import { apiGetMerchantUniqueId } from "@/apis/merchant";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import PromotionsPage from "../../comp/PromotionsPage";
import PromotionOffersPage from "../../comp/PromotionOffersPage";

const OffersPage = dynamic(() => import("../../comp/OffersPage"));
const AllStoresPage = dynamic(() => import("../../comp/AllStoresPage"));

type DynamicProps = Promise<{ slug: string[] }>;
type SearchProps = Promise<any>;

const Dynamic = async ({ params, searchParams }: { params: DynamicProps, searchParams: SearchProps }) => {
    const { slug } = await params;

    // Guard clause for unexpected slug formats
    if (!Array.isArray(slug) || slug.length === 0) {
        return notFound();
    }

    const { p_id, ads_campaign, type, sort } = await searchParams;
    const companyDomain = await cookieService.get("domain");
    const response = await apiCompanyUpdatedData(companyDomain);
    const companyData = response?.data;
    const promotionRoute = companyData?.promotion_slug

    // If company data is not valid
    if (!companyData?.unique_id) {
        return notFound();
    }

    if (slug.length === 1 && slug[0] === companyData.store_slug) {
        // Redirect /stores or /all-stores to /all-stores/A
        if (slug[0] === companyData.store_slug || slug[0] === "all-stores") {
            return redirect("/all-stores/A");
        }
        return notFound();
    }

    if (slug.length === 1 && slug[0] === promotionRoute) {
        return <PromotionsPage promotionSlug={promotionRoute} />
    }
    if (slug.length === 2 && slug[0] === promotionRoute) {
        return <PromotionOffersPage params={slug[1]} type={type} sort={sort}/>
    }

    if (slug.length === 2) {
        if (slug[0] === companyData.store_slug) {
            const merRes = await apiGetMerchantUniqueId(slug[1], companyData.unique_id);
            const merchantId = merRes?.data?.unique_id;
            if (!merchantId) return notFound();

            return (
                <OffersPage
                    merchant_id={merchantId}
                    product_id={p_id}
                    slug={slug}
                    store_slug={companyData?.store_slug}
                    slug_type={companyData?.slug_type}
                    company_id={companyData?.unique_id}
                    category_slug={companyData?.category_slug}
                    ads_campaign={ads_campaign}
                />
            );
        }

        if (slug[0] === "all-stores") {
            return <AllStoresPage store_slug={companyData.store_slug} slug_type={companyData.slug_type} company_id={companyData.unique_id} slug={slug[1]} page="1" />;
        }
    }
    if (slug.length === 4 && slug[0] === 'all-stores' && slug[2] === 'page') {
        return <AllStoresPage store_slug={companyData.store_slug} slug_type={companyData.slug_type} company_id={companyData.unique_id} slug={slug[1]} page={slug[slug.length - 1]} />;
    }
    return notFound();
};

export default Dynamic;
