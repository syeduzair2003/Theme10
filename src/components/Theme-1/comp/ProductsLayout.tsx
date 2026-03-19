import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from '@/apis/page_optimization';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { getLastUpdateDate, getMerchantHref, getRandomCategoryCouponsTitle, getRandomStoreSeoTitle } from '@/constants/hooks';
import ProductCategorySidebar from './ProductCategorySidebar';
import { Merchant } from '@/services/dataTypes';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import ProductOffers from './ProductOffers';
// import ProductOffers from '@/components/Theme-1/comp/ProductOffers';


interface Props {
  page?: string;
  companyId: string;
  storeSlug: string;
  slugType: string;
  categoryId?: string;
  slug?: string[];
  categoryName?: string;
}

const ProductsLayout = async ({ page, companyId, storeSlug, slugType, categoryId, slug, categoryName }: Props) => {

  const [categories, merchants, suggestedMerchants] = await Promise.all([
    apiGetProductCategories(companyId, categoryId).then(res => res.data),
    apiGetProductCategoryMerchant(companyId, categoryId).then(res => res.data),
    apiGetProductSuggestedMerchant(companyId, categoryId).then(res => res.data),
  ]);
  const safeSlug = slug ?? [];


  const cleanedSlug = safeSlug?.filter(
    (s, i) => !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page"))
  );

  // Build breadcrumb paths
  const paths: { href: string; label: string }[] = cleanedSlug?.map((segment, index) => {
    const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`;
    const label = segment.replace(/-/g, " ");
    return { href, label };
  });


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
                      <a href={"/"} className="breadcrumb-list__link text-body hover-text-main">Home</a>
                    </li>
                    <li className="breadcrumb-list__item font-14 text-body">
                      <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                    </li>
                    <li className="breadcrumb-list__item font-14 text-body">
                      <span className="breadcrumb-list__text">All-Products</span>
                    </li>
                    {paths?.map((p, i) => (
                      <li
                        key={i}
                        className="breadcrumb-list__item font-14 text-body"
                      >
                        <span className="breadcrumb-list__icon font-10"><i className="fas fa-chevron-right"></i></span>
                        {i < paths?.length - 1 ? (
                          <>
                            <li className="breadcrumb-list__item font-14 text-body">
                              <span className="breadcrumb-list__text">{p?.label}</span>
                            </li>
                          </>
                        ) : (
                          <span className="text-capitalize">{p?.label}</span> // last one: plain text
                        )}
                      </li>
                    ))}
                  </ul>

                  <h1 className="breadcrumb-two-content__title mb-0 text-capitalize">Our Popular Products</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {merchants?.length > 0 && (
        <section className="section">
          <div className="container">
            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
              <h3 className="display-four n17-color f-30">Trending Merchants in All Products</h3>
            </div>
            <div className="row horizontal-scroll horizontal-scroll-mer flex-nowrap overflow-auto bg-light py-3">
              {merchants?.length > 0 &&
                merchants.map((mer, i) => (
                  <div
                    key={i}
                    className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-3"
                  >
                    <div className="mer-card card border-0 shadow-sm text-center h-100">
                      <div className="card-body d-flex flex-column align-items-center justify-content-between gap-1">
                        <div className="mer-logo">
                          <Image
                            src={`/${mer?.merchant_logo}`}
                            alt={mer?.merchant_name}
                            width={120}
                            height={120}
                            className="img-fluid"
                            unoptimized
                          />
                        </div>
                        <Link
                          href={getMerchantHref(mer,storeSlug, slugType)}
                          className="mer-btn text-decoration-none fw-semibold"
                        >
                          {mer?.merchant_name}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}
      <section className='section-prod py-3' >
        <div className="container mb-3">
          <div className="row flex-column-reverse flex-xl-row flex-lg-row flex-md-row">
            <p className="fw-bold">
              All deals in this category are hand-tested. Last verified on: {getLastUpdateDate(1)}.
            </p>
            <div className="col-xs-12 col-lg-4 col-xl-4 col-md-4">
              <div className="side-area">
                {categories?.length > 0 && (
                  // <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth mb-3">
                  <div className='mb-3'>
                    <ProductCategorySidebar
                      categories={categories}
                      pageSlug="all-products"
                      categoryName={categoryName}
                    />
                  </div>
                )}
                {/* product merchant side bar */}
                {suggestedMerchants?.length > 0 && (
                  <div className="prod-item-wrapper p-4 p-md-2 rounded-4 bg-white shadow-sm">
                    <h4 className="n17-color mb-4 fw-semibold">Similar Stores</h4>
                    <div className="similar-merchants-list d-grid gap-3 bg-light py-2 rounded-4">
                      {suggestedMerchants?.slice(0, 5).map((merchant: Merchant, i: number) => (
                        <div key={i} className="mer-card card border-0 shadow-sm text-center">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center gap-2 py-3">
                            <div className="mer-logo mb-2">
                              <Image
                                src={`/${merchant?.merchant_logo}`}
                                alt={merchant?.merchant_name}
                                width={100}
                                height={100}
                                className="img-fluid"
                                unoptimized
                              />
                            </div>
                            <Link
                              href={`/store/${merchant?.slug}`}
                              className="mer-btn text-decoration-none fw-semibold"
                            >
                              {merchant?.merchant_name}
                            </Link>
                          </div>
                        </div>
                      ))}
                      <div className="btn-area mt-3 mt-md-5">
                        <Link href={`/all-stores/A`} className="d-center justify-content-start gap-2 gap-md-3">
                          <span className="p2-color fw-bold">See All Store</span>
                          <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
            <div className="col-sm-12 col-lg-8 col-xl-8 col-md-8">
              {/* product offfer section */}
              <ProductOffers
                category_id={categoryId}
                page={page}
                company_id={companyId}
                mer_slug={storeSlug}
                mer_slug_type={slugType}
                slug={slug}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductsLayout
