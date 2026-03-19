import { apiGetNavMerchants } from "@/apis/merchant";
import {
    apiGetPromotionalMerchants,
    apiNavCategory,
} from "@/apis/page_optimization";
import { apiGetEvents } from "@/apis/user";
import { getBaseImageUrl, getEventsHref, getMerchantHref } from "@/constants/hooks";
import Image from "next/image";
import Link from "next/link";
import React, { Suspense } from "react";
import NavSearch from "./NavSearch";
import MobileNavMenu from "@/components/Theme-2/comp/MobileNavMenu";

interface Props {
    companyDomain: string;
    unique_id: string;
    mer_slug: string;
    mer_slug_type: string;
    cat_slug: string;
    blog_url?: string;
    blog_title?: string;
    company_logo: string | null;
    headerPromoMerchant: 1 | 0;
}

const NavBar = async ({
    unique_id,
    headerPromoMerchant,
    companyDomain,
    mer_slug,
    mer_slug_type,
    cat_slug,
    blog_url,
    blog_title,
    company_logo,
}: Props) => {
    const companyLogo = getBaseImageUrl(
        companyDomain,
        company_logo,
        "/themes/Theme_2/img/logo.png"
    );
    const [categories, merchantData, headerPromoMerchantResponse, events] =
        await Promise.all([
            apiNavCategory(unique_id).then((res) => res?.data),
            apiGetNavMerchants(unique_id).then((res) => res?.data),
            headerPromoMerchant == 1
                ? apiGetPromotionalMerchants(unique_id).then((res) => res?.data)
                : Promise.resolve(null),
            apiGetEvents(unique_id).then((res) => res?.data),
        ]);
    return (
        <div className="main-header pb-3">
            {/* 🔹 Promo Merchants Bar */}
            {headerPromoMerchantResponse && (
                <div className="promo-bar">
                    <div className="promo-container">
                        {headerPromoMerchantResponse?.length > 0 && headerPromoMerchantResponse?.slice(0, 3).map((item, i) => (
                            <Link
                                key={i}
                                className="promo-link"
                                href={getMerchantHref(item, mer_slug, mer_slug_type)}
                            >
                                {item?.merchant_name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
            {/* <MobileNavMenu 
                categories={categories}
                merchantData={merchantData}
                events={events}
                cat_slug={cat_slug}
                mer_slug={mer_slug}
                mer_slug_type={mer_slug_type}
                blog_url={blog_url}
                blog_title={blog_title}
                companyLogo={companyLogo}
                companyId={unique_id}
                companyDomain={companyDomain}
                headerPromoMerchant={headerPromoMerchantResponse}
            /> */}

            {/* 🔹 Main Navigation */}
            <div className="nav-main">
                <div className="nav-inner d-flex align-items-center justify-content-between">
                    
                    {/* 1. Logo */}
                    <div className="nav-logo">
                        <Link href="/">
                            <Image
                                src={companyLogo}
                                alt="Site Logo"
                                width={240}
                                height={100}
                                className="site-logo"
                            />
                        </Link>
                    </div>

                    {/* 2. Desktop Links (Hidden on Mobile via d-none d-lg-flex) */}
                    <ul className="nav-links d-none d-lg-flex">
                        <li><Link href="/">Home</Link></li>
                        <li className="has-dropdown">
                            <Link href="/category">Category</Link>
                            <ul className="dropdown">
                                {categories?.map((item, i) => (
                                    <li key={i}><Link href={`/${item.url}`}>{item.name}</Link></li>
                                ))}
                            </ul>
                        </li>
                        <li className="has-dropdown">
                            <Link href="/all-stores/A">Stores</Link>
                            <ul className="dropdown">
                                {merchantData?.map((item, i) => (
                                    <li key={i}>
                                        <Link href={getMerchantHref(item, mer_slug, mer_slug_type)} className="d-flex align-items-center fw-600">
                                            <div className="mer-nav-img-wrapper">
                                                <Image
                                                    src={getBaseImageUrl(companyDomain, item?.merchant_logo, "")}
                                                    alt={item?.merchant_name}
                                                    height={50}
                                                    width={50}
                                                    layout="responsive"
                                                />
                                            </div>
                                            <p className="text-center fw-600">
                                                {item?.merchant_name}
                                            </p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li><Link href="/all-products">Products</Link></li>
                        {events?.length > 0 && (
                            <li className="has-dropdown">
                                <Link href="/events">Events</Link>
                                <ul className="dropdown">
                                    {events.map((ev, i) => (
                                        <li key={i}><Link href={getEventsHref(ev, mer_slug_type)}>{ev.name}</Link></li>
                                    ))}
                                </ul>
                            </li>
                        )}
                        {blog_title && blog_url && (
                            <li><Link href={blog_url}>{blog_title}</Link></li>
                        )}
                    </ul>

                    {/* 3. Search (Desktop) - Hidden on Mobile if preferred, or kept */}
                    <div className="d-none d-lg-block">
                        <NavSearch
                            companyId={unique_id}
                            mer_slug={mer_slug}
                            slug_type={mer_slug_type}
                            domain={companyDomain}
                        />
                    </div>

                    {/* 4. Mobile Menu Toggle & Drawer (Visible ONLY on Mobile via d-lg-none inside component) */}
                    <MobileNavMenu 
                        categories={categories}
                        merchantData={merchantData}
                        events={events}
                        cat_slug={cat_slug}
                        mer_slug={mer_slug}
                        mer_slug_type={mer_slug_type}
                        blog_url={blog_url}
                        blog_title={blog_title}
                        companyLogo={companyLogo}
                        companyId={unique_id}
                        companyDomain={companyDomain}
                        headerPromoMerchant={headerPromoMerchantResponse}
                    />
                </div>
            </div>
        </div>

    );
};

export default NavBar;
