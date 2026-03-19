import { apiCategoryOffers, apiGetAllProducts } from '@/apis/user';
import { getLastUpdateDate, getMerchantHref, getProductDetailHref } from '@/constants/hooks';
import { OffersOffer } from '@/services/dataTypes';
import React from 'react';
import OfferListCard from './OfferListCard';
import Pagination from './Pagination';

interface Props {
    url_slug?: string[];
    page?: string;
    company_id: string;
    mer_slug: string;
    mer_slug_type: string;
    category_id?: string;
    baseUrl: "category" | "all-product";
    slug?: string[];
}

const OffersListing = async ({ url_slug, page, company_id, mer_slug, mer_slug_type, category_id, baseUrl, slug }: Props) => {
    const currentPage = Math.max(1, parseInt(page || "1", 10));

    let pageUrl = "";
    let offers: {
        offers?: OffersOffer[];
        pagination?: { last_page: number };
    } = {};

    if (baseUrl === "category" && category_id) {
        pageUrl = `/category/${url_slug?.join("/")}`;
        const catOffers = (await apiCategoryOffers(category_id, company_id, currentPage)).data;
        offers.offers = [...(catOffers?.featured_offers || []), ...(catOffers?.offers || [])];
        offers.pagination = catOffers?.pagination;
    } else if (baseUrl === "all-product") {
        // Clean slug to remove "page" and number after it
        const cleanedSlug =
            slug?.filter((s, i) => {
                if (s === "page" && !isNaN(Number(slug[i + 1]))) return false;
                if (i > 0 && slug[i - 1] === "page" && !isNaN(Number(s))) return false;
                return true;
            }) || [];

        pageUrl = cleanedSlug.length
            ? `/all-products/${cleanedSlug.join("/")}`
            : `/all-products`;

        offers = (
            await apiGetAllProducts(company_id, category_id, currentPage.toString())
        ).data;
    }

    const totalPages = offers?.pagination?.last_page || 0;

    return (
        <div>
            {offers?.offers?.length ? (
                <p className="fw-bold">
                    All deals in this category are hand-tested. Last verified on:{" "}
                    {getLastUpdateDate(1)}.
                </p>
            ) : null}

            <div className="row cus-row justify-content-center justify-content-md-start g-3 d-flex flex-wrap">
                {offers?.offers?.length ? (
                    offers.offers.map((item: OffersOffer, i: number) => (
                        <div
                            key={i}
                            className="col-xl-6 col-lg-6 col-md-12 col-12 mb-3"
                        >
                            <OfferListCard
                                offer={item.offer}
                                merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                                merchant_logo={item.merchant?.merchant_logo || ""}
                                merchant_name={item.merchant?.merchant_name || ""}
                                // type={item?.offer?.offer_type?.name}
                                productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug): null}
                            />
                        </div>
                    ))
                ) : (
                    <section className="product-shop-full-grid">
                        <div className="container">
                            <div className="row">
                                <div className="section-title-center text-center mt-5">
                                    <div className="col-12">
                                        <div
                                            className="d-flex justify-content-center align-items-center"
                                            style={{ height: "100px" }}
                                        >
                                            <h3 className="fs-three n17-color text-danger">
                                                No Offers Found
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </div>
            <div className="row">
                <div className="col-12 col-lg-12 col-xl-12 col-md-12">
                    {totalPages > 1 && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            baseUrl={pageUrl}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default OffersListing;
