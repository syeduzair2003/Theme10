import { apiGetAllEvents } from '@/apis/user';
import { getEventsHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import React from 'react'


const page = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const events = (await apiGetAllEvents(companyDomain)).data;
  return (
    <>
      <section className="breadcrumb-green">

        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className=" text-center">
              <ul className=" flx-align gap-2 mb-2 justify-content-center">
                <li className="font-14 text-body">
                  <a href={"/"} className="text-body hover-text-main">Home</a>
                </li>
                <li className="font-14 text-body">
                  <span className="font-10"><FontAwesomeIcon icon={faGreaterThan} style={{ width: '10px', height: '10px', color: 'white' }} /></span>
                </li>
                <li className="font-14 text-body">
                  <span className='text-white'>Events</span>
                </li>
              </ul>

              <h1 className=" mb-0 text-capitalize">Our Trending Events</h1>
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
                      <div className="events-card events-card-simple shadow-sm border-0 rounded-4  p-4 h-100 d-flex flex-column justify-content-between">

                        {/* Event Name */}
                        <h3 className="events-card__title-simple f-20 mb-3">
                          {event?.name}
                        </h3>

                        {/* Button */}
                        <Link
                          href={getEventsHref(event, 'slug')}
                          className="event-card__btn"
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
