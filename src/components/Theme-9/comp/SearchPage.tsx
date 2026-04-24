import React from "react";
import Link from "next/link";
import Image from "next/image";
import cookieService from "@/services/CookiesService";
import { getBaseImageUrl } from "@/constants/hooks";
import { faArrowRight, FontAwesomeIcon } from "@/constants/icons";

const SearchPage = async ({
  slug_type,
  mer_slug,
  cat_slug,
  searchData,
  query,
}: any) => {
  const companyDomain = await cookieService.get("domain");

  if (!searchData?.merchants?.length && !searchData?.categories?.length) {
    return (
      <div className="text-center py-20">
        {/* Fixed: "{query}" -> &quot;{query}&quot; */}
        <p className="text-slate-400 text-lg">
          No results found for &quot;{query}&quot;
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 py-8">
      {/* Merchant Section */}
      {searchData?.merchants?.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-bold text-[#1A1A1A]">
              Stores matching{" "}
              <span className="text-[#800000] font-serif italic lowercase font-normal normal-case tracking-normal ml-1">
                &quot;{query}&quot;
              </span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#800000]/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {searchData.merchants.map((merchant: any, i: number) => (
              <Link
                key={i}
                href={`/${mer_slug}/${merchant[slug_type] || merchant.slug}`}
                className="no-underline group p-5 bg-white border border-[#800000]/5 rounded-[1.5rem] hover:border-[#800000]/20 hover:shadow-[0_15px_40px_-15px_rgba(128,0,0,0.1)] transition-all duration-500 flex items-center gap-5 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[#FDFCF0] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                <div className="w-20 h-16 relative flex-shrink-0 bg-white border border-slate-100 rounded-xl overflow-hidden p-2 shadow-sm group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={getBaseImageUrl(
                      companyDomain.domain,
                      merchant.merchant_logo,
                      "",
                    )}
                    alt={merchant.merchant_name}
                    fill
                    className="object-contain p-1"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-black text-[#1A1A1A] truncate group-hover:text-[#800000] uppercase tracking-wider transition-colors">
                    {merchant.merchant_name}
                  </h3>
                  <span className="text-[9px] font-black text-slate-400 group-hover:text-[#800000] flex items-center gap-2 tracking-[0.15em] transition-colors mt-1">
                    EXPLORE STORE{" "}
                    <FontAwesomeIcon icon={faArrowRight} className="w-2 h-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Category Section */}
      {searchData?.categories?.length > 0 && (
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <h2 className="text-xl font-black text-[#1A1A1A] tracking-[0.05em] uppercase shrink-0">
              Categories in{" "}
              <span className="text-[#800000] font-serif italic lowercase font-normal normal-case tracking-normal ml-1">
                &quot;{query}&quot;
              </span>
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-[#800000]/20 to-transparent" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {searchData.categories.map((category: any) => (
              <Link
                key={category.unique_id}
                href={category?.url}
                className="group relative bg-[#FDFCF0]/30 border border-[#800000]/5 rounded-[1.5rem] p-6 hover:bg-white hover:border-[#800000]/20 hover:shadow-[0_20px_50px_-20px_rgba(128,0,0,0.12)] transition-all duration-700 flex items-center gap-5"
              >
                <div className="w-14 h-14 relative flex-shrink-0 bg-white rounded-2xl border border-[#800000]/5 p-3 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <Image
                    src={getBaseImageUrl(
                      companyDomain.domain,
                      category?.category_image,
                      "",
                    )}
                    alt={category?.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-black text-[#1A1A1A] text-sm uppercase tracking-tight group-hover:text-[#800000] transition-colors">
                    {category?.name}
                  </h4>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#800000]/40 rounded-full" />
                    <p className="text-[10px] font-black text-[#800000] uppercase tracking-widest opacity-80">
                      {category?.total_offers || 0} Offers
                    </p>
                  </div>
                </div>

                <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-1 h-1 rounded-full bg-[#800000]/20" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
