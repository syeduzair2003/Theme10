import React from 'react'
import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user'
import cookieService from '@/services/CookiesService'
import { getBaseImageUrl, getProductMerchantHref, splitHeading } from '@/constants/hooks'
import Header from '../../comp/Header'
import Footer from '../../comp/Footer'
import Image from 'next/image'
import Link from 'next/link'
import ProductsSchema from '@/components/shared/SchemaScripts/ProductsSchema'

const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

    const [first, second] = splitHeading("Browse Discounted Products from All Leading Brands")

    return (
        <>
            <Header
                title="Get Top Discounts on Popular brand Products "
                subtitle=""
                breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Products' }
                ]}
                showImage={true}
            />

            <div className="container mx-auto px-4 py-16">
                {/* Centered Header */}
                <div className="mb-16">
                    <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
                        <span className="text-slate-900">{first || 'Browse Discounted'} </span>
                        <span className="text-indigo-600">{second || 'Products'}</span>
                    </h2>
                </div>

                {/* Centered Grid: 'justify-center' ensures cards stay in the middle if the row isn't full */}
                <div className="flex flex-wrap justify-center gap-8">
                    {merchants?.length > 0 ? (
                        merchants.map((item, i) => (
                            <Link
                                key={i}
                                href={getProductMerchantHref(item, companyData?.slug_type)}
                                className="group relative w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] xl:w-[calc(20%-2rem)] max-w-[280px]"
                            >
                                {/* The Card Body with Animation */}
                                <div className="relative bg-white rounded-[2.5rem] p-3 transition-all duration-500 
                                  ease-[cubic-bezier(0.34,1.56,0.64,1)] 
                                  hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.3)] 
                                  hover:-translate-y-4 border border-slate-100 h-full flex flex-col">

                                    {/* Logo Container with "Pop" effect */}
                                    <div className="relative aspect-square w-full bg-slate-50 rounded-[2rem] overflow-hidden flex items-center justify-center 
                                      transition-all duration-500 group-hover:bg-white group-hover:ring-4 group-hover:ring-indigo-50">

                                        <div className="relative z-10 p-8 transform transition-transform duration-500 group-hover:scale-110">
                                            <Image
                                                src={getBaseImageUrl(companyDomain.domain, item?.merchant_logo, "")}
                                                alt={item?.merchant_name}
                                                width={100}
                                                height={100}
                                                className="object-contain"
                                            />
                                        </div>

                                        {/* Animated Shine Effect */}
                                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                    </div>

                                    {/* Text Content */}
                                    <div className="px-2 py-6 text-center">
                                        <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-2">
                                            {item?.merchant_name}
                                        </h3>

                                        <div className="flex justify-center items-center h-8">
                                            {item?.promotional_tag ? (
                                                <span className="inline-block text-[10px] font-bold text-white bg-indigo-600 px-4 py-1.5 rounded-full shadow-lg shadow-indigo-200">
                                                    {item.promotional_tag}
                                                </span>
                                            ) : (
                                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter opacity-60">
                                                    Official Partner
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="w-full text-center py-20">
                            <p className="text-slate-400 font-medium">No merchants available</p>
                        </div>
                    )}
                </div>

                <ProductsSchema company_id={companyData.unique_id} />
            </div>

            <Footer />
        </>
    )
}

export default page