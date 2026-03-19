import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import cookieService from '@/services/CookiesService';
import { apiContactPage } from '@/apis/user';
import ContactForm from '../../comp/ContactForm';

const page = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const fullPageData = (await apiContactPage(companyDomain))?.data;
  const pageData = fullPageData?.CompanyContactUs

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
                      <Link
                        href="/"
                        className="breadcrumb-list__link text-body hover-text-main"
                      >
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb-list__item font-14 text-body">
                      <span className="breadcrumb-list__icon font-10">
                        <i className="fas fa-chevron-right" />
                      </span>
                    </li>
                    <li className="breadcrumb-list__item font-14 text-body">
                      <span className="breadcrumb-list__text">Contact Us</span>
                    </li>
                  </ul>
                  <h3 className="breadcrumb-two-content__title mb-0 text-capitalize">
                    Contact Us
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="contact padding-t-120 padding-b-60 section-bg position-relative z-index-1 overflow-hidden">
        <Image
          src="/themes/Theme_1/images/gradients/banner-two-gradient.png"
          alt=""
          className="bg--gradient"
          height={100}
          width={100}
        />
        <Image
          src="/themes/Theme_1/images/shapes/pattern-five.png"
          className="position-absolute end-0 top-0 z-index--1"
          alt=""
          height={100}
          width={100}
        />
        <div className="container">
          <div className="row gy-4">
            <div className="col-lg-5">
              <div className="contact-info">
                <h3 className="contact-info__title">Get in touch with us today</h3>
                <p className="contact-info__desc"
                  dangerouslySetInnerHTML={{ __html: pageData?.details || '' }}
                />
                <div className="contact-info__item-wrapper flx-between gap-4">
                  {pageData?.phone_no && (
                    <div className="contact-info__item">
                      <span className="contact-info__text text-capitalize d-block mb-1">
                        Give Us A Call
                      </span>
                      <span className='contact-info__link font-24 fw-500 text-heading hover-text-main'>
                        {pageData?.phone_no}
                      </span>
                    </div>
                  )}
                  {pageData?.email && (
                    <div className="contact-info__item">
                      <span className="contact-info__text text-capitalize d-block mb-1">
                        Give Us An Email
                      </span>
                      <span className='contact-info__link font-24 fw-500 text-heading hover-text-main'>
                        {pageData?.email}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-24">
                  <ul className="social-icon-list">
                    {fullPageData?.company_data?.facebook && (
                      <li className="social-icon-list__item">
                        <Link
                          href={fullPageData?.company_data?.facebook}
                          className="social-icon-list__link text-heading flx-center"
                        >
                          <i className="fab fa-facebook-f" />
                        </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.twitter && (
                      <li className="social-icon-list__item">
                        <Link
                          href={fullPageData?.company_data?.twitter}
                          className="social-icon-list__link text-heading flx-center"
                        >
                          {" "}
                          <i className="fab fa-twitter" />
                        </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.linkedin && (
                      <li className="social-icon-list__item">
                        <Link
                          href={fullPageData?.company_data?.linkedin}
                          className="social-icon-list__link text-heading flx-center"
                        >
                          {" "}
                          <i className="fab fa-linkedin-in" />
                        </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.pinterest && (
                      <li className="social-icon-list__item">
                        <Link
                          href={fullPageData?.company_data?.pinterest}
                          className="social-icon-list__link text-heading flx-center"
                        >
                          {" "}
                          <i className="fab fa-pinterest-p" />
                        </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.youtube && (
                    <li className="social-icon-list__item">
                      <Link
                        href={fullPageData?.company_data?.youtube}
                        className="social-icon-list__link text-heading flx-center"
                      >
                        {" "}
                        <i className="fab fa-youtube" />
                      </Link>
                    </li>
                    )}
                    {fullPageData?.company_data?.instagram && (
                    <li className="social-icon-list__item">
                      <Link
                        href={fullPageData?.company_data?.instagram}
                        target="_blank"
                        className="social-icon-list__link flx-center text-heading"
                      >
                        <i className="fab fa-instagram" />
                      </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.tiktok && (
                    <li className="social-icon-list__item">
                      <Link
                        href={fullPageData?.company_data?.tiktok}
                        target="_blank"
                        className="social-icon-list__link flx-center text-heading"
                      >
                        <i className="fab fa-tiktok" />
                      </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.threads && (
                    <li className="social-icon-list__item">
                      <Link
                        href={fullPageData?.company_data?.threads}
                        target="_blank"
                        className="social-icon-list__link flx-center text-heading"
                      >
                        <i className="fa fa-at" />
                      </Link>
                      </li>
                    )}
                    {fullPageData?.company_data?.flipboard && (
                    <li className="social-icon-list__item">
                      <Link
                        href={fullPageData?.company_data?.flipboard}
                        target="_blank"
                        className="social-icon-list__link flx-center text-heading"
                      >
                        <i className="fab fa-flipboard" />
                      </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-7 ps-lg-5">
              <ContactForm domain={companyDomain}/>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default page
