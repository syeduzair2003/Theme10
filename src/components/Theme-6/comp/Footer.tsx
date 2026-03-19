import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Newsletter from './Newsletter';
import { apiGetPromotionalMerchants } from '@/apis/page_optimization';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import { apiGetDisclaimer } from '@/apis/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Merchant } from '@/services/dataTypes';


interface Props {
  companyLogo: string | null,
  mer_slug: string,
  cat_slug: string,
  domain: string,
  companyId: string,
  slug_type: string,
  companyName: string,
  socialLinks: {
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    pinterest?: string | null;
    youtube?: string | null;
    tiktok?: string | null;
    flipboard?: string | null;
    threads?: string | null;
  };
}

const Footer: React.FC<Props> = async ({ companyLogo, mer_slug, cat_slug, domain, companyId, socialLinks, slug_type, companyName }: Props) => {
  const promotionalMerchants = await apiGetPromotionalMerchants(companyId);
  let mer_count = 0;
  // const Logo = getBaseImageUrl(domain, companyLogo, "/themes/Theme_3/images/logo.png");
  const disclaimer = (await apiGetDisclaimer(domain)).data;
  return (
    <footer className="site-footer footer-dark">
      {/* --- Subscribe Section --- */}
      <Newsletter companyId={companyId} />
      {/* --- Main Footer Content --- */}
      <div className="footer-main-content" style={{ backgroundImage: "url('themes/Theme_6/images/background/ftr-dark-bg.png')" }}>
        <div className="container">
          <div className="footer-top">
            <div className="row">
              {/* Column 1: About & Logo */}
              <div className="col-xl-3 col-lg-6 col-md-12 mb-4">
                <div className="widget widget_about">
                  <div className="logo-footer clearfix mb-3">
                    <Link href="/">
                      <Image
                        src="/themes/Theme_6/images/logo-dark.png"
                        alt="Travlla Logo"
                        width={180}
                        height={60}
                        priority
                        unoptimized
                      />
                    </Link>
                  </div>
                  <p className="footer-widget__desc font-14">
                    <span className='alt-color'
                      dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "When you buy through links on our site, we may earn an affiliate commission. This does not impact our reviews. All trademarks, logos, and brand names are the property of their respective owners." }}
                    />
                  </p>
                  {/* <ul className="social-icons list-unstyled d-flex gap-3 mt-3">
                    {socialLinks?.facebook && (
                      <Link
                        target="_blank"
                        href={socialLinks.facebook}
                      >
                        <FontAwesomeIcon
                          icon={faFacebookF}
                        />
                      </Link>
                    )}
                    <li><a href="https://www.facebook.com/" target="_blank" rel="noreferrer"><i className="bi bi-facebook"></i></a></li>
                    <li><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><i className="bi bi-instagram"></i></a></li>
                    <li><a href="https://www.pinterest.com/" target="_blank" rel="noreferrer"><i className="bi bi-pinterest"></i></a></li>
                  </ul> */}
                </div>
              </div>

              {/* Column 2: Explore */}
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4 col-4 mb-4">
                <div className="widget widget_services">
                  <h3 className="widget-title">Explore</h3>
                  <ul className="list-unstyled">
                    <li><Link href="/about">Home</Link></li>
                    <li><Link href={`/${cat_slug}`}>Category</Link></li>
                    <li><Link href={`/${mer_slug}`}>Store</Link></li>
                    <li><Link href="/blog">Blog</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 3: Destinations */}
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-4 col-4 mb-4">
                <div className="widget widget_services">
                  <h3 className="widget-title">Top Stores</h3>
                  <ul className="list-unstyled">
                    {promotionalMerchants.data.length > 0 && mer_count < 3 && promotionalMerchants.data.map((item: Merchant) => {
                      mer_count += 1;
                      return (
                        <li key={item.unique_id} className="footer-lists__item footer-list-item">
                          <Link href={getMerchantHref(item, mer_slug, slug_type)} className="footer-lists__link">{item.merchant_name}</Link>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>

              {/* Column 4: Legal */}
              <div className="col-xl-3 col-lg-6 col-md-6 col-sm-4 col-4 mb-4">
                <div className="widget widget_services">
                  <h3 className="widget-title">Legal</h3>
                  <ul className="list-unstyled">
                    <li><Link href="/contact-us">Contact Us</Link></li>
                    <li><Link href="/policy-policy">Privacy Policy</Link></li>
                    <li><Link href="/terms-of-services">Terms of Services</Link></li>
                    <li><Link href="/about-us">About Us</Link></li>
                  </ul>
                </div>
              </div>

              {/* Column 5: Contact Info */}
              {/* <div className="col-xl-3 col-lg-6 col-md-6 mb-4">
                <div className="widget f-top-space">
                  <ul className="widget_address list-unstyled">
                    <li className="d-flex mb-3">
                      <div className="trv-icon me-3"><i className="bi bi-telephone"></i></div>
                      <a href="tel:1236540214"><span className="trv-contact fw-bold">123 654 0214</span></a>
                    </li>
                    <li className="d-flex mb-3">
                      <div className="trv-icon me-3"><i className="bi bi-envelope"></i></div>
                      <span>travllainfo@gmail.com</span>
                    </li>
                    <li className="d-flex mb-3">
                      <div className="trv-icon me-3"><i className="bi bi-geo-alt"></i></div>
                      <span>55/11 ronin tower New York</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
          </div>
        </div>

        {/* --- Copyright --- */}
        <div className="footer-bottom">
          <div className="container">
            <div className="copyrights-text text-center py-3">
              <p className="text-white fw-bol">
             © Copyright  {new Date().getFullYear()}{""}. 
              <Link href="/" className='site-text-yellow'> {companyName}</Link> All rights reserved
            </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;