"use client";
import React, { useState, Suspense, useEffect, useRef } from "react";
import Link from "next/link";
import { getEventsHref, getMerchantHref } from "@/constants/hooks";
// import NavSearch from './NavSearch'; // REMOVED
import MobileSearchInput from './MobileSearchInput'; // NEW IMPORT
import { Merchant } from "@/services/dataTypes";
import { faChevronDown, FontAwesomeIcon } from "@/constants/icons";
import Image from 'next/image';

interface MobileNavMenuProps {
    categories: any[];
    merchantData: any[];
    events: any[];
    cat_slug: string;
    mer_slug: string;
    mer_slug_type: string;
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
    headerPromoMerchant
}: MobileNavMenuProps) => {
    const [open, setOpen] = useState(false);
    const [openSub, setOpenSub] = useState<string | null>(null);
    const drawerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };

        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    return (
        <>
            {/* Hamburger Button */}
            {!open && (
                <div className="navbar-toggle d-flex align-items-center">
                    <button
                        className="navbar-toggle-btn d-lg-none"
                        type="button"
                        onClick={() => setOpen(true)}
                        aria-label="Open Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            )}

            {/* Overlay Backdrop */}
            {open && <div className="mobile-nav-overlay-custom"></div>}

            {/* Drawer Panel */}
            <div
                ref={drawerRef}
                className={`mobile-nav-drawer-custom ${open ? 'slide-in' : ''}`}
            >
                {/* Header: Logo */}
                <div className="mobile-nav-header mb-4 d-flex justify-content-between align-items-center">
                    <Link href="/" onClick={() => setOpen(false)}>
                        <Image 
                            src={companyLogo} 
                            height={40} 
                            width={120} 
                            alt="logo" 
                            className="mobile-nav-logo"
                        />
                    </Link>
                    {/* Optional: Close X button inside drawer for better UX */}
                    <button 
                        onClick={() => setOpen(false)} 
                        className="btn-close-drawer"
                        aria-label="Close Menu"
                    >
                        &times;
                    </button>
                </div>

                {/* Search Bar (SIMPLE INPUT ONLY) */}
                <div className="mb-4">
                    <MobileSearchInput
                        // companyId={companyId}
                        // domain={companyDomain}
                    />
                </div>

                {/* Promo Merchants (Tags) */}
                {headerPromoMerchant && headerPromoMerchant.length > 0 && (
                    <div className="mobile-promo-tags mb-4">
                        <h6 className="f-12 text-muted fw-bold mb-2 text-uppercase">Featured</h6>
                        <div className="d-flex flex-wrap gap-2">
                            {headerPromoMerchant.slice(0, 3).map((item, i) => (
                                <Link
                                    key={i}
                                    className="mobile-promo-pill"
                                    href={getMerchantHref(item, mer_slug, mer_slug_type)}
                                    onClick={() => setOpen(false)}
                                >
                                    {item.merchant_name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Menu Links */}
                <ul className="mobile-menu-list list-unstyled">
                    {/* ... (Menu structure remains the same) ... */}
                    {/* Home */}
                    <li className="mobile-menu-item">
                        <Link href="/" className="mobile-link" onClick={() => setOpen(false)}>
                            Home
                        </Link>
                    </li>

                    {/* Categories Dropdown */}
                    <li className="mobile-menu-item">
                        <button 
                            className={`mobile-link has-dropdown ${openSub === "categories" ? 'active' : ''}`} 
                            onClick={() => setOpenSub(openSub === "categories" ? null : "categories")}
                        >
                            Categories
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`dropdown-arrow ${openSub === "categories" ? 'rotate' : ''}`} 
                            />
                        </button>
                        
                        <div className={`mobile-sub-menu ${openSub === "categories" ? 'open' : ''}`}>
                            {categories?.length > 0 ? (
                                <ul className="list-unstyled">
                                    {categories.slice(0, 10).map((item, i) => (
                                        <li key={i}>
                                            <Link 
                                                href={`/${item?.url}`} 
                                                className="sub-link" 
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                    {categories.length > 10 && (
                                        <li>
                                            <Link 
                                                href="/category" 
                                                className="sub-link view-all" 
                                                onClick={() => setOpen(false)}
                                            >
                                                View All Categories →
                                            </Link>
                                        </li>
                                    )}
                                </ul>
                            ) : (
                                <p className="sub-link text-muted">No categories found</p>
                            )}
                        </div>
                    </li>

                    {/* Stores Dropdown */}
                    <li className="mobile-menu-item">
                        <button 
                            className={`mobile-link has-dropdown ${openSub === "stores" ? 'active' : ''}`} 
                            onClick={() => setOpenSub(openSub === "stores" ? null : "stores")}
                        >
                            Stores
                            <FontAwesomeIcon 
                                icon={faChevronDown} 
                                className={`dropdown-arrow ${openSub === "stores" ? 'rotate' : ''}`} 
                            />
                        </button>

                        <div className={`mobile-sub-menu ${openSub === "stores" ? 'open' : ''}`}>
                            {merchantData?.length > 0 ? (
                                <ul className="list-unstyled">
                                    {merchantData.slice(0, 10).map((item, i) => (
                                        <li key={i}>
                                            <Link 
                                                href={getMerchantHref(item, mer_slug, mer_slug_type)} 
                                                className="sub-link" 
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.merchant_name}
                                            </Link>
                                        </li>
                                    ))}
                                    <li>
                                        <Link 
                                            href="/all-stores/A" 
                                            className="sub-link view-all" 
                                            onClick={() => setOpen(false)}
                                        >
                                            View All Stores →
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                <p className="sub-link text-muted">No stores found</p>
                            )}
                        </div>
                    </li>

                    {/* Products */}
                    <li className="mobile-menu-item">
                        <Link href="/all-products" className="mobile-link" onClick={() => setOpen(false)}>
                            Products
                        </Link>
                    </li>

                    {/* Events */}
                    {events.length > 0 && (
                        <li className="mobile-menu-item">
                            <button 
                                className={`mobile-link has-dropdown ${openSub === "events" ? 'active' : ''}`} 
                                onClick={() => setOpenSub(openSub === "events" ? null : "events")}
                            >
                                Events
                                <FontAwesomeIcon 
                                    icon={faChevronDown} 
                                    className={`dropdown-arrow ${openSub === "events" ? 'rotate' : ''}`} 
                                />
                            </button>
                            <div className={`mobile-sub-menu ${openSub === "events" ? 'open' : ''}`}>
                                <ul className="list-unstyled">
                                    {events.map((item, i) => (
                                        <li key={i}>
                                            <Link 
                                                href={getEventsHref(item, mer_slug_type)} 
                                                className="sub-link" 
                                                onClick={() => setOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    )}

                    {/* Blog */}
                    {blog_title && blog_url && (
                        <li className="mobile-menu-item">
                            <Link href={blog_url} className="mobile-link" onClick={() => setOpen(false)}>
                                {blog_title}
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </>
    );
};

export default MobileNavMenu;