import { apiGetProductDetails } from '@/apis/user'
import OfferOutUrl from '@/components/shared/OfferOutUrl'
import { calculateDiscountPercent, discardHTMLTags, getBaseImageUrl, getCurrencySymbol, getFinalDiscountTag, getMerchantHref, getProductMerchantHref, getRandomRating, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks'
import { faGreaterThan, faChevronRight, faStar, faBagShopping } from '@/constants/icons' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import RenderRating from './RenderRating'
import RateUs from './RateUs'
import SpecificProductSchema from '@/components/shared/SchemaScripts/SpecificProductSchema'

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
    product_id: string;
    current_merchant_slug: string;
}

const OfferDetailsPage = async ({ company_id, store_slug, slug_type, product_id, current_merchant_slug }: Props) => {
    const companyDomain = (await cookieService.get('domain')).domain;
    const response = (await apiGetProductDetails(company_id, product_id, current_merchant_slug)).data;
    if (response == null) return notFound();

    const discount = calculateDiscountPercent(response?.original_price, response?.sale_price);

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-20">
            {/* --- BREADCRUMB SECTION --- */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-30 border-b border-slate-200/60">
                <div className="container mx-auto px-4 py-3.5">
                    <nav className="flex flex-wrap items-center gap-3 text-xs md:text-sm font-semibold text-slate-500">
                        <Link href="/" className="hover:!text-blue-600 transition-all flex items-center gap-1">Home</Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-300" />
                        <Link href="/products" className="hover:!text-blue-600 transition-all">Products</Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-300" />
                        <Link href={getProductMerchantHref(response?.merchant, slug_type)} className="hover:!text-blue-600 transition-all">
                            {response?.merchant?.merchant_name}
                        </Link>
                        <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-slate-300" />
                        <span className="text-slate-900 truncate max-w-[150px] md:max-w-[300px]">{response?.offer_title}</span>
                    </nav>
                </div>
            </div>

            <main className="container mx-auto px-4 mt-10">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* --- LEFT COLUMN: PRODUCT MAIN CARD --- */}
                    <div className="flex-1 space-y-8">
                        <div className="bg-white rounded-[2.5rem] p-6 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100">
                            <div className="flex flex-col xl:flex-row gap-12">
                                
                                {/* Image Box */}
                                <div className="w-full xl:w-[40%]">
                                    <div className="relative aspect-square rounded-[2rem] bg-slate-50 border border-slate-100 group overflow-hidden shadow-inner">
                                        <Image
                                            src={getBaseImageUrl(companyDomain, response?.product_image, "")}
                                            alt={response?.offer_title}
                                            fill
                                            className="object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                            sizes="(max-width: 768px) 100vw, 400px"
                                            priority
                                        />
                                        {/* {discount > 0 && (
                                            <div className="absolute top-5 left-5 bg-blue-600 text-white text-[11px] font-black px-4 py-2 rounded-full shadow-xl tracking-widest uppercase">
                                                SAVE {discount}%
                                            </div>
                                        )} */}
                                    </div>
                                </div>

                                {/* Content Info */}
                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                    <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 w-fit px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
                                        </span>
                                        Verified Offer
                                    </div>
                                    
                                    <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight">
                                        {discardHTMLTags(response?.offer_title)}
                                    </h1>

                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-4">
                                            <span className="text-5xl font-black text-slate-900">
                                                {getCurrencySymbol(response?.currency)}{response?.sale_price}
                                            </span>
                                            {response?.original_price && (
                                                <span className="text-2xl text-slate-300 line-through decoration-slate-400/40 font-bold">
                                                    {getCurrencySymbol(response?.currency)}{response?.original_price}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-slate-400 text-sm font-medium italic">Inclusive of all taxes</p>
                                    </div>

                                    <div className="pt-4">
                                        {/* <OfferOutUrl 
                                            domain={companyDomain} 
                                            merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)} 
                                            outUrl={response?.url} 
                                            unique_id={response?.unique_id} 
                                            customClass="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-slate-900 hover:!text-white text-white py-5 px-10 rounded-[1.25rem] text-lg font-black transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200 active:scale-95 shadow-lg shadow-blue-100/50"
                                        >
                                            <FontAwesomeIcon icon={faBagShopping} className="text-xl" />
                                            <span>GO TO STORE</span>
                                        </OfferOutUrl> */}
                                        <OfferOutUrl 
                                            domain={companyDomain} 
                                            merchantHref={getMerchantHref(response?.merchant, store_slug, slug_type)} 
                                            outUrl={response?.url} 
                                            unique_id={response?.unique_id} 
                                            customClass="group w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-slate-900 text-white py-5 px-10 rounded-[1.25rem] text-lg font-black transition-all duration-300 hover:shadow-2xl hover:shadow-blue-200 active:scale-95 shadow-lg shadow-blue-100/50"
                                        >
                                            <FontAwesomeIcon 
                                                icon={faBagShopping} 
                                                className="text-xl text-white transition-colors duration-300" 
                                            />
                                            <span className="text-white group-hover:text-white transition-colors duration-300">
                                                GO TO STORE
                                            </span>
                                        </OfferOutUrl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- DESCRIPTION SECTION --- */}
                        {response?.offer_detail && (
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-4 mb-8">
                                    <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">About the Offer</h3>
                                    <div className="h-[2px] flex-1 bg-slate-100"></div>
                                </div>
                                <div 
                                    className="prose prose-slate max-w-none text-slate-600 text-lg leading-[1.8]
                                    prose-headings:text-slate-900 prose-headings:font-bold prose-strong:text-slate-900 prose-a:text-blue-600"
                                    dangerouslySetInnerHTML={{ __html: response?.offer_detail }}
                                />
                            </div>
                        )}
                    </div>

                    {/* --- RIGHT COLUMN: SIDEBAR --- */}
                    <div className="w-full lg:w-[400px] space-y-6">
                        {/* Merchant Profile Card */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm sticky top-28">
                            <div className="flex flex-col items-center text-center space-y-6">
                                <div className="group relative w-full h-32 bg-slate-50 rounded-[1.5rem] border border-dashed border-slate-200 p-6 flex items-center justify-center transition-all hover:bg-white hover:border-solid hover:border-blue-100">
                                    <Image 
                                        src={getBaseImageUrl(companyDomain, response?.merchant?.merchant_logo, "")}
                                        alt={response?.merchant?.merchant_name}
                                        fill
                                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <h4 className="font-black text-slate-900 text-xl tracking-tight leading-none">
                                        {response?.merchant?.merchant_name}
                                    </h4>
                                    <div className="flex justify-center items-center gap-3 mt-4">
                                        <div className="flex text-amber-400 gap-0.5 text-sm drop-shadow-sm">
                                            <RenderRating rating={getRandomRating(response?.merchant?.rating)} />
                                        </div>
                                        <span className="text-xs font-black bg-slate-900 px-2.5 py-1 rounded-md text-white">
                                            {getRandomRating(response?.merchant?.rating)}
                                        </span>
                                    </div>
                                </div>

                                <div className="w-full border-t border-slate-100 pt-8">
                                    <div className="bg-slate-50 rounded-2xl p-6">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">How do you like it?</p>
                                        <RateUs offer_id={response?.unique_id || ""} company_id={company_id} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            
            <SpecificProductSchema 
                company_id={company_id} 
                product_id={response?.unique_id} 
                current_merchant_slug={current_merchant_slug} 
                slug_type={slug_type} 
            />
        </div>
    )
}

export default OfferDetailsPage