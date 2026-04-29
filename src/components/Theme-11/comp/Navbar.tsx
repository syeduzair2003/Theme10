import React, { Suspense } from 'react'
import Link from "next/link";
import Image from "next/image";
import { CategoryData, EventResponse, Merchant, Promotion } from '@/services/dataTypes'
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';
import MobileNavWrapper from './MobileNavWrapper';
import NavSearch from './NavSearch';
import NavigationPill from './NavigationPill';
interface Props {
  merchantData: Merchant[],
  categories: CategoryData[] | any,
  headerPromoMerchant: Merchant[] | null,
  companyDomain: string,
  unique_id: string,
  mer_slug: string,
  mer_slug_type: string,
  promo_slug: string,
  cat_slug: string,
  blog_url?: string,
  blog_title?: string,
  company_logo: string | null,
  events: EventResponse[],
  promotions: Promotion[],
}
const NavbarSec = ({ unique_id, merchantData, categories, headerPromoMerchant, companyDomain, mer_slug, mer_slug_type, cat_slug, blog_url, blog_title, company_logo, events, promotions, promo_slug }: Props) => {
  const companyLogo = getBaseImageUrl(companyDomain, company_logo, "/themes/Theme_3/images/logo.png");
  return (
    <header className="fixed top-0 left-0 w-full z-[10000] bg-white border-b border-gray-100 shadow-sm" style={{ zIndex: 10000 }}>
      {/* Top Banner for Promo Merchants */}
      {headerPromoMerchant && headerPromoMerchant.length > 0 && (
        <div className="w-full bg-[#f8f9fa] border-b border-gray-100 hidden md:block">
          <div className="max-w-[1400px] mx-auto flex justify-center items-center py-1.5 overflow-hidden whitespace-nowrap text-xs text-gray-600">
            {headerPromoMerchant.map((item, i) => {
              return (
                <div key={i} className={`px-4 flex items-center ${i !== 3 ? 'border-r border-gray-300' : ''}`}>
                  <Link className="hover:text-[#ff912f] transition-colors" href={getMerchantHref(item, mer_slug, mer_slug_type)}>
                    {item?.merchant_name}
                  </Link>
                </div>
              );

            })}
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-2.5 flex items-center justify-between">
        {/* Left: Brand */}
        <div className="flex items-center justify-start flex-shrink">
          <Link href="/" className="group flex-shrink-0">
            <div className="max-w-[150px] sm:max-w-none">
              {companyLogo &&
                <Image
                  src={companyLogo}
                  alt="Logo"
                  width={120}
                  height={120}
                  className="object-contain p-1"
                  priority
                />
              }
            </div>
          </Link>
        </div>

        {/* Center: Search Pill */}
        <div className="hidden lg:flex justify-center flex-1 mx-4 lg:mx-8">
          <Suspense fallback={<div className="w-full max-w-[400px] xl:max-w-[450px] h-10 rounded-full animate-pulse bg-gray-100"></div>}>
            <NavSearch
              companyId={unique_id}
              mer_slug={mer_slug}
              slug_type={mer_slug_type}
              cat_slug={cat_slug}
            />
          </Suspense>
        </div>

        {/* Right: Actions & Navigation */}
        <div className="flex items-center justify-end gap-3 flex-shrink-0">
          {/* Navigation Pill */}
          <div className="hidden lg:flex items-center bg-white/60 backdrop-blur-md rounded-full p-1.5 shadow-sm border border-[#8bc94a]/20">
            <NavigationPill
              merchantData={merchantData}
              categories={categories}
              mer_slug={mer_slug}
              mer_slug_type={mer_slug_type}
              cat_slug={cat_slug}
              events={events}
              promotions={promotions}
              promo_slug={promo_slug}
              blog_title={blog_title}
              blog_url={blog_url}
              companyDomain={companyDomain}
            />
          </div>

          {/* Mobile Handlers — loaded client-side only via MobileNavWrapper to avoid hydration crashes */}
          <div className='lg:hidden flex items-center relative z-[20000] shrink-0'>
            <MobileNavWrapper
              categories={categories || []}
              merchantData={merchantData || []}
              events={events || []}
              promotions={promotions || []}
              cat_slug={cat_slug}
              mer_slug={mer_slug}
              mer_slug_type={mer_slug_type}
              promo_slug={promo_slug}
              blog_url={blog_url}
              blog_title={blog_title}
              companyLogo={companyLogo}
              companyId={unique_id}
              companyDomain={companyDomain}
            />
          </div>
        </div>
      </div>
    </header>
  )
}
export default NavbarSec