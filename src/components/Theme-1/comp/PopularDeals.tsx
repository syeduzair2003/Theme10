import Image from 'next/image';
import React from 'react'
import { apiGetPopularDeals } from '@/apis/page_optimization';
import NewOfferListCard from './NewOfferListCard';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl, getMerchantHref, getProductDetailHref, splitHeading } from '@/constants/hooks';
import BrowseDeal from './BrowseDeal';
import NewBrowseDeal from './NewBrowseDeal';

interface Props {
  companyId: string;
  slug_type: string;
  mer_slug: string;
}
const PopularDeals = async ({ companyId, slug_type, mer_slug }: Props) => {
  const response = await apiGetPopularDeals(companyId);
  const best_offers = response?.data?.offers;
  const domain = (await cookieService.get("domain")).domain;
  const [firstHalf, secondHalf] = splitHeading(response?.data?.popular_deals_widget?.widget_heading);
  const cleanedText = response?.data?.popular_deals_widget?.widget_heading?.trim();
  const wordCount = cleanedText?.split(/\s+/)?.filter(Boolean).length;

  let count = 0;
  if (best_offers?.length > 0) {
    return (
      <section className="blog padding-y-60  position-relative z-index-1 overflow-hidden"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
        }}>
        <div className="container">
          <Image src="/themes/Theme_1/images/shapes/pattern.png" alt="pattern" className="bg-pattern"
            width={1000} height={400}
          />
          <div className="section-heading style-left style-flex flx-between align-items-end gap-3 mb-2">
            <h2 className={`section-heading__title ${wordCount > 20 ? 'f-25' : 'f-40'}`}>
              {firstHalf ? firstHalf : "Browse Our"} {secondHalf ? secondHalf : "Top Deals"}
            </h2>
          </div>
          <div className="row gy-4 list-grid-wrapper d-flex flex-wrap">
            <div className='col-lg-12 col-xl-12'>
              <p className="text-dark f-14">
                {response?.data?.popular_deals_widget?.widget_text ? response?.data?.popular_deals_widget?.widget_text : "Check out the hottest deals handpicked just for you! From limited-time discounts to trending offers, these top deals are updated regularly to ensure you never miss a chance to save big on your favorite brands."}
              </p>
            </div>
            {best_offers?.length > 0 && best_offers?.map((item, i) => {
              if (count <= 7) {
                count += 1;
                return (
                  <div key={i} className="col-xl-6 col-lg-6 col-md-12 col-sm-12">
                    <NewBrowseDeal
                      item={item?.offer}
                      merchantHref={getMerchantHref(item?.merchant, mer_slug, slug_type)}
                      merchant_name={item?.merchant?.merchant_name}
                      merchant_logo={item?.merchant?.merchant_logo}
                      productDetailUrl={item?.offer.slug ? getProductDetailHref(item?.merchant, slug_type, item?.offer.slug) : null}
                    />
                  </div>
                )
              }
            })
            }
          </div>
        </div>
      </section>
    )
  }
}

export default PopularDeals
