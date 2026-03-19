import React from 'react'
import { Merchant, SearchResponse } from '@/services/dataTypes';
import AllMerchants from './AllMerchants';
import CategoryCard from './CategoryCard';
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';

interface Props {
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
    searchData: SearchResponse;
    queryParams: string;
}

const SearchPage = async ({ mer_slug, slug_type, cat_slug, searchData, queryParams }: Props) => {
    const getHref = (store: Merchant) => `/${mer_slug}/${store[slug_type as keyof Merchant] || store.slug}`;
    const domain = (await cookieService.get("domain")).domain;

    return (
        <>
            {
                (searchData?.merchants?.length > 0 || searchData?.categories?.length > 0) && (
                    <>
                        {searchData?.merchants?.length > 0 && (
                            <div className="row gy-4 list-grid-wrapper gap-2">
                                <div className="col-xl-12 col-lg-12">
                                    <h2 className='f-25'>&quot;{queryParams}&quot; in Stores</h2>
                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-product"
                                        role="tabpanel"
                                        aria-labelledby="pills-product-tab"
                                        tabIndex={0}
                                    >
                                        <div className="row gy-4 list-grid-wrapper">
                                            {searchData.merchants.map((item: any, i: number) => {
                                                const href = getHref(item);
                                                return (
                                                    <div key={i} className="col-xl-4 col-sm-6">
                                                        <AllMerchants data={item} href={href} domain={domain}/>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {searchData?.categories?.length > 0 && (
                            <>
                                <h2 className='mt-3 f-25'>&quot;{queryParams}&quot; in Categories</h2>
                                <div className="row g-3">
                                    {searchData?.categories?.map((category, i) => {
                                        return (
                                            <CategoryCard key={i}
                                                category={category}
                                                cat_slug={cat_slug}
                                                slug_type={slug_type}
                                                preloadedImage={getBaseImageUrl(domain, category.category_image, "")}
                                            />
                                        )
                                    })}
                                </div>
                            </>
                        )}
                    </>
                )
            }
        </>
    )
}

export default SearchPage
