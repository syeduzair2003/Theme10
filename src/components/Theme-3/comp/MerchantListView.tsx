import { Merchant } from '@/services/dataTypes'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import RenderRating from './RenderRating'
import { getMerchantHref } from '@/constants/hooks'
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons'

interface Props {
    merchant: Merchant,
    mer_slug_type: string,
    mer_slug: string,
}
const MerchantListView = ({ merchant, mer_slug_type, mer_slug }: Props) => {
    return (
        <div className="col-12 col-sm-6 col-lg-12 mb-3">
            <figure className="figure product-box row">
                <figcaption></figcaption>
                <div className="col-12 col-md-12 col-lg-5 col-xl-4 p0 d-flex justify-content-center align-items-center merchant-page-image">
                    <Link href={getMerchantHref<Merchant>(merchant, mer_slug, mer_slug_type)}>
                        <Image className='overflow-hidden text-center' layout='responsive' src={merchant?.merchant_logo} height={150} width={150} alt={merchant?.merchant_name} />
                    </Link>
                </div>
                <div className="col-12 col-md-12 col-lg-7 col-xl-8 ml-2 pl-3">
                    <div className="figure-caption text-left">
                        <div className="row">
                            <div className="col-12 col-md-12 col-lg-12">
                                <div className="price-start">
                                    <strong>{merchant?.merchant_name}</strong>
                                </div>
                                <div className='my-2'>
                                    <b className="product-content">Total Offers ({merchant?.total_offers})</b>
                                </div>
                                <div className="rating">
                                    <RenderRating rating={merchant?.rating} />
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="content-excerpt">
                                    <h6 className="product-title" dangerouslySetInnerHTML={{ __html: merchant?.merchant_detail || '' }}></h6>
                                </div>
                            </div>
                            <div className="compare-btn" style={{ display: "inline-block"}}>
                                <Link className="btn btn-primary btn-sm" href={getMerchantHref<Merchant>(merchant, mer_slug, mer_slug_type)}>Visit Now
                                    <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} className='px-1 mt-1'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </figure>
        </div>
    )
}

export default MerchantListView
