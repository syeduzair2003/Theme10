"use client";
import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { OffersOffer } from "@/services/dataTypes";
import { filterOfferBanners, getBannerDimensions } from "@/constants/hooks";
import { apiCategoryOfferBanners } from "@/apis/user";
import { apiOfferBanners } from "@/apis/offers";
import Banner from "./Banner";

interface Props {
  pageType: "category" | "store" | "event";
  bannerResponse: OffersOffer[];
  domain: string;
  mer_slug: string;
  slug_type: string;
  categoryId?: string;
  companyId: string;
  merchantId?: string;
  eventSlug?: string;
}

const SidebarBanners = ({
  pageType,
  bannerResponse = [],
  domain,
  mer_slug,
  slug_type,
  categoryId,
  companyId,
  merchantId,
  eventSlug,
}: Props) => {
  const [banners, setBanners] = useState<OffersOffer[]>([]);
  const [page, setPage] = useState<number>(2); // assume first page already provided via bannerResponse
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    // initial filter and debug logging
    const initialFiltered = filterOfferBanners(bannerResponse || [], 50, 2000, 65, 2000);
    setBanners(initialFiltered);

    // If pageType is event (no pagination), explicitly disable hasMore
    if (pageType === "event") {
      setHasMore(false);
    } else {
      // keep hasMore true by default (we'll update after loadMore)
      setHasMore(true);
    }

    // If bannerResponse was empty and you expect the server to provide page 1,
    // we keep page = 2 (so loadMore will fetch page 2 when clicked).
  }, [bannerResponse, pageType]);

  const loadMore = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      let res: any = null;

      if (pageType === "category") {
        if (!categoryId) {
          console.warn("[SidebarBanners] categoryId missing - cannot load more");
        } else {
          res = await apiCategoryOfferBanners(categoryId, companyId, page);
        }
      } else if (pageType === "store") {
        if (!merchantId) {
          console.warn("[SidebarBanners] merchantId missing - cannot load more");
        } else {
          res = await apiOfferBanners(merchantId, companyId, page);
        }
      }

      const newBanners = filterOfferBanners(res?.data?.offers || [], 50, 2000, 65, 2000);
      // Append new banners (you can dedupe here if needed)
      setBanners(prev => [...prev, ...newBanners]);

      // Detect pagination based on current_page / last_page
      const pagination = res?.data?.pagination;
      if (pagination && typeof pagination.current_page !== "undefined" && typeof pagination.last_page !== "undefined") {
        const current = Number(pagination.current_page);
        const last = Number(pagination.last_page);
        const more = current < last;
        setHasMore(more);
        setIsExpanded(prev => prev || newBanners.length > 0);
        // advance page to next page (use API current_page + 1 to be robust)
        setPage(current + 1);
      } else {
        // if API doesn't return pagination, disable further loads
        setHasMore(false);
      }
    } catch (err) {
      console.error("[SidebarBanners] Error loading more banners:", err);
    } finally {
      setLoading(false);
    }
  };

  const showLess = () => {
    const initialFiltered = filterOfferBanners(bannerResponse || [], 50, 2000, 65, 2000);
    setBanners(initialFiltered);
    setPage(2);
    setHasMore(pageType !== "event"); // event has no pagination
    setIsExpanded(false);
  };

  // DO NOT return null early — always render placeholder or banners.
  return (
    <>
      <ul className="sidebar-list list-unstyled m-0 p-0 d-flex flex-column gap-3">
        {banners.length > 0 ? (
          banners.map((offer_data, i) => {
            const dimension = getBannerDimensions(offer_data);
            // Banner probably renders its own container (li/div). Keep previous usage to avoid markup issues.
            return (
              <React.Fragment key={i}>
                <Banner
                  data={offer_data}
                  height={dimension?.height}
                  width={dimension?.width}
                  mer_slug={mer_slug}
                  slug_type={slug_type}
                  domain={domain}
                />
              </React.Fragment>
            );
          })
        ) : (
          <li className="text-muted small py-2">No banners available.</li>
        )}
      </ul>

      {/* Show more/less only for category & store (since event has no pagination) */}
      {(pageType === "category" || pageType === "store") && (
        <div className="d-flex gap-1 mt-3 justify-content-between">
          {hasMore && (
            <button onClick={loadMore} className="itg-btn box-btn deal-btn" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Show More"}
            </button>
          )}
          {isExpanded && (
            <button onClick={showLess} className="itg-btn box-btn deal-btn" disabled={loading}>
              {loading ? <Spinner size="sm" animation="border" /> : "Show Less"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default SidebarBanners;
