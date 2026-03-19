import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { CompanyWiseMerchant } from '@/services/dataTypes'
import LinkLight from '@theme1/assets/images/icons/link-light.svg'
import LinkIcon from '@theme1/assets/images/icons/link.svg'

const StoreCard = ({ item }: { item: CompanyWiseMerchant }) => {
    return (
        <>
            <div className="col-xl-2 col-sm-4">
                <div className="product-item section-bg" style={{minHeight: '100%'}}>
                    <div className="product-item__thumb d-flex">
                        <Link href={`/stores/${item.unique_id}`} className="link w-100">
                            <Image
                                style={{ height: 100 }}
                                src={item?.merchant_logo}
                                alt=""
                                width={500}
                                height={500}
                                className='cover-img'
                            />
                        </Link>
                    </div>
                    <div className="product-item__content">
                        <h6 style={{fontSize: '14px'}} className="product-item__title">
                            <Link
                                href={item?.website_url}
                                className="link hover-text-decoration-underline"
                                target='_blank'
                            >
                                {item?.merchant_name}
                            </Link>
                        </h6>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StoreCard
