import React from 'react'
import { CompanyData } from '@/services/dataTypes';
import { apiFooter, apiCompanyUpdatedData, apiGetDisclaimer } from '@/apis/user';
import Link from 'next/link';
import Image from 'next/image';
import cookieService from '@/services/CookiesService';
import { apiGetTopCategories } from '@/apis/page_optimization';
import FooterNewsletter from './FooterNewsletter';
import { faEnvelopeOpen, faMapPin, faPhone, FontAwesomeIcon } from '@/constants/icons';
import { getBaseImageUrl } from '@/constants/hooks';

interface Props {
  c_data?: CompanyData,
  companyLogo?: string | null,
  mer_slug?: string,
  cat_slug?: string,
}

const Footer = async ({ c_data, companyLogo, mer_slug, cat_slug }: Props = {}) => {
  const companyDomain = await cookieService.get("domain");
  const companyData = c_data || (await apiCompanyUpdatedData(companyDomain)).data;
  const logo = companyLogo || companyData?.company_logo;
  const merchantSlug = mer_slug || companyData?.store_slug || 'store';
  const categorySlug = cat_slug || companyData?.category_slug || 'category';

  if (!companyData?.unique_id) return null;

  const [topCategoriesResponse, disclaimer] = await Promise.all([
    apiGetTopCategories(companyData.unique_id),
    apiGetDisclaimer(companyDomain.domain)
  ]);

  return (
    <footer className="bg-[#0f172a] text-slate-400 font-sans border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-16">

          {/* Column 1: Brand & Newsletter (The "Main" Focus) */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="inline-block group">
              {logo ? (
                <Image
                  src={getBaseImageUrl(companyDomain.domain, logo, '/themes/Theme_3/images/logo.png')}
                  alt="Company Logo"
                  width={180}
                  height={50}
                  className="h-9 w-auto"
                />
              ) : (
                <span className="text-2xl font-black text-white tracking-tighter italic">
                  {companyData.company_name.toUpperCase()}
                </span>
              )}
            </Link>

            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg">Join the saving revolution.</h4>
              <p className="text-sm leading-relaxed max-w-md">
                Get curated weekly deals, exclusive coupon codes, and smart shopping tips delivered straight to your inbox. No spam, just savings.
              </p>
              <FooterNewsletter companyId={companyData.unique_id} />
            </div>
          </div>

          {/* Column 2: Links - Top Categories */}
          <div className="lg:col-span-2 sm:col-span-6">
            <h4 className="text-white font-bold text-lg mb-4">Top Categories</h4>
            <ul className="space-y-4">
              {topCategoriesResponse?.data?.categories?.slice(0, 5).map((item, i) => (
                <li key={i}>
                  <Link href={`/${item?.url}`} className="text-sm hover:text-indigo-400 transition-all duration-300 flex items-center group">
                    <span className="w-0 h-px bg-indigo-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Links - Quick Links */}
          <div className="lg:col-span-2 sm:col-span-6">
            <h4 className="text-white font-bold text-lg mb-4">Company</h4>
            <ul className="space-y-4">
              {[
                { label: 'Home', path: '/' },
                { label: 'All Stores', path: `/${merchantSlug}` },
                { label: 'Categories', path: `/${categorySlug}` },
                { label: 'Contact Us', path: '/contact-us' },
                { label: 'Privacy Policy', path: '/privacy-policy' },
                { label: 'Terms of Service', path: '/terms-of-service' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.path} className="text-sm hover:text-indigo-400 transition-all duration-300 flex items-center group">
                    <span className='w-0 h-px bg-indigo-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all'></span>
                    {link.label}
                  </Link>
                </li>
              ))}
              {disclaimer?.data?.footer_pages?.slice(0, 3).map((item, i) => (
                <li key={i}>
                  <Link href={`/${item?.slug}`} className="text-sm hover:text-indigo-400 transition-all duration-300 flex items-center group">
                    <span className='w-0 h-px bg-indigo-500 mr-0 group-hover:w-3 group-hover:mr-2 transition-all'></span>
                    {item?.page_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info (Vertical Style) */}
          <div className="lg:col-span-3 space-y-8 ">
            <h4 className="text-white font-bold text-lg mb-2">Get in Touch</h4>
            <div className="space-y-6">
              {[
                { icon: faPhone, val: disclaimer?.data?.CompanyContactUs?.phone_no || '(855) 528-6222' },
                { icon: faEnvelopeOpen, val: disclaimer?.data?.CompanyContactUs?.email || 'support@gettopdiscounts.com' },
                { icon: faMapPin, val: disclaimer?.data?.CompanyContactUs?.address || '539 W. Commerce St #667 Dallas, TX 75208' }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 group cursor-default">
                  <div className="flex-shrink-0 w-5 text-indigo-500 group-hover:scale-110 transition-transform">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <span className="text-sm hover:text-indigo-400 transition-all duration-300 flex items-center group">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider and Social Bar */}
        <div className="mt-20 pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex gap-4">
            {companyData?.facebook && (
              <Link href={companyData.facebook} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/facebook.png" alt="Facebook" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.twitter && (
              <Link href={companyData.twitter} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/twitter-2.png" alt="Twitter" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.pinterest && (
              <Link href={companyData.pinterest} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/pinterest.png" alt="Pinterest" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.youtube && (
              <Link href={companyData.youtube} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/youtube.png" alt="YouTube" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.linkedin && (
              <Link href={companyData.linkedin} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/linkedin.png" alt="LinkedIn" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.instagram && (
              <Link href={companyData.instagram} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/instagram.png" alt="Instagram" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.tiktok && (
              <Link href={companyData.tiktok} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/tiktok.png" alt="TikTok" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.flipboard && (
              <Link href={companyData.flipboard} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/flip-board.png" alt="Flipboard" width={40} height={40} className="object-contain" />
              </Link>
            )}
            {companyData?.threads && (
              <Link href={companyData.threads} target='_blank' className='w-10 h-10 rounded-full bg-slate-800 hover:bg-indigo-600 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1'>
                <Image src="/shared-assets/social/thread.png" alt="Threads" width={40} height={40} className="object-contain" />
              </Link>
            )}
          </div>

          {companyData?.trust_pilot && (
            <div className="hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              dangerouslySetInnerHTML={{ __html: companyData.trust_pilot }} />
          )}
        </div>

        {/* Copyright & Legal */}
        <div className="mt-12 text-center">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} {companyData?.company_name} — Built for Smart Shoppers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer