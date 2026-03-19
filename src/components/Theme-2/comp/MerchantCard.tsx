import { getBaseImageUrl } from '@/constants/hooks';
import { faFire, FontAwesomeIcon } from '@/constants/icons';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
    discountTag?: string | null;
}

const MerchantCard = async ({merchant_name, merchant_logo, companyDomain, merchant_href, discountTag}: Props) => {
    return (
        <Link href={merchant_href} style={{ textDecoration: 'none' }}>
            <div className="merchant-card">
                {/* Top Section: Banner & Tag */}
                <div className="card-banner">
                    {discountTag && (
                        <div className="discount-tag">
                            {/* Choose icon based on type */}
                            {/* {type === 'coupon' ? ( */}
                                {/* // <span className="tag-icon fire">🔥</span> */}
                                <FontAwesomeIcon icon={faFire} className="tag-icon fire" height={16} width={16} />
                            {/* // ) : (
                            //     <span className="tag-icon bolt">⚡</span>
                            // )} */}
                            <span style={{ color: '#000' }}>{discountTag}</span>
                        </div>
                    )}
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                        alt={`${merchant_name} Logo`}
                        className="merchant-logo"
                        height={100}
                        width={100}
                        objectFit='contain'
                    />
                </div>

                {/* Bottom Section: Text & Button */}
                <div className="card-body">
                    <div className="merchant-label">
                        {merchant_name}
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default MerchantCard
