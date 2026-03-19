import { apiGetCategoryProductsOffer } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import Link from 'next/link'
import React from 'react'
import { getMerchantHref, getProductDetailHref } from '@/constants/hooks'
import EventOfferCard from './EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import Header from './Header'
import Footer from './Footer'
import ProductCategorySchema from '@/components/shared/SchemaScripts/ProductCategorySchema'

const formatCategoryName = (slug: string): string => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
    category: string;
}

const CategoryProductoffers = async ({ slug, companyId, storeSlug, slugType, category }: Props) => {
    const companyDomain = await cookieService.get("domain");

    const [products, merRes] = await Promise.all([
        apiGetCategoryProductsOffer(companyId, slug, category).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
    ]);

    return (
        <>
            <Header
                title={`${category} Offers from ${merRes?.merchant_name}`}
                subtitle=""
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: merRes?.merchant_name || slug, href: `/products/${slug}` },
                    { label: category }
                ]}
                showImage={true}
            />

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black text-slate-900 mb-8 capitalize">
                        Discover {category} Products from {merRes?.merchant_name}
                    </h2>

                    {products?.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((item, i) => (
                                <div key={i}>
                                    <EventOfferCard
                                        product={item as unknown as any}
                                        merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                        domain={companyDomain.domain}
                                        merchant_name={merRes?.merchant_name}
                                        merchant_logo={merRes?.merchant_logo}
                                        productDetailUrl={getProductDetailHref(merRes, slugType, item.slug, item?.category?.slug)}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 gap-4">
                            <p className="text-slate-600 text-lg">No offers found in <span className="capitalize font-bold">{category}</span> for {merRes?.merchant_name}.</p>
                            <Link href={`/products/${slug}`} className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                Back to all {merRes?.merchant_name} offers
                            </Link>
                        </div>
                    )}
                </div>

                <ProductCategorySchema company_id={companyId} merchantSlug={slug} merchantName={merRes?.merchant_name} categorySlug={category} categoryName={formatCategoryName(category)} />
            </section>

            <Footer />
        </>
    )
}

export default CategoryProductoffers
