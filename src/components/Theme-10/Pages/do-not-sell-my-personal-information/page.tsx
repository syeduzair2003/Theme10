import { apiFooterPagesData } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import Image from 'next/image'
import Link from 'next/link'

const PrivacyPage = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'do-not-sell-my-personal-information';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <main className="min-h-screen bg-slate-50/50">
            {/* Header / Banner Section */}
            <section className="relative mx-4 md:mx-10 mt-6 mb-16 overflow-hidden rounded-[2.5rem] bg-[#0F172A] text-white">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-72 h-72 bg-blue-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-72 h-72 bg-indigo-500/10 rounded-full blur-[100px]" />

                <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Text Content - Vertical Alignment Fixed */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize leading-tight">
                                    {pageData?.page_name}
                                </h1>
                                
                                {/* Breadcrumb with Perfect Alignment */}
                                <nav className="flex items-center space-x-3 text-sm font-medium text-slate-400">
                                    <Link href="/" className="hover:text-white transition-colors no-underline">Home</Link>
                                    <div className="flex items-center justify-center">
                                        <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-600" />
                                    </div>
                                    <span className="text-blue-400 capitalize">{pageData?.page_name}</span>
                                </nav>
                            </div>

                            {/* Trust Indicator */}
                            {/* <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-300 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Privacy Protection Active
                            </div> */}
                        </div>

                        {/* Image Illustration */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[320px] h-[280px]">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-15.png" 
                                    alt="Privacy Illustration" 
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(59,130,246,0.2)]"
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
                    {/* Content Container */}
                    <div className="relative bg-white rounded-3xl border border-slate-200 p-8 md:p-16 shadow-xl shadow-slate-200/40">
                        {/* Policy Icon */}
                        <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 w-12 h-12 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/30 flex items-center justify-center text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                            </svg>
                        </div>

                        {/* Dynamic HTML Content with Tailwind Typography */}
                        <article 
                            className="prose prose-slate lg:prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold 
                            prose-p:text-slate-600 prose-p:leading-relaxed
                            prose-strong:text-slate-900 prose-a:text-blue-600 
                            prose-ul:list-disc prose-li:marker:text-blue-500"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                        />
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 text-center text-slate-400 text-sm">
                        Protecting your personal data is our top priority. 
                        Need help? <Link href="/contact-us" className="text-blue-600 font-semibold hover:underline">Contact Support</Link>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default PrivacyPage;