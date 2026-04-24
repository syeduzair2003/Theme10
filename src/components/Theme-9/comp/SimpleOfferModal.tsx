"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { Offer, ProductData } from "@/services/dataTypes";
import OfferDuration from "./OfferDuration";
import { getBaseImageUrl } from "@/constants/hooks";
import Link from "next/link";
import { faCheck, faCopy, faTimes } from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  data: Offer | ProductData;
  onClose: () => void;
  domain: string;
  merchantHref: string;
  finalDiscountTag?: string | null;
  merchantImg?: string | null;
  productImg?: string | null;
}

const SimpleOfferModal = ({
  data,
  onClose,
  merchantImg,
  productImg,
  domain,
  merchantHref,
  finalDiscountTag,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>("");

  useEffect(() => {
    if (productImg !== null && productImg !== undefined) {
      setImageSrc(getBaseImageUrl(domain, productImg, ""));
    } else {
      setImageSrc(getBaseImageUrl(domain, merchantImg, ""));
    }
  }, [data]);

  useEffect(() => {
    setMounted(true);
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  const handleCopy = () => {
    if (data?.coupon_code) {
      navigator.clipboard.writeText(data.coupon_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!mounted) return null;

  const finalUrl = data?.url?.startsWith("/")
    ? data?.url.replace(/^\/+/, "")
    : data?.url;
  const absoluteOutUrl = `/${finalUrl}`;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[480px] bg-[#FFFDE0] rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-300 border border-[#800000]/10">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 z-[70] w-9 h-9 flex items-center justify-center rounded-full bg-white/90 hover:bg-[#800000] hover:text-white text-black transition-all duration-300 border border-black/5 shadow-sm"
        >
          <FontAwesomeIcon icon={faTimes} className="text-xs" />
        </button>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-y-auto custom-modal-scrollbar">
          {/* Top Header */}
          <div className="pt-10 pb-4 px-8 text-center">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white border border-[#800000]/10 shadow-sm mb-4">
              <OfferDuration endDate={data?.end_date} className="scale-90" />
            </div>
            <h3 className="text-2xl font-bold text-black tracking-tight leading-tight">
              {data.offer_title}
            </h3>
          </div>

          {/* Image Area */}
          <div className="px-8 py-4">
            <div className="relative w-full aspect-[16/10] bg-white rounded-2xl flex items-center justify-center p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#800000]/5 group overflow-hidden">
              {finalDiscountTag && (
                <div className="absolute top-4 left-4 z-10 bg-[#800000] text-[#FFFDE0] text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                  {finalDiscountTag}
                </div>
              )}
              <div className="relative w-full h-full transition-transform duration-1000 group-hover:scale-105">
                <Image
                  src={imageSrc}
                  alt="Offer"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="px-8 pb-8 space-y-6">
            {/* Coupon / CTA Area */}
            <div className="space-y-3">
              {data.coupon_code ? (
                <div className="flex flex-col gap-2">
                  <p className="text-[10px] font-bold text-[#800000]/60 uppercase tracking-widest ml-1">
                    Copy Coupon Code
                  </p>
                  <div className="relative h-14 bg-white border border-[#800000]/20 rounded-xl flex items-center overflow-hidden">
                    <div className="flex-1 px-5 font-mono text-lg font-bold tracking-widest text-black overflow-hidden">
                      {data.coupon_code}
                    </div>
                    <button
                      onClick={handleCopy}
                      className={`h-full px-6 font-bold text-[11px] uppercase tracking-tighter transition-all duration-300 ${
                        copied
                          ? "bg-emerald-500 text-white"
                          : "bg-[#800000] text-white hover:bg-black"
                      }`}
                    >
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="py-3 px-4 rounded-xl bg-[#800000]/5 border border-[#800000]/10 text-center">
                  <p className="text-[11px] font-bold text-[#800000] uppercase tracking-wider">
                    ✦ Discount auto-applied at checkout ✦
                  </p>
                </div>
              )}

              <Link
                href={absoluteOutUrl}
                className="flex h-14 w-full items-center justify-center rounded-xl bg-black text-[#FFFDE0] font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#800000] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 shadow-lg shadow-black/10"
                target="_blank"
              >
                {data?.coupon_code ? "Shop with Coupon" : "Secure Discount"}
              </Link>
            </div>

            {/* Description */}
            {data?.offer_detail && (
              <div className="relative pt-2">
                <div className="absolute left-0 top-2 bottom-0 w-[2px] bg-[#800000]/10 rounded-full"></div>
                <div
                  className="pl-5 text-[14px] text-slate-600 leading-relaxed font-medium italic offer-description-html"
                  dangerouslySetInnerHTML={{ __html: data?.offer_detail }}
                />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white/40 border-t border-[#800000]/5 py-4 text-center">
          <p className="text-[9px] font-medium text-slate-400 uppercase tracking-[0.3em]">
            Verified Exclusive Offer • 2026
          </p>
        </div>
      </div>

      {/* Scrollbar Styling */}
      <style jsx global>{`
        .custom-modal-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(128, 0, 0, 0.1);
          border-radius: 10px;
        }
        .custom-modal-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(128, 0, 0, 0.3);
        }
        .offer-description-html p {
          margin-bottom: 10px;
        }
        .offer-description-html ul,
        .offer-description-html ol {
          margin-left: 20px;
          margin-bottom: 10px;
        }
      `}</style>
    </div>,
    document.body,
  );
};

export default SimpleOfferModal;
