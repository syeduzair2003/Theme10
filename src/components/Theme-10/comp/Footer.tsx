import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { apiGetTopCategories } from '@/apis/page_optimization';
import { getBaseImageUrl } from '@/constants/hooks';
import FooterNewsletter from './FooterNewsletter';
import cookieService from '@/services/CookiesService';
import { apiGetDisclaimer } from '@/apis/user';
import { faEnvelopeOpen, faMapPin, faPhone, FontAwesomeIcon } from '@/constants/icons';

interface Props {
    companyFooterLogo: string | null;
    company_id: string;
    socialLinks: {
        facebook?: string | null;
        twitter?: string | null;
        instagram?: string | null;
        linkedin?: string | null;
        pinterest?: string | null;
        youtube?: string | null;
        flipboard?: string | null;
        threads?: string | null;
        tiktok?: string | null;
        trust_pilot?: string | null;
    };
    blog_title?: string;
    blog_url?: string;
    companyName: string;
}

const Footer = async ({ companyFooterLogo, company_id, socialLinks, blog_title, companyName, blog_url }: Props) => {
    const topCategoriesResponse = (await apiGetTopCategories(company_id)).data;
    const companyDomain = await cookieService.get("domain");
    const disclaimer = (await apiGetDisclaimer(companyDomain.domain)).data;

    const socialMediaPlatforms = [
        { key: 'facebook', label: 'Facebook', icon: 'facebook.png' },
        { key: 'twitter', label: 'Twitter', icon: 'twitter-2.png' },
        { key: 'pinterest', label: 'Pinterest', icon: 'pinterest.png' },
        { key: 'youtube', label: 'YouTube', icon: 'youtube.png' },
        { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin.png' },
        { key: 'instagram', label: 'Instagram', icon: 'instagram.png' },
        { key: 'tiktok', label: 'TikTok', icon: 'tiktok.png' },
    ];

    return (
        <footer className="relative bg-[#0F172A] text-slate-300 pt-20 pb-10 overflow-hidden">
            {/* Background Decorative Element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* Upper Section: Brand & Newsletter */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
                    <div className="lg:col-span-4 space-y-8">
                        <Link href="/" className="inline-block bg-white p-3 rounded-2xl shadow-xl shadow-blue-500/10 transition-transform hover:scale-105">
                            <Image 
                                src={getBaseImageUrl(companyDomain.domain, companyFooterLogo, "/themes/Theme_3/images/logo.png")} 
                                height={50} 
                                width={160} 
                                className="h-10 w-auto object-contain" 
                                alt="logo" 
                            />
                        </Link>
                        <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
                            Connecting you to the best deals and premium savings across your favorite global brands. Shopping made smarter.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {socialMediaPlatforms?.map((platform) => {
                                const link = socialLinks[platform.key as keyof typeof socialLinks];
                                if (!link) return null;
                                return (
                                    <Link 
                                        key={platform.key}
                                        href={link} 
                                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-800 border border-slate-700 hover:border-blue-500 hover:bg-slate-700 transition-all duration-300 group"
                                        target="_blank"
                                    >
                                        <Image
                                            src={getBaseImageUrl(companyDomain.domain, `/shared-assets/social/${platform.icon}`, "")}
                                            alt={platform.label}
                                            width={18}
                                            height={18}
                                            className="opacity-60 group-hover:opacity-100 transition-opacity"
                                        />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-8 md:p-10 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                                <FontAwesomeIcon icon={faEnvelopeOpen} className="text-9xl text-white" />
                            </div>
                            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-2">Join the Elite Club</h3>
                                    <p className="text-slate-400 text-sm">Get exclusive early access to flash sales and hidden coupons directly in your inbox.</p>
                                </div>
                                <FooterNewsletter companyId={company_id} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Section: Links Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-slate-800 pt-16 pb-16">
                    {/* Top Categories */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-base flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            Trending Categories
                        </h4>
                        <ul className="space-y-3">
                            {topCategoriesResponse?.categories?.slice(0, 6).map((item: any, i: number) => (
                                <li key={i}>
                                    <Link href={`/${item?.url}`} className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-base flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Navigation
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/" className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">Home</Link></li>
                            <li><Link href="/category" className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">Categories</Link></li>
                            {disclaimer?.footer_pages?.map((item: any, i: number) => (
                                <li key={i}>
                                    <Link href={`/${item?.slug}`} className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline capitalize">
                                        {item?.page_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog/Resources */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-base flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            Resources
                        </h4>
                        <ul className="space-y-3">
                            <li><Link href="/all-stores/A" className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">All Stores</Link></li>
                            {blog_title && blog_url && (
                                <li><Link href={blog_url} className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">{blog_title}</Link></li>
                            )}
                            <li><Link href="/contact-us" className="!text-slate-400 hover:text-white hover:translate-x-1 inline-block transition-all text-sm no-underline">Help Center</Link></li>
                        </ul>
                    </div>

                    {/* Contact Badges */}
                    <div className="space-y-6">
                        <h4 className="text-white font-semibold text-base flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Reach Out
                        </h4>
                        <div className="flex flex-col gap-3">
                            {disclaimer?.CompanyContactUs?.email && (
                                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faEnvelopeOpen} className="text-blue-400 w-3.5 h-3.5" />
                                    <span className="text-xs truncate !text-slate-400">{disclaimer?.CompanyContactUs?.email}</span>
                                </div>
                            )}
                            {disclaimer?.CompanyContactUs?.phone_no && (
                                <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex items-center gap-3">
                                    <FontAwesomeIcon icon={faPhone} className="text-emerald-400 w-3.5 h-3.5" />
                                    <span className="text-xs !text-slate-400">{disclaimer?.CompanyContactUs?.phone_no}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-slate-800">
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                        <div className="text-xs tracking-wide font-medium text-slate-500">
                            {companyDomain.domain === 'gettopdiscounts.com' ? (
                                <span>© {new Date().getFullYear()} <span className="!text-slate-300">GETTOPDISCOUNTS LLC</span> • U.S. REGISTERED</span>
                            ) : (
                                <span>© {new Date().getFullYear()} <span className="!text-slate-300 uppercase">{companyName}</span> • ALL RIGHTS RESERVED</span>
                            )}
                        </div>
                        
                        {socialLinks?.trust_pilot && (
                            <div className="opacity-70 grayscale hover:grayscale-0 transition-all duration-500 scale-90" 
                                dangerouslySetInnerHTML={{ __html: socialLinks?.trust_pilot || "" }} />
                        )}

                        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest !text-slate-500">
                            <Link href="/privacy-policy" className="hover:text-blue-500 no-underline transition-colors">Privacy</Link>
                            <Link href="/terms-and-conditions" className="hover:text-blue-500 no-underline transition-colors">Terms</Link>
                        </div>
                    </div>

                    {disclaimer?.disclaimer?.disclaimer && (
                        <div className="mt-10 p-6 rounded-2xl bg-slate-900/50 border border-slate-800">
                            <div 
                                className="text-[10px] leading-relaxed !text-slate-500 text-center italic" 
                                dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "" }} 
                            />
                        </div>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default Footer;