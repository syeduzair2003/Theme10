import React, { Suspense } from 'react'
import Link from "next/link";
import Image from "next/image";
import { CategoryData, EventResponse, Merchant, Promotion } from '@/services/dataTypes'
import NavSearch from './NavSearch';
import { discardHTMLTags, getBaseImageUrl, getCategoryHref, getEventsHref, getMerchantHref, getPromotionHref, getRandomStoreSeoTitle, splitHeadingFromDetails } from '@/constants/hooks';
import MobileNavMenu from './MobileNavMenu';
// import Image from "@/components/shared/Image";
import DropdownMenu from './DropdownMenu';
import { faChevronDown, FontAwesomeIcon } from '@/constants/icons';
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
    <header className="header-section position-relative" style={{ zIndex: 1000 }}>
      <div className="container-fluid">
        <div className="top-header">
          <div className="merchant-slider-container">
            {headerPromoMerchant &&
              <div className="merchant-tags p-0 m-0 d-flex align-items-center justify-content-center gap-1">
                {headerPromoMerchant?.length > 0 && headerPromoMerchant.map((item, i) => {
                  let [heading] = splitHeadingFromDetails(discardHTMLTags(item?.merchant_detail || ''));
                  if (item?.promotional_tag) heading = item?.promotional_tag
                  if (i < 4) {
                    return (
                      // <div key={i} className="merchant-tag">
                      <div key={i} className="promo-merchant-tags promo-tags-pad" style={{
                        ...(i === 3
                          ? {}
                          : { borderRight: '1px solid #ccc' })
                      }}>
                        <Link className='cus-promo' href={getMerchantHref(item, mer_slug, mer_slug_type)}>
                          {heading ? heading : getRandomStoreSeoTitle(item?.merchant_name)}
                        </Link>
                      </div>
                    )
                  }
                })}
              </div>
            }
          </div>
          <div className="row align-items-center py-4">
            <div className="col-lg-3 col-xxl-2">
              <Link href="/" className="nav-brand d-none d-lg-flex align-items-center gap-2">
                <Image src={companyLogo} height={100} width={100} alt="logo" layout='responsive' />
              </Link>
            </div>
            <div className="col-lg-9 col-xxl-10 d-center gap-3 gap-md-4">
              <div className=" w-100  d-none d-sm-block" >
                <div className='custom-search-wrapper w-100 position-relative'>
                  <Suspense fallback={<div></div>}>
                    <NavSearch
                      companyId={unique_id}
                      mer_slug={mer_slug}
                      slug_type={mer_slug_type}
                      cat_slug={cat_slug}
                      domain={companyDomain}
                    />
                  </Suspense>
                </div>
              </div>
              <div className="main-navbar mx-0 mx-md-3  b-ninth n1-bg-color">
                <div className="container-fluid">
                  <div className="row">
                    <nav className="navbar-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <div className="d-flex align-items-center justify-content-between">
                        <Link href="/" className="nav-brand d-block d-lg-none">
                          <Image className="d-block d-md-block" src={companyLogo} height={100} width={100} alt="logo" />
                        </Link>
                        <MobileNavMenu
                          categories={categories}
                          merchantData={merchantData}
                          events={events}
                          promotions={promotions}
                          cat_slug={cat_slug}
                          mer_slug={mer_slug}
                          mer_slug_type={mer_slug_type}
                          promo_slug={promo_slug}
                          blog_url={blog_url}
                          blog_title={blog_title}
                          companyLogo={companyLogo}
                          companyId={unique_id}
                          headerPromoMerchant={headerPromoMerchant}
                          companyDomain={companyDomain}
                        />
                      </div>
                      <div className="navbar-toggle-item">
                        <div className="d-flex gap-5 flex-column flex-lg-row align-items-start align-items-lg-center justify-content-between mt-lg-0">
                          <ul className="custom-nav d-lg-flex d-grid gap-3 pt-4 gap-lg-4 align-items-center justify-content-center">
                            <li className="menu-item position-relative">
                              <Link href={'/'}>
                                <button className="position-relative" data-splitting>
                                  Home
                                </button>
                              </Link>
                            </li>
                            <li className="menu-item position-relative">
                              <Link href={`/${cat_slug}`} className='d-flex align-items-center justify-content-center'>
                                Categories
                                <FontAwesomeIcon icon={faChevronDown} style={{ width: '12px', height: '12px', color: 'black' }} className="custom-icon-upd" />
                              </Link>
                              <ul className="sub-menu p-lg-5 position-cus-right">
                                {categories?.length > 0 ?
                                  categories.map((item: any, i: number) => {
                                    return (
                                      <li key={i} className="menu-link py-2 d-flex gap-2 cat-nav">
                                        <Image src={getBaseImageUrl(companyDomain, item?.category_image, "")} alt={item?.name} height={25} width={25} />
                                        <Link href={`/${item?.url}`} className="n2-color slide-horizontal f-20" data-splitting>{item.name}</Link>
                                      </li>
                                    )
                                  }) :
                                  <li className="menu-link py-1">
                                    <p className="n2-color slide-horizontal" data-splitting>No categories available</p>
                                  </li>
                                }
                              </ul>
                            </li>
                            <li className="menu-item position-relative">
                              <Link href={`/all-stores/A`} className='d-flex align-items-center justify-content-center'>
                                Stores
                                <FontAwesomeIcon icon={faChevronDown} style={{ width: '12px', height: '12px', color: 'black' }} className="custom-icon-upd" />
                              </Link>
                              <ul className={`sub-menu p-lg-5 position-cus-right ${merchantData?.length >= 10 ? 'multi-column' : ''}`}>
                                {merchantData?.length > 0 ?
                                  merchantData.map((item, i) => {
                                    return (
                                      <li key={i} className="menu-link py-2 cat-nav h-100 d-flex align-items-center flex-row gap-3">
                                        <span className="mer-nav-img-wrapper">
                                          <Image src={getBaseImageUrl(companyDomain, item?.merchant_logo, "")} alt={item?.merchant_name} height={100} width={100} objectFit='contain' />
                                        </span>
                                        <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="n2-color slide-horizontal" data-splitting>{item.merchant_name}</Link>
                                      </li>
                                    )
                                  })
                                  :
                                  <p className="n2-color slide-horizontal" data-splitting>No stores available</p>
                                }
                              </ul>
                            </li>
                            <li className="menu-item position-relative">
                              <Link href="/all-products">
                                
                                <button className="position-relative d-flex align-items-center"data-splitting>
                                  Products
                                  <FontAwesomeIcon
                                    icon={faChevronDown}
                                    style={{ width: '10px', height: '10px', color: 'black' }}
                                    className="custom-icon-upd"
                                  />
                                </button>
                              </Link>
                              <ul className="sub-menu p-lg-5 position-cus-right">
                                <li className="menu-link py-2 cat-nav h-100 d-flex align-items-center flex-row gap-3">
                                  <Link href="/products" className="n2-color slide-horizontal" data-splitting>
                                    Brands Products
                                  </Link>
                                </li>
                              </ul>
                            </li>
                            {promotions?.length > 0 && (
                              <li className="menu-item position-relative">
                                <Link href={`/${promo_slug}`} className='d-flex align-items-center justify-content-center'>
                                  Promotions
                                  <FontAwesomeIcon icon={faChevronDown} style={{ width: '12px', height: '12px', color: 'black' }} className="custom-icon-upd" />
                                </Link>
                                <ul className={`sub-menu p-lg-5 position-cus-right ${events?.length >= 10 ? 'multi-column' : ''}`}>
                                  {promotions?.length > 0 ?
                                    promotions.map((item, i) => {
                                      return (
                                        <li key={i} className="menu-link py-2 d-flex gap-2 cat-nav">
                                          <Link href={getPromotionHref(item, promo_slug)} className="n2-color slide-horizontal f-20" data-splitting>{item.name}</Link>
                                        </li>
                                      )
                                    })
                                    :
                                    <p className="n2-color slide-horizontal" data-splitting>No Promotions available</p>
                                  }
                                </ul>
                              </li>
                            )}
                            {events?.length > 0 && (
                              <li className="menu-item position-relative">
                                <Link href={`/events`} className='d-flex align-items-center justify-content-center'>
                                  Events
                                  <FontAwesomeIcon icon={faChevronDown} style={{ width: '12px', height: '12px', color: 'black' }} className="custom-icon-upd" />
                                </Link>
                                <ul className={`sub-menu p-lg-5 position-cus-right ${events?.length >= 10 ? 'multi-column' : ''}`}>
                                  {events?.length > 0 ?
                                    events.map((item, i) => {
                                      return (
                                        // <li key={i} className="menu-link py-1">
                                        //   <Link href={getEventsHref(item, mer_slug_type)} className="n2-color slide-horizontal" data-splitting>{item.name}</Link>
                                        // </li>
                                        <li key={i} className="menu-link py-2 d-flex gap-2 cat-nav">
                                          <Image src={getBaseImageUrl(companyDomain, "", `/shared-assets/international-women.png`)} alt={item?.name} height={25} width={25} />
                                          <Link href={getEventsHref(item, mer_slug_type)} className="n2-color slide-horizontal f-20" data-splitting>{item.name}</Link>
                                        </li>
                                      )
                                    })
                                    :
                                    <p className="n2-color slide-horizontal" data-splitting>No Events available</p>
                                  }
                                </ul>
                              </li>
                            )}
                            {/* <DropdownMenu
                              companyDomain={companyDomain}
                              categories={categories}
                              merchantData={merchantData}
                              events={events}
                              cat_slug={cat_slug}
                              mer_slug={mer_slug}
                              mer_slug_type={mer_slug_type}
                            /> */}

                            {blog_title && blog_url && (
                              <li className="menu-item position-relative">
                                <Link href={blog_url}>
                                  <button className="position-relative" data-splitting>
                                    {blog_title}
                                  </button>
                                </Link>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </header >
  )
}
export default NavbarSec