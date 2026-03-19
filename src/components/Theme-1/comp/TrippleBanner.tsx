import { apiGetCompanyBanners } from '@/apis/page_optimization';
import Link from 'next/link'
// import Image from 'next/image'
import React from 'react'
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import Image from 'next/image'

interface Props {
    company_id: string
}
const TrippleBanner = async ({ company_id }: Props) => {
    const bannerResponse = (await apiGetCompanyBanners(company_id)).data;
    const domain = (await cookieService.get("domain")).domain;

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover' as const
    };
    return (
        <section className="tripbanner-section position-relative z-index-1 py-5">
            <div className="container container-two">
                <div className="row g-3 d-flex align-items-center justify-content-center">
                    {bannerResponse[0] && (
                        <div className="col-6 col-md-3">
                            <section className="custom-triple my-2">
                                <div className="img-area small-banner" style={{ width: '100%', height: '100%' }}>
                                    <Link href={bannerResponse[0]?.url} rel="nofollow sponsored noopener noreferrer">
                                        <Image
                                            className="w-100 rounded-3"
                                            height={340}
                                            width={270}
                                            src={getBaseImageUrl(domain, bannerResponse[0].image, "")}
                                            alt="Banner"
                                            style={imageStyle}
                                        />
                                    </Link>
                                </div>
                            </section>
                        </div>
                    )}
                    {bannerResponse[2] && (
                        <div className="col-6 col-md-3">
                            <section className="custom-triple my-2">
                                <div className="img-area small-banner" style={{ width: '100%', height: '100%' }}>
                                    <Link href={bannerResponse[2]?.url} rel="nofollow sponsored noopener noreferrer">
                                        <Image
                                            className="w-100 rounded-3"
                                            height={340}
                                            width={270}
                                            src={getBaseImageUrl(domain, bannerResponse[2].image, "")}
                                            alt="Banner"
                                            style={imageStyle}
                                        />
                                    </Link>
                                </div>
                            </section>
                        </div>
                    )}
                    {bannerResponse[1] && (
                        <div className="col-12 col-md-6">
                            <section className="custom-triple my-2">
                                <div className="img-area large-banner" style={{ width: '100%', height: '100%' }}>
                                    <Link href={bannerResponse[1]?.url} rel="nofollow sponsored noopener noreferrer">
                                        <Image
                                            className="w-100 rounded-3"
                                            height={347}
                                            width={552}
                                            src={getBaseImageUrl(domain, bannerResponse[1].image, "")}
                                            alt="Banner"
                                            style={imageStyle}
                                        />
                                    </Link>
                                </div>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default TrippleBanner
