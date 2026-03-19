"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Offer, ProductData } from '@/services/dataTypes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { getBaseImageUrl, getCurrencySymbol } from '@/constants/hooks';
import { faCheck, faCopy, faTimes } from '@/constants/icons';

interface Props {
    data: Offer | ProductData;
    onClose: () => void;
    domain: string;
    merchantSrc?: string;
    finalDiscountTag: string | null;
}

const SimpleOfferModal = ({ data, onClose, finalDiscountTag, domain, merchantSrc }: Props) => {
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>('');
    
    useEffect(() => {
        const imgSrc = data?.offer_type?.name === "product" ? data?.product_image : null;
        if (imgSrc) {
            setImageSrc(getBaseImageUrl(domain, imgSrc, ""))
        } else if (merchantSrc) {
            setImageSrc(merchantSrc)
        }
    }, [data]);

    const originalPrice = data?.original_price ? parseFloat(data.original_price) : 0;
    const salePrice = data?.sale_price ? parseFloat(data.sale_price) : 0;

    useEffect(() => {
        setMounted(true);
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        // Prevent background scrolling when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    // const handleCopy = () => {
    //     if (data.coupon_code) {
    //         navigator.clipboard.writeText(data.coupon_code);
    //         setCopied(true);
    //         setTimeout(() => setCopied(false), 2000);
    //     }
    // };
    const handleCopy = async () => {
        const textToCopy = data.coupon_code || "";
        if (!textToCopy) return;

        let success = false;

        // Try standard API first
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(textToCopy);
                success = true;
            } catch (err) {
                console.warn("Clipboard API failed, trying fallback...", err);
            }
        }

        // Fallback for older browsers or non-secure contexts (HTTP)
        if (!success) {
            try {
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                
                // Ensure it's not visible but part of DOM
                textArea.style.position = "fixed";
                textArea.style.left = "-9999px";
                textArea.style.top = "0";
                document.body.appendChild(textArea);
                
                textArea.focus();
                textArea.select();
                
                success = document.execCommand('copy');
                document.body.removeChild(textArea);
            } catch (err) {
                console.error("Fallback copy failed", err);
            }
        }

        if (success) {
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        } else {
            alert("Could not copy text. Please select and copy manually.");
        }
    };

    // The Modal Content
    const modalContent = (
        <div className="offer-modal-overlay" onClick={onClose}>
            <div className="offer-modal-container" onClick={(e) => e.stopPropagation()}>

                {/* Header (Fixed) */}
                <div className="offer-modal-header">
                    {finalDiscountTag && (
                        <span className='blinking-discount-tag'>{finalDiscountTag}</span>
                    )}
                    <button className="btn-close-modal" onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>

                {/* Body (Scrollable) */}
                <div className="offer-modal-body">

                    {/* Image Section */}
                    <div className="modal-img-wrapper mb-3">
                        <Image
                            src={getBaseImageUrl(domain, imageSrc, "")}
                            alt={data.offer_title}
                            width={120}
                            height={120}
                            className="modal-offer-img"
                        />
                    </div>
                    <Link
                        href={data?.url}
                        className="btn-modal-cta"
                    >
                        {'Avail Now'}
                    </Link>

                    {/* Title */}
                    <h3 className="modal-offer-title text-center mb-2">
                        {data.offer_title}
                    </h3>

                    {data?.offer_type?.name === "product" && (
                        <div className="price-info">
                            {salePrice > 0 && (
                                <span className="price-sale">
                                    {getCurrencySymbol(data?.currency)}{salePrice}
                                </span>
                            )}
                            {originalPrice > 0 && (
                                <span className="price-original ms-2">
                                    {getCurrencySymbol(data?.currency)}{originalPrice}
                                </span>
                            )}
                        </div>
                    )}

                    {/* HTML Description */}
                    {data?.offer_detail && (
                        <div
                            className="modal-html-content mb-4"
                            dangerouslySetInnerHTML={{ __html: data.offer_detail }}
                        />
                    )}

                    {/* Code / Deal Section */}
                    <div className="modal-action-area d-center flex-column">
                        {data?.coupon_code ? (
                            <>
                                <div className="coupon-code-display">
                                    <span className="code-text">{data.coupon_code}</span>
                                    <button
                                        className={`btn-copy ${copied ? 'copied' : ''}`}
                                        onClick={handleCopy}
                                    >
                                        {copied ? <FontAwesomeIcon icon={faCheck} /> : <FontAwesomeIcon icon={faCopy} />}
                                        {copied ? " Copied!" : " Copy"}
                                    </button>
                                </div>
                                <div className={`copy-feedback ${copied ? 'show' : ''}`}>
                                    Code copied to clipboard!
                                </div>
                            </>
                        ) : (
                            <div className="deal-activated-text text-center mb-3">
                                <span className="badge bg-success text-white">Deal Activated</span>
                                <p className="mt-2 text-muted small">No code required. Discount applied at checkout.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer (Fixed) */}
                <div className="offer-modal-footer text-center">
                    <p className="small text-muted m-0">
                        * Terms and conditions apply. See store for details.
                    </p>
                </div>
            </div>
        </div>
    );

    // Don't render anything on server, wait for mount
    if (!mounted) return null;

    // Render into document.body via Portal
    return createPortal(modalContent, document.body);
};

export default SimpleOfferModal;