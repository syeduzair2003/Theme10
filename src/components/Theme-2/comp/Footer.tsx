import { apiGetTopCategories } from '@/apis/page_optimization';
import { apiGetDisclaimer } from '@/apis/user';
import { getBaseImageUrl } from '@/constants/hooks';
import { faAt, faEnvelopeOpen, faFacebook, faFlipboard, faInstagram, faLinkedin, faMapPin, faPhone, faPinterest, faTiktok, faXTwitter, faYoutube, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import NewsletterSubmitBtn from './NewsletterSubmitBtn';

interface Props {
  companyFooterLogo: string | null,
  mer_slug: string,
  cat_slug: string,
  slug_type: string,
  company_id: string,
  company_name: string,
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
}

const Footer = async ({ companyFooterLogo, mer_slug, cat_slug, slug_type, company_id, company_name, socialLinks, blog_title, blog_url }: Props) => {
  const companyDomain = await cookieService.get("domain");
  const [topCategoriesResponse, disclaimer] = await Promise.all([
    apiGetTopCategories(company_id).then(res => res.data),
    apiGetDisclaimer(companyDomain.domain).then(res => res.data)
  ]);

  return (
    <>
      <div className="main-footer">
        <div className="container">
          {/* Logo row */}
          <div className="footer-top mb-4 d-flex align-items-center justify-content-between">
            <Link href="/" className='footer-logo-container'>
              <Image
                src={getBaseImageUrl(
                  companyDomain.domain,
                  companyFooterLogo,
                  "/themes/Theme_2/img/logo.png"
                )}
                height={60}
                width={180}
                alt="logo"
                className="footer-logo-img"
                objectFit='contain'
              />
            </Link>
            {socialLinks?.trust_pilot &&
                <div
                    dangerouslySetInnerHTML={{ __html: socialLinks?.trust_pilot || "" }}
                />
            }
          </div>

          {/* Grid rows */}
          <div className="row footer-grid">
            {/* 1️⃣ Follow Us */}
            {Object.values(socialLinks || {}).some(link => typeof link === "string" && link.trim() !== "") && (
            <div className="col-md-3 col-sm-6 col-12 mb-4">
              <h4>Follow Us</h4>
              <ul className="footer-links">
                {socialLinks?.facebook && (
                  <li><Link href={socialLinks.facebook}>Facebook</Link></li>
                )}
                {socialLinks?.twitter && (
                  <li><Link href={socialLinks.twitter}>Twitter</Link></li>
                )}
                {socialLinks?.instagram && (
                  <li><Link href={socialLinks.instagram}>Instagram</Link></li>
                )}
                {socialLinks?.youtube && (
                  <li><Link href={socialLinks.youtube}>YouTube</Link></li>
                )}
                {socialLinks?.pinterest && (
                  <li><Link href={socialLinks.pinterest}>Pinterest</Link></li>
                )}
                {socialLinks?.linkedin && (
                  <li><Link href={socialLinks.linkedin}>Linkedin</Link></li>
                )}
                {socialLinks?.tiktok && (
                  <li><Link href={socialLinks.tiktok}>Tiktok</Link></li>
                )}
                {socialLinks?.flipboard && (
                  <li><Link href={socialLinks.flipboard}>Flipboard</Link></li>
                )}
                {socialLinks?.threads && (
                  <li><Link href={socialLinks.threads}>Threads</Link></li>
                )}
              </ul>
            </div>
            )}

            {/* 2️⃣ About */}
            <div className="col-md-3 col-sm-6 col-12 mb-4">
              <h4>Quick Links</h4>
              <ul className="footer-links">
                <li><Link href={`/category`}>Category</Link></li>
                <li><Link href={`/all-stores/A`}>Store</Link></li>
                <li><Link href={`/all-products`}>Products</Link></li>
                <li><Link href="/contact-us">Contact Us</Link></li>
                {blog_title && blog_url && (
                  <li><Link href={blog_url}>{blog_title}</Link></li>
                )}
              </ul>
            </div>
            {topCategoriesResponse?.categories?.length > 0 && (
            <div className="col-md-3 col-sm-6 col-12 mb-4">
              <h4>Categories</h4>
              <ul className="footer-links">
                {topCategoriesResponse?.categories?.slice(0, 9).map((item, i) => (
                  <li key={i}><Link href={`/${item?.url}`}>{item?.name}</Link></li>
                ))}
              </ul>
            </div>
            )}
            {disclaimer?.footer_pages?.length > 0 && (
            <div className="col-md-3 col-sm-6 col-12 mb-4">
              <h4>Legal</h4>
              <ul className="footer-links">
                {disclaimer?.footer_pages?.map((item, i) => (
                  <li key={i}>
                    <Link href={`/${item.slug}`} className="text-capitalize">{item.page_name}</Link>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="copyright-section">
        <div className="col-md-12 col-sm-12 col-xs-12">
          <p className="fw-mid">
            {/* © Copyright  {new Date().getFullYear()}{""}.
                        <Link href="/"> {company_name}</Link> All rights reserved */}
            {companyDomain.domain === 'gettopdiscounts.com' && (
              <>
                © Copyright  {new Date().getFullYear()}{""}.  {" "}
                <Link href="/">
                  GetTopDiscounts LLC
                </Link>{" "} — A U.S.-registered company. All rights reserved
              </>
            )}
            <>
              © Copyright  {new Date().getFullYear()}{""}.  {" "}
              <Link href="/">
                {company_name}
              </Link>{" "} — All rights reserved
            </>
          </p>
        </div>
        {disclaimer?.disclaimer?.disclaimer && (
          <div className="col-md-12 col-sm-12 col-xs-12">
            <span className='alt-color'
              dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "" }}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Footer
