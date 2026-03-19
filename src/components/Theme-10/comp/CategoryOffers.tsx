import { OffersOffer } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
// import CouponCard from './CouponCard';
import CategoryCouponCard from './CategoryCouponCard';
import { getLastUpdateDate, getMerchantHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { apiCategoryOffers } from '@/apis/user';
import Pagination from './Pagination';
interface Props {
    url_slug: string[];
    page?: string;
    company_id: string;
    mer_slug: string;
    mer_slug_type: string;
    category_id: string;
}
const CategoryOffers = async ({ url_slug, page, company_id, mer_slug, mer_slug_type, category_id }: Props) => {
    const pageUrl = `/category/${url_slug?.join('/')}`;
    const currentPage = Math.max(1, parseInt(page || "1", 10));
    const catOffers = (await apiCategoryOffers(category_id, company_id, currentPage)).data
    const totalPages = catOffers?.pagination?.last_page
    const domain = (await cookieService.get("domain")).domain;
    const offers = [...(catOffers?.featured_offers || []), ...(catOffers?.offers || [])];

    if (offers?.length > 0) {
        return (
            <div className="space-y-8">
                {/* Hand-tested Badge */}
                {/* <div className="inline-flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-700 px-5 py-3 rounded-2xl shadow-sm">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                    </span>
                    <p className="text-sm font-bold tracking-tight uppercase">
                       Hand-tested & Verified: <span className="text-emerald-900">{getLastUpdateDate(1)}</span>
                    </p>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                    {offers.map((item: OffersOffer, i: number) => (
                        <div key={i} className="group transition-all duration-300">
                            <CategoryCouponCard
                                product={item?.offer}
                                merchantHref={getMerchantHref(item?.merchant, mer_slug, mer_slug_type)}
                                domain={domain}
                                merchant_logo={item?.merchant?.merchant_logo}
                                merchant_name={item?.merchant?.merchant_name}
                            />
                        </div>
                    ))}
                </div>

                <div className="mt-12 flex justify-center py-6 border-t border-slate-100">
                    <Pagination currentPage={currentPage} totalPages={totalPages} baseUrl={pageUrl} />
                </div>
            </div>
        )
    
    } else {
        return (
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
}

export default CategoryOffers
