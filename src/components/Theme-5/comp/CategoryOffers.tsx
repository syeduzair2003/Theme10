import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import CouponCard from './CouponCard';
import { getLastUpdateDate, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { apiCategoryOffers } from '@/apis/user';
import Pagination from './Pagination';
interface Props {
  url_slug: string[];
  page?: string;
  company_id: string;
  mer_slug: string;
  mer_slug_type: string;
  category_id: string;
}
const CategoryOffers = async ({ url_slug, page, company_id, mer_slug, mer_slug_type, category_id }: Props) => {
  const pageUrl = `/category/${url_slug?.join('/')}`;
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const catOffers = (await apiCategoryOffers(category_id, company_id, currentPage)).data
  const totalPages = catOffers?.pagination?.last_page
  const domain = (await cookieService.get("domain")).domain;
  const offers = [...(catOffers?.featured_offers || []), ...(catOffers?.offers || [])];

  if (offers?.length > 0) {
    return (
      <>
        <div className="trending-categories third">
          {offers?.length > 0 && (
            <p className="fw-bold">
              All deals in this category are hand-tested. Last verified on: {getLastUpdateDate(1)}.
            </p>
          )}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
            {offers?.length > 0 && (offers?.map((item: OffersOffer, i: number) => {
              return (
                <div key={i} className='col-xl-6 col-lg-6 col-md-12 col-12 mb-3'>
                  <CouponCard
                    product={item?.offer}
                    merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                    domain={domain}
                    merchant_logo={item?.merchant?.merchant_logo}
                    merchant_name={item?.merchant?.merchant_name}
                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
                  />
                </div>
              )
            }))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={pageUrl}
          />
        </div>
      </>
    )
  } else {
    return (
      <section className="product-shop-full-grid">
        <div className="container">
          <div className="row">
            <div className="section-title-center text-center mt-5">
              <div className="col-12">
                <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                  <h3 className="fs-three n17-color text-danger">No Offers Found</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CategoryOffers
