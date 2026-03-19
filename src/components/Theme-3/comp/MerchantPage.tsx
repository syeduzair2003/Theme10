import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import cookieService from '@/services/CookiesService';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
// import MerchantPageClient from './MerchantPageClient';
interface Props {
    store_slug: string;
    slug_type: string;
    company_id: string;
}
const MerchantPage = async ({ store_slug, slug_type, company_id }: Props) => {
    const companyDomain = await cookieService.get("domain");

    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">Popular Merchants</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }}/>
                                            </li>
                                            <li className="d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">{store_slug}</span></li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="img-area d-flex justify-content-end align-items-end" style={{ width: '100%', height: '100%' }}>
                                <Image src="/themes/Theme_3/images/banner-illus-8.png" alt="img" width={300} height={260} style={{ objectFit: 'contain' }} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-sidebar" style={{ paddingTop: '20px', paddingBottom: '50px' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xxl-12 cus-z1">
                            <div className="row cus-row d-flex justify-content-center justify-content-md-start gy-3 gy-md-4 top-stores trending-categories third">
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MerchantPage