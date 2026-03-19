import { apiGetCategoryProducts, apiGetMerchantProducts } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import React from 'react'
import { getMerchantHref, getMerchantProductsSeo, getProductDetailHref } from '@/constants/hooks'
import EventOfferCard from './EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'
import Header from './Header'
import Footer from './Footer'
import MerchantCategoriesSection from './MerchantCategoriesSection'
import MerchantProductsSchema from '@/components/shared/SchemaScripts/ProductsMerchantSchema'

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
}

const MerchantProductsPage = async ({ slug, companyId, storeSlug, slugType }: Props) => {
    const companyDomain = (await cookieService.get("domain"));
    const [products, merRes, cat] = await Promise.all([
        apiGetMerchantProducts(companyId, slug).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data),
        apiGetCategoryProducts(companyId, slug).then(res => res.data)
    ]);

    return (
        <>
            <Header
                title={getMerchantProductsSeo(merRes?.merchant_name)}
                subtitle=""
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Products', href: '/products' },
                    { label: slug }
                ]}
                showImage={true}
            />

            <MerchantCategoriesSection
                merchantName={merRes?.merchant_name}
                merchantSlug={slug}
                categories={cat}
            />

            <section className="py-16 bg-slate-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-black text-slate-900 mb-8">
                        Discover Quality Discount Products from {merRes?.merchant_name}
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
                        <div className="text-center py-20">
                            <p className="text-slate-600 text-lg">No products found for {merRes?.merchant_name}</p>
                        </div>
                    )}
                </div>

                <MerchantProductsSchema company_id={companyId} merchantSlug={slug} merchantName={merRes?.merchant_name} />
            </section>

            <Footer />
        </>
    )
}

export default MerchantProductsPage
