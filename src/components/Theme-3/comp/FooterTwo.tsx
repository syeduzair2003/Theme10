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

const FooterTwo = async ({ companyFooterLogo, company_id, socialLinks, blog_title, companyName, blog_url }: Props) => {
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
        { key: 'flipboard', label: 'Flipboard', icon: 'flip-board.png' },
        { key: 'threads', label: 'Threads', icon: 'thread.png' },
    ];

    return (
        <footer className="footer-section second n19-bg-color">
            <div className="container-fluid px-10 px-md-20 pt-10 pt-md-15">
                <div className="d-center flex-wrap gap-5 justify-content-between cus-border border-bottom b-nineteen pb-3 pb-md-5">
                    <Link href="/">
                        <Image src={getBaseImageUrl(companyDomain.domain, companyFooterLogo, "/themes/Theme_3/images/logo.png")} height={200} width={200} className="logo" alt="logo" />
                    </Link>
                    <div className="d-flex flex-column gap-4">
                        <ul className="d-center justify-content-start gap-1 social-area second p-0 m-0">
                            {socialMediaPlatforms?.map((platform) => {
                                const link = socialLinks[platform.key as keyof typeof socialLinks];
                                if (!link) return null;

                                return (
                                    <li key={platform.key}>
                                        <Link href={link} aria-label={platform.label} className="d-center rounded-circle cus-border border b-fifteen transition" rel={"nofollow"} target="_blank">
                                            <Image
                                                src={getBaseImageUrl(companyDomain.domain, `/shared-assets/social/${platform.icon}`, "")}
                                                alt={platform.label}
                                                width={30}
                                                height={30}
                                            />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        {socialLinks?.trust_pilot && (
                            <div dangerouslySetInnerHTML={{ __html: socialLinks?.trust_pilot || "" }} />
                        )}
                    </div>
                </div>
                <div className="row cus-row align-items-start gy-10 gy-xl-0 py-4">
                    {/* Top Categories */}
                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 footer-links">
                        <div className="single-box alt-color">
                            <h4 className="mb-3 mb-sm-4 slide-horizontal slide-second" data-splitting>Top Categories</h4>
                            <ul className="d-grid gap-1 gap-sm-1">
                                {topCategoriesResponse?.categories?.slice(0, 9).map((item, i) => (
                                    <li key={i}><Link href={`/${item?.url}`}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Quick Link */}
                    <div className="col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 footer-links">
                        <div className="single-box alt-color">
                            <h4 className="mb-3 mb-sm-4 slide-horizontal slide-second" data-splitting>Quick Link</h4>
                            <ul className="d-grid gap-1 gap-sm-1">
                                <li><Link href="/">Home</Link></li>
                                <li><Link href={`/category`}>Category</Link></li>
                                <li><Link href={`/all-stores/A`}>Store</Link></li>
                                {blog_title && blog_url && (
                                    <li><Link href={blog_url}>{blog_title}</Link></li>
                                )}
                                <li><Link href={`/contact-us`}>Contact Us</Link></li>
                                {disclaimer?.footer_pages?.map((item, i) => (
                                    <li key={i}><Link href={`/${item?.slug}`} className="transition text-capitalize">{item?.page_name}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Newsletter */}
                    <div className="col-6 col-sm-6 col-lg-3 col-xl-3 footer-links">
                        <div className="single-box">
                            <h4 className="mb-3 mb-sm-4 slide-horizontal slide-second" data-splitting>Newsletter</h4>
                            <p className="n1-color" style={{ marginLeft: '10px' }}>Subscribe our newsletter to get our latest update & news</p>
                            <div className="d-grid justify-content-start text-center gap-2 gap-md-2" style={{ marginLeft: '10px', paddingBottom: '20px' }}>
                                <FooterNewsletter companyId={company_id} />
                            </div>
                        </div>
                    </div>
                    {/* Contacts */}
                    {disclaimer?.CompanyContactUs?.phone_no || disclaimer?.CompanyContactUs?.email || disclaimer?.CompanyContactUs?.address ? (
                    <div className="col-6 col-sm-6 col-lg-3 col-xl-3 footer-links">
                        <div className="single-box">
                            <h4 className="mb-3 mb-sm-4 slide-horizontal words chars splitting">Contacts</h4>
                            <ul className="d-grid gap-3 gap-md-6 p-0">
                                {disclaimer?.CompanyContactUs?.phone_no && (
                                <li className="d-flex align-items-center gap-3">
                                    <span className="fs-three s1-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faPhone} style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid">
                                        <span className="fs-seven transition n1-color">{disclaimer?.CompanyContactUs?.phone_no}</span>
                                    </div>
                                </li>
                                )}
                                {disclaimer?.CompanyContactUs?.email && (
                                <li className="d-flex align-items-center gap-3">
                                    <span className="fs-three s1-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faEnvelopeOpen} style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid">
                                        <span className="fs-seven transition n1-color">{disclaimer?.CompanyContactUs?.email}</span>
                                    </div>
                                </li>
                                )}
                                {disclaimer?.CompanyContactUs?.address && (
                                <li className="d-flex align-items-center gap-3">
                                    <span className="fs-three s1-bg-color n1-color d-center transition icon-area box-one rounded-circle">
                                        <FontAwesomeIcon icon={faMapPin} style={{ width: '14px', height: '14px', color: 'white' }} />
                                    </span>
                                    <div className="d-grid">
                                        <span className="fs-seven transition n1-color">{disclaimer?.CompanyContactUs?.address}</span>
                                    </div>
                                </li>
                                )}
                            </ul>
                        </div>
                    </div>
                    ): (
                    <></>
                    )}
                </div>
                <div className="row copyright-area py-5 py-md-8 gy-5 gy-xl-0 justify-content-between cus-border border-top b-eighth">
                    <div className="col-lg-12 col-md-12 order-1 order-md-0">
                        <div className="copyright text-center text-md-start alt-color">
                            <p className="fw-mid">
                                {companyDomain.domain === 'gettopdiscounts.com' ? (
                                    <>
                                        © Copyright {new Date().getFullYear()}.{" "}
                                        <Link href="/">GetTopDiscounts LLC</Link> — A U.S.-registered company. All rights reserved
                                    </>
                                ) : (
                                    <>
                                        © Copyright {new Date().getFullYear()}.{" "}
                                        <Link href="/">{companyName}</Link> All rights reserved
                                    </>
                                )}
                            </p>
                        </div>
                    </div>
                    {disclaimer?.disclaimer?.disclaimer && (
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <span className='alt-color' dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "" }} />
                    </div>
                    )}
                </div>
            </div>
        </footer>
    );
}

export default FooterTwo;