import { apiUpdateOfferLikes } from '@/apis/offers';
import { Offer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { faThumbsDown, faThumbsUp, FontAwesomeIcon } from '@/constants/icons';

const RateUs = dynamic(() => import('./RateUs'), { ssr: false });
const SocialMediaShare = dynamic(() => import('./SocialMediaShare'), { ssr: false });

interface Props {
    data: Offer;
    companyId: string;
    onClose: () => void;
    domain: string;
    merchantHref: string;
}

const OfferModal = ({ data, companyId, onClose, domain, merchantHref }: Props) => {
    const [onVisible, setOnVisible] = useState(false);
    const [hasLiked, setHasLiked] = useState(false);
    const [isLiked, setIsLiked] = useState<number | null>(null);
    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;
    const [offerUrl, setOfferUrl] = useState("");

    useEffect(() => {
        if (data) {
            setOnVisible(true);
        }
    }, [data]);

    const handleClose = () => {
        setOnVisible(false);
        onClose();
    };

    useEffect(() => {
        if (data?.unique_id) {
            const lastLiked = localStorage.getItem(`hasLiked_${data?.unique_id}`);
            if (lastLiked && new Date().getTime() - parseInt(lastLiked) < 86400000) {
                setHasLiked(true);
            }
        }
    }, [data?.unique_id]);

    const handleLikeStatus = async (val: number, e: React.FormEvent) => {
        e.preventDefault();
        if (hasLiked) {
            toast.error("You have already rated, please try again later!", { autoClose: 2000 });
            return;
        }
        try {
            if (data) {
                const response = await apiUpdateOfferLikes(companyId, data?.unique_id, val);
                if (response.status === "success") {
                    toast.success("Thank you for your feedback!", { autoClose: 2000 });
                    setIsLiked(val);
                    localStorage.setItem(`hasLiked_${data?.unique_id}`, new Date().getTime().toString());
                    setHasLiked(true);
                }
            }
        } catch (error) {
            toast.error("An error occurred while submitting your feedback.", { autoClose: 2000 });
        }
    };

    let offerTitle = " "
    if (data !== null) {
        offerTitle = encodeURIComponent(data?.offer_title || data?.offer_detail);
    }

    useEffect(() => {
        setOfferUrl(encodeURIComponent(window.location.href));
    }, []);
    const imgSrc = data?.offer_type?.name === "product" ? data?.product_image : data?.merchant?.merchant_logo;

    return (
        <Modal show={onVisible} size="lg" centered scrollable onHide={handleClose} className="offer-modal">
            {/* Header */}
            <Modal.Header className="offer-modal-header">
                <button
                    type="button"
                    className="offer-modal-close"
                    aria-label="Close"
                    onClick={handleClose}
                >
                    ✕
                </button>
                <Modal.Title className="offer-modal-title">
                    <h3>{data?.offer_title}</h3>
                    <div className="offer-modal-action">
                        {data?.coupon_code ? (
                            <div className="coupon-box">
                                <input type="text" value={data?.coupon_code} readOnly />
                                <Link
                                    href={absoluteOutUrl}
                                    rel="nofollow sponsored noopener noreferrer"
                                    className="btn-get"
                                >
                                    Get
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href={absoluteOutUrl}
                                rel="nofollow sponsored noopener noreferrer"
                                className="btn-deal"
                            >
                                Get Deal
                            </Link>
                        )}
                    </div>
                </Modal.Title>
            </Modal.Header>

            {/* Body */}
            <Modal.Body className="offer-modal-body">
                <div className="row g-4 w-100">

                    {/* LEFT COLUMN (Image & Details) */}
                    <div className="col-12 col-md-8 offer-body-left">
                        <div className="offer-image-details-wrapper">
                            {/* Image */}
                            <div className="modal-image-container mb-4">
                                <Image
                                    src={getBaseImageUrl(domain, imgSrc, "")}
                                    alt={`${data?.offer_title}`}
                                    width={300}
                                    height={200}
                                    className="modal-main-image"
                                />
                            </div>

                            {/* Details Content (using dangerousHTML) */}
                            <div className="offer-details-content">
                                <h5>Offer Details:</h5>
                                <div
                                    className="offer-html-content"
                                    dangerouslySetInnerHTML={{ __html: data?.offer_detail || "" }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN (Rating, Feedback, Social Share) */}
                    <div className="col-12 col-md-4 offer-body-right">

                        {/* 1. Rating Component */}
                        <div className="rating-component-box mb-4 p-3">
                            <RateUs offer_id={data?.unique_id || ""} company_id={companyId} />
                        </div>

                        {/* 3. Social Media Share */}
                        <div className="social-share-box p-3">
                            <h6 className="share-title">Share this deal:</h6>
                            <SocialMediaShare
                                offerUrl={offerUrl}
                                offerTitle={data?.offer_title || 'Check out this deal!'}
                                domain={domain}
                            />
                        </div>
                    </div>
                </div>
            </Modal.Body>

            {/* Footer */}
            <Modal.Footer className="offer-modal-footer">
                <div className="feedback">
                    <span>Did it work?</span>
                    <button
                        className="btn-yes"
                        onClick={(e) => handleLikeStatus(1, e)}
                    >
                        <FontAwesomeIcon icon={faThumbsUp} /> Yes
                    </button>
                    <button
                        className="btn-no"
                        onClick={(e) => handleLikeStatus(0, e)}
                    >
                        <FontAwesomeIcon icon={faThumbsDown} /> No
                    </button>
                </div>
            </Modal.Footer>
        </Modal>

    );
};

export default OfferModal
