import React from 'react'
import Image from "next/image";
// import Image from "@/components/shared/Image";
import Link from "next/link";
import { discardHTMLTags, getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import StoreCard from './StoreCard';
import cookieService from '@/services/CookiesService';
import { Merchant } from '@/services/dataTypes';

interface Props {
    merchantData: Merchant[];
    mer_slug: string;
    mer_slug_type: string;
}
const TopMerchants = async ({ merchantData, mer_slug_type, mer_slug }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const firstMerchant = merchantData?.[0];
    const [headingFirst, detailsFirst] = splitHeadingFromDetails(firstMerchant?.merchant_detail);
    const nextTenMerchants = merchantData?.slice(1, 7) || [];
    const secondMerchant = merchantData?.length > 7 ? merchantData?.[7] : null;
    const nextRowMerchants = merchantData?.slice(8, 14) || [];
    const [headingSecond, detailsSecond] = splitHeadingFromDetails(firstMerchant?.merchant_detail);
    return (
        <>
            <div className="row">
                {/* First merchant */}
                {firstMerchant && (
                    <div className="col-lg-3 d-flex">
                        <div className="col-lg-12 top-merchant-card align-items-center">
                            <Link href={getMerchantHref(firstMerchant, mer_slug, mer_slug_type)}>
                                <div className="merchant-image-card">
                                    <Image
                                        className="card-img-top merchant-top-image"
                                        src={getBaseImageUrl(companyDomain.domain, firstMerchant.merchant_logo, "")}
                                        alt={`${firstMerchant.merchant_name} Deals and coupons`}
                                        width={300}
                                        height={200}
                                        objectFit="contain"
                                        layout="responsive"
                                        loading='lazy'
                                    />
                                </div>
                                <div className="custom-container mt-2 text-center" style={{ margin: "0px 10px" }}>
                                    <span className="discount-text mx-auto">
                                        {headingFirst ? discardHTMLTags(headingFirst) : getRandomStoreSeoTitle(firstMerchant?.merchant_name)}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                {/* Next 10 merchants */}
                {nextTenMerchants?.length > 0 && (
                    <div className="col-lg-9">
                        <div className="row g-3"> {/* g-3 adds gap between grid items */}
                            {nextTenMerchants.map((merchant, index) => (
                                <div className="col-lg-4 col-md-6 col-sm-12 col-6" key={index}>
                                    <StoreCard
                                        merchant={merchant}
                                        mer_slug={mer_slug}
                                        mer_slug_type={mer_slug_type}
                                        className='px-5'
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            {secondMerchant && (
                <div className="row mt-4">
                    <div className="col-lg-3 d-flex">
                        <div className="col-lg-12 top-merchant-card align-items-center">
                            <Link href={getMerchantHref(secondMerchant, mer_slug, mer_slug_type)}>

                                <div className="merchant-image-card">
                                    <Image
                                        className="card-img-top merchant-top-image"
                                        src={getBaseImageUrl(companyDomain.domain, secondMerchant.merchant_logo, "")}
                                        alt={`${secondMerchant.merchant_name} Deals and coupons`}
                                        width={300}
                                        height={200}
                                        objectFit="contain"
                                        layout="responsive"
                                    />
                                </div>
                                <div className="custom-container mt-2 text-center" style={{ margin: "0px 10px" }}>
                                    <span className="discount-text mx-auto">
                                        {headingSecond ? discardHTMLTags(headingSecond) : getRandomStoreSeoTitle(secondMerchant.merchant_name)}
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Remaining merchants in flex wrap */}
                    {nextRowMerchants?.length > 0 && (
                        <div className="col-lg-9">
                            <div className="row g-3"> {/* g-3 adds gap between grid items */}
                                {nextRowMerchants.map((merchant, index) => (
                                    <div className="col-lg-4 col-md-6 col-sm-12 col-6" key={index}>
                                        <StoreCard key={`next-${index}`} merchant={merchant} mer_slug={mer_slug} mer_slug_type={mer_slug_type} className='px-5' />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};
export default TopMerchants