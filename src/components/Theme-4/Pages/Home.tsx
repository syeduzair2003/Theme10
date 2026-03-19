import Hero from "@/components/Theme-4/comp/Hero";
import CategoriesSection from "@/components/Theme-4/comp/CategoriesSection";
import StoresSection from "@/components/Theme-4/comp/StoresSection";
import TopDealsSection from "@/components/Theme-4/comp/TopDealsSection";
import PopularOffersSection from "@/components/Theme-4/comp/PopularOffersSection";
import ProductsSection from "@/components/Theme-4/comp/ProductsSection";
import NewsletterSection from "@/components/Theme-4/comp/NewsletterSection";
import cookieService from "@/services/CookiesService";
import FAQSection from "../comp/FAQSection";
import WeeklyNewsSection from "../comp/WeeklyNewsSection";
import BannerSlider from "../comp/BannerSlider";
import { apiCompanyUpdatedData } from "@/apis/user";
import CompanyBanner from "@/components/shared/CompanyMainBanner";
import StepsToAvail from "@/components/shared/StepsToAvail";
import HomeEventSection from '../comp/HomeEventSection';

export default async function Home() {
  const companyDomain = await cookieService.get("domain");
  const response = (await apiCompanyUpdatedData(companyDomain))?.data;
  const company_id = response?.unique_id;
  const domain = companyDomain.domain;
  return (
    <>
      {response?.slider_status == 1 &&
        <CompanyBanner domain={companyDomain?.domain} companyId={response?.unique_id} />
      }

      {response.banner_status == 1 &&
        <Hero />
      }
      {response?.center_text_status == 1 &&
        <StepsToAvail color='#ff943d26' companyId={response?.unique_id} theme={response?.template?.name} />
      }
      {response?.top_merchants_status == 1 &&
        <StoresSection company_id={company_id} store_slug={response?.store_slug} slug_type={response?.slug_type}   />
      }
      {/* <HomeEventSection  companyId={response?.company_id} mer_slug_type={response?.slug_type} mer_slug={response?.store_slug}/> */}
       <HomeEventSection  companyId={response?.unique_id} mer_slug_type={response?.slug_type} mer_slug={response?.store_slug} />
      
      {response?.popular_deals_status == 1 &&
        <TopDealsSection company_id={company_id} domain={domain} mer_slug={response?.store_slug} slug_type={response?.slug_type} />
      }
      {response?.popular_offers_status == 1 &&
        <PopularOffersSection company_id={company_id} domain={domain} mer_slug={response?.store_slug} slug_type={response?.slug_type} />
      }
      <ProductsSection company_id={company_id} domain={domain} mer_slug={response?.store_slug} slug_type={response?.slug_type} />
      
      <NewsletterSection company_id={company_id} />
      
      {response?.top_categories_status &&
        <CategoriesSection company_id={company_id} />
      }
      <FAQSection companyDomain={domain} />
      <WeeklyNewsSection companyId={company_id} />
      <BannerSlider companyId={company_id} domain={domain} mer_slug={response?.store_slug} slug_type={response?.slug_type} />
    </>
  );
}