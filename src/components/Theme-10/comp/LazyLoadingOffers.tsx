"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { apiSpecificOffers } from "@/apis/offers";
import { apiExpiredOffers } from "@/apis/user";
import { OffersOffer, PaginationType } from "@/services/dataTypes";
import {
  filterOfferBanners,
  getBannerDimensions,
  getBaseImageUrl,
} from "@/constants/hooks";

const Banner = dynamic(() => import("./Banner"), { ssr: false });
const OffersListView = dynamic(() => import("./OffersListView"), {
  ssr: false,
});

interface Props {
  initialOffers: OffersOffer[];
  companyId: string;
  merchantId: string;
  awaited_p_id: string;
  mer_slug_type: string;
  mer_slug: string;
  offerBanner: OffersOffer[];
  domain: string;
  merchantName: string;
  pagination: PaginationType;
  ads_campaign: boolean;
}

const LazyLoadingOffers = ({
  initialOffers,
  companyId,
  merchantId,
  awaited_p_id,
  mer_slug_type,
  mer_slug,
  offerBanner,
  domain,
  merchantName,
  pagination,
  ads_campaign,
}: Props) => {
  const [offers, setOffers] = useState<OffersOffer[]>(initialOffers);
  const [expiredOffers, setExpiredOffers] = useState<OffersOffer[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const [filteredOfferBanners, setFilteredOfferBanners] = useState<
    OffersOffer[]
  >([]);
  const [lazy, setLazy] = useState(false);
  const bannerDisplayAfter = 2;

  useEffect(() => {
    const timer = setTimeout(() => setLazy(true), 400);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setOffers(initialOffers);
    fetchExpiredOffers();
  }, [initialOffers]);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    if (page == pagination?.last_page) {
      setHasMore(false);
      return;
    }
    setLoading(true);
    try {
      const nextPage = page + 1;
      const response = await apiSpecificOffers(merchantId, companyId, nextPage);
      if (response.data?.offers.length > 0) {
        setOffers((prev) => [...prev, ...response.data.offers]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more offers:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchExpiredOffers = async () => {
    try {
      const response = await apiExpiredOffers(merchantId, companyId);
      setExpiredOffers(response.data?.offers || []);
    } catch (error) {}
  };

  const observerCallback = useCallback(
    (node: any) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            loadMore();
          }
        },
        { threshold: 0.1 },
      );
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore],
  );

  useEffect(() => {
    if (offerBanner?.length > 0) {
      setFilteredOfferBanners(
        filterOfferBanners(offerBanner, 300, 600, 50, 150),
      );
    }
  }, [offerBanner]);

  return (
    <div className="w-full bg-[#FDFCF0]/30 py-12">
  <div className="max-w-6xl mx-auto px-4">
    
    {/* Active Offers Container */}
    <div className="flex flex-col gap-8">
      {offers.map((offer, index) =>
        offer.status === 1 && offer.offer.status === 1 ? (
          <React.Fragment key={offer.id}>
            <div
              ref={index === offers.length - 1 ? observerCallback : undefined}
              className="transform transition-all duration-500"
            >
              <OffersListView
                product={offer}
                companyId={companyId}
                awaited_p_id={awaited_p_id}
                mer_slug_type={mer_slug_type}
                mer_slug={mer_slug}
                domain={domain}
                ads_campaign={ads_campaign}
              />
            </div>

            {(index + 1) % bannerDisplayAfter === 0 &&
              filteredOfferBanners.length > 0 &&
              filteredOfferBanners[Math.floor(index / bannerDisplayAfter)] && (
                <div className="w-full bg-white rounded-[2.5rem] shadow-sm border border-[#800000]/5 overflow-hidden my-6 p-2 ring-1 ring-[#800000]/5">
                  <div className="rounded-[2.2rem] overflow-hidden">
                    <Banner
                      data={filteredOfferBanners[Math.floor(index / bannerDisplayAfter)]}
                      height={getBannerDimensions(filteredOfferBanners[Math.floor(index / bannerDisplayAfter)])?.height}
                      width={getBannerDimensions(filteredOfferBanners[Math.floor(index / bannerDisplayAfter)])?.width}
                      offerLink={null}
                      domain={domain}
                      mer_slug={mer_slug}
                      slug_type={mer_slug_type}
                    />
                  </div>
                </div>
              )}
          </React.Fragment>
        ) : null,
      )}
    </div>

    {/* Loading Spinner */}
    {loading && (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-4 border-[#800000]/10"></div>
          <div className="absolute inset-0 rounded-full border-4 border-[#800000] border-t-transparent animate-spin"></div>
        </div>
        <span className="text-[10px] font-black text-[#800000] uppercase tracking-[0.3em] animate-pulse">
          Curating Deals...
        </span>
      </div>
    )}

    {/* Expired Offers Section - Subtly Styled */}
    {expiredOffers?.length > 0 && (
      <div className="mt-24 border-t border-[#800000]/10 pt-16">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 bg-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">
            Archive Collection
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#1A1A1A] tracking-tighter uppercase">
            Past <span className="text-[#800000] font-serif italic lowercase font-normal">Opportunities</span>
          </h2>
          <p className="text-slate-400 mt-3 text-sm italic font-medium">
            "Vintage" deals that might still surprise you.
          </p>
        </div>
        
        <div className="flex flex-col gap-6 opacity-50 hover:opacity-100 transition-all duration-700 grayscale-[0.5] hover:grayscale-0">
          {expiredOffers.slice(0, 10).map((item, i) => (
            <OffersListView
              key={`expired-${i}`}
              product={item}
              companyId={companyId}
              awaited_p_id={awaited_p_id}
              mer_slug_type={mer_slug_type}
              mer_slug={mer_slug}
              domain={domain}
              ads_campaign={ads_campaign}
            />
          ))}
        </div>
      </div>
    )}
  </div>

  {/* SEO Schema remains intact */}
  <script
    type="application/ld+json"
    id="AggregateOffer"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AggregateOffer",
        name: `${merchantName} Coupons & Deals`,
        description: `Active coupons and deals for ${merchantName}.`,
        offerCount: offers.length,
        offers: offers.map((offer) => ({
          "@type": "Offer",
          name: offer?.offer?.offer_title,
          description: offer?.offer?.offer_detail,
          url: getBaseImageUrl(`${domain}`, `${offer.offer?.url}`, ""),
        })),
      }),
    }}
  />
</div>
  );
};

export default LazyLoadingOffers;
