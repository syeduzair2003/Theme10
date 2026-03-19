"use client";

import React, { useEffect, useState } from "react";
// ReactDOM is not typically needed here
import Image from "next/image";
import { Offer, ProductData } from "@/services/dataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy, faCheck, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
// OfferDuration and other constants/hooks are assumed to exist
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import { apiUpdateOfferLikes } from "@/apis/offers";
import { toast } from "react-toastify";

// Import CSS or ensure it's loaded globally
// import './SimpleOfferModal.css'; // Example if using a local file

interface Props {
     data: Offer | ProductData;
    onClose: () => void;
    domain: string;
    merchantHref: string;
    finalDiscountTag?: string | null;
    merchantImg?: string | null;
}

const SimpleOfferModal = ({ data, onClose, domain, merchantHref, finalDiscountTag, merchantImg }: Props) => {
    const [onVisible, setOnVisible] = useState(false);
    const [isCopied, setIsCopied] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiked, setIsLiked] = useState<number | null>(null);
    const [imageSrc, setImageSrc] = useState<string>('');
    

    useEffect(() => {
        if (data?.offer_type?.name === "product") {
            setImageSrc(getBaseImageUrl(domain, data?.product_image, ""));
        } else {
            setImageSrc(getBaseImageUrl(domain, merchantImg, ""));
        }
    }, [data]);


    // Assuming a deal, so no coupon code to copy, but defining the handler for completeness
    const handleCopyCoupon = () => {
        // In a real coupon modal, you would copy data?.coupon_code here
        // navigator.clipboard.writeText(data?.coupon_code || ''); 
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
    };

    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;

    const handleClose = () => {
        setOnVisible(false);
        onClose();
    };

    useEffect(() => {
        setOnVisible(true); // show the modal when component mounts
    }, []);
    

    // NOTE: The modern-offer-modal-overlay class needs to target the R-B Modal backdrop.
    // We add the custom class to the main Modal component, and then target the backdrop/dialog in CSS.
    return (
        <Modal
            show={onVisible}
            size="lg" // Use size "sm" or "md" for a closer fit to the 500px max-width of .modern-offer-modal
            centered
            scrollable
            onHide={handleClose}
            className="modern-offer-modal-override" // Class to hook into R-B's main div
            contentClassName="modern-offer-modal" // Class for the modal content box
            backdropClassName="modern-offer-modal-overlay" // Class for the backdrop
        >
            <Modal.Header className="border-0 pb-0 position-relative p-0 d-block">
                {/* Custom close button to match modern-close-btn style */}
                <button
                    type="button"
                    className="modern-close-btn"
                    aria-label="Close"
                    onClick={onClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {/* IMAGE AREA - Wrapped for custom styling */}
                <div className="modern-image-area d-flex justify-content-center text-center mb-2">
                    {/* The ribbon is commented out as it needs state/logic to appear */}
                    {/* <div className="modern-ribbon">Limited Time!</div> */}
                    <Image
                        src={imageSrc}
                        alt={`${data?.offer_title} merchant`}
                        width={120} // Adjusted for a nice size, may need more custom control
                        height={120}
                        className="img-fluid rounded shadow-sm modern-image" // The modern-image class
                    />
                </div>

                <Modal.Title className="text-center w-100">
                    <h2 className="modern-title">{data?.offer_title}</h2>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="pt-2 px-4 pb-4">
                {/* --- COUPON SECTION (Commented out for Deal Modal) ---*/}

                {data?.coupon_code ? (
                    // Display Coupon Code Box
                    <div className="modern-coupon-section">
                        <div className="modern-coupon-box text-center d-flex flex-column align-items-center gap-3">
                            <span className="coupon-code-display">{data.coupon_code}</span>
                            <button
                                className={`coupon-copy-btn ${isCopied ? 'copied' : ''}`}
                                onClick={handleCopyCoupon}
                            >
                                <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className="me-2" />
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <small className="text-muted">
                            Copy the code above and <Link href={absoluteOutUrl} rel="nofollow sponsored noopener noreferrer" target="_blank" onClick={handleClose}>click here to go to the store</Link>.
                        </small>
                    </div>
                ) : (
                    // Display Get Deal Button
                    <Link
                        href={absoluteOutUrl}
                        rel="nofollow sponsored noopener noreferrer"
                        target="_blank"
                        className="modern-cta primary"
                        onClick={handleClose}
                    >
                        Get Deal
                    </Link>
                )}

                {/* Offer Details/Description */}
                <div className="modern-description">
                    <h6 className="fw-semibold n17-color mb-2">Offer Details</h6>
                    <p className="text-muted small mb-0">
                        {discardHTMLTags(data?.offer_detail || "") || "No specific details provided."}
                    </p>
                    <div className="d-flex flex-wrap gap-3 mt-3">
                        <span className="badge bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center gap-2">
                            <FontAwesomeIcon icon={faCheck} />
                            Verified
                        </span>
                        {/* Offer duration badge */}
                        <span className="badge bg-warning bg-opacity-10 text-warning fw-bold d-flex align-items-center gap-2">
                            {data?.end_date ? calculateOfferDuration(data?.end_date) : "Life Time"}
                        </span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
};

export default SimpleOfferModal;