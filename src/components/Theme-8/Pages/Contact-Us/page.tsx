import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import ContactForm from '../../comp/ContactForm'
import cookieService from '@/services/CookiesService'
import { apiContactPage } from '@/apis/user'
import { faAt, faFacebook, faFlipboard, faInstagram, faLinkedin, faPinterest, faTiktok, faYoutube, faGreaterThan, FontAwesomeIcon, faMapPin, faEnvelopeOpen, faPhone, faEarth, faXTwitter } from '@/constants/icons';

const ContactUsPage = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const fullPageData = (await apiContactPage(companyDomain))?.data;
    const pageData = fullPageData?.CompanyContactUs;

    return (
        <main className="min-h-screen bg-white">
            {/* Modern Banner */}
            <section className="relative mx-4 md:mx-10 mt-6 mb-16 overflow-hidden rounded-[2.5rem] bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">Contact Us</h1>
                                <nav className="flex items-center justify-center lg:justify-start space-x-3 text-sm font-medium text-slate-400">
                                    <Link href="/" className="no-underline text-white hover:text-white transition-colors">Home</Link>
                                    <FontAwesomeIcon icon={faGreaterThan} className="w-2 h-2 text-slate-600" />
                                    <span className="text-blue-400">Contact Us</span>
                                </nav>
                            </div>
                            <div 
                                className="text-slate-300 max-w-lg leading-relaxed prose prose-invert"
                                dangerouslySetInnerHTML={{ __html: pageData?.details || '' }}
                            />
                        </div>
                        <div className="hidden lg:flex justify-end">
                            <Image src="/themes/Theme_3/images/banner-illus-15.png" alt="Contact" width={350} height={300} className="object-contain drop-shadow-2xl" priority />
                        </div>
                    </div>
                </div>
                {/* Background Decor */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
            </section>

            {/* Main Content Area */}
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Side: Contact Form */}
                    <div className="lg:col-span-7">
                        <ContactForm domain={companyDomain} />
                    </div>

                    {/* Right Side: Contact Info Cards */}
                    <div className="lg:col-span-5 space-y-6">
                        <h3 className="text-2xl font-bold text-slate-900 mb-8">Contact Information</h3>
                        
                        {/* Address */}
                        {pageData?.address && (
                            <div className="group flex items-start gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
                                    <FontAwesomeIcon icon={faMapPin} className="w-5 h-5" />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="font-bold text-slate-900 text-lg">Main Office</h5>
                                    <p className="text-slate-600 leading-relaxed">{pageData?.address}</p>
                                </div>
                            </div>
                        )}

                        {/* Email & Phone Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
                            {pageData?.email && (
                                <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                        <FontAwesomeIcon icon={faEnvelopeOpen} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900">Email Address</h5>
                                        <p className="text-slate-600 break-all">{pageData?.email}</p>
                                    </div>
                                </div>
                            )}

                            {pageData?.phone_no && (
                                <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                        <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-slate-900">Phone Number</h5>
                                        <p className="text-slate-600">{pageData?.phone_no}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Social Links Card */}
                        <div className="p-8 rounded-3xl bg-[#0F172A] text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <h5 className="text-xl font-bold mb-6 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faEarth} className="text-blue-400 w-5 h-5" />
                                    Follow Our Socials
                                </h5>
                                <div className="flex flex-wrap gap-3">
                                    {[
                                        { icon: faFacebook, link: fullPageData?.company_data?.facebook },
                                        { icon: faXTwitter, link: fullPageData?.company_data?.twitter },
                                        { icon: faPinterest, link: fullPageData?.company_data?.pinterest },
                                        { icon: faYoutube, link: fullPageData?.company_data?.youtube },
                                        { icon: faLinkedin, link: fullPageData?.company_data?.linkedin },
                                        { icon: faInstagram, link: fullPageData?.company_data?.instagram },
                                        { icon: faTiktok, link: fullPageData?.company_data?.tiktok },
                                        { icon: faFlipboard, link: fullPageData?.company_data?.flipboard },
                                        { icon: faAt, link: fullPageData?.company_data?.threads }
                                    ].map((social, index) => social.link && (
                                        <Link key={index} href={social.link} target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-blue-600 transition-all duration-300 hover:-translate-y-1 border border-white/5">
                                            <FontAwesomeIcon icon={social.icon} className="w-4 h-4 text-white" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/40 transition-colors" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}

export default ContactUsPage