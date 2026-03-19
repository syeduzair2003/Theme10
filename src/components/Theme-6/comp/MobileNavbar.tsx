"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    getCategoryHref,
    getMerchantHref,
    getEventsHref,
    getPromotionHref,
} from "@/constants/hooks";
import MobileSearchBar from "./MobileSearchBar";
import { faChevronDown, FontAwesomeIcon } from "@/constants/icons";

type Props = {
    logo: string;
    companyId: string;
    categories?: any[];
    merchantData?: any[];
    events?: any[];
    promotions: any[],
    blog_title?: string | null;
    blog_url?: string | null;
    mer_slug: string;
    cat_slug: string;
    mer_slug_type: string;
    promo_slug: string,
    isOpen: boolean;
    toggle: () => void;
};

export default function MobileNavbar({
    companyId,
    logo,
    categories = [],
    merchantData = [],
    events = [],
    blog_title,
    blog_url,
    mer_slug,
    cat_slug,
    mer_slug_type,
    promo_slug,
    promotions = [],
    isOpen,
    toggle,
}: Props) {
    const [openSection, setOpenSection] = useState<string | null>(null);

    const handleToggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    const pathBuilder = {
        category: (cat: any) =>
            getCategoryHref(cat, cat?.category_slug, cat.mer_slug_type),
        store: (m: any) => getMerchantHref(m, m?.mer_slug, m?.mer_slug_type),
        event: (ev: any) => getEventsHref(ev, ev?.mer_slug_type),
        promotion: (promo: any) => getPromotionHref(promo, promo?.mer_slug_type),
    };


    return (
        <>
            {/* Overlay */}
            <div
                className={`mnav-overlay ${isOpen ? "mnav-show" : ""}`}
                onClick={toggle}
            />

            {/* Sidebar Menu */}
            <aside
                className={`mnav-menu ${isOpen ? "mnav-open" : ""}`}
                role="dialog"
                aria-hidden={!isOpen}
            >
                <div className="mnav-inner">
                    {/* Close Button */}
                    <button
                        className="mnav-close-btn"
                        onClick={toggle}
                        aria-label="Close menu"
                    >
                        <i className="las la-times" />
                    </button>

                    {/* Logo */}
                    <div className="mnav-logo">
                        <Link href="/" onClick={toggle}>
                            <Image
                                src={logo || "/fallback-logo.png"}
                                alt="logo"
                                width={120}
                                height={70}
                            />
                        </Link>
                    </div>

                    {/* Search Bar */}
                    <div className="mnav-search mb-3">
                        <MobileSearchBar
                            companyId={companyId}
                            mer_slug={mer_slug}
                            slug_type={mer_slug_type}
                            cat_slug={cat_slug}
                            closeMenu={toggle}
                        />
                    </div>

                    {/* Navigation */}
                    <nav>
                        <ul className="mnav-list list-unstyled ">
                            <li>
                                <Link href="/" onClick={toggle} className="mnav-submenu">
                                    Home
                                </Link>
                            </li>

                            {/* Categories */}
                            {categories?.length > 0 && (
                                <li className="mnav-submenu">
                                    <div className="mnav-submenu-header">
                                        {/* Clickable "Categories" link */}
                                        <Link
                                            href="/category"
                                            onClick={toggle}
                                            className="mnav-submenu-link"
                                        >
                                            Categories
                                        </Link>

                                        {/* Dropdown toggle button */}
                                        <button
                                            type="button"
                                            className="mnav-dropdown-toggle"
                                            onClick={() => handleToggleSection("categories")}
                                            aria-label="Toggle categories submenu"
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: openSection === "categories" ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    fontSize: '12px'
                                                }}
                                            />
                                        </button>
                                    </div>

                                    {/* Dropdown list */}
                                    <ul
                                        className={`mnav-submenu-list ${openSection === "categories" ? "mnav-show" : ""
                                            }`}
                                    >
                                        {categories?.map((c: any, i: number) => (
                                            <li key={i}>
                                                <Link
                                                    href={getCategoryHref(c, cat_slug, mer_slug_type)}
                                                    onClick={toggle}
                                                >
                                                    {c.category_name ?? c.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}

                            {/* Stores */}
                            {merchantData?.length > 0 && (
                                <li className="mnav-submenu">
                                    <div className="mnav-submenu-header">
                                        {/* Clickable "Stores" text that navigates */}
                                        <Link
                                            href="/store"
                                            onClick={toggle}
                                            className="mnav-submenu-link"
                                        >
                                            Stores
                                        </Link>

                                        {/* Dropdown icon to toggle submenu */}
                                        <button
                                            type="button"
                                            className="mnav-dropdown-toggle"
                                            onClick={() => handleToggleSection("stores")}
                                            aria-label="Toggle stores submenu"
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: openSection === "stores" ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    fontSize: '12px'
                                                }}
                                            />
                                        </button>
                                    </div>

                                    <ul
                                        className={`mnav-submenu-list ${openSection === "stores" ? "mnav-show" : ""
                                            }`}
                                    >
                                        {merchantData?.slice(0, 10).map((m: any, i: number) => (
                                            <li key={i}>
                                                <Link
                                                    href={getMerchantHref(m, mer_slug, mer_slug_type)}
                                                    onClick={toggle}
                                                >
                                                    {m.merchant_name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}

                            {/* Events */}
                            {events?.length > 0 && (
                                <li className="mnav-submenu">
                                    <div className="mnav-submenu-header">
                                        {/* Clickable "Events" text that navigates */}
                                        <Link
                                            href="/events"
                                            onClick={toggle}
                                            className="mnav-submenu-link"
                                        >
                                            Events
                                        </Link>

                                        {/* Dropdown toggle button */}
                                        <button
                                            type="button"
                                            className="mnav-dropdown-toggle"
                                            onClick={() => handleToggleSection("events")}
                                            aria-label="Toggle events submenu"
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: openSection === "events" ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    fontSize: '12px'
                                                }}
                                            />
                                        </button>
                                    </div>

                                    <ul
                                        className={`mnav-submenu-list ${openSection === "events" ? "mnav-show" : ""
                                            }`}
                                    >
                                        {events?.map((ev: any, i: number) => (
                                            <li key={i}>
                                                <Link href={pathBuilder.event(ev)} onClick={toggle}>
                                                    {ev.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}

                            {/* Promotions */}
                            {promotions?.length > 0 && (
                                <li className="mnav-submenu">
                                    <div className="mnav-submenu-header">
                                        {/* Clickable "Events" text that navigates */}
                                        <Link
                                            href="/promotion"
                                            onClick={toggle}
                                            className="mnav-submenu-link"
                                        >
                                            Promotions
                                        </Link>

                                        {/* Dropdown toggle button */}
                                        <button
                                            type="button"
                                            className="mnav-dropdown-toggle"
                                            onClick={() => handleToggleSection("Promotions")}
                                            aria-label="Toggle events submenu"
                                        >
                                            <FontAwesomeIcon
                                                icon={faChevronDown}
                                                style={{
                                                    transition: 'transform 0.3s ease',
                                                    transform: openSection === "promotions" ? 'rotate(180deg)' : 'rotate(0deg)',
                                                    fontSize: '12px'
                                                }}
                                            />
                                        </button>
                                    </div>

                                    <ul
                                        className={`mnav-submenu-list ${openSection === "Promotions" ? "mnav-show" : ""
                                            }`}
                                    >
                                        {promotions?.map((promo: any, i: number) => (
                                            <li key={i}>
                                              <Link href={getPromotionHref(promo, promo_slug)} onClick={toggle}>
                                                    {promo.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            )}

                            {/* Products Dropdown */}
                            <li className="mnav-submenu">
                                <div className="mnav-submenu-header">
                                    <Link
                                        href="/all-products"
                                        onClick={toggle}
                                        className="mnav-submenu-link"
                                    >
                                        Products
                                    </Link>

                                    {/* Dropdown toggle button */}
                                    <button
                                        type="button"
                                        className="mnav-dropdown-toggle"
                                        onClick={() => handleToggleSection("products")}
                                        aria-label="Toggle products submenu"
                                    >
                                        <FontAwesomeIcon
                                            icon={faChevronDown}
                                            style={{
                                                transition: 'transform 0.3s ease',
                                                transform: openSection === "products" ? 'rotate(180deg)' : 'rotate(0deg)',
                                                fontSize: '12px'
                                            }}
                                        />
                                    </button>
                                </div>

                                <ul
                                    className={`mnav-submenu-list ${openSection === "products" ? "mnav-show" : ""}`}
                                >
                                    <li>
                                        <Link href="/products" onClick={toggle}>
                                            Branded Products
                                        </Link>
                                    </li>
                                </ul>
                            </li>

                            {blog_title && blog_url && (
                                <li>
                                    <Link href={blog_url} target="_blank" onClick={toggle}>
                                        {blog_title}
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </aside>

            {/* Scoped CSS */}
            <style jsx>{`
        /* Overlay */
        .mnav-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.35);
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.25s ease, visibility 0.25s;
          z-index: 1040;
        }
        .mnav-overlay.mnav-show {
          opacity: 1;
          visibility: visible;
        }

        /* Sidebar */
        .mnav-menu {
          position: fixed;
          top: 0;
          left: -100%;
          width: 80%;
          max-width: 380px;
          height: 100vh;
          background: #ffffff;
          box-shadow: 4px 0 25px rgba(0, 0, 0, 0.15);
          transition: left 0.3s ease;
          z-index: 1050;
          overflow-y: auto;
          border-radius: 0 16px 16px 0;
        }
        .mnav-menu.mnav-open {
          left: 0;
        }

        .mnav-inner {
          padding: 24px;
        }

        /* Close Button */
        .mnav-close-btn {
          background: transparent;
          border: none;
          font-size: 22px;
          float: right;
          cursor: pointer;
          color: #333;
          transition: color 0.25s ease;
        }

        /* Logo */
        .mnav-logo {
          text-align: left;
          margin: 16px 0 24px;
        }
        .mnav-logo img {
          max-width: 140px;
          height: auto;
        }

        /* Nav List */
        .mnav-list {
          list-style: none;
          padding: 12px 0;
          cursor: pointer;
          font-weight: 600;
          color: #111;
          text-align: left;
          justify-content: space-between;
          align-items: center;
        }
        .mnav-list li {
          border-bottom: 1px solid #eee;
          text-align: left;
          padding: 12px 0;
        }
        .mnav-list li a {
          display: block;
          padding: 12px 0;
          color: #222;
          font-weight: 500;
          font-size: 15px;
          text-align: left;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        /* Submenu */
        .mnav-submenu {
          border-top: 1px solid #eee;
          text-align: left;
        }
        .mnav-submenu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          
          cursor: pointer;
          font-weight: 600;
          color: #111;
          text-align: left;
        }
        .mnav-submenu-header i {
          transition: transform 0.25s ease;
        }


        /* Submenu List */
        .mnav-submenu-list {
          max-height: 0;
          overflow: hidden;
          opacity: 0;
          transition: all 0.3s ease;
          padding-left: 16px;
          text-align: left;
        }
        .mnav-submenu-list.mnav-show {
          max-height: 500px;
          opacity: 1;
          margin-bottom: 10px;
        }
        .mnav-submenu-list li {
          border: none;
        }
        .mnav-submenu-list li a {
          color: #444;
          font-size: 14px;
          padding: 8px 0;
          display: block;
          text-align: left;
          font-weight: 400;
        }

        /* Last link padding */
        .mnav-list li:last-child a {
          padding-bottom: 18px;
        }

                /* Search Bar */
        .mnav-search {
            width: 100%;
        }

        .mnav-search-input {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 14px;
            outline: none;
            transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .mnav-search-input:focus {
            border-color: #0284c7;
            box-shadow: 0 0 0 2px rgba(2, 132, 199, 0.2);
        }
      `}</style>
        </>
    );
}
