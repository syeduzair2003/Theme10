import { apiCategoryOffers, apiGetAllProducts } from '@/apis/user';
import { getBaseImageUrl, getLastUpdateDate, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { OffersOffer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
import BrowseDeal from './BrowseDeal';
import Pagination from './Pagination';
import ProductCard from './ProductCard';
// import Pagination from './Pagination';
interface Props {
    page?: string;
    company_id: string;
    mer_slug: string;
    mer_slug_type: string;
    category_id?: string;
    slug?: string[];
}
const ProductOffers = async ({ page, company_id, mer_slug, mer_slug_type, category_id, slug }: Props) => {
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const offers = (await apiGetAllProducts(company_id, category_id, currentPage.toString())).data;
    const totalPages = offers?.pagination?.last_page || 0;
    const domain = (await cookieService.get("domain")).domain;

    const cleanedSlug = slug?.length
        ? slug.filter((s, i) => {
            // remove "page" and the number immediately after it
            if (s === "page" && !isNaN(Number(slug[i + 1]))) return false;
            if (i > 0 && slug[i - 1] === "page" && !isNaN(Number(s))) return false;
            return true;
        })
        : [];

    const baseUrl = cleanedSlug.length
        ? `/all-products/${cleanedSlug.join("/")}`
        : `/all-products`;
    return (
        <>
            <div className="trending-categories third">
                <div className="row cus-row justify-content-center justify-content-md-start g-3 d-flex flex-wrap bg-light">
                    {offers && offers?.offers?.length > 0 ? (offers?.offers?.map((item: OffersOffer, i: number) => {
                        return (
                            <div key={i} className='col-xl-6 col-lg-6 col-md-12 col-12 mb-3'>
                                <ProductCard
                                            item={item?.offer}
                                            merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                                            merchant_name={item?.merchant?.merchant_name}
                                            merchant_logo={getBaseImageUrl(domain, item?.offer?.product_image || item?.merchant?.merchant_logo, "")}
                                            productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug) : null}
                                        />
                            </div>
                        )
                    })
                    ) : (
                        <section className="product-shop-full-grid">
                            <div className="container">
                                <div className="row">
                                    <div className="section-title-center text-center mt-5">
                                        <div className="col-12">
                                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                                                <h3 className="fs-three n17-color text-danger">No Offers Found</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                    }
                </div>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={baseUrl}
                />
            </div>
        </>
    )
}

export default ProductOffers
