"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { getEventsHref, getMerchantHref, getPromotionHref } from "@/constants/hooks";
import NavSearch from './NavSearch';
import { Merchant } from "@/services/dataTypes";
import { faChevronDown, FontAwesomeIcon } from "@/constants/icons";
import Image from 'next/image'
// import React, { Suspense } from 'react'
interface MobileNavMenuProps {
    categories: any[];
    merchantData: any[];
    events: any[];
    promotions: any[],
    cat_slug: string;
    mer_slug: string;
    mer_slug_type: string;
    promo_slug: string,
    blog_url?: string;
    blog_title?: string;
    companyLogo: string;
    headerPromoMerchant: Merchant[] | null,
    companyId: string,
    companyDomain: string,
}
const MobileNavMenu = ({
    categories,
    merchantData,
    events,
    cat_slug,
    mer_slug,
    mer_slug_type,
    blog_url,
    blog_title,
    companyLogo,
    companyId,
    companyDomain,
    headerPromoMerchant,
    promotions,
    promo_slug,
}: MobileNavMenuProps) => {
    const [open, setOpen] = useState(false);
    const [openSub, setOpenSub] = useState<string | null>(null);
    return (
        <>
            {/* Hamburger */}
            {!open && (
                <div className="navbar-toggle d-flex gap-6">
                    <div className="switch-wrapper-top d-flex d-lg-none"></div>
                    <button
                        className="navbar-toggle-btn d-block d-lg-none"
                        type="button"
                        onClick={() => setOpen(true)} // :white_check_mark: Add this
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            )}
            {/* Overlay */}
            {open && (
                <div className="mobile-nav-overlay-custom" onClick={() => setOpen(false)}>
                    <div
                        className={`mobile-nav-drawer-custom ${open ? 'slide-in' : ''}`}
                        onClick={e => e.stopPropagation()}
                        style={{
                            // height: '90vh',
                            overflowY: 'auto',
                            paddingRight: '8px',
                        }}
                    >
                        <div className="menu-item mb-4">
                            <Link href="/" onClick={() => setOpen(false)}>
                                <Image src={companyLogo} height={40} width={100} alt="logo" />
                            </Link>
                        </div>
                        <div className=" w-100 d-sm-block" >
                            <div className='custom-search-wrapper w-100 position-relative'>
                                <Suspense fallback={<div></div>}>
                                    <NavSearch
                                        companyId={companyId}
                                        mer_slug={mer_slug}
                                        slug_type={mer_slug_type}
                                        cat_slug={cat_slug}
                                        domain={companyDomain}
                                    />
                                </Suspense>
                            </div>
                            {/* Promotional Merchants Api */}
                            {headerPromoMerchant &&
                                <div className="merchant-tags">
                                    {headerPromoMerchant?.length > 0 && headerPromoMerchant.map((item, i) => {
                                        if (i < 3) {
                                            return (
                                                // <div key={i} className="merchant-tag">
                                                <div key={i} className="mt-1" style={{ marginBottom: '-10px' }}>
                                                    <Link className='f-12 fw-5 cus-promo' href={getMerchantHref(item, mer_slug, mer_slug_type)}>
                                                        {item.merchant_name}
                                                    </Link>
                                                </div>
                                            )
                                        }
                                    })}
                                </div>
                            }
                        </div>
                        <ul className="menu-item list-unstyled pt-5 ">
                            <li>
                                <Link href="/" className="mobile-nav-link-custom" onClick={() => setOpen(false)}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <button className="mobile-nav-link-custom d-flex align-items-center gap-1" style={{ background: "none", border: "none", width: "100%", textAlign: "left" }} onClick={() => setOpenSub(openSub === "categories" ? null : "categories")}>
                                    Categories
                                    <FontAwesomeIcon icon={faChevronDown} style={{ width: '10px', height: '10px', color: 'black' }} className="custom-icon-upd" />
                                </button>
                                {openSub === "categories" && (
                                    <ul
                                        className="sub-menu menu-item list-unstyled ps-3"
                                        style={{
                                            maxHeight: openSub === 'categories' ? '1000px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.4s ease-in-out',
                                        }}
                                    >
                                        {categories?.length > 0 ? (
                                            <>
                                                {categories?.slice(0,).map((item, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            href={`/${item?.url}`}
                                                            className="mobile-nav-link-custom n2-color slide-horizontal"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {categories?.length > 5 && (
                                                    <li>
                                                        <Link
                                                            href="/category"
                                                            className="mobile-nav-link-custom mob-seemore n2-color slide-horizontal underline-important"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            See More Categories
                                                        </Link>
                                                    </li>
                                                )}
                                            </>
                                        ) : (
                                            <li>No categories available</li>
                                        )}
                                    </ul>
                                )}
                            </li>
                            <li>
                                <button className="menu-item mobile-nav-link-custom d-flex align-items-center gap-1" style={{ background: "none", border: "none", width: "100%", textAlign: "left" }} onClick={() => setOpenSub(openSub === "stores" ? null : "stores")}>
                                    Stores
                                    <FontAwesomeIcon icon={faChevronDown} style={{ width: '10px', height: '10px', color: 'black' }} className="custom-icon-upd" />
                                </button>
                                {openSub === "stores" && (
                                    <ul
                                        className="sub-menu list-unstyled ps-3"
                                        style={{
                                            maxHeight: openSub === 'stores' ? '1000px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.4s ease-in-out',
                                        }}
                                    >
                                        {merchantData.length > 0 ? (
                                            <>
                                                {merchantData.slice(0, 10).map((item, i) => (
                                                    <li key={i}>
                                                        <Link
                                                            href={getMerchantHref(item, mer_slug, mer_slug_type)}
                                                            className="mobile-nav-link-custom n2-color slide-horizontal"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            {item.merchant_name}
                                                        </Link>
                                                    </li>
                                                ))}
                                                {merchantData.length > 5 && (
                                                    <li>
                                                        <Link
                                                            href="/all-stores/A"
                                                            className="mobile-nav-link-custom mob-seemore n2-color slide-horizontal underline-important"
                                                            onClick={() => setOpen(false)}
                                                        >
                                                            See More Stores
                                                        </Link>
                                                    </li>
                                                )}
                                            </>
                                        ) : (
                                            <li>No stores available</li>
                                        )}
                                    </ul>
                                )}
                            </li>
                            {events.length > 0 && (
                                <li>
                                    <button className="menu-item mobile-nav-link-custom d-flex align-items-center gap-1" style={{ background: "none", border: "none", width: "100%", textAlign: "left" }} onClick={() => setOpenSub(openSub === "events" ? null : "events")}>
                                        Events
                                        <FontAwesomeIcon icon={faChevronDown} style={{ width: '10px', height: '10px', color: 'black' }} className="custom-icon-upd" />
                                    </button>
                                    {openSub === "events" && (
                                        <ul
                                            className="sub-menu list-unstyled ps-3"
                                            style={{
                                                maxHeight: openSub === 'events' ? '1000px' : '0',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.4s ease-in-out',
                                            }}
                                        >
                                            {events.map((item, i) => (
                                                <li key={i}>
                                                    <Link href={getEventsHref(item, mer_slug_type)} className="mobile-nav-link-custom n2-color slide-horizontal" onClick={() => setOpen(false)}>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            )}
                            {promotions.length > 0 && (
                                <li>
                                    <button className="menu-item mobile-nav-link-custom d-flex align-items-center gap-1" style={{ background: "none", border: "none", width: "100%", textAlign: "left" }} onClick={() => setOpenSub(openSub === "promotions" ? null : "promotions")}>
                                        Promotions
                                        <FontAwesomeIcon icon={faChevronDown} style={{ width: '10px', height: '10px', color: 'black' }} className="custom-icon-upd" />
                                    </button>
                                    {openSub === "promotions" && (
                                        <ul
                                            className="sub-menu list-unstyled ps-3"
                                            style={{
                                                maxHeight: openSub === 'promotions' ? '1000px' : '0',
                                                overflow: 'hidden',
                                                transition: 'max-height 0.4s ease-in-out',
                                            }}
                                        >
                                            {promotions.map((item, i) => (
                                                <li key={i}>
                                                    <Link href={getPromotionHref(item, promo_slug)} className="mobile-nav-link-custom n2-color slide-horizontal" onClick={() => setOpen(false)}>
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>

                            )}
                            <li>
                                {/* Toggle Button for Products */}
                                <button
                                    className="menu-item mobile-nav-link-custom d-flex align-items-center gap-1"
                                    style={{ background: "none", border: "none", width: "100%", textAlign: "left" }}
                                    onClick={() => setOpenSub(openSub === "products" ? null : "products")}
                                >
                                    Products
                                    <FontAwesomeIcon icon={faChevronDown} style={{ width: '10px', height: '10px', color: 'black' }} className="custom-icon-upd" />
                                </button>

                                {/* Dropdown Menu */}
                                {openSub === "products" && (
                                    <ul
                                        className="sub-menu list-unstyled ps-3"
                                        style={{
                                            maxHeight: openSub === 'products' ? '1000px' : '0',
                                            overflow: 'hidden',
                                            transition: 'max-height 0.4s ease-in-out',
                                        }}
                                    >
                                        <li>
                                            <Link href={"/products"} className="mobile-nav-link-custom n2-color slide-horizontal" onClick={() => setOpen(false)}>
                                                Branded Products
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href="/all-products"
                                                className="mobile-nav-link-custom mob-seemore n2-color slide-horizontal underline-important"
                                                onClick={() => setOpen(false)}
                                            >
                                                See All Products
                                            </Link>
                                        </li>
                                    </ul>
                                )}
                            </li>
                            {blog_title && blog_url && (
                                <li>
                                    <Link href={blog_url} className="menu-item mobile-nav-link-custom" onClick={() => setOpen(false)}>
                                        {blog_title}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};
export default MobileNavMenu;