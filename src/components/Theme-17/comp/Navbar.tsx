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

     {/* Main Navbar - Tech-Rent 2.0 Redesign */}
<nav className="sticky top-0 z-[50] w-full bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/[0.05]">
  <div className="max-w-[1400px] mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
    
    {/* Left: Brand - Industrial Silver Reflection */}
    <div className="flex items-center justify-start flex-shrink">
      <Link href="/" className="group flex-shrink-0 transition-transform hover:scale-[1.02] active:scale-95">
        <div className="max-w-[150px] sm:max-w-none relative">
          {companyLogo && (
            <div className="relative">
              {/* Subtle Glow behind logo */}
              <div className="absolute inset-0 bg-indigo-500/10 blur-xl rounded-full"></div>
              <Image
                src={companyLogo}
                alt="Tech-Rent Logo"
                width={130}
                height={130}
                className="relative object-contain brightness-110 contrast-125"
                priority
              />
            </div>
          )}
        </div>
      </Link>
    </div>

    {/* Center: Search Pill - Glassmorphism Style */}
    <div className="hidden lg:flex justify-center flex-1 mx-4 lg:mx-8">
      <Suspense 
        fallback={
          <div className="w-full max-w-[400px] xl:max-w-[450px] h-11 rounded-xl animate-pulse bg-white/5 border border-white/10"></div>
        }
      >
        <div className="w-full max-w-[450px] relative group">
          {/* Indigo glow on search focus/hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-sky-500 rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur"></div>
          <div className="relative">
            <NavSearch
              companyId={unique_id}
              mer_slug={mer_slug}
              slug_type={mer_slug_type}
              cat_slug={cat_slug}
            />
          </div>
        </div>
      </Suspense>
    </div>

    {/* Right: Actions & Navigation - Midnight Slate UI */}
    <div className="flex items-center justify-end gap-4 flex-shrink-0">
      
      {/* Navigation Pill - Premium Indigo Border */}
      <div className="hidden lg:flex items-center bg-[#1E293B]/40 backdrop-blur-2xl rounded-xl p-1 shadow-2xl border border-white/[0.08] hover:border-indigo-500/30 transition-colors">
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

      {/* Mobile Nav - Keeping functionality, updating trigger container */}
      <div className='lg:hidden flex items-center relative z-[20000] shrink-0'>
        <div className="p-2 bg-[#1E293B] rounded-lg border border-white/10 active:bg-indigo-600 transition-colors">
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
  </div>
</nav>
    </header>
  )
}
export default NavbarSec