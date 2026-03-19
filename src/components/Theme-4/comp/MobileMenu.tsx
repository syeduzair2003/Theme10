"use client";
import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Link from "next/link";
import HeaderSearchBar from "./SearchBar";
import { usePathname } from "next/navigation";

interface MobileMenuProps {
  nav: React.ReactNode[];
  company_id: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  categories: any[];
  merchants: any[];
  events: any[];
}

const MobileMenu = ({
  nav,
  company_id,
  mer_slug,
  slug_type,
  cat_slug,
  categories = [],
  merchants = [],
  events = [],
}: MobileMenuProps) => {
  const [open, setOpen] = useState(false);
  const [submenu, setSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleSubmenu = (menu: string) => {
    setSubmenu(submenu === menu ? null : menu);
  };

  // ✅ Close the menu automatically when route changes
  useEffect(() => {
    setOpen(false);
    setSubmenu(null);
  }, [pathname]);

  return (
    <div className="sm:hidden flex items-center">
      {/* Toggle button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-200"
      >
        {open ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Full-width dropdown */}
      {open && (
        <div className="fixed top-16 left-0 w-full h-[calc(100vh-4rem)] bg-white border-t shadow-md z-50 overflow-y-auto">
          {/* Search */}
          <div className="px-4 pb-3 mt-4">
            <HeaderSearchBar
              companyId={company_id}
              mer_slug={mer_slug}
              slug_type={slug_type}
              cat_slug={cat_slug}
            />
          </div>

          {/* Nav Links */}
          <div className="space-y-2 px-4 pb-6">
            <Link href="/" className="block px-3 py-2">Home</Link>
            <Link href="/all-products" className="block px-3 py-2">Products</Link>
            <Link href="https://blog.gettopdiscounts.com" className="block px-3 py-2">Blog</Link>

            {/* Categories */}
            <div>
              <button
                className="flex md:w-full items-center justify-between px-3 py-2"
              >
                <Link href={`/category`} >
                  <span>Categories</span>
                </Link>
                <FaChevronDown className={`ml-2 transition-transform ${submenu === "categories" ? "rotate-180" : ""}`} onClick={() => toggleSubmenu("categories")} />
              </button>
              {submenu === "categories" && (
                <div className="pl-6 space-y-1">
                  {categories.map((cat: any) => (
                    <Link
                      key={cat.id}
                      href={`/${cat.url}`}

                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Stores */}
            <div>
              <button
                className="flex md:w-full items-center justify-between px-3 py-2"
              >
                <Link href={`/all-stores/A`} >
                  <span>Stores</span>
                </Link>
                <FaChevronDown className={`ml-2 transition-transform ${submenu === "stores" ? "rotate-180" : ""}`} onClick={() => toggleSubmenu("stores")} />
              </button>
              {submenu === "stores" && (
                <div className="pl-6 space-y-1">
                  {merchants.map((m: any) => (
                    <Link
                      key={m.id}
                      href={`/store/${m.slug}`}

                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                    >
                      {m.merchant_name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Events */}
            <div>
              <button
                className="flex md:w-full items-center justify-between px-3 py-2"
              >
                <Link href={`/events`}>
                  <span>Events</span>
                </Link>
                <FaChevronDown className={`ml-2 transition-transform ${submenu === "events" ? "rotate-180" : ""}`} onClick={() => toggleSubmenu("events")} />
              </button>
              {submenu === "events" && (
                <div className="pl-6 space-y-1">
                  {events.map((e: any) => (
                    <Link
                      key={e.id}
                      href={`/events/${e.slug}`}

                      className="block px-3 py-1 text-sm hover:bg-gray-100"
                    >
                      {e.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
