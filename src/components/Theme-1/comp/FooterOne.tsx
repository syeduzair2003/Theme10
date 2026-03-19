import Image from "next/image";
import Link from "next/link";
import { Merchant } from "@/services/dataTypes";
import { apiGetPromotionalMerchants } from "@/apis/page_optimization";
import { getBaseImageUrl, getMerchantHref } from "@/constants/hooks";
import FooterNewsLetter from "./FooterNewsLetter";
// import Image from '@/components/shared/Image';
import { apiGetDisclaimer } from "@/apis/user";

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

const FooterOne: React.FC<Props> = async ({ companyLogo, mer_slug, cat_slug, domain, companyId, socialLinks, slug_type, companyName }: Props) => {
  const promotionalMerchants = await apiGetPromotionalMerchants(companyId);
  let mer_count = 0;
  const Logo = getBaseImageUrl(domain, companyLogo, "/themes/Theme_3/images/logo.png");
  const disclaimer = (await apiGetDisclaimer(domain)).data;
  return (
    <>
      <footer className="footer-section">
        <div className="container">
          <Image src="/themes/Theme_1/images/shapes/pattern.png" alt="" className="bg-pattern"
            width={1000} height={400}
          />
          <div className="d-flex flex-wrap justify-content-between">
            {/* Logo and Description */}
            <div className="flex-grow-1 footer-about" style={{ minWidth: '300px', maxWidth: '400px' }}>
              <div className="footer-widget">
                <div className="footer-widget__logo mb-3">
                  <Link href="/">
                    <Image src={Logo} alt="Company Logo" height={100} width={100}/>
                  </Link>
                </div>
                <p className="footer-widget__desc font-14">
                  <span className='alt-color'
                    dangerouslySetInnerHTML={{ __html: disclaimer?.disclaimer?.disclaimer || "When you buy through links on our site, we may earn an affiliate commission. This does not impact our reviews. All trademarks, logos, and brand names are the property of their respective owners." }}
                  />
                </p>

                {/* Social Icons */}
                <div className="footer-widget__social mt-3">
                  <ul className="social-icon-list d-flex gap-2">
                    {socialLinks?.facebook && (
                      <Link target="_blank" className="social-icon-list__link flx-center" href={socialLinks?.facebook}>
                        <i className="fab fa-facebook-f" />
                      </Link>
                    )}
                    {socialLinks?.twitter && (
                      <Link
                        href={socialLinks?.twitter}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-twitter" />
                      </Link>
                    )}

                    {socialLinks?.linkedin && (
                      <Link
                        href={socialLinks?.linkedin}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-linkedin-in" />
                      </Link>
                    )}

                    {socialLinks?.pinterest && (
                      <Link
                        href={socialLinks?.pinterest}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-pinterest-p" />
                      </Link>
                    )}

                    {socialLinks?.youtube && (
                      <Link
                        href={socialLinks?.youtube}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-youtube" />
                      </Link>
                    )}
                    {socialLinks?.instagram && (
                      <Link
                        href={socialLinks?.instagram}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-instagram" />
                      </Link>
                    )}
                    {socialLinks?.tiktok && (
                      <Link
                        href={socialLinks?.tiktok}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-tiktok" />
                      </Link>
                    )}
                    {socialLinks?.threads && (
                      <Link
                        href={socialLinks?.threads}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fa fa-at" />
                      </Link>
                    )}
                    {socialLinks?.flipboard && (
                      <Link
                        href={socialLinks?.flipboard}
                        target="_blank"
                        className="social-icon-list__link flx-center"
                      >
                        <i className="fab fa-flipboard" />
                      </Link>
                    )}

                  </ul>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="useful-links" style={{ minWidth: '160px' }}>
              <div className="footer-widget">
                <h5 className="footer-widget__title text-white">Useful Links</h5>
                <ul className="footer-lists">
                  <li className="footer-lists__item footer-list-item">
                    <Link href="/" className="footer-lists__link">Home</Link>
                  </li>
                  <li className="footer-lists__item footer-list-item">
                    <Link href={`/${cat_slug}`} className="footer-lists__link">Category</Link>
                  </li>
                  <li className="footer-lists__item footer-list-item">
                    <Link href={`/${mer_slug}`} className="footer-lists__link">Store</Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Top Merchants */}
            <div className="useful-links" style={{ minWidth: '160px' }}>
              <div className="footer-widget">
                <h5 className="footer-widget__title text-white">Top Stores</h5>
                <ul className="footer-lists">
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

            {/* Newsletter */}
            <div className="newsletter"style={{ minWidth: '250px', maxWidth: '350px' }}>
              <FooterNewsLetter companyId={companyId} />
            </div>
          </div>
        </div>
      </footer>
      {/* bottom Footer */}
      <div className="bottom-footer">
        <div className="container container-two">
          <div className="bottom-footer__inner flx-between gap-3">
            <p className="bottom-footer__text font-12">
             © Copyright  {new Date().getFullYear()}{""}. 
              <Link href="/"> {companyName}</Link> All rights reserved
            </p>
            <div className="footer-links">
              <Link href={`/contact-us`} className="footer-link font-12">Contact Us</Link>
                {disclaimer?.footer_pages?.length > 0 && disclaimer.footer_pages.map((item, i) => (
                  <Link key={i} href={`/${item?.slug}`} className="transition text-capitalize footer-link font-12">{item?.page_name}</Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FooterOne;
