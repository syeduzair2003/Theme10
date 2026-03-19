"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { apiOfferDetails, apiSpecificOffers } from "@/apis/offers";
import { Merchant, Offer, OffersOffer } from "@/services/dataTypes";
import ClientOfferCard from "./ClientOfferCard";
import OfferPopOver from "./OfferPopOver";
import Spinner from "react-bootstrap/Spinner";

let renderCount = 0;

interface Props {
  initialOffers: OffersOffer[];
  merchantDetails: Merchant;
  companyId: string;
  domain: string;
  slug_type: string;
  mer_slug: string;
  pagination: any;
  merchantId: string;
}

export default function OffersPageClientWrapper({
  initialOffers,
  merchantDetails,
  companyId,
  domain,
  slug_type,
  mer_slug,
  pagination,
  merchantId,
}: Props) {

  const searchParams = useSearchParams();
  const router = useRouter();

  const [offers, setOffers] = useState<OffersOffer[]>(initialOffers);
  const [offerData, setOfferData] = useState<Offer | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const observer = useRef<IntersectionObserver | null>(null);

  // ---------------- MODAL LOGIC ----------------
  useEffect(() => {
    const awaited_p_id = searchParams.get("p_id");
    const show = searchParams.get("show");

    if (!awaited_p_id || !companyId || show !== "true") return;

    const fetchOfferDetails = async () => {
      const res = await apiOfferDetails(awaited_p_id, companyId);
      setOfferData(res.data);
      renderCount += 1;
      if (renderCount === 1) setShowModal(true);
    };

    fetchOfferDetails();
  }, [searchParams, companyId]);

  const handleClose = () => {
    setShowModal(false);
    setOfferData(null);
    renderCount = 0;
    router.push(window.location.pathname, { scroll: false });
  };

  // ---------------- LAZY LOADING ----------------
  const loadMore = async () => {
    if (loading || !hasMore) return;

    if (page >= pagination?.last_page) {
      setHasMore(false);
      return;
    }

    setLoading(true);

    try {
      const nextPage = page + 1;
      const res = await apiSpecificOffers(merchantId, companyId, nextPage);

      if (res?.data?.offers?.length) {
        setOffers(prev => [...prev, ...res.data.offers]);
        setPage(nextPage);
      } else {
        setHasMore(false);
      }
    } catch (e) {
      console.error("Load more error:", e);
    }

    setLoading(false);
  };

  const observerCallback = useCallback((node: HTMLElement | null) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) loadMore();
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  // ---------------- RENDER ----------------
  return (
    <div className="grid gap-4">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((item, index) =>
          item.status === 1 && item.offer.status === 1 ? (
            <div
              key={item.id}
              ref={index === offers.length - 1 ? observerCallback : null}
            >
              <ClientOfferCard
                image={`/${item.offer.product_image}`}
                title={item.offer.offer_title}
                expiry={item.offer.end_date}
                href={item.offer.url}
                unique_id={item.offer.unique_id}
                domain={domain}
                mer_slug={mer_slug}
                slug_type={slug_type}
                id={item.offer.id}
                merchant={merchantDetails}
              />
            </div>
          ) : null
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-6">
          <Spinner animation="border" />
        </div>
      )}

      {showModal && offerData && (
        <OfferPopOver
          data={offerData}
          companyId={companyId}
          onClose={handleClose}
          domain={domain}
        />
      )}
    </div>
  );
}
