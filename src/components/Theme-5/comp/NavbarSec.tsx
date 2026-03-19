'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { CategoryData, EventResponse, Merchant, Promotion } from '@/services/dataTypes'
import { getBaseImageUrl, getEventsHref, getMerchantHref, getPromotionHref } from '@/constants/hooks'
import SearchBar from './SearchBar'
import Image from 'next/image'
import NavbarStrip from './NavbarStrip'

interface NavbarSecProps {
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

const NavbarSec: React.FC<NavbarSecProps> = ({
  unique_id, merchantData, categories, headerPromoMerchant, companyDomain, mer_slug, mer_slug_type, cat_slug, blog_url, blog_title, company_logo, events, promotions, promo_slug
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileSearchResults, setMobileSearchResults] = useState<{ merchants: any[], categories: any[] }>({ merchants: [], categories: [] })
  const [isSearching, setIsSearching] = useState(false)
  const companyLogo = getBaseImageUrl(companyDomain, company_logo, "/themes/Theme_3/images/logo.png");

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Categories', href: '/category', hasDropdown: true },
    { name: 'Stores', href: '/all-stores/A', hasDropdown: true },
    { name: 'Products', href: '/all-products', hasDropdown: true },
    { name: 'Promotions', href: `/${promo_slug}`, hasDropdown: true },
    ...(events?.length > 0 ? [{ name: 'Events', href: '/events', hasDropdown: true }] : []),
    ...(blog_title && blog_url ? [{ name: blog_title, href: blog_url, isExternal: true }] : [])
  ]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const handleMobileSearch = async (query: string) => {
    setSearchQuery(query)
    if (query.trim().length >= 3) {
      setIsSearching(true)
      try {
        const { apiSearchResult } = await import('@/apis/user')
        const response = await apiSearchResult(query, unique_id)
        if (response.data) {
          setMobileSearchResults({
            merchants: response.data.merchants || [],
            categories: response.data.categories || []
          })
        }
      } catch (err) {
        console.error('Search error:', err)
      }
      setIsSearching(false)
    } else {
      setMobileSearchResults({ merchants: [], categories: [] })
    }
  }

  const renderSubmenu = (key: string) => {
    if (key === 'Categories') {
      return renderCategories()
    } else if (key === 'Stores') {
      return renderMerchants()
    } else if (key === 'Products') {
      return renderProducts()
    } else if (key === 'Events') {
      return renderEvents()
    } else if (key === 'Promotions') {
      return renderPromotions()
    }
    return null
  }

  // Render Categories Section
  const renderCategories = () => {
    return (
      <div className="p-6 bg-white w-[400px] rounded-[3rem] shadow-2xl shadow-slate-200/40 border border-slate-50">

        <style>{`
        .category-scroll::-webkit-scrollbar { width: 4px; }
        .category-scroll::-webkit-scrollbar-track { background: transparent; }
        .category-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.25); border-radius: 99px; }
        .category-scroll::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.5); }
        .category-scroll::-webkit-scrollbar-button { display: none; }
      `}</style>

        <div
          className="category-scroll flex flex-col gap-1 overflow-y-auto max-h-[300px] pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}
        >
          {categories?.length > 0 ? (
            categories.slice(0, 16).map((category: any, index: number) => (
              <Link
                key={index}
                href={`/${category?.url}`}
                className="group flex items-center gap-4 transition-all duration-300 relative py-2"
              >
                <div className="relative w-8 h-8 shrink-0 flex items-center justify-center">
                  {category.category_image ? (
                    <Image
                      src={getBaseImageUrl(companyDomain, category.category_image, "")}
                      alt={category.name || "category"}
                      fill
                      className="object-contain opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-lg group-hover:bg-indigo-50 transition-colors">
                      <span className="text-sm font-black text-slate-300 group-hover:text-indigo-600 uppercase">
                        {category.name?.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-all duration-300 group-hover:translate-x-1">
                    {category.name}
                  </h4>
                  {category.offer_count && (
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider mt-0.5 transition-colors duration-300 group-hover:text-indigo-400/80">
                      {category.offer_count} Offers
                    </p>
                  )}
                </div>
              </Link>
            ))
          ) : null}
        </div>
      </div>
    );
  };

  // Render Merchants Section
  const renderMerchants = () => {
    return (
      <div className="p-8 bg-white w-[400px] rounded-[2.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50">

        <style>{`
    .merchant-scroll::-webkit-scrollbar { width: 4px; }
    .merchant-scroll::-webkit-scrollbar-track { background: transparent; }
    .merchant-scroll::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.25); border-radius: 99px; }
    .merchant-scroll::-webkit-scrollbar-thumb:hover { background: rgba(99,102,241,0.5); }
    .merchant-scroll::-webkit-scrollbar-button { display: none; }
  `}</style>

        <div
          className="merchant-scroll flex flex-col gap-1 overflow-y-auto max-h-[400px] pr-2"
          style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(99,102,241,0.3) transparent" }}
        >
          {merchantData?.length > 0 ? (
            merchantData?.slice(0, 8).map((merchant, index) => (
              <Link
                key={index}
                href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                className="group relative flex items-center justify-between py-3 px-3 rounded-2xl transition-all duration-300 hover:bg-slate-50/80"
              >
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center transition-all duration-500">
                    {merchant?.merchant_logo ? (
                      <Image
                        src={getBaseImageUrl(companyDomain, merchant.merchant_logo, "")}
                        className="w-6 h-6 object-contain opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all"
                        alt=""
                        width={24}
                        height={24}
                      />
                    ) : (
                      <span className="text-[10px] font-black text-slate-200 group-hover:text-indigo-600 transition-colors uppercase">
                        {merchant?.merchant_name?.charAt(0)}
                      </span>
                    )}
                  </div>

                  <div className="relative">
                    <h4 className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-all duration-300 group-hover:translate-x-1">
                      {merchant?.merchant_name}
                    </h4>
                  </div>
                </div>
              </Link>
            ))
          ) : null}
        </div>
      </div>
    );
  };

  // Render Products Section
  const renderProducts = () => {
    return (
      <div className="p-7 bg-white w-[300px] rounded-[2.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50">
        <div className="flex flex-col">
          <Link
            href="/products"
            className="group flex items-center gap-4 py-3.5 px-3 rounded-2xl transition-all duration-300 hover:bg-slate-50/50"
          >
            <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-500 border border-transparent group-hover:border-indigo-100">
              <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div className="relative">
              <h4 className="text-[13px] font-bold text-slate-700 transition-all duration-300 group-hover:text-indigo-600 group-hover:translate-x-1">
                Branded Products
              </h4>
            </div>
          </Link>
        </div>
      </div>
    );
  };

  // Render Promotions Section
  const renderPromotions = () => {
    return (
      <div className="p-7 bg-white w-[400px] rounded-[2.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50">
        {/* Clean Vertical List */}
        <div className="flex flex-col">
          {promotions?.length > 0 ? (
            promotions?.slice(0, 8).map((promotion, index) => (
              <Link
                key={index}
                href={getPromotionHref(promotion, promo_slug)}
                className="group flex items-center justify-between py-3.5 px-3 rounded-2xl transition-all duration-300 hover:bg-slate-50/50"
              >
                <div className="flex items-center gap-4">
                  {/* Visual Icon: Ticket / Discount Logo */}
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-slate-50 rounded-xl group-hover:bg-white group-hover:shadow-sm transition-all duration-500 border border-transparent group-hover:border-indigo-100">
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                    </svg>
                  </div>

                  {/* Promotion Text */}
                  <div className="relative">
                    <h4 className="text-[13px] font-bold text-slate-700 transition-all duration-300 group-hover:text-indigo-600 group-hover:translate-x-1">
                      {promotion?.name || "Christmas Holiday Deals"}
                    </h4>

                    {/* Promo Subtext */}
                    <div className="flex items-center gap-2 mt-1 transition-all duration-300 group-hover:translate-x-1">
                      <span className="text-[8px] font-black text-indigo-500/60 uppercase tracking-widest group-hover:text-indigo-600">
                        Limited Time
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest p-4 text-center">No active promotions</p>
          )}
        </div>
      </div>
    );
  };

  // Render Events Section
  const renderEvents = () => {
    if (!events?.length) return null;

    return (
      <div className="p-7 bg-white w-[400px] rounded-[2.5rem] shadow-2xl shadow-slate-200/40 border border-slate-50">
        {/* Clean Vertical List */}
        <div className="flex flex-col">
          {events.slice(0, 8).map((event, index) => (
            <Link
              key={index}
              href={getEventsHref(event, mer_slug_type)}
              className="group flex items-center justify-between py-3.5 px-3 rounded-2xl transition-all duration-300 hover:bg-slate-50/50"
            >
              <div className="flex items-center gap-4">
                {/* Visual Icon: Minimal Calendar/Star */}
                <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-slate-100 rounded-xl group-hover:border-indigo-200 transition-all duration-500">
                  <svg className="w-4 h-4 text-slate-300 group-hover:text-indigo-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>

                {/* Event Text */}
                <div className="relative">
                  <h4 className="text-[13px] font-bold text-slate-700 transition-all duration-300 group-hover:text-indigo-600 group-hover:translate-x-1">
                    {event?.name}
                  </h4>

                  {/* Optional: Event Status Badge */}
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-0.5 block group-hover:text-slate-400 group-hover:translate-x-1 transition-all">
                    Trending Event
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <NavbarStrip
        headerPromoMerchant={headerPromoMerchant}
        companyDomain={companyDomain}
        mer_slug={mer_slug}
        mer_slug_type={mer_slug_type}
      />
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 gap-4">

            {/* Logo Area */}
            <Link href="/" className="flex-shrink-0 transition-transform hover:scale-105">
              <Image className="h-9 w-auto" src={companyLogo} alt="Logo" width={100} height={40} />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasDropdown ? (
                    <div
                      className="relative"
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link href={item.href} className="flex items-center gap-1 px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-indigo-600' : 'text-slate-400'
                            }`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </Link>

                      <div className={`absolute left-0 mt-1 bg-white rounded-2xl shadow-2xl shadow-indigo-100/50 border border-slate-50 py-2 transition-all duration-300 origin-top-left ${activeDropdown === item.name ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                        }`}>
                        {renderSubmenu(item.name)}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="relative px-3 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors group"
                    >
                      {item.name}
                      <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-1/2 group-hover:left-1/4"></span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Search Bar Integration */}
            <div className="flex-1 max-w-xs hidden lg:block">
              <SearchBar
                companyId={unique_id}
                mer_slug={mer_slug}
                slug_type={mer_slug_type}
                cat_slug={cat_slug}
                domain={companyDomain}
              />
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <div className={`lg:hidden transition-all duration-300 bg-white border-t border-slate-50 ${isMobileMenuOpen ? 'max-h-[80vh] overflow-y-auto pb-6' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-4 py-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleMobileSearch(e.target.value)}
                placeholder="Search stores or coupons..."
                className="w-full bg-slate-50 border border-slate-100 px-10 py-3 rounded-xl text-sm text-slate-800"
              />
              <svg className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </form>
            {(mobileSearchResults.merchants.length > 0 || mobileSearchResults.categories.length > 0) && (
              <div className="mb-4 p-4 bg-slate-50 rounded-xl max-h-64 overflow-y-auto">
                {mobileSearchResults.merchants.length > 0 && (
                  <div className="mb-3">
                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Stores</h5>
                    <div className="space-y-1">
                      {mobileSearchResults.merchants.slice(0, 5).map((merchant: any, idx: number) => (
                        <Link
                          key={idx}
                          href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                          className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:text-indigo-600 rounded-lg transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {merchant.merchant_name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
                {mobileSearchResults.categories.length > 0 && (
                  <div>
                    <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2">Categories</h5>
                    <div className="flex flex-wrap gap-2">
                      {mobileSearchResults.categories.slice(0, 5).map((category: any, idx: number) => (
                        <Link
                          key={idx}
                          href={`/${category.url}`}
                          className="px-2 py-1 bg-white text-slate-700 hover:bg-indigo-100 hover:text-indigo-700 rounded-lg text-xs font-medium transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            <div className="space-y-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.hasDropdown ? (
                    <div>
                      <button
                        onClick={() => setMobileActiveDropdown(mobileActiveDropdown === item.name ? null : item.name)}
                        className="w-full flex items-center justify-between px-4 py-3 text-base font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                      >
                        {item.name}
                        <svg
                          className={`w-4 h-4 transition-transform ${mobileActiveDropdown === item.name ? 'rotate-180' : ''}`}
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {mobileActiveDropdown === item.name && (
                        <div className="pl-4 mt-1 space-y-1">
                          {item.name === 'Categories' && (
                            <>
                              {categories?.slice(0, 8).map((category: any, idx: number) => (
                                <Link
                                  key={idx}
                                  href={`/${category?.url}`}
                                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {category.name}
                                </Link>
                              ))}
                              <Link
                                href="/category"
                                className="block px-4 py-2 mb-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                View All Categories →
                              </Link>
                            </>
                          )}
                          {item.name === 'Stores' && (
                            <>
                              {merchantData?.slice(0, 8).map((merchant, idx) => (
                                <Link
                                  key={idx}
                                  href={getMerchantHref(merchant, mer_slug, mer_slug_type)}
                                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {merchant?.merchant_name}
                                </Link>
                              ))}
                              <Link
                                href="/all-stores/A"
                                className="block px-4 py-2 mb-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                View All Stores →
                              </Link>
                            </>
                          )}
                          {item.name === 'Products' && (
                            <>
                              <Link
                                href="/products"
                                className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                Branded Products
                              </Link>
                              <Link
                                href="/all-products"
                                className="block px-4 py-2 mb-2 text-sm font-bold text-indigo-600 hover:text-indigo-700 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                View All Products →
                              </Link>
                            </>
                          )}
                          {item.name === 'Promotions' && (
                            <>
                              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 px-4"></h5>
                              {promotions?.slice(0, 8).map((promotion, idx) => (
                                <Link
                                  key={idx}
                                  href={getPromotionHref(promotion, promo_slug)}
                                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {promotion?.name}
                                </Link>
                              ))}
                            </>
                          )}
                          {item.name === 'Events' && (
                            <>
                              <h5 className="text-xs font-black text-slate-900 uppercase tracking-wider mb-2 px-4"></h5>
                              {events?.slice(0, 8).map((event, idx) => (
                                <Link
                                  key={idx}
                                  href={getEventsHref(event, mer_slug_type)}
                                  className="block px-4 py-2 text-sm font-medium text-slate-600 hover:text-indigo-600 rounded-lg"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  {event?.name}
                                </Link>
                              ))}
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      {...(item.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="block px-4 py-3 text-base font-bold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavbarSec;