import React from 'react'
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { OffersOffer } from '@/services/dataTypes'
import Image from 'next/image'
import Link from 'next/link'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import cookieService from '@/services/CookiesService'

interface Props {
  item: OffersOffer
  slug_type: string
  mer_slug: string
  preloadedImage: string
}

const NewOfferListCard = async ({ item, mer_slug, slug_type }: Props) => {
  const domain = (await cookieService.get("domain")).domain;
  const [heading, details] = splitHeadingFromDetails(item?.merchant?.merchant_detail);

  return (
    <div className="col-xl-6 col-sm-12">
      <div className="row new-offer-card-body g-0">
        <div className="col-lg-8 col-xl-8 col-sm-9 offer-img-text mx-auto">
          <div className="new-offer-content">
            <div className="new-offer-text-section">
              <h5 className="new-offer-title">
                <OfferOutUrl
                  outUrl={item.offer.url}
                  merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)}
                  unique_id={item.offer.unique_id}
                  customClass="link"
                  domain={domain}
                >
                  {item?.offer?.offer_title}
                </OfferOutUrl>
              </h5>
            </div>

            <div className="row new-offer-footer">
              <div className="col-lg-8 col-12 d-flex align-items-start flex-column">
                <div className="new-offer-date-wrapper">
                  <p className="new-valid-date">{calculateOfferDuration(item.offer.end_date)}</p>
                </div>
                <Link href={getMerchantHref(item?.merchant, mer_slug, slug_type)}>
                  <p className="new-valid-label">{heading ? discardHTMLTags(heading) : getRandomStoreSeoTitle(item?.merchant?.merchant_name)}</p>
                </Link>
              </div>
              <div className="col-lg-4 col-12">
                <div className='inner-div h-100'>
                  <div className="d-flex align-items-center justify-content-center w-100">
                  <Link href={getMerchantHref(item?.merchant, mer_slug, slug_type)}>
                    <Image src={getBaseImageUrl(domain, item?.merchant?.merchant_logo, "")} alt={getRandomStoreSeoTitle(item?.merchant?.merchant_name)} height={100} width={100} layout='responsive' />
                  </Link>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-xl-3 col-sm-3 mx-auto new-offer-image-wrapper">
          <OfferOutUrl
            outUrl={item.offer.url}
            merchantHref={getMerchantHref(item.merchant, mer_slug, slug_type)}
            unique_id={item.offer.unique_id}
            customClass="link w-100"
            domain={domain}
          >
            <Image
              src="/shared-assets/t_deal.png"
              alt={item?.merchant?.merchant_name}
              width={120}
              height={120}
              objectFit="contain"
            />
          </OfferOutUrl>
        </div>
      </div>
    </div>
  )
}

export default NewOfferListCard