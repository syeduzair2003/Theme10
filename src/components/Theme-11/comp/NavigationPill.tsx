"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { faChevronDown, FontAwesomeIcon } from '@/constants/icons';
import { getBaseImageUrl, getEventsHref, getMerchantHref, getPromotionHref } from '@/constants/hooks';

interface Props {
  merchantData: any[];
  categories: any[];
  mer_slug: string;
  mer_slug_type: string;
  cat_slug: string;
  events: any[];
  promotions: any[];
  promo_slug: string;
  blog_title?: string;
  blog_url?: string;
  companyDomain: string;
}

export default function NavigationPill({
  merchantData,
  categories,
  mer_slug,
  mer_slug_type,
  cat_slug,
  events,
  promotions,
  promo_slug,
  blog_title,
  blog_url,
  companyDomain,
}: Props) {
  const pathname = usePathname() || '';

  const getNavClass = (isActive: boolean) => {
    return `flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold transition-all ${
      isActive
        ? 'bg-[#8bc94a] text-white shadow-md shadow-[#8bc94a]/30 hover:scale-[1.02] hover:-translate-y-0.5'
        : 'text-[#8bc94a] hover:bg-[#fff9f2] hover:text-[#ff912f] hover:shadow-sm'
    }`;
  };

  return (
    <nav className="flex items-center gap-0.5">
      <Link href="/" className={getNavClass(pathname === '/')}>
        Home
      </Link>

      <div className="group relative">
        <Link href={`/all-stores/A`} className={getNavClass(pathname.startsWith('/all-stores'))}>
          Stores
          <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
        </Link>
        {/* Dropdown Stores */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-max z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-[460px] flex flex-wrap gap-2">
            {merchantData?.length > 0 ? (
              merchantData.slice(0, 10).map((item, i) => (
                <Link key={i} href={getMerchantHref(item, mer_slug, mer_slug_type)} className="flex items-center gap-3 w-[calc(50%-0.25rem)] hover:bg-[#F4F7F6] p-2 rounded-xl transition-colors">
                  <span className="w-9 h-9 bg-white rounded-full border border-gray-100 shadow-sm overflow-hidden flex-shrink-0 relative flex items-center justify-center">
                    {item?.merchant_logo ?
                      <Image src={getBaseImageUrl(companyDomain, item?.merchant_logo, "")} alt={item?.merchant_name} layout="fill" objectFit="contain" className="p-1" />
                      : <span className="text-gray-400 text-xs text-center leading-[9px]">no logo</span>
                    }
                  </span>
                  <span className="text-[13px] font-semibold text-[#8bc94a] truncate">{item.merchant_name}</span>
                </Link>
              ))
            ) : (
              <div className="text-sm text-gray-500 p-2">No stores available</div>
            )}
            {merchantData?.length > 10 && (
              <Link href={`/all-stores/A`} className="w-full text-center mt-2 py-2 text-[13px] font-semibold text-[#ff912f] hover:text-[#8bc94a] bg-gray-50 hover:bg-gray-100 transition-colors rounded-xl">View All Stores</Link>
            )}
          </div>
        </div>
      </div>

      <div className="group relative">
        <Link href={`/${cat_slug}`} className={getNavClass(pathname.includes(`/${cat_slug}`))}>
          Categories
          <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
        </Link>
        {/* Dropdown Categories */}
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-max z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 w-[460px] flex flex-wrap gap-1.5">
            {categories?.length > 0 ? (
              categories.slice(0, 10).map((item: any, i: number) => (
                <Link key={i} href={`/${item?.url}`} className="flex items-center gap-3 w-[calc(50%-0.19rem)] hover:bg-[#F4F7F6] p-2 rounded-xl transition-colors">
                  <span className="w-7 h-7 rounded-sm flex items-center justify-center">
                    <Image src={getBaseImageUrl(companyDomain, item?.category_image, "")} alt={item?.name} height={20} width={20} className="object-contain" />
                  </span>
                  <span className="text-[13px] font-semibold text-[#8bc94a] truncate">{item.name}</span>
                </Link>
              ))
            ) : (
              <div className="text-sm text-gray-500 p-2">No categories available</div>
            )}
          </div>
        </div>
      </div>

      <div className="group relative">
        <Link href="/all-products" className={getNavClass(pathname.startsWith('/all-products') || pathname.startsWith('/products'))}>
          Products
          <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-max z-50">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-1 min-w-[220px]">
            <Link href="/products" className="hover:bg-[#F4F7F6] p-2.5 rounded-xl transition-colors text-[13px] font-semibold text-[#8bc94a]">
              Brands Products
            </Link>
          </div>
        </div>
      </div>

      {events?.length > 0 && (
        <div className="group relative">
          <Link href={`/events`} className={getNavClass(pathname.startsWith('/events'))}>
            Events
            <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-max z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-1 min-w-[220px]">
              {events.slice(0, 5).map((item, i) => (
                <Link key={i} href={getEventsHref(item, "slug")} className="hover:bg-[#F4F7F6] p-2.5 rounded-xl transition-colors text-[13px] font-semibold text-[#8bc94a]">
                  {item.name}
                </Link>
              ))}
              {events.length > 5 && (
                <Link href={`/events`} className="hover:bg-gray-50 p-2.5 text-center rounded-xl transition-colors text-[12px] font-bold text-[#ff912f] mt-1">View All Events</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {promotions?.length > 0 && (
        <div className="group relative">
          <Link href={`/${promo_slug}`} className={getNavClass(pathname.includes(`/${promo_slug}`))}>
            Promotions
            <FontAwesomeIcon icon={faChevronDown} className="w-2.5 h-2.5 transition-transform duration-200 group-hover:rotate-180" />
          </Link>
          <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all w-max z-50">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex flex-col gap-1 min-w-[220px]">
              {promotions.slice(0, 5).map((item, i) => (
                <Link key={i} href={getPromotionHref(item, promo_slug)} className="hover:bg-[#F4F7F6] p-2.5 rounded-xl transition-colors text-[13px] font-semibold text-[#8bc94a]">
                  {item.name}
                </Link>
              ))}
              {promotions.length > 5 && (
                <Link href={`/${promo_slug}`} className="hover:bg-gray-50 p-2.5 text-center rounded-xl transition-colors text-[12px] font-bold text-[#ff912f] mt-1">View All Deals</Link>
              )}
            </div>
          </div>
        </div>
      )}

      {blog_title && blog_url && (
        <Link href={blog_url} className={getNavClass(pathname === blog_url)}>
          {blog_title}
        </Link>
      )}
    </nav>
  );
}
