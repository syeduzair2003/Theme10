import { apiUpdateOfferLikes } from '@/apis/offers';
import { Offer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import { Modal } from 'react-bootstrap';
import Link from 'next/link';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { faCheck, faCalendarDays, faThumbsDown, faThumbsUp, FontAwesomeIcon, faCopy } from '@/constants/icons';

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
    const [copied, setCopied] = useState(false);

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

    const imgSrc = data?.offer_type?.name === "product" ? data?.product_image : data?.merchant.merchant_logo;

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

    return (
        <Modal show={onVisible} size="lg" centered scrollable onHide={handleClose}>
            <Modal.Header className="position-relative">
                <button type="button" className="btn-close position-absolute top-0 end-0 me-3 mt-3" aria-label="Close" onClick={handleClose}></button>
                <Modal.Title className="d-flex justify-content-center w-100 mt-3">
                    <div className="d-center flex-column gap-2 gap-md-3">
                        <h5 className="n17-color fw-mid text-center mb-2 px-8 px-md-0">{data?.offer_title}</h5>
                        <div className="cmn-btn btn-overlay border-dash rounded-pill d-center input-area">
                            {data?.coupon_code ? (
                                // <div className="d-flex w-100">
                                //     <input type="text" value={data?.coupon_code} readOnly className="p1-color fs-seven fw-bold coupon-code w-100 px-6 px-md-12 d-center" />
                                //     <Link href={absoluteOutUrl} rel="nofollow sponsored noopener noreferrer" className="box-style box-second rounded-pill border-stb-none py-3 py-md-4 px-6 px-md-12 d-center">
                                //         <span className="d-center fs-seven fw-bold">Get</span>
                                //     </Link>
                                // </div>
                                <div className="coupon-code-group-two">
                                    <div className="coupon-code-display-two">
                                        <Link href={absoluteOutUrl} rel="nofollow sponsored noopener noreferrer">
                                            <span className="code-text-two">{data?.coupon_code}</span>
                                        </Link>
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
                                <div className="btn-area d-center justify-content-start gap-3 gap-md-4">
                                    <Link href={absoluteOutUrl} rel="nofollow sponsored noopener noreferrer" className="box-style box-second gap-2 gap-md-3 rounded-pill py-2 py-md-3 px-5 px-md-7 d-center">
                                        <span className="fs-six text-nowrap">Get Deal</span>
                                    </Link>
                                </div>
                            )}
                        </div>
                        {/* <div className="row px-2 px-md-0 justify-content-center">
                            <div className="col-xl-10">

                            </div>
                        </div> */}
                        {/* <span className="f11-color fw-mid">Continue to us.couponly.com • <Link href="#" className="n15-color fw-mid">Terms</Link></span> */}
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="main-content d-flex gap-3 gap-md-4">
                    <div style={{ flex: '0 0 60%' }} className='d-flex flex-column'>
                        <div className="d-center justify-content gap-2 gap-md-3 mb-3">
                            <span className="f5-color fw-mid rounded-2 p1-2nd-bg-color cus-border border b-tenth d-flex align-items-center gap-1 gap-md-2 px-2 px-md-3 py-1">
                                <FontAwesomeIcon icon={faCheck} style={{ width: '16px', height: '16px', color: '#1471b0' }} />
                                <span className="f5-color fw-mid">Verified</span>
                            </span>
                            <span className="f5-color fw-mid rounded-2 s1-4th-bg-color cus-border border b-sixth px-2 px-md-3 py-1 d-flex gap-1 gap-md-2">
                                <FontAwesomeIcon icon={faCalendarDays} style={{ width: '16px', height: '16px', color: '#b3682b' }} />
                                <span className="f11-color fw-mid">{data?.end_date ? calculateOfferDuration(data?.end_date) : "Life Time"}</span>
                            </span>
                        </div>
                        <div
                            className="p-2 border rounded-3 d-flex align-items-center justify-content-center mx-auto"
                            style={{ minWidth: 100, maxWidth: 120, height: 80 }}
                        >
                            <Image
                                src={getBaseImageUrl(domain, imgSrc, "")} alt={`${data?.offer_title}`}
                                className="img-fluid object-fit-contain"
                                height={100}
                                width={100}
                                style={{ maxHeight: '100%', maxWidth: '100%' }}
                                layout='responsive'
                            />
                        </div>
                        {data?.offer_detail && (
                            <div
                                className="modal-html-content-two my-2"
                                dangerouslySetInnerHTML={{ __html: data?.offer_detail }}
                            />
                        )}
                    </div>
                    <div style={{ flex: '0 0 40%', borderLeft: '2px solid #dee2e6', paddingLeft: '1rem' }}>
                        <RateUs offer_id={data?.unique_id || ""} company_id={companyId} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{
                display: 'flex',
                justifyContent: 'space-around',
                position: 'sticky',
                bottom: 0,
                background: '#fff',
                padding: '1rem',
                borderTop: '1px solid #dee2e6'
            }}>
                <div className="bottom-area d-center gap-1 gap-md-2 flex-wrap py-3 py-md-5">
                    <span className="fw-mid fs-seven me-2">Did it work?</span>
                    <button className="s2-3rd-bg-color rounded-2 d-center gap-1 px-2 px-md-3 py-1" onClick={(e) => { handleLikeStatus(1, e) }}>
                        <FontAwesomeIcon icon={faThumbsUp} style={{ width: '16px', height: '16px', color: 'green' }} />
                        <span className="s2-color fw-bold">Yes</span>
                    </button>
                    <button className="f13-2nd-bg-color rounded-2 d-center gap-1 px-2 px-md-3 py-1" onClick={(e) => { handleLikeStatus(0, e) }}>
                        <FontAwesomeIcon icon={faThumbsDown} style={{ width: '16px', height: '16px', color: 'red' }} />
                        <span className="f13-color fw-bold">No</span>
                    </button>
                </div>
                <SocialMediaShare offerUrl={offerUrl} offerTitle={offerTitle} merchantHref={merchantHref} unique_id={data?.unique_id} domain={domain} />
            </Modal.Footer>
        </Modal>
    );
};

export default OfferModal
