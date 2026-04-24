"use client";

import { OffersOffer } from "@/services/dataTypes";
import React, { useEffect, useState } from "react";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import Spinner from "react-bootstrap/Spinner";
import Banner from "./Banner";
import { apiCategoryOfferBanners } from "@/apis/user";

interface Props {
  bannerResponse: OffersOffer[];
  domain: string;
  mer_slug: string;
  slug_type: string;
  categoryId: string;
  companyId: string;
}

const VerticalCategoryOfferBanner = ({
  bannerResponse,
  domain,
  mer_slug,
  slug_type,
  categoryId,
  companyId,
}: Props) => {
  const [banners, setBanners] = useState<OffersOffer[]>([]);
  const [page, setPage] = useState(2);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const initialFiltered = filterOfferBanners(
      bannerResponse,
      50,
      2000,
      65,
      2000,
    );
    setBanners(initialFiltered);
  }, [bannerResponse]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await apiCategoryOfferBanners(categoryId, companyId, page);
      const newBanners = filterOfferBanners(
        res.data?.offers || [],
        50,
        2000,
        65,
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
      50,
      2000,
      65,
      2000,
    );
    setBanners(initialFiltered);
    setPage(2);
    setHasMore(true);
    setIsExpanded(false);
  };

  if (banners?.length === 0) return null;

  return (
    <div
      className="side-bar sidebar-review-box text-center p-4 md:p-6 bg-[#FDFCF0] border border-[#800000]/5 shadow-[0_10px_40px_rgba(0,0,0,0.03)]"
      style={{ borderRadius: "2rem" }}
    >
      <div className="banner-slider-container mb-6 flex flex-col gap-4">
        {banners?.map((offer_data, i) => {
          const dimension = getBannerDimensions(offer_data);
          return (
            <Banner
              key={i}
              data={offer_data}
              height={dimension?.height}
              mer_slug={mer_slug}
              slug_type={slug_type}
              domain={domain}
              width={dimension?.width}
            />
          );
        })}
      </div>

      <div
        className={`flex items-center gap-4 ${
          isExpanded ? "justify-between" : "justify-center"
        }`}
      >
        {hasMore && (
          <button
            onClick={loadMore}
            disabled={loading}
            className="group relative flex items-center justify-center gap-3 bg-[#800000] text-[#FDFCF0] font-black uppercase tracking-[0.15em] text-[10px] md:text-[11px] py-3 px-8 rounded-xl transition-all duration-300 hover:bg-[#600000] hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#800000]/20 disabled:opacity-70"
          >
            {loading ? (
              <Spinner size="sm" animation="border" className="opacity-80" />
            ) : (
              "Show More"
            )}
          </button>
        )}

        {isExpanded && (
          <button
            onClick={showLess}
            disabled={loading}
            className="group flex items-center justify-center gap-3 bg-white border border-[#800000]/20 text-[#800000] font-black uppercase tracking-[0.15em] text-[10px] md:text-[11px] py-3 px-8 rounded-xl transition-all duration-300 hover:bg-[#800000]/5 hover:border-[#800000] active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? <Spinner size="sm" animation="border" /> : "Show Less"}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerticalCategoryOfferBanner;
