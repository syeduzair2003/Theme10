import { Merchant } from '@/services/dataTypes'
import Link from 'next/link';
import Image from "next/image";
import React from 'react'
import RenderRating from './RenderRating';

interface Props {
    merchants: Merchant[],
    mer_slug_type: string,
    mer_slug: string,
}
const MerchantsSidebarView = ({ merchants, mer_slug_type, mer_slug }: Props) => {
    const getHref = (store: Merchant) => `/${mer_slug}/${store[mer_slug_type as keyof Merchant] || store.slug}`;
    let count = 1;
    return (
        <div className="side-bar sidebar-review-box text-center" style={{ borderRadius: "8px" }}>
            <h4 className="title merchant-sidebar-title mt-3">Exclusive Merchants</h4>
            <div className="sidebar-slider product-review">
                {merchants.length > 0 ? merchants?.map((item: Merchant, i: number) => {
                    const href = getHref(item);

                    if (count <= 5) {
                        count = count + 1;
                        return (
                            <div key={i} className="merchant-inner">
                                <div className="merchant-front">
                                    <div className="category-header mb-2">
                                        <Image layout='responsive' src={item?.merchant_logo} height={120} width={120} alt={item?.merchant_name} className='merchant-image' />
                                    </div>
                                    <div id="category-detail-3" className='mb-3'>
                                        <div className="category-price text-center">
                                            <h5 className="category-details-title">{item?.merchant_name}</h5>
                                        </div>
                                        <div className="rating">
                                        <RenderRating rating={item.rating}/>
                                        </div>
                                    </div>
                                </div>

                                <div className="merchant-back">
                                    <h5>{item?.merchant_name}</h5>
                                    <Link className="btn view-btn" href={href}>
                                        View Now
                                    </Link>
                                </div>
                            </div>
                        )
                    }
                }) : <></>
                }
            </div>
        </div>
    )
}

export default MerchantsSidebarView
