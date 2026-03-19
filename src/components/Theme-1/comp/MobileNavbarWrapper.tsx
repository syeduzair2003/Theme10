"use client";
import React, { useState } from "react";
import type { categoryMinimalData, minimalMerchantData, EventResponse, Promotion } from "@/services/dataTypes";
import MobileNavbar from "./MobileNavBar";

type Props = {
  companyId: string;
  logo: string;
  categories?: categoryMinimalData[] | any[];
  merchantData?: minimalMerchantData[] | any[];
  events?: EventResponse[] | any[];
  blog_title?: string | null;
  blog_url?: string | null;
  mer_slug: string;
  cat_slug: string;
  mer_slug_type: string;
  promo_slug: string,
  promotions: Promotion[],
};

export default function MobileNavbarWrapper(props: Props) {
  const [open, setOpen] = useState(false);
  const toggle = () => {
    console.log("mobile toggle ->", !open); // quick debug: shows in browser console
    setOpen(v => !v);
  };

  return (
    <>
      {/* button placed inside header column */}
      <button
        type="button"
        className="toggle-mobileMenu d-lg-none border-0 bg-transparent"
        onClick={toggle}
        aria-label="Open menu"
      >
        <i className="las la-bars" />
      </button>

      {/* drawer rendered at same React tree level (will be fixed and overlay entire screen) */}
      <MobileNavbar {...props} isOpen={open} toggle={toggle} />
    </>
  );
}
