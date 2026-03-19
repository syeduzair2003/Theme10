import { apiRandomOfferBanners } from "@/apis/offers";
import { filterOfferBanners } from "@/constants/hooks";
import SliderClient from "./SliderClient";
import { ImInsertTemplate } from "react-icons/im";


interface BannerSliderProps {
  companyId: string;
  domain: string;
  mer_slug: string;
  slug_type: string;
}

const BannerSlider = async ({ companyId, mer_slug, slug_type, domain }: BannerSliderProps) => {
  // Fetch banners server-side
  const bannerOffers = await apiRandomOfferBanners(companyId);
  const apiOffers = bannerOffers?.data?.offers || [];

  // Filter by banner_size (example: between 300–1000 width and 0–150 height)
  const filterOfferBanner = filterOfferBanners(apiOffers, 300, 1000, 0, 150);

  if (!filterOfferBanner || filterOfferBanner?.length === 0) return null;

  return (
    <section className="relative py-6 md:py-10">
      <SliderClient banners={filterOfferBanner} mer_slug={mer_slug} slug_type={slug_type} merchant={filterOfferBanner[0]?.merchant} domain={domain} />
    </section>
  );
};

export default BannerSlider;
