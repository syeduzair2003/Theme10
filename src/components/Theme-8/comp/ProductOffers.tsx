import { apiGetAllProducts } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import Pagination from './Pagination';
import EventOfferCard from './EventOfferCard';

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
    const offersData = (await apiGetAllProducts(company_id, category_id, currentPage.toString(), 30)).data;
    const totalPages = offersData?.pagination?.last_page || 0;
    const domain = (await cookieService.get("domain")).domain;

    const cleanedSlug = slug?.length
        ? slug.filter((s, i) => {
            if (s === "page" && !isNaN(Number(slug[i + 1]))) return false;
            if (i > 0 && slug[i - 1] === "page" && !isNaN(Number(s))) return false;
            return true;
        })
        : [];

    const baseUrl = cleanedSlug.length ? `/all-products/${cleanedSlug.join("/")}` : `/all-products`;

    return (
        <div className="w-full">
            <div className="row g-4 mb-10">
                {offersData && offersData?.offers?.length > 0 ? (
                    offersData?.offers?.map((item: OffersOffer, i: number) => (
                        <div key={i} className="col-md-6 col-xl-6 col-xxl-4 flex flex-col">
                            <EventOfferCard
                                product={item?.offer}
                                merchantHref={`/store/${item.merchant?.slug}`}
                                domain={domain}
                                merchant_name={item.merchant?.merchant_name}
                                merchant_logo={item.merchant?.merchant_logo}
                            />
                        </div>
                    ))
                ) : (
                    <div className="col-12 text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-slate-100">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">No Offers Found</h3>
                        {/* Fixed: couldn't -> couldn&apos;t */}
                        <p className="text-slate-500">We couldn&apos;t find any deals in this category right now.</p>
                    </div>
                )}
            </div>

            {totalPages > 1 && (
                <div className="mt-12 d-flex justify-content-center">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        baseUrl={baseUrl}
                    />
                </div>
            )}
        </div>
    )
}

export default ProductOffers;