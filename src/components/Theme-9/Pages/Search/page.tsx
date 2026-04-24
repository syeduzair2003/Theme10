import { apiCompanyUpdatedData, apiSearchResult } from "@/apis/user";
import React from "react";
import HorizontalBannerSlider from "../../comp/HorizontalBannerSlider";
import MostSearchSidebar from "../../comp/MostSearchSidebar";
import AllTagsSidebar from "../../comp/AllTagsSidebar";
import SearchPage from "../../comp/SearchPage";
import cookieService from "@/services/CookiesService";

interface Props {
  searchParams: Promise<{ [key: string]: string }>;
}

const page = async ({ searchParams }: Props) => {
  const queryParams: any = await searchParams;
  const companyDomain = await cookieService.get("domain");
  const c_data = (await apiCompanyUpdatedData(companyDomain)).data;
  const searchResult = await apiSearchResult(
    queryParams.query,
    c_data?.unique_id,
  );

  return (
    <div className="min-h-screen bg-[#FDFCF0]/60 selection:bg-[#800000]/10">
      {/* Banner Area */}
      <div className="w-full px-4 md:px-10 py-4 md:py-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Container Slider */}
          <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_30px_70px_-20px_rgba(128,0,0,0.12)] border border-[#800000]/5 bg-white">
            <HorizontalBannerSlider
              companyId={c_data.unique_id}
              slug_type={c_data.slug_type}
              mer_slug={c_data.store_slug}
              domain={companyDomain.domain}
            />
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 pb-16 md:pb-24">
        <div className="flex flex-col lg:flex-row gap-6 md:gap-10">
          {/* Sidebar Section */}
          <aside className="w-full lg:w-[320px] flex-shrink-0 order-2 lg:order-1">
            <div className="lg:sticky lg:top-10 flex flex-col gap-6 md:gap-8">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border border-[#800000]/5 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDFCF0]/50 rounded-full -mr-16 -mt-16 blur-3xl" />

                <div className="relative z-10 space-y-8 md:space-y-10">
                  <MostSearchSidebar company_id={c_data?.unique_id} />

                  <div className="h-px bg-gradient-to-r from-transparent via-[#800000]/10 to-transparent w-full" />

                  <AllTagsSidebar company_id={c_data?.unique_id} />
                </div>
              </div>
            </div>
          </aside>

          {/* Results Section */}
          <main className="flex-1 order-1 lg:order-2">
            <div className="bg-white min-h-[500px] md:min-h-[700px] rounded-[2rem] md:rounded-[3rem] border border-[#800000]/5 shadow-[0_25px_60px_-25px_rgba(0,0,0,0.04)] p-4 sm:p-6 md:p-12 relative overflow-hidden">
              {/* Header Line */}
              <div className="absolute top-0 left-8 md:left-12 w-16 md:w-20 h-1 md:h-1.5 bg-[#800000] rounded-b-2xl" />

              <div className="relative z-10">
                <SearchPage
                  slug_type={c_data.slug_type}
                  mer_slug={c_data.store_slug}
                  cat_slug={c_data.category_slug}
                  searchData={searchResult.data}
                  query={queryParams.query}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default page;
