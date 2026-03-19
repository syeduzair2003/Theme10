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
    const parsedDiscount = parseDiscountTag(discountTag);

    return (
        <Link href={merchant_href} className="prod-mer-card">
            {/* Image Container: Fixed height prevents layout shifts */}
            <div className="prod-mer-card__img-box">
                <Image
                    src={getBaseImageUrl(companyDomain, merchant_logo, '')}
                    alt={`${merchant_name} logo`}
                    width={160}
                    height={90}
                    className="prod-mer-card__img"
                    // Ensures image fits without stretching
                    style={{ objectFit: 'contain' }} 
                />
            </div>

            {/* Badge: Centered Pill Style */}
            {parsedDiscount && (
                <div className="prod-mer-card__badge-container">
                    <span className="prod-mer-card__badge">
                        {parsedDiscount.value} {parsedDiscount.middle} {parsedDiscount.suffix}
                    </span>
                </div>
            )}

            <p className="prod-mer-card__name">
                {merchant_name}
            </p>

            <div className="prod-mer-card__footer">
                <span className="siteButton">View All Offers</span>
            </div>
        </Link>
    );
};

export default MerchantForProduct;