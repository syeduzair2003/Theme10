// import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Merchant } from "@/services/dataTypes";
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image'

interface Props {
    merchants: Merchant[],
    mer_slug_type: string,
    mer_slug: string,
    heading: string,
}

const ExclusiveMerchants = async ({ merchants, mer_slug, mer_slug_type, heading }: Props) => {
    const getHref = (store: Merchant) => `/${mer_slug}/${store[mer_slug_type as keyof Merchant] || store.slug}`;
    const domain = (await cookieService.get("domain")).domain;

    let count = 1;
    return (
        <div className="common-sidebar-wrapper mb-3 sidebar-bg">
            <div className="common-sidebar">
                <div className="common-sidebar__item">
                    <h2 className="common-sidebar__title f-25" style={{ textAlign: "center", marginBottom: "10px" }}>{heading}</h2>
                    {merchants.length > 0 ? merchants?.map((item: Merchant, i: number) => {
                        const href = getHref(item);

                        if (count <= 5) {
                            count = count + 1;
                            return (
                                <div key={i} className="latest-blog ani-in-effect-delayed">
                                    <div className="latest-blog__thumb">
                                        <Link href={item?.website_url} rel="nofollow sponsored noopener noreferrer" className="link w-100">
                                            <Image
                                                style={{ height: 100 }}
                                                src={getBaseImageUrl(domain, item?.merchant_logo, "")}
                                                alt={`${item.merchant_name} logo`}
                                                width={500}
                                                height={500}
                                                className='cover-img'
                                            />
                                        </Link>
                                    </div>
                                    <div className="latest-blog__content" style={{ marginTop: "auto" }}>
                                        <h6 className="latest-blog__title fw-500 font-body font-16">
                                            <Link rel="nofollow sponsored noopener noreferrer"
                                                href={href}
                                                className="link"
                                            >{item?.merchant_name}
                                            </Link>
                                        </h6>
                                    </div>
                                </div>
                            )
                        }
                    }) : <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default ExclusiveMerchants
