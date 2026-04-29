import { apiGetTopCategories } from '@/apis/page_optimization';
import { apiGetDisclaimer } from '@/apis/user';
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import { faEnvelopeOpen, faMapPin, faPhone, FontAwesomeIcon } from '@/constants/icons';
import BackToTopButton from './BackToTopButton';
import FooterNewsletter from './FooterNewsletter';

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
        { key: 'twitter', label: 'Twitter', icon: 'twitter-2.png', bgColor: 'bg-[#1DA1F2]' },
        { key: 'facebook', label: 'Facebook', icon: 'facebook.png', bgColor: 'bg-[#1877F2]' },
        { key: 'instagram', label: 'Instagram', icon: 'instagram.png', bgColor: 'bg-gradient-to-tr from-[#FD1D1D] via-[#F56040] to-[#833AB4]' },
        { key: 'pinterest', label: 'Pinterest', icon: 'pinterest.png', bgColor: 'bg-[#E60023]' },
        { key: 'youtube', label: 'YouTube', icon: 'youtube.png', bgColor: 'bg-[#FF0000]' },
        { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin.png', bgColor: 'bg-[#0A66C2]' },
        { key: 'tiktok', label: 'TikTok', icon: 'tiktok.png', bgColor: 'bg-black' },
        { key: 'flipboard', label: 'Flipboard', icon: 'flip-board.png', bgColor: 'bg-[#E12828]' },
        { key: 'threads', label: 'Threads', icon: 'thread.png', bgColor: 'bg-black' },
    ];

    return (
        <footer className="w-full bg-[#0B1121] text-gray-300 py-12 md:py-16 relative overflow-hidden font-sans mt-auto">
            {/* Background Glow */}
            <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-[#8bc94a]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Top Main Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8 mb-12">
                    {/* Brand & Contact */}
                    <div className="lg:col-span-3 flex flex-col gap-6">
                        <Link href="/" className="inline-block">
                            <Image
                                src={getBaseImageUrl(companyDomain.domain, companyFooterLogo, "/themes/Theme_3/images/logo.png")}
                                height={200}
                                width={200}
                                className="w-auto h-12 max-w-[200px] object-contain"
                                alt="logo"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed mt-2">
                            Your trusted source for verified coupon codes and deals. Save money on every purchase with our hand-tested offers.
                        </p>

                        {(disclaimer?.CompanyContactUs?.phone_no || disclaimer?.CompanyContactUs?.email || disclaimer?.CompanyContactUs?.address) && (
                            <ul className="flex flex-col gap-4 mt-2">
                                {disclaimer?.CompanyContactUs?.email && (
                                    <li className="flex items-center gap-4 group">
                                        <span className="flex justify-center items-center w-10 h-10 rounded bg-[#1a233a] text-gray-400 group-hover:text-[#8bc94a] group-hover:bg-[#8bc94a]/10 transition-colors">
                                            <FontAwesomeIcon icon={faEnvelopeOpen} className="w-4 h-4" />
                                        </span>
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {disclaimer.CompanyContactUs.email}
                                        </span>
                                    </li>
                                )}
                                {disclaimer?.CompanyContactUs?.phone_no && (
                                    <li className="flex items-center gap-4 group">
                                        <span className="flex justify-center items-center w-10 h-10 rounded bg-[#1a233a] text-gray-400 group-hover:text-[#8bc94a] group-hover:bg-[#8bc94a]/10 transition-colors">
                                            <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                                        </span>
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {disclaimer.CompanyContactUs.phone_no}
                                        </span>
                                    </li>
                                )}
                                {disclaimer?.CompanyContactUs?.address && (
                                    <li className="flex items-center gap-4 group">
                                        <span className="flex justify-center items-center w-10 h-10 rounded bg-[#1a233a] text-gray-400 group-hover:text-[#8bc94a] group-hover:bg-[#8bc94a]/10 transition-colors">
                                            <FontAwesomeIcon icon={faMapPin} className="w-4 h-4" />
                                        </span>
                                        <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                                            {disclaimer.CompanyContactUs.address}
                                        </span>
                                    </li>
                                )}
                            </ul>
                        )}

                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-lg mb-6">Quick Links</h3>
                        <ul className="flex flex-col gap-4">
                            <li><Link href="/" className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> Home</Link></li>
                            <li><Link href={`/all-stores/A`} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> All Stores</Link></li>
                            <li><Link href={`/category`} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> Categories</Link></li>
                            {blog_title && blog_url && (
                                <li><Link href={blog_url} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> {blog_title}</Link></li>
                            )}
                            <li><Link href={`/contact-us`} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors relative group"><span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> Contact</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-lg mb-6">Categories</h3>
                        <ul className="flex flex-col gap-4">
                            {topCategoriesResponse?.categories?.slice(0, 5).map((item, i) => (
                                <li key={i}>
                                    <Link href={`/${item?.url}`} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors capitalize relative group">
                                        <span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Legal */}
                    <div className="lg:col-span-2">
                        <h3 className="text-white font-bold text-lg mb-6">Legal</h3>
                        <ul className="flex flex-col gap-4">
                            {disclaimer?.footer_pages?.map((item, i) => (
                                <li key={i}>
                                    <Link href={`/${item?.slug}`} className="text-gray-400 text-sm hover:text-[#8bc94a] transition-colors capitalize relative group">
                                        <span className="absolute -left-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 text-[#8bc94a] transition-all">›</span> {item?.page_name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Container */}
                    <div className="lg:col-span-3">
                        <FooterNewsletter companyId={company_id} />
                    </div>
                </div>

                {/* Divider Line */}
                <div className="w-full h-px bg-gradient-to-r from-[#0B1121] via-gray-800 to-[#0B1121] my-8"></div>

                {/* Bottom Copyright and Social Block */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 mt-4">
                    <p className="text-sm text-gray-500 text-center md:text-left">
                        {companyDomain.domain === 'gettopdiscounts.com' ? (
                            <>
                                © {new Date().getFullYear()} <Link href="/" className="hover:text-[#8bc94a] transition-colors text-gray-300 font-medium">GetTopDiscounts LLC</Link>. Made with <span className="text-[#ff912f]">♥</span> for smart shoppers. A U.S.-registered company.
                            </>
                        ) : (
                            <>
                                © {new Date().getFullYear()} <Link href="/" className="hover:text-[#8bc94a] transition-colors text-gray-300 font-medium">{companyName}</Link>. Made with <span className="text-[#ff912f]">♥</span> for smart shoppers.
                            </>
                        )}
                    </p>

                    {/* Social Media Links */}
                    <ul className="flex items-center gap-3">
                        {socialMediaPlatforms?.map((platform) => {
                            const link = socialLinks[platform.key as keyof typeof socialLinks];
                            if (!link) return null;

                            return (
                                <li key={platform.key}>
                                    <Link
                                        href={link}
                                        aria-label={platform.label}
                                        className={`flex justify-center items-center w-10 h-10 rounded-full ${platform.bgColor} hover:-translate-y-1 hover:shadow-lg hover:shadow-[#8bc94a]/30 transition-all duration-300`}
                                        rel={"nofollow"}
                                        target="_blank"
                                    >
                                        <Image
                                            src={getBaseImageUrl(companyDomain.domain, `/shared-assets/social/${platform.icon}`, "")}
                                            alt={platform.label}
                                            width={18}
                                            height={18}
                                            className="w-4 h-4 object-contain brightness-0 invert"
                                        />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Affiliate Link Disclosure */}
                {disclaimer?.disclaimer?.disclaimer && (
                    <div className="text-center text-xs text-gray-600/80 max-w-4xl mx-auto leading-loose" dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "" }} />
                )}
            </div>

            <BackToTopButton />
        </footer>
    );
};

export default Footer;