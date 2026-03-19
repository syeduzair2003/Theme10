"use client"
import { OfferResponse, OffersOffer } from '@/services/dataTypes';
import React, { useState } from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import Sale from "@theme1/assets/images/Deals/sale-2.png";
import Link from 'next/link';
import { apiUpdateOfferLikes } from '@/apis/offers';
import { toast, ToastContainer } from "react-toastify";
import RenderRating from './RenderRating';
import { faArrowRight, faGreaterThan, faHeart, FontAwesomeIcon } from '@/constants/icons';

const Slider = dynamic(() => import("react-slick"), { ssr: false });

interface Props {
    offers: OfferResponse;
    companyId: string;
}
const BestOffersSlider = ({ offers, companyId }: Props) => {
    const [hasLiked, setHasLiked] = useState(false);

    const handleLikeStatus = async (val: number, e: React.FormEvent, uniqueId: string) => {
        e.preventDefault();
        const lastLiked = localStorage.getItem(`hasLiked_${uniqueId}`);
        if (lastLiked && new Date().getTime() - parseInt(lastLiked) < 86400000) {
            setHasLiked(true);
        }
        if (lastLiked) {
            toast.error("You have already rated please try again later!", { autoClose: 2000 });
            return;
        }
        try {
            const response = await apiUpdateOfferLikes(companyId, uniqueId, val);

            if (response.status === 'success') {
                toast.success("Thank you for your feedback!", { autoClose: 2000 });
                setHasLiked(true);
                localStorage.setItem(`hasLiked_${uniqueId}`, new Date().getTime().toString());
            }
        } catch (error) {
            toast.error("An error occurred while submitting your feedback.", { autoClose: 2000 });
        }
    }

    const handleActiveLike = (uniqueId: string) => {
        const getLikedOffer = localStorage.getItem(`hasLiked_${uniqueId}`);
        if (getLikedOffer) {
            return true;
        } else {
            return false;
        }
    }

    const settings = {
        dots: false,
        arrows: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 1,
        variableWidth: false,
        responsive: [
            { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 3 } },
            { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
            { breakpoint: 576, settings: { slidesToShow: 2, slidesToScroll: 1 } },
            { breakpoint: 400, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        ],
    };
    return (
        <Slider {...settings} className="offer-slider">
            {offers?.offers.map((item: OffersOffer, i: number) => {
                return (
                    <div key={i} >
                        <figure className="figure product-box wow fadeIn animated" data-wow-delay="0ms">
                            <div className="product-box-img" style={{ backgroundColor: "whitesmoke" }}>
                                <Link href={item.offer.url} className='align-items-center text-center'>
                                    <Image src={Sale} height={255} width={230} alt={item.offer.offer_title} className="figure-img img-fluid" />
                                </Link>
                            </div>
                            <Image src={item.merchant.merchant_logo} height={50} width={50} alt={item.merchant.merchant_name} className='offer-merchant-image' />
                            <figcaption className="figure-caption text-center">
                                <span className="badge badge-secondary wd-badge text-uppercase">New</span>
                                <div className="wishlist" style={{ color: handleActiveLike(item.offer.unique_id) ? "#ff4a4a" : "" }}>
                                    <FontAwesomeIcon icon={faHeart} style={{ width: '16px', height: '16px', color: 'red' }} onClick={(e) => { handleLikeStatus(1, e, item.offer.unique_id) }}/>
                                </div>
                                <div className="content-excerpt">
                                    <p>{item.offer.offer_title.replace(/<\/?p>/g, "").length > 23
                                        ? item.offer.offer_title.replace(/<\/?p>/g, "").substring(0, 23) + "..."
                                        : item.offer.offer_title.replace(/<\/?p>/g, "")}</p>
                                </div>
                                <div className="rating">
                                    <RenderRating rating={item.offer.rating}/>
                                </div>
                                <div className="compare-btn">
                                    <Link className="btn btn-primary btn-sm" href={item.offer.url}>Avail Now
                                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }}/>
                                    </Link>
                                </div>
                            </figcaption>
                        </figure>
                    </div>
                )
            })}
        </Slider>
    )
}

export default BestOffersSlider
