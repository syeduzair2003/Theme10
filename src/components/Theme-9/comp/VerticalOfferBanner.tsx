"use client";

import { OffersOffer, PaginationType } from "@/services/dataTypes";
import React, { useEffect, useState } from "react";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import { apiOfferBanners } from "@/apis/offers";
import Banner from "./Banner";

interface Props {
  bannerResponse: OffersOffer[];
  domain: string;
  mer_slug: string;
  slug_type: string;
  merchantId: string;
  companyId: string;
  pagination: PaginationType;
}

const VerticalOfferBanner = ({
  bannerResponse,
  domain,
  mer_slug,
  slug_type,
  merchantId,
  companyId,
  pagination,
}: Props) => {
  const [banners, setBanners] = useState<OffersOffer[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const initialFiltered = filterOfferBanners(
      bannerResponse,
      20,
      2000,
      20,
      2000,
    );
    setBanners(initialFiltered);
    if (pagination?.next_page === null) {
      setHasMore(false);
    }
  }, [bannerResponse, pagination]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await apiOfferBanners(merchantId, companyId, page);
      const newBanners = filterOfferBanners(
        res.data?.offers || [],
        20,
        2000,
        20,
        2000,
      );

      setBanners((prev) => [...prev, ...newBanners]);
      if (res?.data?.pagination?.next_page) {
        setPage((prev) => prev + 1);
        setIsExpanded(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more vertical banners", error);
    } finally {
      setLoading(false);
    }
  };

  const showLess = () => {
    const initialFiltered = filterOfferBanners(
      bannerResponse,
      20,
      2000,
      20,
      2000,
    );
    setBanners(initialFiltered);
    setPage(2);
    setHasMore(true);
    setIsExpanded(false);
  };

  if (banners?.length === 0) return null;

  return (
    <div className="bg-[#FDFCF0] border border-[#800000]/5 rounded-[2rem] p-5 md:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative overflow-hidden">
      {/* Subtle Background Accent */}
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#800000]/5 blur-3xl rounded-full pointer-events-none" />

      <h4 className="text-xl font-black text-[#1A1A1A] text-center mb-6 uppercase tracking-tighter italic">
        Related <span className="text-[#800000]">Offers</span>
      </h4>

      <div className="relative flex items-center justify-center py-2 mb-6">
        <div className="flex-grow border-t border-[#800000]/10"></div>
        <div className="flex-shrink mx-4 flex gap-1">
          <div className="h-1 w-1 bg-[#800000]/40 rounded-full"></div>
          <div className="h-1 w-4 bg-[#800000] rounded-full"></div>
          <div className="h-1 w-1 bg-[#800000]/40 rounded-full"></div>
        </div>
        <div className="flex-grow border-t border-[#800000]/10"></div>
      </div>

      <div className="flex flex-col gap-5 mb-8 relative z-10">
        {banners?.map((offer_data, i) => {
          const dimension = getBannerDimensions(offer_data);
          return (
            <div
              key={i}
              className="hover:scale-[1.03] transition-all duration-500 ease-out"
            >
              <Banner
                data={offer_data}
                height={dimension?.height}
                mer_slug={mer_slug}
                slug_type={slug_type}
                domain={domain}
                width={dimension?.width}
              />
            </div>
          );
        })}
      </div>

      <div
        className={`flex items-center gap-4 relative z-10 ${isExpanded ? "justify-between" : "justify-center"}`}
      >
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex-1 bg-[#800000] hover:bg-[#600000] text-[#FDFCF0] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] py-3.5 px-6 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#800000]/20 active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-[#FDFCF0]/30 border-t-[#FDFCF0] rounded-full animate-spin"></div>
            ) : (
              "Explore More"
            )}
          </button>
        )}

        {isExpanded && (
          <button
            onClick={showLess}
            className="flex-1 bg-white border border-[#800000]/10 hover:border-[#800000]/40 text-[#800000]/60 hover:text-[#800000] text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] py-3.5 px-6 rounded-xl transition-all text-center active:scale-[0.98]"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default VerticalOfferBanner;
