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
        <Link href={merchant_href}>
            <div className="single-box d-grid justify-content-start gap-4 gap-md-6 n1-bg-color p-3 p-md-5 rounded-2">
                <div className="d-center justify-content-start gap-4 gap-md-8">
                    <span className="d-center border rounded-2 overflow-hidden" style={{ width: '120px', height: '70px', background: 'white' }}>
                        <Image
                            // className="w-100"
                            src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                            alt={`${merchant_name} logo`}
                            width={100}
                            height={100}
                            objectFit="contain"
                            style={{ maxWidth: '120px', maxHeight: '70px' }}
                        />
                    </span>
                    {parsedDiscount && (
                        <div className="d-grid gap-2 offer-area">
                            <span className="s1-color fw-bold fs-four">
                                {parsedDiscount.value}
                            </span>

                            <span className="d-center flex-column gap-2">
                                <span className="text-uppercase">
                                    {parsedDiscount.middle}
                                </span>

                                {/* <span className="text-uppercase bottom-top fs-seven">
                                    {parsedDiscount.suffix}
                                </span> */}
                                <span className="text-uppercase">
                                    {parsedDiscount.suffix}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
                <div className="bottom-area d-grid gap-3 gap-md-4">
                    <p className="fs-eight n13-color fw-bold">{merchant_name}</p>
                    <span className="d-center justify-content-start gap-2 gap-md-3">
                        <span className="p2-color fw-bold">View All Products</span>
                        <span className="d-center fs-five p2-color">
                            <FontAwesomeIcon icon={faArrowRight} height={15} width={15} />
                        </span>
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default MerchantForProduct
