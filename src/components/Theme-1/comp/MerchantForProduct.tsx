import { getBaseImageUrl, parseDiscountTag } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
    discountTag?: string | null;
}

const MerchantForProduct = async ({ merchant_name, merchant_logo, companyDomain, merchant_href, discountTag }: Props) => {
    const parsedDiscount = parseDiscountTag(discountTag)
     return (
        <Link href={merchant_href} className="d-flex justify-content-between flex-column text-decoration-none h-100" style={{ border: '1px solid #80808040', borderRadius: '10px' }}>
            <div className="prod-merchant-card h-100">
                {/* Logo */}
                <div className="prod-merchant-logo-wrapper">
                    <Image
                        src={getBaseImageUrl(companyDomain, merchant_logo, '')}
                        alt={`${merchant_name} logo`}
                        width={160}
                        height={90}
                        className="prod-merchant-logo"
                    />
                </div>

                {/* Discount */}
                {parsedDiscount && (
                    <div className="prod-merchant-discount text-center">
                        <span className="discount-text">
                            {parsedDiscount.value} {parsedDiscount.middle} {parsedDiscount.suffix}
                        </span>
                    </div>
                )}

                {/* Description */}
                <p className="prod-merchant-name text-center">
                    {merchant_name}
                </p>

                {/* CTA */}
                <div className="prod-merchant-cta text-center">
                    <span className="cta-text">
                        View All Offers
                    </span>
                    <FontAwesomeIcon
                        icon={faArrowRight}
                        height={14}
                        width={14}
                        className="ms-2"
                    />
                </div>
            </div>
        </Link>
    );
};

export default MerchantForProduct;