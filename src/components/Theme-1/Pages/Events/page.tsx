import React from 'react'
import Image from 'next/image'
import cookieService from '@/services/CookiesService';
import { apiGetAllEvents } from '@/apis/user';
import Link from 'next/link';
import { getEventsHref } from '@/constants/hooks';

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const events = (await apiGetAllEvents(companyDomain)).data;
    return (
        <>
            <section className="breadcrumb border-bottom p-0 d-block section-bg position-relative z-index-1">

                <div className="breadcrumb-two">
                    <Image
                        src="/themes/Theme_1/images/gradients/breadcrumb-gradient-bg.png"
                        alt="pattern" className="bg-pattern"
                        width={1000} height={400}
                    />
                    <div className="container container-two">
                        <div className="row justify-content-center">
                            <div className="col-lg-12">
                                <div className="breadcrumb-two-content text-center">

                                    <ul className="breadcrumb-list flx-align gap-2 mb-2 justify-content-center">
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <a href="index.html" className="breadcrumb-list__link text-body hover-text-main">Home</a>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                                        </li>
                                        <li className="breadcrumb-list__item font-14 text-body">
                                            <span className="breadcrumb-list__text">Events</span>
                                        </li>
                                    </ul>

                                    <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">Our Trending Events</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="events-section bg-white py-4">
                <div className="container ">
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="events-section__wrapper">
                                <div className="row g-4">
                                    {events.map((event: any) => (
                                        <div className="col-lg-3 col-md-4 col-sm-6" key={event.id}>
                                            <div className="events-card events-card-simple shadow-sm border-0 rounded-4  p-4 h-100">

                                                {/* Event Name */}
                                                <h3 className="events-card__title-simple f-20 mb-3">
                                                    {event?.name}
                                                </h3>

                                                {/* Button */}
                                                <Link
                                                    href={getEventsHref(event, 'slug')}
                                                    className="events-card__btn-simple btn btn-sm px-4"
                                                >
                                                    View Offer
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
