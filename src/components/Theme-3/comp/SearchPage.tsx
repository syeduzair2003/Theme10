import { Merchant, SearchCategories, SearchResponse } from '@/services/dataTypes'
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import { getBaseImageUrl } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
// import Image from "@/components/shared/Image";

interface Props {
    slug_type: string,
    mer_slug: string,
    cat_slug: string,
    searchData: SearchResponse,
    query: string
}
const SearchPage = async ({ slug_type, mer_slug, cat_slug, searchData, query }: Props) => {
    const getHref = (store: Merchant) => `/${mer_slug}/${store[slug_type as keyof Merchant] || store.slug}`;
    const getCatHref = (category: SearchCategories) => `/${cat_slug}/${category[slug_type as keyof SearchCategories] || category.slug}`;
    const companyDomain = await cookieService.get("domain");

    return (
        <>
            {(searchData?.merchants?.length > 0 || searchData?.categories?.length > 0) && (
                <>
                    {searchData?.merchants?.length > 0 && (
                        <>
                            <div className="col-md-12">
                                <div className="section-title-center text-left">
                                    <h2 className="title pl-0 n15-color">&ldquo;{query}&rdquo; in Stores</h2>
                                </div>
                            </div>
                            <div className='custom-search-result px-3 py-3 box-border'>
                                <div className="row d-flex flex-wrap gy-2 gy-md-3 gx-2 gx-md-4 box-border">
                                    {searchData.merchants.map((merchant: any, i: number) => (
                                        <div key={i} className="col-7 col-sm-6 col-md-6 col-lg-4 col-xl-3 box-border" style={{ borderRadius: 5 }}>
                                            {/* <div className="single-box d-grid transition justify-content-start n1-bg-color p-3 p-md-5 border rounded-2 flex-column mt-9 h-100 align-items-center"> */}
                                            <div className="single-box d-grid transition justify-content-start n1-bg-color p-2 p-md-3 border rounded-2 flex-column h-100 align-items-center">
                                                {/* <div className=" gy-4 d-grid flex-column transition single-box border rounded-2 n1-bg-color align-items-center justify-content-start"> */}
                                                <div className="d-center justify-content-start gap-4 gap-md-8">
                                                    <div className="d-center thumb-area rounded-3 border overflow-hidden" style={{ width: '120px', height: '70px', background: 'white' }}>
                                                        <Image
                                                            className="w-100"
                                                            src={getBaseImageUrl(companyDomain.domain, merchant.merchant_logo, "")}
                                                            alt={merchant.merchant_name}
                                                            width={100}
                                                            height={100}
                                                            objectFit="cover"
                                                            layout='responsive'
                                                            style={{ padding: '10px' }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="bottom-area d-grid align-items-center">
                                                    <Link href={getHref(merchant)} className="d-center justify-content-start">
                                                        <p className="fs-seven fw-6 sp-2 n17-color fw-mid lh-18 my-3">{merchant.merchant_name}</p>
                                                    </Link>
                                                    <Link href={getHref(merchant)} className="d-center justify-content-start gap-2 gap-md-3">
                                                        <span className="p2-color fw-bold">View Merchant</span>
                                                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}

                    {searchData?.categories?.length > 0 && (
                        <>
                            <div className="col-md-12 mt-5">
                                <div className="section-title-center text-left">
                                    <h2 className="title pl-0 n15-color">&ldquo;{query}&rdquo; in Categories</h2>
                                </div>
                            </div>
                            <div className="custom-search-result px-3 py-3">
                                <div className="row">
                                    {searchData.categories.map((category: any) => (
                                        <div key={category.unique_id} className="col-7 col-sm-6 col-md-6 col-lg-4 col-xl-3">

                                            <Link href={category?.url} className='my-auto' style={{ paddingLeft: '10px' }}>
                                                <div className="custom-col">
                                                    <div className="custom-card position-relative gap-1 rounded-3 overflow-hidden">
                                                        <div className="card-left-cat d-center flex-column gap-2">
                                                            <div className="rounded-circle">
                                                                <Image
                                                                    src={getBaseImageUrl(companyDomain.domain, category?.category_image, "")}
                                                                    width={60} height={60}
                                                                    alt={category?.name}
                                                                    objectFit='cover'
                                                                />
                                                            </div>
                                                            <span className="offers-info">{category?.total_offers ? category?.total_offers : 10} Offers Available</span>
                                                        </div>
                                                        <div className="category-main-text">
                                                            <h4 className="brand-name fw-bold f-16 fw-5 mb-2">{category?.name}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}

export default SearchPage
