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
      onHide={handleClose}
      className="offer-modal main-mod" /* Added main-mod here */
      backdrop="static"
    >
      <Modal.Body className="p-0 overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          className="btn-close-custom"
          onClick={handleClose}
        >
          ✕
        </button>

        <div className="modal-header-section text-center p-4">
          <span className="text-uppercase tracking-wider small fw-bold text-muted mb-2 d-block">
            Exclusive Offer
          </span>
          <h4 className="fw-bold mb-4">{data?.offer_title}</h4>

          <Link
            href={absoluteOutUrl}
            rel="nofollow sponsored noopener noreferrer"
            className="siteButton"
          >
            Get Deal Now
          </Link>
        </div>

        <div className="row g-0 border-top">
          {/* Left Side: Content */}
          <div className="col-md-7 p-4 border-end">
            <div className="d-flex gap-2 mb-4">
              <span className="badge-pill-modern verified">
                <FontAwesomeIcon icon={faCheck} className="me-1" /> Verified
              </span>
              <span className="product-item__prevPrice">
                {data?.end_date ? calculateOfferDuration(data?.end_date) : "Life Time"}
              </span>
            </div>

            {/* Enhanced Logo and Title Section */}
            <div className="d-flex align-items-center gap-4 mb-4">
              <div className="logo-container-prominent">
                <Image
                  src={getBaseImageUrl(domain, data?.merchant.merchant_logo, "")}
                  alt="merchant logo"
                  width={100}  /* Increased size */
                  height={100} /* Increased size */
                  className="object-fit-contain p-2"
                />
              </div>
              <div className="flex-grow-1">
                <h6 className="fw-bold n17-color mb-1">Offer Details</h6>
                <p className="text-secondary small leading-relaxed mb-0">
                  {discardHTMLTags(data?.offer_detail || "")}
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Rating */}
          <div className="col-md-5 p-4 bg-light-subtle">
            <div className="rating-card-inner">
              <RateUs offer_id={data?.unique_id || ""} company_id={companyId} />
            </div>
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer className="px-4 py-3 bg-white border-top d-flex justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <span className="small fw-semibold text-muted">Did it work?</span>
          <div className="feedback-toggle">
            <button
              className={`btn-feedback yes ${isLiked === 1 ? 'active' : ''}`}
              onClick={(e) => handleLikeStatus(1, e)}
            >
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
            <button
              className={`btn-feedback no ${isLiked === 0 ? 'active' : ''}`}
              onClick={(e) => handleLikeStatus(0, e)}
            >
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          </div>
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
