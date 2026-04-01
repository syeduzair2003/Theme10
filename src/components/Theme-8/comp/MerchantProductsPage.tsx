import { apiGetMerchantProducts } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getMerchantHref, getMerchantProductsSeo, getBaseImageUrl, getProductDetailHref } from '@/constants/hooks'
import EventOfferCard from '@/components/Theme-8/comp/EventOfferCard'
import { apiGetMerchantUniqueId } from '@/apis/merchant'

interface Props {
    slug: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
}

const MerchantProductsPage = async ({slug, companyId, storeSlug, slugType}: Props) => {
    const companyDomain = (await cookieService.get("domain"));
    const [products, merRes] = await Promise.all([
        apiGetMerchantProducts(companyId, slug).then(res => res.data),
        apiGetMerchantUniqueId(slug, companyId).then(res => res.data)
    ]);

    return (
        <div className="min-h-screen bg-[#fcfdfe]">
            {/* --- MODERN HEADER SECTION --- */}
            <div className="relative bg-[#0f172a] py-20 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full -mr-20 -mt-20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[80px] rounded-full -ml-10 -mb-10"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <nav className="flex items-center space-x-3 mb-8 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <Link href="/" className="hover:!text-blue-400 transition-colors">Home</Link>
                        <FontAwesomeIcon icon={faGreaterThan} className="text-[8px] text-slate-700" />
                        <Link href="/products" className="hover:!text-blue-400 transition-colors">Products</Link>
                        <FontAwesomeIcon icon={faGreaterThan} className="text-[8px] text-slate-700" />
                        <span className="text-blue-500 italic">{merRes?.merchant_name || slug}</span>
                    </nav>
                    
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter uppercase italic">
                            {getMerchantProductsSeo(merRes?.merchant_name)}
                        </h1>
                        <div className="h-2 w-24 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full mt-6"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
                <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center space-x-6">
                        <div className="w-20 h-20 relative bg-slate-50 rounded-2xl shadow-inner p-3 border border-slate-100 group">
                            <Image
                                src={getBaseImageUrl(companyDomain?.domain, merRes?.merchant_logo, "")}
                                alt="merchant logo"
                                fill
                                className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight uppercase">
                                <span className="text-blue-600 italic">Top Picks</span> from {merRes?.merchant_name}
                            </h2>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Verified Official Store Products</p>
                        </div>
                    </div>
                    
                    <Link 
                        href={getMerchantHref(merRes, storeSlug, slugType)}
                        className="bg-slate-900 hover:bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg active:scale-95"
                    >
                        Visit Store Profile
                    </Link>
                </div>
            </div>

            <section className="max-w-7xl mx-auto px-6 py-20">
                {products?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                        {products.map((item, i) => (
                            <div key={i} className="flex h-full transform hover:-translate-y-2 transition-transform duration-500">
                                <EventOfferCard
                                    product={item}
                                    merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                                    domain={companyDomain.domain}
                                    merchant_name={merRes?.merchant_name}
                                    merchant_logo={merRes?.merchant_logo}
                                    productDetailUrl={getProductDetailHref(merRes, slugType, item.slug)}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-32 text-center bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                        <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                             <FontAwesomeIcon icon={faGreaterThan} className="text-slate-300 text-2xl rotate-90" />
                        </div>
                        <h3 className="text-slate-900 font-black text-2xl uppercase tracking-tight">No Products Found</h3>
                        <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mt-2">
                            {/* Fixed the quote here */}
                            We couldn&apos;t find any active products for this store.
                        </p>
                        <Link href="/products" className="inline-block mt-8 text-blue-600 font-black text-xs uppercase tracking-[0.2em] hover:underline">
                            Browse Other Brands
                        </Link>
                    </div>
                )}
            </section>
        </div>
    )
}

export default MerchantProductsPage