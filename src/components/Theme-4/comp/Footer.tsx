import {
    FaFacebook,
    FaPinterest,
    FaYoutube,
    FaLinkedin,
    FaInstagram,
    FaTiktok,
    FaFlipboard,
    FaPaperPlane,
    FaEnvelope,
    FaMapMarkerAlt,
    FaPhone
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X (Twitter)
import { SiThreads } from "react-icons/si"; // Threads
import { apiGetTopCategories, apiSubscribeNewsletter } from "@/apis/page_optimization";
import { discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";
import { CompanyData } from "@/services/dataTypes";
import { apiGetDisclaimer } from "@/apis/user";
import Link from "next/link";
import Image from "next/image";
import { subscribeNewsLetter } from "@/app/actions/newsletter";
import NewsletterForm from "./NewsLetterForm";

interface FooterProps {
    company_id: string;
    domain: string;
    social_links: CompanyData;
    logo: string | null;
}


const Footer = async ({ company_id, domain, social_links, logo }: FooterProps) => {
    const result = (await apiGetTopCategories(company_id))?.data?.categories;
    const footerApi = (await apiGetDisclaimer(domain))?.data;
    const disclaimer = footerApi?.disclaimer?.disclaimer;
    const footerPages = footerApi?.footer_pages;
    const email = footerApi?.CompanyContactUs?.email;
    const phone_no = footerApi?.CompanyContactUs?.phone_no;
    const address = footerApi?.CompanyContactUs?.address;
    const companyLogo = getBaseImageUrl(domain , logo, "/themes/Theme_2/images/logo/logo-dark.png");


    return (
        <footer className="bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] text-white">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12">

                    {/* Logo + Socials */}
                    <div className="flex flex-col items-center lg:items-start gap-6">
                        <div>
                            <Link href={`/`}>
                            <Image src={`${companyLogo}`} alt="Logo" width={220} height={220} />
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-center lg:justify-start gap-3 bg-white rounded-lg p-3 shadow-[0_20px_40px_rgb(4_4_4_/_62%)]">

                            <Link href={`${social_links?.facebook}`} className="text-[#1877F2] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaFacebook className="h-6 w-6 ]" />
                            </Link>
                            <Link href={`${social_links?.twitter}`} className="text-black transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaXTwitter className="h-6 w-6" />
                            </Link>
                            <Link href={`${social_links?.pinterest}`} className="text-[#E60023] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaPinterest className="h-6 w-6" />
                            </Link>
                            <Link href={`${social_links?.youtube}`} className="text-[#FF0000] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaYoutube className="h-6 w-6" />
                            </Link>
                            <Link href={`${social_links?.linkedin}`} className="text-[#0077B5] transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaLinkedin className="h-6 w-6" />
                            </Link>
                            <Link href={`${social_links?.instagram}`}
                                className="text-white rounded transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                    bg-[linear-gradient(45deg,rgba(255,200,55,1),rgba(255,48,108,1),rgba(131,58,180,1))]">
                                <FaInstagram className="h-6 w-6" />
                            </Link>

                            <Link href={`${social_links?.tiktok}`} className="transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaTiktok className="h-6 w-6 bg-clip-text bg-gradient-to-br from-[#69C9D0] to-[#EE1D52]" />
                            </Link>
                            <Link href={`${social_links?.flipboard}`} className="transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                                <FaFlipboard className="h-6 w-6" />
                            </Link>
                            <Link href={`${social_links?.threads}`} className="text-black transition transform hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] ">
                                <SiThreads className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>

                    {/* Top Categories */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Top Categories</h3>
                        <ul className="space-y-2">
                            {result?.map((item: any, index: number) => (
                                <li key={index}>
                                    <Link href={item?.url} className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">
                                        {item?.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Home</Link></li>
                            <li><Link href="/category" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Categories</Link></li>
                            <li><Link href="/all-stores/A" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Stores</Link></li>
                            <li><Link href="/events" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Events</Link></li>
                            <li><Link href="https:///blog.gettopdiscounts.com" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Blog</Link></li>
                            <li><Link href="/contact-us" className="text-white no-underline hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">Contact</Link></li>
                            {footerPages?.map((item, index) => (
                                <li key={index}><Link href={`/${item?.slug}`} className="text-white no-underline capitalize hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition">{item?.page_name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="grid gap-2">
                        {email || phone_no || address ? (
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                                <ul className="space-y-3">
                                    {email && (
                                        <li className="flex items-center gap-3">
                                            <FaEnvelope className="text-white/80 h-5 w-5" />
                                            <span>{email}</span>
                                        </li>
                                    )}
                                    {phone_no && (
                                        <li className="flex items-center gap-3">
                                            <FaPhone className="text-white/80 h-5 w-5" />
                                            <span>{phone_no}</span>
                                        </li>
                                    )}
                                    {address && (
                                        <li className="flex items-center gap-3">
                                            <FaMapMarkerAlt className="text-white/80 h-5 w-5" />
                                            <span>{address}</span>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        ) : null}

                        {/* Newsletter */}
                        <div className="mt-6 md:mt-0">
                            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                            <p className="text-sm mb-4">Subscribe to get the latest deals and offers.</p>
                            <NewsletterForm company_id={company_id} onSubmit={subscribeNewsLetter} />
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/15">
                    <div className="py-4 text-center">
                        <p className="text-[11px] sm:text-xs text-white/65 mb-3 leading-relaxed">
                            {discardHTMLTags(disclaimer)}
                        </p>
                        <p className="text-[11px] sm:text-xs text-white/75 tracking-wide">
                            © {new Date().getFullYear()} GetTopDiscounts. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer >
    );
};

export default Footer;
