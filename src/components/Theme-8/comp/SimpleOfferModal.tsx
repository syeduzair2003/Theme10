"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { Offer,ProductData } from "@/services/dataTypes";
import OfferDuration from "./OfferDuration";
import { getBaseImageUrl } from "@/constants/hooks";
import Link from "next/link";
import { faCheck, faCopy, faTimes, FontAwesomeIcon } from "@/constants/icons";

interface Props {
    data: Offer | ProductData;
    onClose: () => void;
    domain: string;
    merchantHref: string;
    finalDiscountTag?: string | null;
    merchantImg?: string | null;
    productImg?: string | null;
}

const SimpleOfferModal = ({ data, onClose,merchantImg,productImg, domain, merchantHref, finalDiscountTag }: Props) => {
    const [mounted, setMounted] = useState(false);
    const [copied, setCopied] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');

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
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
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

    const hookText = "🔥 Don't Miss Out! Exclusive Discount Available!";
    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            {/* Overlay */}
            <div 
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
                onClick={onClose} 
            />

            {/* Modal Container */}
            <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
                
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-50">
                    <div className="flex-1 flex justify-center">
                         <OfferDuration endDate={data?.end_date} className="scale-90" />
                    </div>
                    <button 
                        onClick={onClose}
                        className="absolute right-6 top-6 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 transition-all active:scale-90"
                    >
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8 overflow-y-auto max-h-[70vh] custom-scrollbar">
                    
                    {/* Image Section */}
                    <div className="relative w-full aspect-[2/1] bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center p-6 mb-6 group">
                        {finalDiscountTag && (
                            <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-lg shadow-red-200">
                                {finalDiscountTag}
                            </div>
                        )}
                        <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                            <Image
                                src={imageSrc}
                                alt={data?.offer_title || "Offer"}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                        <h3 className="text-xl md:text-2xl font-black text-slate-900 leading-tight tracking-tight uppercase italic">
                            {data.offer_title}
                        </h3>

                        {/* Coupon Section */}
                        <div className="pt-4 flex flex-col items-center gap-4">
                            {data.coupon_code ? (
                                <div className="w-full bg-white border-2 border-dashed border-blue-200 rounded-2xl p-2 flex items-center justify-between group hover:border-blue-400 transition-all">
                                    <span className="flex-1 text-lg font-black text-blue-600 tracking-widest uppercase truncate px-4">
                                        {data.coupon_code}
                                    </span>
                                    <button
                                        onClick={handleCopy}
                                        className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${
                                            copied ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white hover:bg-blue-600'
                                        }`}
                                    >
                                        {copied ? <><FontAwesomeIcon icon={faCheck} className="mr-2"/> Copied</> : <><FontAwesomeIcon icon={faCopy} className="mr-2"/> Copy</>}
                                    </button>
                                </div>
                            ) : (
                                <div className="bg-emerald-50 text-emerald-700 px-6 py-3 rounded-2xl text-xs font-bold border border-emerald-100">
                                    No code required. Discount applied at checkout.
                                </div>
                            )}

                            <Link
                                href={absoluteOutUrl}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-2 group active:scale-[0.98]"
                                target="_blank"
                            >
                                {data?.coupon_code ? "Shop Now" : "Grab Deal"}
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>

                        {/* HTML Description */}
                        {data?.offer_detail && (
                            <div 
                                className="pt-6 text-slate-500 text-sm text-left leading-relaxed prose-sm max-h-40 overflow-y-auto pr-2"
                                dangerouslySetInnerHTML={{ __html: data?.offer_detail }}
                            />
                        )}
                    </div>
                </div>

                {/* Footer Extension Bar */}
                <div className="bg-slate-900 p-4 text-center">
                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] animate-pulse">
                        {hookText}
                    </p>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SimpleOfferModal;