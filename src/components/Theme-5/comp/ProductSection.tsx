import { apiGetMultiProductOffers } from '@/apis/user';
import { getBaseImageUrl, getFinalDiscountTag, getMerchantHref, getProductDetailHref, splitHeading, discardHTMLTags } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { HomeMultiProductData } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ProductDetailsModal from './ProductDetailsModal';

interface Props {
    companyId: string;
    mer_slug_type?: string;
    mer_slug?: string;
}

const ProductSection = async ({ companyId, mer_slug_type = "", mer_slug = "" }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const responseData = (await apiGetMultiProductOffers(companyId)).data;

    const renderSection = (sectionData: HomeMultiProductData, sectionTitle: string) => {
        if (!sectionData?.offers?.length) {
            return null;
        }

        const [headingFirst, headingSecond] = splitHeading(sectionData?.home_page_widget?.widget_heading || sectionTitle);
        const products = sectionData.offers.slice(0, 8);

        return (
            <div className="mb-18">
                <div className="flex items-center justify-between mb-8 mt-10">
                    <div className="flex items-center gap-4">
                        {sectionData?.merchant?.merchant_logo && (
                            <Image
                                src={getBaseImageUrl(companyDomain, sectionData.merchant.merchant_logo, "")}
                                alt="Merchant Logo"
                                width={90}
                                height={90}
                                className="rounded-full shadow-sm object-contain bg-gray rounded-lg"
                            />
                        )}
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4 mt-10">
                                {headingFirst} <span className="text-indigo-600">{headingSecond}</span>
                            </h2>
                            {sectionData?.home_page_widget?.widget_text && (
                                <p className="text-lg text-slate-500 font-medium mt-2">
                                    {discardHTMLTags(sectionData.home_page_widget.widget_text)}
                                </p>
                            )}
                        </div>
                    </div>
                    <Link
                        href={getMerchantHref(sectionData.merchant, mer_slug, mer_slug_type)}
                        className="hidden md:flex ml-auto w-max group items-center gap-2 text-indigo-600 hover:text-indigo-700 font-bold transition-all whitespace-nowrap animate-fade-in-up animation-delay-300">
                        View All
                        <span className="p-1.5 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </span>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                    {products.map((item, index) => {
                        const originalPrice = item?.offer?.original_price ? parseFloat(item?.offer?.original_price) : 0;
                        const salePrice = item?.offer?.sale_price ? parseFloat(item?.offer?.sale_price) : 0;
                        const discountPercent = originalPrice > 0 && salePrice > 0
                            ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
                            : null;

                        const finalDiscountTag = getFinalDiscountTag(
                            item?.offer?.offer_title || item?.offer?.offer_detail,
                            discountPercent,
                        );

                        const type = item?.offer?.offer_type?.name;
                        const imageSrc = type === "product"
                            ? getBaseImageUrl(companyDomain, item?.offer?.product_image, "")
                            : getBaseImageUrl(companyDomain, sectionData.merchant?.merchant_logo, "");

                        const productUrl = item?.offer?.slug
                            ? getProductDetailHref(sectionData.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug)
                            : getMerchantHref(sectionData.merchant, mer_slug, mer_slug_type);
                        return (
                            <Link href={productUrl} key={item.offer?.id || index}>
                                <div className="group bg-white rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-indigo-100/50 transition-all duration-500 overflow-hidden border border-slate-100">
                                    <div className="relative aspect-[16/9] w-full bg-indigo-50/50 overflow-hidden">
                                        <Image
                                            src={imageSrc}
                                            alt={item.offer?.offer_title}
                                            fill
                                            className=" w-full h-full object-contain p-4 bg-white border border-slate-100 transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {finalDiscountTag && (
                                            <div className="absolute top-2 right-2 bg-indigo-600 text-white px-1.5 py-0.5 rounded rounded-full text-[10px] font-extrabold shadow-sm z-10">
                                                {finalDiscountTag}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6 pt-2">
                                        <div className="flex items-center gap-2 mb-2">

                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                                                {sectionData.merchant?.merchant_name}
                                            </span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight min-h-[2.5rem]">
                                            {discardHTMLTags(item.offer?.offer_title)}
                                        </h3>

                                        <div className="mb-3">
                                            <ProductDetailsModal
                                                product={item?.offer}
                                                merchantName={sectionData.merchant?.merchant_name}
                                                merchantLogo={getBaseImageUrl(companyDomain, sectionData.merchant?.merchant_logo, '')}
                                                domain={companyDomain}
                                            />
                                        </div>
                                        <button className="w-full bg-slate-900 text-white py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-600 transition-all duration-300 shadow-sm">
                                            View Product
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                {/* Mobile View All Button */}
                <div className="md:hidden flex justify-center mt-8">
                    <Link
                        href={getMerchantHref(sectionData.merchant, mer_slug, mer_slug_type)}
                        className="px-6 py-3 bg-slate-900 hover:bg-indigo-600 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
                    >
                        View All
                    </Link>
                </div>
            </div>
        );
    };

    return (
        <section className="pt-4 px-4 md:px-8 lg:px-16 pb-28 bg-white">
            <div className="container mx-auto">
                {renderSection(responseData?.first, "Featured Products")}
                {renderSection(responseData?.second, "Popular Products")}

                {!responseData?.first?.offers?.length && !responseData?.second?.offers?.length && (
                    <div className="text-center py-16">
                        <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                            Featured <span className="text-indigo-600">Products</span>
                        </h2>
                        <p className="text-lg text-slate-500">No products available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};


export default ProductSection;