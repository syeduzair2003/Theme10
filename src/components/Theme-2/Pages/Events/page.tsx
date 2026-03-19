import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { getEventsHref } from '@/constants/hooks'
import { apiGetAllEvents } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import BreadcrumbSection from '../../comp/BreadcrumbSection'

const page = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const events = (await apiGetAllEvents(companyDomain)).data;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Events" },
  ];
  return (
    <>
      <BreadcrumbSection
        title="Our Trending Events"
        breadcrumbs={breadcrumbs}
        imageSrc="/themes/Theme_3/img/website.png"
      />
      <div className="contact-section bg padTB60">
        <div className="container">
          <div className="row g-3">
            {events?.length > 0 && events?.map((event, i) => {
              return (
                <div
                  key={i}
                  className="col-6 col-md-6 col-sm-6 col-xs-12 col-lg-3 col-xl-3"
                >
                  <Link href={getEventsHref(event, "slug")}>
                    <div className="rounded-3 shadow-sm event-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                      <h3 className="event-title">{event?.name}</h3>
                      <span className="event-btn f-12">View Offers</span>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default page
