"use client";

import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import HeaderSearchBar from "./NavSearch";
import Image from "next/image";

interface Props {
  company_id: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  nav: React.ReactNode;
}

export default function Navbar({
  company_id,
  mer_slug,
  slug_type,
  cat_slug,
  nav,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="relative oswald sticky top-0 z-50 bg-white shadow">
      <div className="px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <Image
                width={100}
                height={50}
                src="https://gettopdiscounts.com/uploads/company_5/images/1747949529_682f97d92d00a.svg"
                alt="Logo"
                className="h-[50px] w-auto"
              />
            </div>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">{nav}</div>
          </div>

          {/* Search bar (hidden on mobile, visible on desktop) */}
          <div className="hidden sm:flex sm:flex-1 sm:justify-center">
            <HeaderSearchBar
              companyId={company_id}
              mer_slug={mer_slug}
              slug_type={slug_type}
              cat_slug={cat_slug}
            />
          </div>

          
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="sm:hidden bg-white shadow-md border-t">
          <div className="space-y-1 px-2 pt-2 pb-3">{nav}</div>
          <div className="px-2 pb-3">
            <HeaderSearchBar
              companyId={company_id}
              mer_slug={mer_slug}
              slug_type={slug_type}
              cat_slug={cat_slug}
            />
          </div>
        </div>
      )}
    </nav>
  );
}
