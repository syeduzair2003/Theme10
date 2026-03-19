import Link from 'next/link'
import React from 'react'
import { getPromotionHref } from '@/constants/hooks'
import { apiGetAllPromotion } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import BreadcrumbSection from './BreadcrumbSection'

const PromotionsPage = async ({promotionSlug}: { promotionSlug: string }) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const promotions = (await apiGetAllPromotion(companyDomain)).data;
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Promotions" },
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
            {promotions?.length > 0 && promotions?.map((promotion, i) => {
              return (
                <div
                  key={i}
                  className="col-6 col-md-6 col-sm-6 col-xs-12 col-lg-3 col-xl-3"
                >
                  <Link href={getPromotionHref(promotion, promotionSlug)}>
                    <div className="rounded-3 shadow-sm event-card h-100 d-flex flex-column align-items-center justify-content-center text-center p-4">
                      <h3 className="event-title">{promotion?.name}</h3>
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

export default PromotionsPage
