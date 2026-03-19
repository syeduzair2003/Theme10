import Link from 'next/link';
import Image from 'next/image';
import { categoryMinimalData, EventResponse, minimalMerchantData, Promotion } from '@/services/dataTypes';
import CategoryNavbar from './CategoryNavbar';
import { getBaseImageUrl, getEventsHref, getMerchantHref, getPromotionHref } from '@/constants/hooks';
import { Suspense } from 'react';
import SearchBar from './Searchbar';
import MobileNavbarWrapper from './MobileNavbarWrapper';


interface Props {
    merchantData: minimalMerchantData[],
    categories: categoryMinimalData[] | any,
    promotionalMerchants: minimalMerchantData[] | null | undefined,
    domain: string,
    company_id: string;
    company_logo: string | null;
    blog_title?: string | null;
    blog_url?: string | null;
    cat_slug: string;
    mer_slug_type: string;
    mer_slug: string;
    promo_slug: string,
    events: EventResponse[],
    promotions: Promotion[],
}

const Navbar: React.FC<Props> = ({ company_id, company_logo, blog_title, blog_url, cat_slug, mer_slug_type, mer_slug, merchantData, categories, promotionalMerchants, domain, events, promotions, promo_slug }: Props) => {

    const companyLogo = getBaseImageUrl(domain, company_logo, "/themes/Theme_6/images/logo-light.png");


    return (
        <header className="navBar-header-wrapper">
            <div className="navBar-main-bar-container">
                <div className="cuscontainer">
                    {/* CHANGED: Added 'flex-column' to stack the Top Bar and Main Menu vertically inside the white box */}
                    <nav className="navBar-capsule-nav d-flex flex-column justify-content-center" style={{ padding: '0', borderRadius: "14px" }}>

                        {/* --- 1. NEW TOP BAR (Inside the capsule) --- */}
                        <div className="w-100 d-none d-lg-block" style={{ borderBottom: '1px solid #eaebed' }}>
                                    <div className="merchant-tags-custom d-none d-xl-flex d-lg-flex d-md-flex justify-content-center">
                                        {promotionalMerchants && promotionalMerchants?.length > 0 && promotionalMerchants.map((item, i) => {
                                            if (i < 10) {
                                                return (
                                                    <div key={i} className="merchant-tag">
                                                        <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="f-14">
                                                            {item.merchant_name}
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                        })}
                                    </div>
                        </div>

                        {/* --- 2. MAIN NAV WRAPPER (Preserving horizontal alignment) --- */}
                        <div className="w-100 d-flex align-items-center justify-content-between" style={{ padding: '10px 20px' }}>

                            {/* Logo */}
                            <div className="navBar-logo-area">
                                <Link href="/">
                                    <Image
                                        src={companyLogo}
                                        alt="Logo"
                                        width={130}
                                        height={40}
                                        priority
                                    />
                                </Link>
                            </div>

                            {/* Navigation Menu */}
                            <div className="navBar-menu-links d-none d-xl-block">
                                <ul className="d-flex list-unstyled mb-0">
                                    <li className="navBar-nav-item">
                                        <Link href="/">Home</Link>
                                    </li>

                                    {/* Category */}
                                    <CategoryNavbar categories={categories} cat_slug={cat_slug} />

                                    {/* Stores */}
                                    <li className="navBar-nav-item has-child">
                                        <Link href={`/${mer_slug}`} className="nav-menu-link">Stores</Link>
                                        {merchantData?.length ? (
                                            <ul className="nav-submenu stores-dropdown">
                                                {merchantData.map((store, i) => (
                                                    <li key={i} className="nav-submenu-item d-flex align-items-center">
                                                        <Image
                                                            src={getBaseImageUrl(domain, store?.merchant_logo, "")}
                                                            alt={`${store?.merchant_name} logo`}
                                                            width={70} height={50} style={{ objectFit: "contain" }}
                                                        />
                                                        <Link href={getMerchantHref(store, mer_slug, mer_slug_type)} className="nav-submenu-link ms-2">
                                                            {store.merchant_name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : null}
                                    </li>

                                    {/* Events */}
                                    {events?.length > 0 && (
                                        <li className="navBar-nav-item has-child" style={{ position: "relative" }}>
                                            <Link href="/events" className="nav-menu__link">Events</Link>
                                            <ul className="nav-submenu">
                                                {events?.length > 0 ? (
                                                    events.map((item, i) => (
                                                        <Link key={i} href={getEventsHref(item, mer_slug_type)} className="nav-submenu-item d-flex align-items-center">
                                                            {item.name}
                                                        </Link>
                                                    ))
                                                ) : (<p className="none" data-splitting>No Events available</p>)}
                                            </ul>
                                        </li>
                                    )}

                                    {/* Promotions */}
                                    {promotions?.length > 0 && (
                                        <li className="navBar-nav-item has-child" style={{ position: "relative" }}>
                                            <Link href="/promotion" className="nav-menu__link">Promotions</Link>
                                            <ul className="nav-submenu">
                                                {promotions?.length > 0 ? (
                                                    promotions.map((item, i) => (
                                                        <Link key={i} href={getPromotionHref(item, promo_slug)} className="nav-submenu-item d-flex align-items-center">
                                                            {item.name}
                                                        </Link>
                                                    ))
                                                ) : (<p className="none" data-splitting>No Promotions available</p>)}
                                            </ul>
                                        </li>
                                    )}

                                    {/* Products */}
                                    <li className="navBar-nav-item has-child" style={{ position: "relative" }}>
                                        <Link href="/all-products" className="nav-menu__link">Products</Link>
                                        <ul className="nav-submenu">
                                            <li><Link href="/products" className="nav-submenu-item d-flex align-items-center">Branded Products</Link></li>
                                        </ul>
                                    </li>

                                    {/* blog */}
                                    {blog_title && blog_url && (
                                        <li className="navBar-nav-item">
                                            <Link href={blog_url} target="_blank" className="nav-menu__link">{blog_title}</Link>
                                        </li>
                                    )}
                                </ul>
                            </div>

                            {/* Action Icons & Button */}
                            <div className="navBar-extra-nav d-flex align-items-center col-lg-2 col-md-9 col-sm-9 flex-column d-xl-flex d-none">
                                <div className="search-custom-new" style={{ alignItems: "flex-end" }}>
                                    <Suspense fallback={<div></div>}>
                                        <SearchBar
                                            companyId={company_id}
                                            mer_slug={mer_slug}
                                            slug_type={mer_slug_type}
                                            cat_slug={cat_slug}
                                        />
                                    </Suspense>
                                </div>
                            </div>

                            <div className="col-6 col-md-1 col-sm-1 d-xl-none text-end">
                                <MobileNavbarWrapper
                                    companyId={company_id}
                                    logo={companyLogo}
                                    categories={categories}
                                    merchantData={merchantData}
                                    events={events}
                                    blog_title={blog_title}
                                    blog_url={blog_url}
                                    mer_slug={mer_slug}
                                    cat_slug={cat_slug}
                                    mer_slug_type={mer_slug_type}
                                    promo_slug={promo_slug}
                                    promotions={promotions}
                                />
                            </div>
                        </div>

                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;