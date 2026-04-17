import { apiGetCategoryProductsOffer } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks'
import EventOfferCard from '@/components/Theme-3/comp/EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import ProductCategorySchema from '@/components/shared/SchemaScripts/ProductCategorySchema'

interface Props {
    slug: string;        // merchant slug e.g. "amazon.com"
    companyId: string;
    storeSlug: string;
    slugType: string;
    category: string;    // category slug e.g. "healthcare"
}

const CategoryOffersPage = async ({ slug, companyId, storeSlug, slugType, category }: Props) => {
    const domainData = await cookieService.get("domain");
    const companyDomain = domainData?.domain;

    const [products, merRes] = await Promise.all([
        apiGetCategoryProductsOffer(companyId, slug, category).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
    ]);

    const formatCategoryName = (slug: string): string => 
        slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    return (
        <>
            {/* Header Banner Section */}
            <section className="relative overflow-hidden bg-[#fffde0] border-b border-[#800000]/10 rounded-3xl mx-4 lg:mx-20 mt-6">
                <div className="container mx-auto px-6 py-12 lg:py-20">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
                        {/* Left Side: Content */}
                        <div className="w-full lg:w-1/2 space-y-6 z-10">
                            <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] capitalize leading-tight">
                                {formatCategoryName(category)}
                            </h1>
                            
                            <nav aria-label="breadcrumb">
                                <ol className="flex flex-wrap items-center gap-3 text-sm md:text-base">
                                    <li className="flex items-center gap-2">
                                        <Link href="/" className="text-slate-500 hover:text-[#800000] transition-colors">Home</Link>
                                        <FontAwesomeIcon icon={faGreaterThan} className="w-3 h-3 text-slate-400" />
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Link href="/products" className="text-slate-500 hover:text-[#800000] transition-colors">Products</Link>
                                        <FontAwesomeIcon icon={faGreaterThan} className="w-3 h-3 text-slate-400" />
                                    </li>
                                    <li className="flex items-center gap-2 capitalize">
                                        <Link href={`/products/${slug}`} className="text-slate-500 hover:text-[#800000] transition-colors">
                                            {merRes?.merchant_name || slug}
                                        </Link>
                                        <FontAwesomeIcon icon={faGreaterThan} className="w-3 h-3 text-slate-400" />
                                    </li>
                                    <li className="font-bold text-[#800000] capitalize" aria-current="page">
                                        {formatCategoryName(category)}
                                    </li>
                                </ol>
                            </nav>
                        </div>

                        {/* Right Side: Visual Banner */}
                        <div className="w-full lg:w-1/2 relative min-h-[250px] md:min-h-[350px]">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl shadow-[#800000]/10">
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="Category Banner"
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="py-12 px-4 lg:px-20 bg-white">
                <div className="container mx-auto">
                    <div className="mb-10">
                        <h2 className="text-2xl md:text-4xl font-black text-[#1A1A1A] capitalize leading-tight">
                            Discover <span className="text-[#800000]">{formatCategoryName(category)}</span> 
                            <span className="block text-lg md:text-xl font-medium text-slate-500 mt-2 italic">
                                Handpicked products from {merRes?.merchant_name}
                            </span>
                        </h2>
                    </div>

                    {products?.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                            {products.map((item, i) => (
                                <div key={i} className="transition-transform duration-300 hover:-translate-y-2">
                                    <EventOfferCard
                                        product={item}
                                        merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                        domain={companyDomain}
                                        merchant_name={merRes?.merchant_name}
                                        merchant_logo={merRes?.merchant_logo}
                                        productDetailUrl={getProductDetailHref(merRes, slugType, item?.slug, item?.category?.slug)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                            <p className="text-slate-500 text-lg">No products found in this category yet.</p>
                        </div>
                    )}
                </div>
            </section>

            <ProductCategorySchema 
                company_id={companyId} 
                merchantSlug={slug} 
                merchantName={merRes?.merchant_name} 
                categorySlug={category} 
                categoryName={formatCategoryName(category)} 
            />
        </>
    )
}

export default CategoryOffersPage