import { getBaseImageUrl, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { Merchant, minimalMerchantData } from '@/services/dataTypes'
// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import RenderRating from './RenderRating'
import Image from 'next/image'

interface Props {
  data: Merchant | minimalMerchantData,
  href: string,
  domain: string,
}

const AllMerchants = ({ data, href, domain }: Props) => {
  // const [heading, details] = splitHeadingFromDetails(data?.merchant_detail || data?.details);
  return (
      <div className="service-item service-item-custom-card-hover service-item-custom service-item-custom-bg">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Link href={href} rel="nofollow sponsored noopener noreferrer" className="link">
            <span className="custom-cat-img border-0">
              <Image src={getBaseImageUrl(domain, data?.merchant_logo, "")} alt={getRandomStoreSeoTitle(data?.merchant_name)}
                layout="fill"
                objectFit="contain"
              />
            </span>
          </Link>
          <Link href={href} rel="nofollow sponsored noopener noreferrer" className='nav-link d-flex flex-column justify-content-center align-items-center fw-6'>
            <h5 className="service-item__title f-20 custom-heading-animation my-3 truncate-2-lines">
              {getRandomStoreSeoTitle(data?.merchant_name)}
            </h5>
          </Link>
          <div className="d-flex">
          <RenderRating rating={getRandomRating(data?.rating)} />
          </div>
          <span className="product-item__sales font-14 mb-2 cat-link-custom">
            <p>Total Offers ({data?.total_offers ?? 0})</p>
          </span>
        </div>
      </div>
  )
}

export default AllMerchants
