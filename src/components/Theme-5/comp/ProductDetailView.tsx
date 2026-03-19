"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Offer } from '@/services/dataTypes'
import { discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getRandomRating } from '@/constants/hooks'
import OfferOutUrl from '@/components/shared/OfferOutUrl'

interface Props {
    product: Offer
    companyId: string
    domain: string
}

const ProductDetailView = ({ product, companyId, domain }: Props) => {
    const merchantHref = getMerchantHref(product?.merchant, '', '')
    const originalPrice = product?.original_price ? parseFloat(product.original_price) : 0
    const salePrice = product?.sale_price ? parseFloat(product.sale_price) : 0
    const discountPercent = originalPrice > 0 && salePrice > 0
        ? Math.round(((originalPrice - salePrice) / originalPrice) * 100)
        : null
    const finalDiscountTag = getFinalDiscountTag(product?.offer_title, discountPercent)
    const endDate = product?.end_date
    const daysLeft = endDate ? Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : null

    return (
        <div className="min-h-screen bg-[#F4F4F5] pb-24 font-sans selection:bg-indigo-500 selection:text-white">

            {/* Minimalist Breadcrumb */}
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-6">
                <nav className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                    <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
                    <span>/</span>
                    <Link href={merchantHref} className="hover:text-slate-900 transition-colors">{product?.merchant?.merchant_name}</Link>
                    <span>/</span>
                    <span className="text-slate-900 truncate max-w-[200px]">{discardHTMLTags(product?.offer_title)}</span>
                </nav>
            </div>

            {/* Bento Grid */}
            <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                    {/* 1. Large Image Canvas (Takes up 8 columns) */}
                    <div className="md:col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-16 relative flex items-center justify-center min-h-[400px] lg:min-h-[600px] border border-slate-100 shadow-sm group">
                        {finalDiscountTag && (
                            <div className="absolute top-6 left-6 md:top-8 md:left-8 bg-black text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest z-10">
                                {finalDiscountTag}
                            </div>
                        )}
                        <div className="relative w-full h-full max-w-lg aspect-square transform group-hover:scale-105 transition-transform duration-700 ease-out">
                            <Image
                                src={getBaseImageUrl(domain, product?.product_image || product?.merchant?.merchant_logo, "")}
                                alt={product?.offer_title}
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    {/* Right Side Stack (Takes up 4 columns) */}
                    <div className="md:col-span-12 lg:col-span-4 flex flex-col gap-6">

                        {/* 2. Core Information Card */}
                        <div className="bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex-1 flex flex-col justify-center">
                            <div className="flex flex-wrap gap-2 mb-6">
                                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                    {product?.offer_type?.name || "Special Offer"}
                                </span>
                                <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Verified
                                </span>
                            </div>

                            <h1 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight mb-8">
                                {discardHTMLTags(product?.offer_title)}
                            </h1>

                            <div className="mt-auto">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Current Price</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">
                                        {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                    </span>
                                    {product?.original_price && (
                                        <span className="text-lg line-through text-slate-300 font-semibold">
                                            {getCurrencySymbol(product?.currency)}{product?.original_price}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* 3. The "Dark Mode" Action Card */}
                        <div className="bg-slate-900 rounded-[2rem] p-8 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
                            {/* Decorative background glow */}
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-500 rounded-full blur-3xl opacity-30 pointer-events-none" />

                            <div className="relative z-10 space-y-4">
                                <OfferOutUrl
                                    unique_id={product?.unique_id}
                                    outUrl={product?.url}
                                    merchantHref={merchantHref}
                                    domain={domain}
                                    customClass="w-full h-16 bg-white hover:bg-indigo-500 text-slate-900 hover:text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all duration-300 flex items-center justify-center gap-3 group"
                                >
                                    {product?.coupon_code ? (
                                        <>
                                            <span className="font-mono bg-slate-100 text-slate-900 px-3 py-1 rounded-lg text-sm tracking-normal group-hover:hidden">
                                                {product?.coupon_code.trim().slice(0, 8)}...
                                            </span>
                                            <span className="hidden group-hover:block">Reveal Full Coupon</span>
                                        </>
                                    ) : (
                                        product?.offer_type?.name === "product" ? "Purchase Now" : "Claim Offer"
                                    )}
                                </OfferOutUrl>

                                {daysLeft !== null && daysLeft > 0 && (
                                    <div className="flex items-center justify-center gap-2 pt-2">
                                        <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">
                                            Ends in {daysLeft} days
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section - Spans Grid */}

                    {/* 4. Description Detail Card */}
                    <div className="md:col-span-12 lg:col-span-8 bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-900">Product Details</h3>
                            <div className="h-px flex-1 bg-slate-100" />
                        </div>
                        {product?.offer_detail ? (
                            <div
                                className="prose prose-slate prose-p:text-slate-500 prose-headings:text-slate-900 max-w-none prose-p:leading-relaxed prose-a:text-indigo-600"
                                dangerouslySetInnerHTML={{ __html: product?.offer_detail }}
                            />
                        ) : (
                            <p className="text-slate-400 italic text-sm">No additional details provided for this offer.</p>
                        )}
                    </div>

                    {/* 5. Merchant Mini-Profile */}
                    <div className="md:col-span-12 lg:col-span-4 bg-white rounded-[2rem] p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center text-center">
                        <div className="w-24 h-24 relative mb-6 rounded-3xl bg-slate-50 p-4 border border-slate-100">
                            <Image
                                src={getBaseImageUrl(domain, product?.merchant?.merchant_logo, "")}
                                alt={product?.merchant?.merchant_name}
                                fill
                                className="object-contain p-2"
                            />
                        </div>
                        <h4 className="text-xl font-black text-slate-900 mb-1">
                            {product?.merchant?.merchant_name}
                        </h4>
                        <Link href={merchantHref} className="text-xs font-bold text-indigo-600 uppercase tracking-widest hover:text-indigo-800 transition-colors mb-8">
                            View Store Profile
                        </Link>

                        <div className="w-full bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100">
                            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Store Rating</span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-black text-slate-900">{getRandomRating(product?.merchant?.rating)}</span>
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < getRandomRating(product?.merchant?.rating) ? 'text-amber-400' : 'text-slate-300'}`} fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailView