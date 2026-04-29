import { apiCategoryOffers } from '@/apis/user';
import { getLastUpdateDate, getProductDetailHref } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import Pagination from './Pagination';
import OfferCard from './offerCard';

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
    const catOffers = (await apiCategoryOffers(category_id, company_id, currentPage)).data;
    const totalPages = catOffers?.pagination?.last_page || 0;
    const domain = (await cookieService.get("domain"))?.domain || "";
    const offers = [...(catOffers?.featured_offers || []), ...(catOffers?.offers || [])];

    return (
        <div className="w-full h-full flex flex-col">
            {offers?.length > 0 && (
                <div className="mb-6 bg-[#8bc94a10] border border-[#8bc94a30] rounded-2xl p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#8bc94a20] flex items-center justify-center flex-shrink-0">
                        <span className="text-[#8bc94a] text-lg font-black">✓</span>
                    </div>
                    <div>
                        <h4 className="text-[#8bc94a] font-bold text-sm m-0">Verified Deals</h4>
                        <p className="text-gray-500 text-xs m-0 mt-0.5">
                            All deals in this category are hand-tested. Last verified on: {getLastUpdateDate(1)}.
                        </p>
                    </div>
                </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10 w-full mb-10 min-h-[300px]">
                {offers && offers.length > 0 ? (
                    offers.map((item: OffersOffer, i: number) => {
                        return (
                            <div key={i} className="flex flex-col h-full w-full">
                                <OfferCard
                                    offer={item}
                                    mer_slug_type={mer_slug_type}
                                    mer_slug={mer_slug}
                                    type="offer"
                                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
                                />
                            </div>
                        )
                    })
                ) : (
                    <div className="col-span-full w-full py-20 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center justify-center">
                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
                             <span className="text-3xl text-gray-300 font-bold">Oops</span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-700 m-0">No Offers Found</h3>
                        <p className="text-gray-400 mt-2">Try browsing another category or check back later.</p>
                    </div>
                )}
            </div>
            
            {offers && offers.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl={pageUrl}
                />
            )}
        </div>
    );
};

export default CategoryOffers;
