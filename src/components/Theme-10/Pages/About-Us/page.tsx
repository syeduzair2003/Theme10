import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';

const AboutUs = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'about-us';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <main className="min-h-screen bg-white">
            {/* Banner Section */}
            <section className="relative mx-4 md:mx-8 lg:mx-12 mt-6 mb-12 md:mt-10 overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50 to-blue-50/50">
                <div className="max-w-7xl mx-auto px-6 py-12 md:py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        
                        {/* Left Content */}
                        <div className="order-2 lg:order-1 flex flex-column space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight capitalize">
                                    {pageData?.page_name}
                                </h1>
                                
                                {/* Breadcrumb */}
                                <nav aria-label="Breadcrumb" className="flex">
                                    <ol className="flex items-center space-x-3 text-sm font-medium">
                                        <li>
                                            <Link href="/" className="no-underline text-slate-500 hover:text-blue-600 transition-colors">
                                                Home
                                            </Link>
                                        </li>
                                        <li className="text-slate-300">
                                            <FontAwesomeIcon icon={faGreaterThan} className="w-2.5 h-2.5" />
                                        </li>
                                        <li>
                                            <span className="text-blue-600 font-semibold capitalize">About Us</span>
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        {/* Right Image */}
                        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                            <div className="relative w-full max-w-[400px] aspect-square lg:aspect-video">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-15.png" 
                                    alt="About Us Illustration" 
                                    fill
                                    className="object-contain drop-shadow-2xl transition-transform duration-700 hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Elements */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-200/20 rounded-full blur-3xl" />
            </section>

            {/* Content Section */}
            <section className="px-6 pb-24">
                <div className="max-w-4xl mx-auto">
                    {/* Page Content Card */}
                    <div className="bg-white rounded-2xl border border-slate-50 p-6 md:p-12 shadow-sm shadow-slate-200/50">
                        <article 
                            className="prose prose-slate lg:prose-lg max-w-none 
                            prose-headings:text-slate-900 prose-headings:font-bold 
                            prose-p:text-slate-600 prose-p:leading-relaxed 
                            prose-li:text-slate-600 prose-strong:text-slate-900"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "<p>Content not available.</p>" }}
                        />
                    </div>
                </div>
            </section>
        </main>
    )
}

export default AboutUs;