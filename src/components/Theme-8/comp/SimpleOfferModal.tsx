"use client";

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import { Offer } from "@/services/dataTypes";
import OfferDuration from "./OfferDuration";
import { getBaseImageUrl } from "@/constants/hooks";
import Link from "next/link";
import { faCheck, faCopy, faTimes, FontAwesomeIcon } from "@/constants/icons";

interface Props {
    data: Offer;
    onClose: () => void;
    domain: string;
    merchantHref: string;
    finalDiscountTag?: string | null;
}

const SimpleOfferModal = ({ data, onClose, domain, merchantHref, finalDiscountTag }: Props) => {
    const [mounted, setMounted] = useState(false);
    // 1. Implementation of Copy-to-Clipboard logic
    const [copied, setCopied] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');

    useEffect(() => {
        if (data?.offer_type?.name === "product") {
            setImageSrc(getBaseImageUrl(domain, data?.product_image, ""));
        }else {
            setImageSrc(getBaseImageUrl(domain, data?.merchant?.merchant_logo, ""));
        }
    }, [data]);

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        // Prevent background scrolling when modal is open (Portal usage)
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
            setMounted(false);
        };
    }, [onClose]);

    const handleCopy = () => {
        if (data?.coupon_code) {
            // Check if navigator.clipboard is available (modern browsers)
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(data.coupon_code);
            } else {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = data.coupon_code;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };


    if (!mounted) return null;

    // Hook text to encourage exploring (point 3)
    const hookText = "🔥 Don't Miss Out! Exclusive Discount Available!";
    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;

    return ReactDOM.createPortal(
        <div className="offer-modal-overlay-two" onClick={onClose}>
            <div className="offer-modal-container-two" onClick={(e) => e.stopPropagation()}>

                {/* Header (Contains Close Button) */}
                <div className="offer-modal-header-two">
                    <button className="btn-close-modal-two" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                    <OfferDuration endDate={data?.end_date} className="justify-content-center" />
                </div>

                {/* Body (Scrollable) */}
                <div className="offer-modal-body-two">

                    {/* 2. Professional Horizontal Image Section */}
                    <div className={`modal-img-wrapper-two cus-border ${data?.product_image? 'horizontal-image-wrapper' : 'merchant-img-wrapper-modal'} border b-eighth rounded-4  position-relative`}>
                        {finalDiscountTag && (
                            <div className="ribbon">
                                <span>
                                    {finalDiscountTag}
                                </span>
                            </div>
                        )}
                        <Image
                            src={imageSrc}
                            alt={data?.offer_title}
                            width={300} // New dimensions for horizontal banner look
                            height={100}
                            className="modal-offer-img-two horizontal-offer-img"
                        />
                    </div>

                    {/* Title */}
                    <h3 className="modal-offer-title-two text-center mb-2">
                        {data.offer_title}
                    </h3>

                    <Link
                        href={absoluteOutUrl}
                        className="btn-modal-cta-two footer-cta-two blink-offer"
                        target="_blank"
                    >
                        {data?.coupon_code ? "Shop Now" : "Grab Deal"}
                    </Link>

                    {/* Code / Deal Section */}
                    <div className="modal-action-area-two d-center flex-column">
                        {data.coupon_code ? (
                            <div className="coupon-code-group-two">
                                <div className="coupon-code-display-two">
                                    <span className="code-text-two">{data.coupon_code}</span>
                                </div>
                                <button
                                    className={`btn-copy-two ${copied ? 'copied' : ''}`}
                                    onClick={handleCopy}
                                >
                                    {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                                    {copied ? " Copied!" : " Copy Code"}
                                </button>
                            </div>
                        ) : (
                            <div className="deal-activated-text-two text-center mb-3">
                                <p className="mt-2 text-muted small">
                                    No code required. Discount applied at checkout.
                                </p>
                            </div>
                        )}

                        {/* CTA Button (Remaining original CTA, moved below coupon area) */}
                        <Link
                            href={absoluteOutUrl}
                            className="btn-modal-cta-two secondary-cta-two"
                            target="_blank"
                        >
                            {data?.coupon_code ? "Go to Store" : "Get Deal"}
                        </Link>
                    </div>

                    {/* HTML Description */}
                    {data?.offer_detail && (
                        <div
                            className="modal-html-content-two my-2"
                            dangerouslySetInnerHTML={{ __html: data?.offer_detail }}
                        />
                    )}
                </div>

                {/* 3. Footer/Extension Popup Style Bar */}
                <div className="offer-modal-footer-two extension-bar-two">
                    <div className="footer-content-two">
                        <p className="footer-hook-text-two">{hookText}</p>
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
};

export default SimpleOfferModal;