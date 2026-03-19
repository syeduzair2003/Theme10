"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Offer, ProductData } from "@/services/dataTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCopy, faCheck, faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";
import Link from "next/link";
import { Button, Modal } from "react-bootstrap";
import { apiUpdateOfferLikes } from "@/apis/offers";
import { toast } from "react-toastify";


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


    const handleCopyCoupon = () => {

        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;

    const handleClose = () => {
        setOnVisible(false);
        onClose();
    };

    useEffect(() => {
        setOnVisible(true);
    }, []);


    return (
        <Modal
            show={onVisible}
            size="lg" /* Changed to md for a cleaner 'simple' look, but lg works too */
            centered
            onHide={handleClose}
            contentClassName="simp-mod-content"
            backdropClassName="simp-mod-overlay"
        >
            <Modal.Header className="border-0 p-0 d-block position-relative">
                {/* Modern Close Button */}
                <button
                    type="button"
                    className="simp-mod-close"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>

                {/* Logo Container with Elevation */}
                <div className="simp-mod-img-area">
                    <div className="simp-mod-img-card">
                        <Image
                            src={imageSrc}
                            alt="merchant"
                            width={100}
                            height={100}
                            className="simp-mod-img"
                        />
                    </div>
                </div>

                <Modal.Title className="px-4">
                    <h2 className="simp-mod-title text-center">{data?.offer_title}</h2>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body className="px-4 pb-4 pt-2">
                {data?.coupon_code ? (
                    <div className="simp-mod-coupon-section">
                        <p className="simp-mod-label text-center mb-2">Copy this code at checkout</p>
                        <div className="simp-mod-coupon-box">
                            <span className="simp-mod-code">{data.coupon_code}</span>
                            <button
                                className={`simp-mod-copy-btn ${isCopied ? 'copied' : ''}`}
                                onClick={handleCopyCoupon}
                            >
                                <FontAwesomeIcon icon={isCopied ? faCheck : faCopy} className="me-2" />
                                {isCopied ? 'Copied' : 'Copy'}
                            </button>
                        </div>
                        <small className="text-muted d-block text-center mt-3">
                            Code copied? Now <Link href={absoluteOutUrl} className="simp-mod-link" target="_blank" onClick={handleClose}>Visit Store</Link> to save.
                        </small>
                    </div>
                ) : (
                    <div className="text-center py-2">
                        <Link
                            href={absoluteOutUrl}
                            target="_blank"
                            className="siteButton"
                            onClick={handleClose}
                        >
                            Get Deal Now
                        </Link>
                    </div>
                )}

                <hr className="my-4 opacity-10" />

                <div className="simp-mod-description">
                    <h6 className="fw-bold n17-color mb-2">About this offer</h6>
                    <p className="simp-mod-text">
                        {discardHTMLTags(data?.offer_detail || "") || "Click 'Get Deal' to redeem this offer at the store."}
                    </p>
                    <div className="d-flex flex-wrap gap-2 mt-3">
                        <span className="simp-mod-badge badge-verified">
                            <FontAwesomeIcon icon={faCheck} className="me-1" /> Verified
                        </span>
                        <span className="simp-mod-badge product-item__prevPrice">
                            {data?.end_date ? calculateOfferDuration(data?.end_date) : "Life Time Offer"}
                        </span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default SimpleOfferModal;