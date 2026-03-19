import { apiGetAllPromotion } from '@/apis/user';
import { getPromotionHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { Promotion } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const PromotionsPage = async ({promotionSlug}: { promotionSlug: string }) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promotions = (await apiGetAllPromotion(companyDomain)).data;

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 mt-2 mt-md-4 mt-xl-6 s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-38">Our Trending Promotions</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">Promotions</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-5.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-sidebar pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="top-stores high-cashback">
                                <div className="row cus-row justify-content-center justify-content-md-start g-4">
                                    {promotions?.length > 0 && promotions?.map((promotion: Promotion, index: number) => (
                                        <div key={index} className="col-9 col-sm-6 col-lg-4">
                                            <Link href={getPromotionHref(promotion, promotionSlug)} className="text-decoration-none">
                                                <div className="promotion-card shadow-sm rounded-3 overflow-hidden h-100 transition-shadow">
                                                    <div className="card-body p-3 p-md-4">
                                                        <h3 className="card-title fw-bold text-dark-emphasis mb-2 f-18 text-center">{promotion?.name}</h3>
                                                    </div>

                                                    <div className="w-auto d-flex align-items-center justify-content-center pb-3"> 
                                                        <span className="p2-color fs-eight fw-mid text-nowrap">View Offers</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default PromotionsPage
