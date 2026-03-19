import { apiFooterPagesData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = 'affiliate-disclosure';
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;
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
                    <span className="breadcrumb-list__text text-capitalize">{pageData?.page_name}</span>
                  </li>
                </ul>
                <h3 className="breadcrumb-two-content__title mb-0 text-capitalize">
                  {pageData?.page_name}
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
        width={1000} height={400}
        className="bg--gradient"
      />
      <Image
        src="/themes/Theme_1/images/shapes/pattern-five.png"
        className="position-absolute end-0 top-0 z-index--1"
        alt=""
        width={1000} height={400}
      />
      <div className="container">
        <div
          className="d-grid gap-3 gap-md-4 custom-pages-content"
          dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
        />
      </div>
    </section>
    </>
  )
}

export default page
