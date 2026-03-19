import React from 'react';
import { apiCategoryData } from '@/apis/user';
import { notFound } from 'next/navigation';
import { Merchant } from '@/services/dataTypes';
import SideBarFilter from '@theme1/comp/SideBarFilter';
import AllMerchants from '@theme1/comp/AllMerchants';
import { apiMerchantDetailsByCategory } from '@/apis/merchant';
import Link from 'next/link';
import cookieService from '@/services/CookiesService';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

interface Props {
  category_id: string;
  category_name: string;
  company_id: string;
  store_slug: string;
  slug_type: string;
  category_slug: string;
  url_slug: string[];
}

const CategoryMerchantPage = async ({ category_id, category_name, company_id, store_slug, slug_type, category_slug, url_slug }: Props) => {

  const categories = await apiCategoryData(company_id);

  const response = await apiMerchantDetailsByCategory(category_id, company_id);
  if (response.status === 'error') {
    return notFound();
  }
  const merchantnew = response.data;
  const getHref = (item: Merchant) => `/${store_slug}/${item[slug_type as keyof Merchant] || item.slug}`;
  const domain = (await cookieService.get("domain")).domain;

  return (
    <section className='all-product custom-bg-color-one category-page-padding'>
      <div className="container container-two">
        <div className="row">
          <div className="col-xl-3 col-lg-3" >
            <SideBarFilter categories={categories?.data} cat_slug={category_slug} slug_type={slug_type} />
          </div>
          <div className="col-xl-8 col-lg-8" style={{ marginTop: -63 }}>
            <div className="tab-content" id="pills-tabContent">
              <div
                className="tab-pane fade show active"
                id="pills-product"
                role="tabpanel"
                aria-labelledby="pills-product-tab"
                tabIndex={0}
              >
                {response.data !== null && (
                  <>
                    <div className="row gy-4 list-grid-wrapper gap-2">
                      <div className="col-xl-12 col-lg-12">
                        <h1>Top Stores in {category_name}</h1>
                        <ul className="breadcrumb-list flx-align gap-2 mb-2 pb-3">
                          <li className="breadcrumb-list__item font-14 text-body d-flex align-items-center justify-content-center gap-1">
                            <Link
                              href="/"
                              className="breadcrumb-list__link text-body hover-text-main"
                            >
                              Home
                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: 'grey' }} />
                            </Link>
                          </li>
                          {url_slug?.slice(0, url_slug?.length - 1)?.map((slug, index) => {
                            const href = `/${url_slug.slice(0, index + 1).join('/')}`;
                            return (
                              <li key={index} className="breadcrumb-list__item font-14 text-body d-flex align-items-center justify-content-center gap-1">
                                <Link href={href} className="breadcrumb-list__link text-body hover-text-main text-capitalize">
                                  {slug.replace(/-/g, ' ')}
                                </Link>
                                {index < url_slug.length - 1 && (
                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '12px', height: '12px', color: 'grey' }} />
                                )}
                              </li>
                            );
                          })}
                          <li className="breadcrumb-list__item font-14 text-body d-flex align-items-center justify-content-center gap-1 text-capitalize">
                              {category_name}
                          </li>
                        </ul>
                        <div
                          className="tab-pane fade show active"
                          id="pills-product"
                          role="tabpanel"
                          aria-labelledby="pills-product-tab"
                          tabIndex={0}
                        >
                          <div className="row gy-4 list-grid-wrapper">
                            {merchantnew.merchants.length > 0 && merchantnew.merchants.map((item: any, i: number) => {
                              const href = getHref(item);
                              return (
                                <div key={i} className="col-xl-4 col-sm-6">
                                  <AllMerchants data={item} href={href} domain={domain} />
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoryMerchantPage
