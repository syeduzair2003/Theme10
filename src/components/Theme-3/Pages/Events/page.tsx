import cookieService from '@/services/CookiesService';
import React from 'react'
import { apiGetAllEvents } from '@/apis/user';
import { EventResponse } from '@/services/dataTypes';
import { getEventsHref } from '@/constants/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const events = (await apiGetAllEvents(companyDomain)).data;
    return (
        <>
            <section className="banner-section index-one overflow-hidden position-relative mx-2 mx-md-4 mx-xl-6 mt-2 mt-md-4 mt-xl-6 s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-38">Our Trending Events</h1>
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href={`/`} className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: '#222e48' }} />
                                            </li>
                                            <li className="breadcrumb-item d-flex align-items-center fs-seven active" aria-current="page"><span className="fw-mid f5-color text-capitalize">Events</span></li>
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
                                <div className="row cus-row justify-content-center justify-content-md-start g-3">
                                    {events?.map((event: EventResponse, index: number) => (
                                        <div key={index} className="col-9 col-md-6 col-lg-4">
                                            <div className="single-box d-center flex-wrap flex-sm-nowrap flex-lg-wrap flex-xl-nowrap justify-content-start gap-3 gap-md-4 n1-bg-color cus-border border b-eighth p-3 p-md-5 rounded-2">
                                                <Link href={getEventsHref(event, 'slug')}>
                                                    <div className="bottom-area d-grid gap-3 gap-md-4 w-100">
                                                        <p className="fs-five n17-color fw-mid">{event?.name}</p>
                                                        <div className="rounded-1 n1-bg-color d-center gap-2 gap-md-3 justify-content-start cus-border border b-tenth p-1">
                                                            <div className="d-center fav-icon rounded-2 p1-2nd-bg-color cus-border border b-eighth box-shadow-p1">
                                                                <Image className="max-un" src="/themes/Theme_3/images/fav.png" alt="Image" height={10} width={10}/>
                                                            </div>
                                                            <span className="p2-color fs-eight fw-mid text-nowrap">View Offers</span>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
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

export default page
