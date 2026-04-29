"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { Offer, ProductData } from "@/services/dataTypes";
import { FontAwesomeIcon, faTimes, faCopy, faCheck, faChevronRight, faChevronDown, faChevronUp } from "@/constants/icons";
import { discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";
import OfferDuration from "./OfferDuration";

interface Props {
    data: Offer | ProductData;
    onClose: () => void;
    domain: string;
    merchantHref: string;
    finalDiscountTag?: string | null;
    merchantImg?: string | null;
    productImg?: string | null;
}

const SimpleOfferModal = ({ data, onClose, domain, merchantHref, finalDiscountTag, merchantImg, productImg }: Props) => {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');
    const [showFullDesc, setShowFullDesc] = useState(false);

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
            setMounted(false);
        };
    }, [onClose]);

    useEffect(() => {
        if (productImg) {
            setImageSrc(getBaseImageUrl(domain, productImg, ""));
        } else if ((data as any)?.offer_type?.name === "product" && (data as ProductData)?.product_image) {
            setImageSrc(getBaseImageUrl(domain, (data as ProductData)?.product_image, ""));
        } else if (merchantImg) {
            setImageSrc(getBaseImageUrl(domain, merchantImg, ""));
        } else if ((data as Offer).merchant?.merchant_logo) {
            setImageSrc(getBaseImageUrl(domain, (data as Offer).merchant.merchant_logo, ""));
        }
    }, [data, domain, merchantImg, productImg]);

    const handleCopy = () => {
        if (data?.coupon_code) {
            const textToCopy = data.coupon_code;

            const performCopy = () => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            };

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(textToCopy)
                    .then(performCopy)
                    .catch(() => {
                        // Fallback if promise rejects (e.g., restricted permissions)
                        fallbackCopy(textToCopy, performCopy);
                    });
            } else {
                // Fallback for older browsers or non-secure contexts
                fallbackCopy(textToCopy, performCopy);
            }
        }
    };

    const fallbackCopy = (text: string, callback: () => void) => {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        
        // Ensure textarea is not visible or affecting layout
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        textArea.style.top = "0";
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        try {
            const successful = document.execCommand('copy');
            if (successful) callback();
        } catch (err) {
            console.error('Fallback copy failed', err);
        }
        
        document.body.removeChild(textArea);
    };

    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;
    const cleanDesc = discardHTMLTags(data?.offer_detail || "");
    const isLongDesc = cleanDesc.length > 150;

    if (!mounted) return null;

    return ReactDOM.createPortal(
        <div 
            className="fixed top-[64px] md:top-[110px] inset-x-0 bottom-0 z-[50000] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div 
                className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[95%] sm:max-h-[90vh] animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* ── Close Button ── */}
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
                </button>

                <div className="overflow-y-auto flex-grow custom-scrollbar">
                    {/* ── Header & Logo ── */}
                    <div className="pt-8 sm:pt-10 pb-4 flex justify-center relative">
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex items-center justify-center">
                            {/* Secondary Color (#ff912f) for Discount Tag */}
                            {finalDiscountTag && (
                                <div className="absolute -top-3 -right-3 z-20 bg-[#ff912f] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md border-2 border-white">
                                    {finalDiscountTag}
                                </div>
                            )}
                            <Image
                                src={imageSrc}
                                alt="merchant logo"
                                width={80}
                                height={80}
                                className="object-contain max-h-full"
                            />
                        </div>
                    </div>

                    {/* ── Content Area ── */}
                    <div className="px-5 sm:px-8 pb-8 text-center">
                        <div className="flex items-center justify-center gap-2 mb-4">
                            {/* Primary Color (#8bc94a) for Verified Badge */}
                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8bc94a]/10">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#8bc94a]" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8bc94a]">Verified</span>
                            </span>
                            <OfferDuration endDate={data?.end_date} />
                        </div>
                        
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-5 sm:mb-6">
                            {data?.offer_title}
                        </h2>

                        {/* ── Actions ── */}
                        <div className="mb-8">
                            {data?.coupon_code ? (
                                <div>
                                    <div className="flex items-center justify-between bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl p-1.5 mb-2 hover:border-[#8bc94a]/50 transition-colors">
                                        <span className="text-lg font-mono font-bold text-gray-900 px-4 tracking-widest select-all">
                                            {data.coupon_code}
                                        </span>
                                        {/* Primary Color (#8bc94a) for active state */}
                                        <button
                                            onClick={handleCopy}
                                            className={`px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm ${
                                                copied 
                                                ? 'bg-[#8bc94a] text-white shadow-[#8bc94a]/20' 
                                                : 'bg-[#ff912f] text-white hover:bg-[#e68228] hover:shadow-md hover:shadow-[#ff912f]/30 active:scale-95'
                                            }`}
                                        >
                                            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="w-3.5 h-3.5" />
                                            {copied ? "Copied" : "Copy"}
                                        </button>
                                    </div>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                        Use code at checkout
                                    </p>
                                </div>
                            ) : (
                                <Link
                                    href={absoluteOutUrl}
                                    target="_blank"
                                    className="w-full py-3.5 rounded-xl bg-[#8bc94a] text-white text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-[#7ab33f] transition-colors shadow-lg shadow-[#8bc94a]/20"
                                    onClick={onClose}
                                >
                                    Get Deal Now
                                    <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5" />
                                </Link>
                            )}
                        </div>

                        {/* ── Details ── */}
                        <div className="text-left border-t border-gray-100 pt-5">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Offer Details</h4>
                            <p className={`text-sm text-gray-600 leading-relaxed ${!showFullDesc && isLongDesc ? 'line-clamp-2' : ''}`}>
                                {cleanDesc || "This exclusive offer is waiting for you! Click the button above to unlock the discount directly at the store."}
                            </p>
                            
                            {isLongDesc && (
                                <button 
                                    onClick={() => setShowFullDesc(!showFullDesc)}
                                    // Secondary Color (#ff912f) for interactive text
                                    className="mt-2 flex items-center gap-1.5 text-xs font-bold text-[#ff912f] hover:text-[#e68228] transition-colors uppercase tracking-wide"
                                >
                                    {showFullDesc ? 'Show Less' : 'Read More'}
                                    <FontAwesomeIcon icon={showFullDesc ? faChevronUp : faChevronDown} className="w-3 h-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* ── Footer Link ── */}
                <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                    <Link 
                        href={merchantHref} 
                        // Secondary Color (#ff912f) for subtle footer link
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-[#ff912f] transition-colors"
                        onClick={onClose}
                    >
                        Explore more offers from this store
                        <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3" />
                    </Link>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e5e7eb;
                    border-radius: 20px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #d1d5db;
                }
            `}</style>
        </div>,
        document.body
    );
};

export default SimpleOfferModal;