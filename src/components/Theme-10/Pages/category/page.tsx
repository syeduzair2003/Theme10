import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import CatPage from '@/components/Theme-8/comp/CatPage'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import CategoryPageSchema from '@/components/shared/SchemaScripts/CategoryPageSchema'

const page = async () => {
    const companyDomain = await cookieService.get("domain");
    const response = (await apiCompanyUpdatedData(companyDomain)).data;

    const socialLinks = {
        facebook: response?.facebook,
        twitter: response?.twitter,
        instagram: response?.instagram,
        linkedin: response?.linkedin,
        pinterest: response?.pinterest,
        youtube: response?.youtube,
        flipboard: response?.flipboard,
        tiktok: response?.tiktok,
        threads: response?.threads,
    };

    return (
        <main className="min-h-screen bg-white">
            {/* Banner Section */}
            <section className="relative overflow-hidden bg-[#1a212e] border-b border-white/5 py-16 md:py-24 rounded-b-[3rem]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        
                        {/* Left Side: Content Wrapper */}
                        <div className="w-full lg:w-3/5 flex flex-col items-center lg:items-start text-center lg:text-left">
                            
                            <nav className="flex items-center space-x-2 text-[12px] md:text-sm font-semibold tracking-wide mb-6">
                                <Link href="/" className="text-slate-500 hover:text-blue-500 transition-colors no-underline uppercase">
                                    Home
                                </Link>
                                <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2 text-slate-700" />
                                <span className="text-blue-500 uppercase">
                                    Categories
                                </span>
                            </nav>

                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
                                Our Popular <br className="hidden md:block" />
                                <span className="text-blue-500 relative">
                                    Categories
                                    <svg className="absolute -bottom-2 left-0 w-full h-2 text-blue-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 25 0 50 5 T 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </span>
                            </h1>

                            <p className="mt-6 text-slate-400 text-sm md:text-base max-w-md font-medium leading-relaxed">
                                Explore top-rated brands and exclusive discounts across our most visited categories.
                            </p>
                        </div>

                        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-600/25 blur-[100px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700" />
                                
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-1.png" 
                                    alt="Categories Illustration" 
                                    width={380} 
                                    height={320} 
                                    priority
                                    className="relative z-10 object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform duration-500" 
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <CatPage company_id={response?.unique_id} />
            </div>

            <CategoryPageSchema 
                company_name={response?.company_name} 
                company_logo={response?.company_logo} 
                socialLinks={socialLinks} 
                company_id={response?.unique_id} 
            />
        </main>
    )
}

export default page