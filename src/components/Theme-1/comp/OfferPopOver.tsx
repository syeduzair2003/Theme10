'use client'
import { Offer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import Image from "next/image";
import { Button, Modal } from 'react-bootstrap';
import Rating from './Rating';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faXTwitter, faWhatsapp, faLinkedinIn, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { apiUpdateOfferLikes } from '@/apis/offers';
import { toast } from "react-toastify";
import { discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';


interface Props {
  data: Offer | null;
  companyId: string;
  onClose: () => void;
  domain: string;
}

const OfferPopOver = ({ data, companyId, onClose, domain }: Props) => {
  const [onVisible, setOnVisible] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  const handleClose = () => {
    onClose();
  };

  const [isLiked, setIsLiked] = useState<number | null>(null);

  useEffect(() => { }, [isLiked]);
  let offerTitle = " "
  if (data !== null) {
    offerTitle = encodeURIComponent(data?.offer_title || data?.offer_detail);
  }
  const offerUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

  useEffect(() => {
    const lastLiked = localStorage.getItem(`hasLiked_${data?.unique_id}`);
    if (lastLiked && new Date().getTime() - parseInt(lastLiked) < 86400000) {
      setHasLiked(true);
    }
  }, [data?.unique_id]);

  const handleLikeStatus = async (val: number, e: React.FormEvent) => {
    e.preventDefault();
    if (hasLiked) {
      toast.error("You have already rated please try again later!", { autoClose: 2000 });
      return;
    }
    try {
      if (data !== null) {
        const response = await apiUpdateOfferLikes(companyId, data?.unique_id, val);
        if (response.status == 'success') {
          toast.success("Thank you for your feedback!", { autoClose: 2000 });
          setIsLiked(val);
          localStorage.setItem(`hasLiked_${data?.unique_id}`, new Date().getTime().toString());
          setHasLiked(true);
        }
      }
    } catch (error) {
      toast.error("An error occurred while submitting your feedback.", { autoClose: 2000 });
    }
  }

  useEffect(() => { }, [onVisible]);

  return (
    <Modal show={onVisible} size='lg' centered scrollable={true} onHide={handleClose}>
      <div className={'popover-main'} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Modal.Body style={{ flex: '1 1 auto' }}>
          <div className="row">
            <div className="col-8 d-flex flex-column" style={{ height: '100%' }}>
              <Modal.Header>
                <h5 style={{ textAlign: "center", fontWeight: "bold" }}>{data?.offer_title || data?.offer_detail}</h5>
              </Modal.Header>
              <div className="popover-header text-center" style={{ flex: '1 1 auto', padding: '1rem' }}>
                <span className="popover-item__icon mb-3">
                  <Image src={getBaseImageUrl(domain, data?.merchant?.merchant_logo, "")} width={150} height={0} alt={`${data?.offer_title} discount`} style={{ marginBottom: '1rem' }} />
                </span>
                {data?.offer_detail && data?.offer_detail?.length > 0 && (
                  <p className='font-14 mb-2 text-heading fw-500 text-justify-custom'>{discardHTMLTags(data?.offer_detail)}</p>
                )}
                <Button variant="warning" style={{ padding: '0.75rem 2rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                  <Link href={data?.url || " "} rel="nofollow sponsored noopener noreferrer">
                    {data?.coupon_code ? `${data?.coupon_code}` : 'GET DEAL'}
                  </Link>
                </Button>
                <h6 style={{ marginTop: '1rem', fontWeight: 'bold' }}>CLICK BUTTON ABOVE TO SHOP ONLINE AND SAVE</h6>
                <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>Did it work?</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: "10px" }}>
                  <FontAwesomeIcon icon={faThumbsUp} onClick={(e) => { handleLikeStatus(1, e) }} className="fa-fw" size="2x" style={{ color: 'green', cursor: 'pointer' }} />
                  <FontAwesomeIcon icon={faThumbsDown} onClick={(e) => { handleLikeStatus(0, e) }} className="fa-fw" size="2x" style={{ color: 'red', cursor: 'pointer' }} />
                </div>
              </div>
              <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'center',
                position: 'sticky',
                bottom: 0,
                background: '#fff',
                padding: '1rem',
                borderTop: '1px solid #dee2e6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                  {/* Facebook */}
                  <Link rel="nofollow sponsored noopener noreferrer"
                    href={`https://www.facebook.com/sharer/sharer.php?u=${offerUrl}`}
                    target="_blank"
                    className="link"
                    style={{ borderRadius: '50%' }}
                  >
                    <FontAwesomeIcon icon={faFacebookF} className="fa-fw" size="1x" />
                  </Link>

                  {/* Twitter (X) */}
                  <Link rel="nofollow sponsored noopener noreferrer"
                    href={`https://x.com/intent/tweet?url=${offerUrl}&text=${offerTitle}`}
                    target="_blank"
                    className="link"
                    style={{ borderRadius: '50%' }}
                  >
                    <FontAwesomeIcon icon={faXTwitter} className="fa-fw" size="1x" />
                  </Link>

                  {/* WhatsApp */}
                  <Link rel="nofollow sponsored noopener noreferrer"
                    href={`https://api.whatsapp.com/send?text=${offerTitle}%20${offerUrl}`}
                    target="_blank"
                    className="link"
                    style={{ borderRadius: '50%' }}
                  >
                    <FontAwesomeIcon icon={faWhatsapp} className="fa-fw" size="1x" />
                  </Link>

                  {/* LinkedIn */}
                  <Link rel="nofollow sponsored noopener noreferrer"
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${offerUrl}`}
                    target="_blank"
                    className="link"
                    style={{ borderRadius: '50%' }}
                  >
                    <FontAwesomeIcon icon={faLinkedinIn} className="fa-fw" size="1x" />
                  </Link>

                  {/* Telegram */}
                  <Link rel="nofollow sponsored noopener noreferrer"
                    href={`https://t.me/share/url?url=${offerUrl}&text=${offerTitle}`}
                    target="_blank"
                    className="link"
                    style={{ borderRadius: '50%' }}
                  >
                    <FontAwesomeIcon icon={faTelegram} className="fa-fw" size="1x" />
                  </Link>
                </div>
              </Modal.Footer>
            </div>
            <div className="col-4 common-sidebar-wrapper">
              <div className="common-sidebar">
                <h6 style={{ textAlign: "center", marginBottom: "10px" }}>Rating</h6>
                <Rating offer_id={data?.unique_id || ""} company_id={companyId} />
              </div>
            </div>
          </div>
        </Modal.Body>
      </div>
    </Modal>
  )
}

export default OfferPopOver
