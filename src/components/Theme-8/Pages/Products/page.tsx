import { apiCompanyUpdatedData, apiGetProductMerchants } from '@/apis/user'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import cookieService from '@/services/CookiesService'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { getProductMerchantHref } from '@/constants/hooks'
import MerchantForProduct from '../../comp/MerchantForProduct'

const page = async () => {
    const companyDomain = (await cookieService.get("domain"));
    const companyData = (await apiCompanyUpdatedData(companyDomain)).data;
    const merchants = (await apiGetProductMerchants(companyData?.unique_id)).data;

    return (
        <main className="min-h-screen bg-[#fcfdfe]">
            {/* --- MODERN HERO SECTION --- */}
            <section className="px-4 pt-10 pb-16">
                <div className="max-w-7xl mx-auto bg-[#0f172a] rounded-[3rem] overflow-hidden relative shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] border border-slate-800">
                    {/* Decorative Background Glows */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -mr-40 -mt-40"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] rounded-full -ml-20 -mb-20"></div>

                    <div className="flex flex-col lg:flex-row items-center relative z-10">
                        {/* Left Content */}
                        <div className="w-full lg:w-1/2 p-10 md:p-20">
                            <nav className="flex items-center space-x-3 mb-10">
                                <Link href="/" className="!text-slate-400 hover:!text-blue-400 transition-colors text-xs font-bold uppercase tracking-widest">Home</Link>
                                <FontAwesomeIcon icon={faGreaterThan} className="text-slate-700 text-[8px]" />
                                <span className="text-blue-500 text-xs font-bold uppercase tracking-widest">Exclusive Products</span>
                            </nav>
                            
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-8 tracking-tighter">
                                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 italic">Brands</span> & Deals
                            </h1>
                            <p className="text-slate-400 text-lg leading-relaxed max-w-md mb-10 font-medium">
                                Access hand-picked premium products and verified discount codes from world-renowned merchants.
                            </p>
                            
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-1 bg-blue-500 rounded-full"></div>
                                <span className="text-slate-500 text-sm font-bold uppercase tracking-tighter">Verified by <br/> Our Experts</span>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] flex items-center justify-center">
                            <div className="relative w-[80%] h-[80%] group">
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="Premium Offers"
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-110 group-hover:-rotate-2 transition-all duration-1000"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- MERCHANTS LISTING --- */}
            <section className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-2">
                        <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Marketplace</span>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Top Brand Products</h2>
                        <div className="h-2 w-24 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full"></div>
                    </div>
                    <div className="bg-slate-100 px-6 py-3 rounded-2xl border border-slate-200">
                        <p className="text-slate-600 font-black text-sm uppercase tracking-widest m-0">
                            <span className="text-blue-600 font-bold">{merchants?.length || 0}</span> Leading Partners
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                    {merchants?.length > 0 && merchants.map((item, i) => (
                        <MerchantForProduct
                            key={i}
                            merchant_name={item?.merchant_name}
                            merchant_logo={item?.merchant_logo || ""}
                            companyDomain={companyDomain.domain}
                            merchant_href={getProductMerchantHref(item, companyData?.slug_type)}
                            discountTag={item?.promotional_tag}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
}

export default page