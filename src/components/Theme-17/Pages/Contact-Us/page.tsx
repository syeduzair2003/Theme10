import React from 'react'
import BreadcrumbSection from '../../comp/BreadcrumbSection'
import ContactForm from '../../comp/ContactForm'
import cookieService from '@/services/CookiesService'
import { apiContactPage } from '@/apis/user'
import { faMapPin, faEnvelopeOpen, faPhone, faEarth, FontAwesomeIcon, faFacebook, faTwitter, faPinterest, faYoutube, faLinkedin, faInstagram, faTiktok, faFlipboard, faXTwitter } from '@/constants/icons';
import Link from 'next/link'

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const fullPageData = (await apiContactPage(companyDomain))?.data;
    const pageData = fullPageData?.CompanyContactUs;

    const socialPlatforms = [
        { key: 'facebook', icon: faFacebook, color: '#1877F2', label: 'Facebook' },
        { key: 'twitter', icon: faTwitter, color: '#1DA1F2', label: 'Twitter' },
        { key: 'instagram', icon: faInstagram, color: '#E4405F', label: 'Instagram' },
        { key: 'pinterest', icon: faPinterest, color: '#BD081C', label: 'Pinterest' },
        { key: 'youtube', icon: faYoutube, color: '#FF0000', label: 'YouTube' },
        { key: 'linkedin', icon: faLinkedin, color: '#0A66C2', label: 'LinkedIn' },
        { key: 'tiktok', icon: faTiktok, color: '#000000', label: 'TikTok' },
        { key: 'flipboard', icon: faFlipboard, color: '#E12828', label: 'Flipboard' },
        { key: 'x_twitter', icon: faXTwitter, color: '#000000', label: 'X' },
    ];

    return (
        <div className="bg-[#fcfcfa] min-h-screen">
            <BreadcrumbSection 
                title="Contact Us" 
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us", href: "/contact-us" }
                ]} 
            />

            <section className="py-16 md:py-24 px-4 relative overflow-hidden">
                {/* Decorative background accents */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-10 left-10 w-96 h-96 bg-[#8bc94a] rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ff912f] rounded-full blur-[120px]"></div>
                </div>

                <div className="container mx-auto max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        
                        {/* Left: Contact Form */}
                        <div className="order-2 lg:order-1">
                            <ContactForm domain={companyDomain} />
                        </div>

                        {/* Right: Contact Info */}
                        <div className="order-1 lg:order-2 flex flex-col gap-8">
                            
                            {/* Header / Intro */}
                            <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 border border-white/50 space-y-4 shadow-sm">
                                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Need Immediate Help?</h3>
                                <div 
                                    className="text-gray-600 leading-relaxed text-lg"
                                    dangerouslySetInnerHTML={{ __html: pageData?.details || "We're here to help you find the best deals and answer any questions you may have about our platform." }}
                                />
                            </div>

                            {/* Contact Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Address */}
                                {pageData?.address && (
                                    <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-[#8bc94a]/10 flex items-center justify-center text-[#8bc94a] mb-4 group-hover:bg-[#8bc94a] group-hover:text-white transition-colors">
                                            <FontAwesomeIcon icon={faMapPin} className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Main Office</h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">{pageData.address}</p>
                                    </div>
                                )}

                                {/* Email */}
                                {pageData?.email && (
                                    <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-[#ff912f]/10 flex items-center justify-center text-[#ff912f] mb-4 group-hover:bg-[#ff912f] group-hover:text-white transition-colors">
                                            <FontAwesomeIcon icon={faEnvelopeOpen} className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Email Address</h4>
                                        <p className="text-gray-500 text-sm font-medium">{pageData.email}</p>
                                    </div>
                                )}

                                {/* Phone */}
                                {pageData?.phone_no && (
                                    <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                        <div className="w-12 h-12 rounded-2xl bg-[#8bc94a]/10 flex items-center justify-center text-[#8bc94a] mb-4 group-hover:bg-[#8bc94a] group-hover:text-white transition-colors">
                                            <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Phone Number</h4>
                                        <p className="text-gray-500 text-sm font-medium">{pageData.phone_no}</p>
                                    </div>
                                )}

                                {/* Website/Social Intro */}
                                <div className="group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-2xl bg-[#ff912f]/10 flex items-center justify-center text-[#ff912f] mb-4 group-hover:bg-[#ff912f] group-hover:text-white transition-colors">
                                        <FontAwesomeIcon icon={faEarth} className="w-5 h-5" />
                                    </div>
                                    <h4 className="font-bold text-gray-900 mb-2">Follow Us</h4>
                                    <p className="text-gray-500 text-sm">Stay updated via social media.</p>
                                </div>
                            </div>

                            {/* Social Icons Interactive Block */}
                            <div className="bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-inner">
                                <h5 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-left">Connect with our community</h5>
                                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                                    {socialPlatforms.map((platform) => {
                                        const link = fullPageData?.company_data?.[platform.key as keyof typeof fullPageData.company_data];
                                        if (!link) return null;

                                        return (
                                            <Link 
                                                key={platform.key}
                                                href={link as string}
                                                target="_blank"
                                                rel="nofollow"
                                                className="w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 hover:-translate-y-1 active:scale-95 transition-all duration-300 border border-gray-50 group"
                                            >
                                                <FontAwesomeIcon 
                                                    icon={platform.icon} 
                                                    className="w-5 h-5 transition-colors"
                                                    style={{ color: platform.color }} 
                                                />
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default page