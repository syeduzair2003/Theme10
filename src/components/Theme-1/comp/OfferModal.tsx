import { apiUpdateOfferLikes } from '@/apis/offers';
import { Offer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { faCheck, faCalendarDays, faThumbsDown, faThumbsUp, FontAwesomeIcon } from '@/constants/icons';

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

    return (
        <Modal
  show={onVisible}
  size="lg"
  centered
  scrollable
  onHide={handleClose}
  className="offer-modal"
>
  <Modal.Header className="border-0 pb-0 position-relative">
    <button
      type="button"
      className="btn-close position-absolute top-0 end-0 me-3 mt-3"
      aria-label="Close"
      onClick={handleClose}
    ></button>

    <Modal.Title className="text-center w-100 mt-3">
      <h5 className="fw-semibold n17-color mb-3">{data?.offer_title}</h5>

      <div className="d-flex justify-content-center">
        <Link
          href={absoluteOutUrl}
          rel="nofollow sponsored noopener noreferrer"
          className="btn-get-deal"
        >
          Get Deal
        </Link>
      </div>
    </Modal.Title>
  </Modal.Header>

  <Modal.Body className="pt-4">
    <div className="d-flex flex-column flex-md-row gap-4">
      {/* Left Side */}
      <div className="flex-grow-1 pe-md-3">
        <div className="d-flex flex-wrap gap-2 mb-3">
          <span className="badge bg-success bg-opacity-10 text-success fw-bold d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faCheck} />
            Verified
          </span>
          <span className="badge bg-warning bg-opacity-10 text-warning fw-bold d-flex align-items-center gap-2">
            <FontAwesomeIcon icon={faCalendarDays} />
            {data?.end_date
              ? calculateOfferDuration(data?.end_date)
              : "Life Time"}
          </span>
        </div>

        <div className="text-center mb-3">
          <Image
            src={getBaseImageUrl(domain, data?.merchant.merchant_logo, "")}
            alt={`${data?.offer_title} merchant`}
            width={120}
            height={120}
            className="img-fluid rounded shadow-sm"
          />
        </div>

        <h6 className="fw-semibold n17-color mb-2">Offer Details</h6>
        <p className="text-muted small mb-0">
          {discardHTMLTags(data?.offer_detail || "")}
        </p>
      </div>

      {/* Right Side */}
      <div className="border-start ps-md-3">
        <RateUs offer_id={data?.unique_id || ""} company_id={companyId} />
      </div>
    </div>
  </Modal.Body>

  <Modal.Footer className="d-flex flex-wrap justify-content-between align-items-center sticky-footer">
    <div className="d-flex align-items-center gap-2 flex-wrap">
      <span className="fw-medium text-muted">Did it work?</span>
      <button
        className="feed-btn btn-sm d-flex align-items-center gap-2"
        onClick={(e) => handleLikeStatus(1, e)}
      >
        <FontAwesomeIcon icon={faThumbsUp} />
        Yes
      </button>
      <button
        className="red-btn btn-sm d-flex align-items-center gap-2"
        onClick={(e) => handleLikeStatus(0, e)}
      >
        <FontAwesomeIcon icon={faThumbsDown} />
        No
      </button>
    </div>
    <SocialMediaShare
      offerUrl={offerUrl}
      offerTitle={offerTitle}
      merchantHref={merchantHref}
      unique_id={data?.unique_id}
      domain={domain}
    />
  </Modal.Footer>
</Modal>

    );
};

export default OfferModal
