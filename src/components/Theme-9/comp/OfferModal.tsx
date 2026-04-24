import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { faThumbsDown, faThumbsUp } from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { calculateOfferDuration, getBaseImageUrl } from "@/constants/hooks";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Offer } from "@/services/dataTypes";

const RateUs = dynamic(() => import("./RateUs"), { ssr: false });
const SocialMediaShare = dynamic(() => import("./SocialMediaShare"), {
  ssr: false,
});

interface Props {
  data: Offer;
  companyId: string;
  onClose: () => void;
  domain: string;
  merchantHref: string;
}

const OfferModal = ({
  data,
  companyId,
  onClose,
  domain,
  merchantHref,
}: Props) => {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleCopy = async () => {
    const code = data?.coupon_code;
    if (code) {
      try {
        // Primary method
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        try {
          const textArea = document.createElement("textarea");
          textArea.value = code;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (fallbackErr) {
          console.error("Unable to copy", fallbackErr);
        }
      }
    }
  };

  const finalUrl = data?.url?.startsWith("/")
    ? data?.url.replace(/^\/+/, "")
    : data?.url;
  const absoluteOutUrl = `/${finalUrl}`;
  const imgSrc =
    data?.offer_type?.name === "product"
      ? data?.product_image
      : data?.merchant?.merchant_logo;

  if (!mounted) return null;

  const modalContent = (
    <>
      <style>{`
                @keyframes modalPop {
                    0% { opacity: 0; transform: scale(0.95) translateY(15px); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                }
                @keyframes backdropFade {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                /* Cross-browser scrollbar hiding */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;  /* IE and Edge */
                    scrollbar-width: none;  /* Firefox */
                }
            `}</style>

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <div
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
          style={{ animation: "backdropFade 0.3s ease-out forwards" }}
        />

        {/* Modal Container */}
        <div
          className="relative w-full max-w-4xl bg-[#FDFBF7] text-black rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh] border border-[#800000]/20"
          style={{
            animation: "modalPop 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards",
          }}
        >
          {/* 1. Header Section */}
          <div className="relative bg-[#FDFBF7] pt-12 pb-8 px-8 md:px-12 text-center z-10">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-50 w-10 h-10 bg-black/5 hover:bg-[#800000] text-black hover:text-[#FDFBF7] rounded-full flex items-center justify-center transition-all duration-300"
              aria-label="Close"
            >
              <span className="text-2xl font-light leading-none mb-1">×</span>
            </button>

            <div className="max-w-2xl mx-auto space-y-6">
              <h2 className="text-2xl md:text-3xl font-black text-black leading-tight uppercase tracking-tight">
                {data?.offer_title}
              </h2>

              <div className="flex justify-center mt-4">
                {data?.coupon_code ? (
                  <div className="inline-flex flex-col md:flex-row items-center bg-white border border-[#800000]/30 rounded-2xl p-2 md:pl-6 shadow-[0_4px_20px_rgba(128,0,0,0.08)]">
                    <span className="text-2xl font-black text-[#800000] tracking-widest uppercase px-6 py-2">
                      {data?.coupon_code}
                    </span>
                    <button
                      onClick={handleCopy}
                      className={`${copied ? "bg-emerald-600" : "bg-[#800000] hover:bg-black"} text-[#FDFBF7] px-8 py-4 rounded-xl font-black text-[13px] uppercase tracking-widest transition-all duration-300 shadow-md w-full md:w-auto mt-2 md:mt-0 active:scale-95`}
                    >
                      {copied ? "Copied!" : "Copy Code"}
                    </button>
                  </div>
                ) : (
                  <Link
                    href={absoluteOutUrl}
                    className="bg-[#800000] hover:bg-black text-[#FDFBF7] px-12 py-4 rounded-xl font-black text-[14px] uppercase tracking-widest transition-all duration-300 shadow-lg active:scale-95"
                  >
                    Activate Deal
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* 2. Body Content */}
          <div className="flex-grow overflow-y-auto no-scrollbar px-6 pb-6 md:px-10 md:pb-10 bg-[#FDFBF7]">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Left Column - Details Card */}
              <div className="md:w-3/5 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#800000] via-[#800000]/70 to-black"></div>

                <div className="space-y-8">
                  <div className="flex justify-between items-start">
                    <div className="relative w-28 h-16 bg-[#FDFBF7] rounded-xl border border-black/5 p-2 flex items-center justify-center">
                      <Image
                        src={getBaseImageUrl(domain, imgSrc, "")}
                        alt="Merchant Logo"
                        fill
                        className="object-contain p-2"
                      />
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="bg-black text-[#FDFBF7] px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest">
                        Verified
                      </span>
                      <span className="bg-[#800000]/10 text-[#800000] border border-[#800000]/20 px-4 py-1.5 rounded-md text-[9px] font-black uppercase tracking-widest">
                        {data?.end_date
                          ? calculateOfferDuration(data?.end_date)
                          : "Active Deal"}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <h4 className="text-[12px] font-black text-black uppercase tracking-widest">
                        Offer Details
                      </h4>
                      <div className="flex-grow h-px bg-black/5"></div>
                    </div>
                    <div
                      className="text-black/70 text-sm leading-relaxed prose prose-sm max-w-none prose-a:text-[#800000] prose-a:font-bold hover:prose-a:text-black transition-colors"
                      dangerouslySetInnerHTML={{
                        __html: data?.offer_detail || "",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Rating Card */}
              <div className="md:w-2/5 bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-black/5 flex flex-col justify-center items-center text-center">
                <h4 className="text-[12px] font-black text-black uppercase tracking-widest mb-4">
                  Rate this deal
                </h4>
                <div className="w-full bg-[#FDFBF7] rounded-2xl p-6 border border-black/5">
                  <RateUs
                    offer_id={data?.unique_id || ""}
                    company_id={companyId}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Footer Section */}
          <div className="bg-white border-t border-black/5 p-6 md:px-10 z-10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-5">
                <span className="text-[11px] font-black text-black/50 uppercase tracking-widest">
                  Helpful?
                </span>
                <div className="flex gap-3">
                  <button className="px-6 py-2.5 rounded-xl text-[11px] font-black border border-black/10 bg-[#FDFBF7] text-black hover:bg-black hover:text-[#FDFBF7] hover:border-black transition-all duration-300">
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-2" /> YES
                  </button>
                  <button className="px-6 py-2.5 rounded-xl text-[11px] font-black border border-black/10 bg-[#FDFBF7] text-black hover:bg-[#800000] hover:text-[#FDFBF7] hover:border-[#800000] transition-all duration-300">
                    <FontAwesomeIcon icon={faThumbsDown} className="mr-2" /> NO
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <SocialMediaShare
                  offerUrl={
                    typeof window !== "undefined"
                      ? encodeURIComponent(window.location.href)
                      : ""
                  }
                  offerTitle={
                    data
                      ? encodeURIComponent(
                          data?.offer_title || data?.offer_detail || "",
                        )
                      : ""
                  }
                  merchantHref={merchantHref}
                  unique_id={data?.unique_id}
                  domain={domain}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};

export default OfferModal;
