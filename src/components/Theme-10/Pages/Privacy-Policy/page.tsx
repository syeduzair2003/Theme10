import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const PrivacyPolicy = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'privacy-policy';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <main className="min-h-screen bg-slate-50/30">
            {/* Banner Section */}
            <section className="relative mx-4 md:mx-10 mt-6 mb-16 overflow-hidden rounded-[2.5rem] bg-[#0F172A] text-white">
                {/* Decorative background blur */}
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] -z-0" />
                
                <div className="max-w-7xl mx-auto px-8 py-16 md:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        
                        {/* Heading & Breadcrumb Sequence */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight capitalize">
                                    {pageData?.page_name || "Privacy Policy"}
                                </h1>
                                
                                <nav className="flex items-center justify-center lg:justify-start space-x-3 text-sm font-medium text-slate-400">
                                    <Link href="/" className="hover:text-white transition-colors no-underline">Home</Link>
                                    <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2 text-slate-600" />
                                    <span className="text-blue-400">Privacy Policy</span>
                                </nav>
                            </div>
                            
                            {/* <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                                Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div> */}
                        </div>

                        {/* Banner Image */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[320px] h-[260px]">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-13.png" 
                                    alt="Privacy Protection" 
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
                    {/* Content Header Accent */}
                    <div className="h-2 w-full bg-gradient-to-r from-blue-600 to-indigo-600" />
                    
                    <div className="p-8 md:p-16 lg:p-20">
                        {/* Dynamic HTML Content with Modern Typography */}
                        <article 
                            className="prose prose-slate lg:prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold 
                            prose-p:text-slate-600 prose-p:leading-relaxed 
                            prose-strong:text-slate-900 prose-strong:font-semibold
                            prose-li:text-slate-600 prose-ul:list-disc prose-li:marker:text-blue-500
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                        />
                    </div>
                </div>

                {/* Bottom Trust Badge */}
                <div className="mt-12 flex flex-col items-center justify-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8-0v4h8z" />
                        </svg>
                    </div>
                    <p className="text-slate-400 text-sm text-center max-w-sm">
                        Your data is encrypted and handled according to international security standards.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default PrivacyPolicy