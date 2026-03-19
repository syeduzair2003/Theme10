import { apiGetProductDetails, apiGetCategoryProductsOffer, apiGetCategoryProducts } from '@/apis/user'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import { getBaseImageUrl, calculateDiscountPercent, discardHTMLTags, getCurrencySymbol, getMerchantHref, getProductDetailHref, getProductMerchantHref } from '@/constants/hooks'
import cookieService from '@/services/CookiesService'
import Link from 'next/link'
import { notFound, redirect } from 'next/navigation'
import React from 'react'
import SpecificProductSchema from '@/components/shared/SchemaScripts/SpecificProductSchema'
import Footer from './Footer'
import Image from 'next/image'
import EventOfferCard from './EventOfferCard'
import CommentSection from './CommentSection'
import { apiGetMerchantUniqueId } from '@/apis/merchant'

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
    product_id: string;
    current_merchant_slug: string;
    categorySlug?: string;
}

const OfferDetailsPage = async ({ company_id, store_slug, slug_type, product_id, current_merchant_slug, categorySlug }: Props) => {
    const companyDomain = (await cookieService.get('domain')).domain;
    const [response, merRes, categories] = await Promise.all([
        apiGetProductDetails(company_id, product_id, current_merchant_slug).then(res => res.data),
        apiGetMerchantUniqueId(current_merchant_slug, company_id).then(res => res.data),
        apiGetCategoryProducts(company_id, current_merchant_slug).then(res => res.data).catch(() => [])
    ]);
    if (response == null) return notFound();

    // Check if URL has category but product doesn't have category - redirect to URL without category
    if (categorySlug && !response?.category?.slug) {
        redirect(`/products/${current_merchant_slug}/${response?.slug}`);
    }

    // Check if URL has wrong category - show 404
    if (categorySlug && response?.category?.slug && categorySlug !== response?.category?.slug) {
        return notFound();
    }

    // Fetch related products from same category
    const relatedProducts = response?.category?.slug
        ? (await apiGetCategoryProductsOffer(company_id, current_merchant_slug, response.category.slug).then(res => res.data).catch(() => []))
        : [];

    const breadcrumbs = [
        { label: 'Home', href: '/' },
        { label: 'Products', href: `/products` },
        { label: response?.merchant?.merchant_name || current_merchant_slug, href: `/products/${current_merchant_slug}` },
        {
            label: categorySlug || response?.category?.name || "",
            href: categorySlug || response?.category?.slug
                ? `/products/${current_merchant_slug}/${response?.category?.slug}`
                : undefined
        },
        { label: discardHTMLTags(response?.offer_title) }
    ].filter(crumb => crumb.label);

    return (
        <>
            <section className="py-10 bg-white min-h-screen">
                <div className="ml-5 mb-5 inline-flex max-w-full overflow-x-auto whitespace-nowrap items-center gap-2 px-6 py-3 rounded-full bg-slate-900 text-white text-xs md:text-sm font-medium shadow-lg backdrop-blur-md scrollbar-hide">
                    <nav className="flex items-center gap-2 text-sm">
                        {breadcrumbs.map((crumb, index) => (
                            <React.Fragment key={index}>
                                {crumb.href ? (
                                    <Link href={crumb.href} className="hover:text-indigo-400 transition-colors">
                                        {crumb.label}
                                    </Link>
                                ) : (
                                    <span className="text-indigo-600 font-semibold">{crumb.label}</span>
                                )}
                                {index < breadcrumbs.length - 1 && (
                                    <span className="text-slate-400">/</span>
                                )}
                            </React.Fragment>
                        ))}
                    </nav>
                </div>
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* Main Content */}
                        <div className="w-full lg:w-2/3">
                            <div className="border border-gray-200 rounded-2xl overflow-hidden">

                                {/* Hero Row */}
                                <div className="p-8 flex flex-col sm:flex-row gap-8">

                                    {/* Product Image */}
                                    <div className="w-full sm:w-40 shrink-0">
                                        <div className="aspect-square rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center overflow-hidden group">
                                            <Image
                                                src={getBaseImageUrl(companyDomain, response.product_image, "")}
                                                width={400}
                                                height={400}
                                                alt={response.offer_title}
                                                className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* Info Column */}
                                    <div className="flex-1 flex flex-col gap-6">

                                        {/* Badge + Title */}
                                        <div>
                                            <span className="inline-block mb-3 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                                                ✦ Verified Offer
                                            </span>
                                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-snug">
                                                {response.offer_title}
                                            </h1>
                                        </div>

                                        {/* Pricing + CTA */}
                                        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100">
                                            <div className="flex items-baseline gap-3">
                                                <span className="text-3xl font-black text-slate-900">
                                                    {getCurrencySymbol(response.currency)}{response.sale_price}
                                                </span>
                                                {response.original_price && (
                                                    <>
                                                        <span className="text-md text-gray-400 line-through">
                                                            {getCurrencySymbol(response.currency)}{response.original_price}
                                                        </span>
                                                        <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                                                            -{calculateDiscountPercent(response.original_price, response.sale_price)}%
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            <OfferOutUrl
                                                unique_id={response?.unique_id}
                                                outUrl={response?.url}
                                                merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)}
                                                domain={companyDomain}
                                                customClass="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white text-sm font-black rounded-xl px-6 py-3 transition-colors duration-200"
                                            >
                                                <span>Get Deal</span>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                </svg>
                                            </OfferOutUrl>
                                        </div>
                                    </div>
                                </div>

                                {/* Offer Details */}
                                {response.offer_detail && (
                                    <div className="px-8 py-6 border-t border-gray-100 bg-gray-50">
                                        <h3 className="text-xs font-bold text-gray-800 uppercase tracking-widest mb-4">
                                            Offer Details
                                        </h3>
                                        <div
                                            className="font-semi-bold prose prose-sm prose-slate max-w-none text-slate-800 leading-relaxed prose-strong:text-slate-800"
                                            dangerouslySetInnerHTML={{ __html: response.offer_detail }}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <aside className="w-full lg:w-1/3">
                            <div className="sticky top-10 space-y-6">
                                <div className="border border-gray-100 rounded-xl p-5 flex flex-col items-center text-center gap-4 bg-white">

                                    <div className="w-16 h-16 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-2">
                                        <Image
                                            alt={response?.merchant?.merchant_name}
                                            src={getBaseImageUrl(companyDomain, response?.merchant?.merchant_logo, "")}
                                            className="object-contain w-full h-full"
                                            width={64}
                                            height={64}
                                        />
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-900">
                                            {response?.merchant?.merchant_name}
                                        </h4>
                                        <p className="text-xs text-gray-400 mt-0.5">Official Store</p>
                                    </div>

                                    <div className="w-full h-px bg-gray-100" />

                                    <Link
                                        href={getMerchantHref(response?.merchant, store_slug, slug_type)}
                                        className="w-full text-center text-sm font-bold text-white bg-slate-900 hover:bg-indigo-600 rounded-xl px-4 py-2.5 transition-colors duration-150"
                                    >
                                        Browse All Store Deals
                                    </Link>

                                </div>

                                <div className="border border-gray-100 rounded-xl p-5 bg-white">
                                    <CommentSection offer_id={response?.unique_id} company_id={company_id} />
                                </div>

                                {categories?.length > 0 && (
                                    <div className="border border-gray-100 rounded-xl p-5 bg-white">
                                        <h4 className="text-lg font-black text-slate-900 mb-4">
                                            Related Categories from {response?.merchant?.merchant_name}
                                        </h4>

                                        <div className="space-y-2">
                                            {categories.slice(0, 10).map((category, i) => (
                                                <Link
                                                    key={category.slug || i}
                                                    href={`${getProductMerchantHref(response?.merchant, slug_type)}/${category.slug}`}
                                                    className="font-bold flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors text-sm"
                                                >
                                                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full shrink-0" />
                                                    <span>{category?.name}</span>
                                                </Link>
                                            ))}
                                        </div>

                                        <Link
                                            href={getProductMerchantHref(response?.merchant, slug_type)}
                                            className="inline-flex items-center gap-2 mt-4 text-indigo-600 hover:text-indigo-700 font-bold text-sm transition-colors group"
                                        >
                                            <span>See All</span>
                                            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* Related Products Section */}
            {relatedProducts?.filter((item: any) => item.unique_id !== response.unique_id).length > 0 && (
                <section className="py-16 bg-slate-50">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-8">
                            More from <span className="text-indigo-600">{response?.category?.name || 'this category'}</span>
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {relatedProducts.filter((item: any) => item.unique_id !== response.unique_id).slice(0, 4).map((item: any, i: number) => (
                                <EventOfferCard
                                    key={i}
                                    product={item as unknown as any}
                                    merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)}
                                    domain={companyDomain}
                                    merchant_name={response?.merchant?.merchant_name}
                                    merchant_logo={response?.merchant?.merchant_logo}
                                    productDetailUrl={getProductDetailHref(response?.merchant, slug_type, item.slug, item?.category?.slug)}
                                />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />

            <SpecificProductSchema
                company_id={company_id}
                product_id={response?.unique_id}
                current_merchant_slug={current_merchant_slug}
                slug_type={slug_type}
            />
        </>
    )
}

export default OfferDetailsPage
