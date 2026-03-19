// import { notFound, redirect } from "next/navigation";
// import cookieService from "@/services/CookiesService";
// import { apiGetCategoryUniqueId, apiCompanyUpdatedData } from "@/apis/user";
// import { apiGetMerchantUniqueId } from "@/apis/merchant";
// import dynamic from "next/dynamic";
// import PromotionsPage from "../../comp/PromotionsPage";
// import PromotionOffersPage from "../../comp/PromotionOffersPage";
// import { apiCheckPromoIsParent } from "@/apis/page_optimization";
// import ParentPromotionPage from "../../comp/ParentPromotionPage";


// const OffersPage = dynamic(() => import("../../comp/OffersPage"));
// const AllStoresPage = dynamic(() => import("../../comp/AllStoresPage"));
// type DynamicProps = Promise<{ slug: string[] }>;
// type SearchProps = Promise<any>;

// const Dynamic = async ({
//   params,
//   searchParams
// }: {
//   params: DynamicProps;
//   searchParams: SearchProps;
// }) => {
//   const { slug } = await params;

//   // Guard clause for unexpected slug formats
//    if (!Array.isArray(slug) || slug.length === 0) {
//     return notFound();
//   }

//   const { p_id } = await searchParams;
//   const companyDomain = await cookieService.get("domain");
//   const response = await apiCompanyUpdatedData(companyDomain);
//   const companyData = response?.data;

//   // If company data is not valid
//   if (!companyData?.unique_id) {
//     return notFound();
//   }

//   // --- ONE SEGMENT URL CASES ---
//   if (slug.length === 1) {
//     const [slug0] = slug;

//     // Redirect /stores or /all-stores to /all-stores/A
//     if (slug0 === companyData.store_slug || slug0 === "all-stores") {
//       return redirect("/all-stores/A");
//     }

//     return notFound(); // Invalid single-segment slug
//   }

//    if (slug.length === 1 && slug[0] === companyData?.promotion_slug) {
//     return <PromotionsPage promotionSlug={companyData?.promotion_slug} />
//   }
//   if (slug.length === 2 && slug[0] === companyData?.promotion_slug) {
//     const checkIsParent = await apiCheckPromoIsParent(companyData?.unique_id, slug[1]);
//     if (!checkIsParent?.data?.is_parent === true) {
//       return <PromotionOffersPage params={slug[1]}/>
//     } else {
//       return <ParentPromotionPage params={slug[1]} />
//     }
//   }

//   // --- TWO SEGMENT URL CASES ---
//   if (slug.length === 2) {
//     const [slug0, slug1] = slug;

//     if (slug0 === companyData.store_slug) {
//       const merRes = await apiGetMerchantUniqueId(slug1, companyData?.unique_id);
//       const merchantId = merRes?.data?.unique_id;
//       if (!merchantId) return notFound();

//       }

//     if (slug0 === companyData.category_slug) {
//       const catRes = await apiGetCategoryUniqueId(slug1, companyData?.unique_id);
//       const categoryId = catRes?.data?.unique_id;

//       if (!categoryId) return notFound();
//     }


//     if (slug.length === 2) {
//     if (slug[0] === companyData.store_slug) {
//       const merRes = await apiGetMerchantUniqueId(slug[1], companyData?.unique_id);
//       const merchantId = merRes?.data?.unique_id;
//       if (!merchantId) return notFound();

//       return (
//         <OffersPage
//           merchant_id={merchantId}
//           product_id={p_id}
//           slug={slug}
//           store_slug={companyData?.store_slug}
//           slug_type={companyData?.slug_type}
//           company_id={companyData?.unique_id}
//           category_slug={companyData?.category_slug}
//         />
//       );
//     }
//   }

//     if (slug[0] === "all-stores") {
//       return <AllStoresPage store_slug={companyData?.store_slug} slug_type={companyData?.slug_type} company_id={companyData?.unique_id} slug={slug[1]} page="1" />;
//     }
//   }
//   if (slug.length === 4 && slug[0] === 'all-stores' && slug[2] === 'page') {
//     return <AllStoresPage store_slug={companyData?.store_slug} slug_type={companyData?.slug_type} company_id={companyData?.unique_id} slug={slug[1]} page={slug[slug?.length - 1]} />;
//   }
//   return notFound();
// };

// export default Dynamic;

import { notFound, redirect } from "next/navigation";
import cookieService from "@/services/CookiesService";
import { apiCompanyUpdatedData, apiGetCategoryUniqueId } from "@/apis/user";
import { apiGetMerchantUniqueId } from "@/apis/merchant";
import dynamic from "next/dynamic";
import PromotionsPage from "../../comp/PromotionsPage";
import PromotionOffersPage from "../../comp/PromotionOffersPage";
import { apiCheckPromoIsParent } from "@/apis/page_optimization";
import ParentPromotionPage from "../../comp/ParentPromotionPage";

const OffersPage = dynamic(() => import("../../comp/OffersPage"));
const AllStoresPage = dynamic(() => import("../../comp/AllStoresPage"));

type DynamicProps = Promise<{ slug: string[] }>;
type SearchProps = Promise<any>;

const Dynamic = async ({
  params,
  searchParams
}: {
  params: DynamicProps;
  searchParams: SearchProps;
}) => {

  const { slug } = await params;

  if (!Array.isArray(slug) || slug.length === 0) {
    return notFound();
  }

  const { p_id } = await searchParams;

  const companyDomain = await cookieService.get("domain");
  const response = await apiCompanyUpdatedData(companyDomain);
  const companyData = response?.data;

  if (!companyData?.unique_id) {
    return notFound();
  }

  // ───────────────────────── ONE SEGMENT ROUTES ─────────────────────────

  if (slug.length === 1) {
    const [slug0] = slug;

    if (slug0 === companyData.promotion_slug) {
      return <PromotionsPage promotionSlug={companyData.promotion_slug} />;
    }

    if (slug0 === companyData.store_slug || slug0 === "all-stores") {
      return redirect("/all-stores/A");
    }

    return notFound();
  }

  // ───────────────────────── PROMOTION ROUTES ─────────────────────────

  if (slug.length === 2 && slug[0] === companyData.promotion_slug) {
    const checkIsParent = await apiCheckPromoIsParent(companyData.unique_id, slug[1]);

    if (checkIsParent?.data?.is_parent) {
      return <ParentPromotionPage params={slug[1]} />;
    }

    return <PromotionOffersPage params={slug[1]} />;
  }

  // ───────────────────────── MERCHANT & CATEGORY ROUTES ─────────────────────────

  if (slug.length === 2) {
    const [slug0, slug1] = slug;

    if (slug0 === companyData.store_slug) {
      const merRes = await apiGetMerchantUniqueId(slug1, companyData.unique_id);
      const merchantId = merRes?.data?.unique_id;

      if (!merchantId) return notFound();

      return (
        <OffersPage
          merchant_id={merchantId}
          product_id={p_id}
          slug={slug}
          store_slug={companyData.store_slug}
          slug_type={companyData.slug_type}
          company_id={companyData.unique_id}
          category_slug={companyData.category_slug}
        />
      );
    }

    if (slug0 === companyData.category_slug) {
      const catRes = await apiGetCategoryUniqueId(slug1, companyData.unique_id);
      const categoryId = catRes?.data?.unique_id;

      if (!categoryId) return notFound();
      // Category page can be added here later if needed
      return notFound();
    }

    if (slug0 === "all-stores") {
      return (
        <AllStoresPage
          store_slug={companyData.store_slug}
          slug_type={companyData.slug_type}
          company_id={companyData.unique_id}
          slug={slug1}
          page="1"
        />
      );
    }
  }

  // ───────────────────────── PAGINATED ALL STORES ─────────────────────────

  if (slug.length === 4 && slug[0] === "all-stores" && slug[2] === "page") {
    return (
      <AllStoresPage
        store_slug={companyData.store_slug}
        slug_type={companyData.slug_type}
        company_id={companyData.unique_id}
        slug={slug[1]}
        page={slug[3]}
      />
    );
  }

  return notFound();
};

export default Dynamic;
