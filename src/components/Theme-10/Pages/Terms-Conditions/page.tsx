import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const TermsConditions = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'terms-of-services';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <main className="min-h-screen bg-slate-50/50">
            {/* Header Banner Section */}
            <section className="relative mx-4 md:mx-10 mt-6 mb-12 overflow-hidden rounded-[2.5rem] bg-[#0F172A] text-white">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10 pointer-events-none" />
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />
                
                <div className="max-w-7xl mx-auto px-8 py-14 md:py-20 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        
                        {/* Text Content */}
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight capitalize leading-tight">
                                    {pageData?.page_name || "Terms of Services"}
                                </h1>
                                
                                <nav className="flex items-center justify-center lg:justify-start space-x-3 text-sm font-medium text-slate-400">
                                    <Link href="/" className="hover:text-blue-400 transition-colors no-underline">Home</Link>
                                    <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-600" />
                                    <span className="text-slate-100 uppercase tracking-wider text-xs">Legal</span>
                                    <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5 text-slate-600" />
                                    <span className="text-blue-400">Terms</span>
                                </nav>
                            </div>

                            {/* <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-[11px] font-bold uppercase tracking-widest">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                Effective for 2026
                            </div> */}
                        </div>

                        {/* Illustration */}
                        <div className="flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[340px] h-[280px]">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-15.png" 
                                    alt="Legal Agreement" 
                                    fill
                                    className="object-contain filter drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-5xl mx-auto px-6 pb-24">
                <div className="bg-white rounded-[2rem] border border-slate-200 shadow-2xl shadow-slate-200/60 overflow-hidden">
                    {/* Top color bar */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
                    
                    <div className="p-8 md:p-16 lg:p-20">
                        {/* Dynamic HTML Content with Tailwind Typography */}
                        <article 
                            className="prose prose-slate lg:prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
                            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                            prose-strong:text-slate-900 prose-strong:font-bold
                            prose-li:text-slate-600 prose-li:marker:text-blue-600
                            prose-a:text-blue-600 prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-2xl prose-img:shadow-lg
                            prose-hr:border-slate-100"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                        />
                    </div>

                    {/* Footer within card */}
                    <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-slate-400 text-sm italic">
                            By continuing to use our services, you agree to the terms mentioned above.
                        </p>
                    </div>
                </div>

                {/* Bottom Support Callout */}
                <div className="mt-10 text-center space-y-3">
                    <p className="text-slate-500 font-medium">Have questions about our terms?</p>
                    <Link 
                        href="/contact-us" 
                        className="inline-flex items-center text-blue-600 font-bold hover:gap-2 transition-all group"
                    >
                        Contact Legal Support 
                        <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            </section>
        </main>
    )
}

export default TermsConditions