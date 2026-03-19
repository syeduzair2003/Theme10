import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const AffiliateDisclosure = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'affiliate-disclosure';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <main className="min-h-screen bg-slate-50/30">
            {/* Header / Banner Section */}
            <section className="relative mx-4 md:mx-10 mt-6 mb-16 overflow-hidden rounded-[2.5rem] bg-[#0F172A] text-white">
                {/* Decorative Shapes */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]" />

                <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Text Content */}
                        <div className="space-y-8 flex flex-col items-center lg:items-start text-center lg:text-left">
                            <div className="space-y-4 flex flex-col items-center lg:items-start">
                                {/* Title */}
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize leading-tight text-white">
                                    {pageData?.page_name}
                                </h1>
                                
                                {/* Modern Breadcrumb */}
                                <nav className="flex items-center space-x-3 text-sm font-medium text-slate-400">
                                    <Link href="/" className="no-underline text-white hover:text-blue-400 transition-colors">
                                        Home
                                    </Link>
                                    {/* Icon size and alignment fixed */}
                                    <div className="flex items-center justify-center">
                                        <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-600" />
                                    </div>
                                    <span className="text-blue-400 capitalize">
                                        {pageData?.page_name?.replace('-', ' ')}
                                    </span>
                                </nav>
                            </div>         
                        </div>

                        {/* Image / Illustration */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[320px] h-[280px]">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-12.png" 
                                    alt="Disclosure Illustration" 
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(30,144,255,0.3)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="px-6 pb-32">
                <div className="max-w-4xl mx-auto">
                    {/* Content Card */}
                    <div className="relative bg-white rounded-3xl border border-slate-200 p-8 md:p-16 shadow-xl shadow-slate-200/40">
                        {/* Subtle Information Icon for Trust */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                            </svg>
                        </div>

                        <article 
                            className="prose prose-slate lg:prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold 
                            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-slate-900 prose-strong:font-semibold
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-ul:list-disc prose-li:text-slate-600"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "<p class='text-center'>Content not available.</p>" }}
                        />
                    </div>
                    
                    {/* Bottom Support Callout */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-400 text-sm">
                            Have questions about our partnerships? <Link href="/contact-us" className="text-blue-600 font-semibold hover:underline">Contact our support team</Link>.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AffiliateDisclosure