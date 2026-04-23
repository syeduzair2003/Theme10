"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import NavSearch from "./NavSearch";
import MobileNavMenu from "./MobileNavMenu";
import { getMerchantHref, getPromotionHref } from "@/constants/hooks";

interface HeaderClientProps {
  company_id: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  promotion_slug: string;
  companyLogo: string;
  categories: any[];
  merchants: any[];
  events: any[];
  promotions: any[];
}

const HeaderClient = ({
  company_id,
  mer_slug,
  slug_type,
  cat_slug,
  promotion_slug,
  companyLogo,
  categories,
  merchants,
  events,
  promotions,
}: HeaderClientProps) => {
  const pathname = usePathname();
  
  // Normalize path for comparison (handling trailing slashes)
  const currentPath = pathname === "/" ? "/" : pathname.replace(/\/$/, "");

  const navPaths: Record<string, string> = {
    Home: "/",
    Categories: "/category",
    Stores: "/all-stores/A",
    Products: "/all-products",
    Events: "/events",
    Promotion: `/${promotion_slug}`,
    Blog: "https://blog.gettopdiscounts.com",
  };

  // Logic to check if a section is active based on the URL
  const checkActive = (name: string) => {
    const targetPath = navPaths[name];
    if (name === "Home") return currentPath === "/";
    if (!targetPath || targetPath.startsWith("http")) return false;
    
    // Active if exact match or if current URL is a sub-page of the target
    return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`);
  };

  // Renders top-level items that ONLY trigger dropdowns (Non-clickable)
  const renderDropdownLabel = (
    name: string,
    items: any[],
    getHref: (item: any) => string,
    iconKey?: string
  ) => {
    const isActive = checkActive(name);

    return (
     <div className="relative group flex items-center h-16 md:h-20" key={name}>
  {/* --- TRIGGER LABEL (DIV) --- */}
  <div
    className={`text-[13px] md:text-[15px] font-bold transition-all flex items-center gap-1.5 cursor-default h-full relative ${
      isActive ? "text-[#800000]" : "text-slate-800 hover:text-[#800000]"
    }`}
  >
    {name}
    <FaChevronDown
      className={`w-2 h-2 transition-transform duration-500 ${
        isActive ? "opacity-100" : "opacity-40 group-hover:rotate-180"
      }`}
    />
    {/* Animated underline indicator */}
    <span
      className={`absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#800000] rounded-full transition-all duration-500 shadow-[0_1px_5px_rgba(128,0,0,0.4)] ${
        isActive ? "w-6" : "w-0 group-hover:w-6"
      }`}
    />
  </div>

  {/* --- DROPDOWN CONTENT --- */}
  <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-64 md:w-72 bg-[#FEF9E7] rounded-[2rem] md:rounded-[2.5rem] shadow-[0_20px_50px_rgba(128,0,0,0.15)] border border-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-500 z-50 p-2.5 md:p-3 overflow-hidden">
    
    {/* View All Link */}
    <div className="mb-3 md:mb-4 border-b border-[#800000]/5 pb-3 md:pb-4">
      <Link
        href={navPaths[name]}
        className="group/btn relative flex items-center justify-center gap-3 py-2.5 md:py-3.5 border-2 border-[#800000] rounded-[15px] md:rounded-[18px] text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] text-[#FDFCF0] transition-all duration-500 no-underline overflow-hidden bg-transparent"
      >
        <span className="absolute inset-0 bg-[#800000] translate-y-0 group-hover/btn:translate-y-[102%] transition-transform duration-500 ease-out z-0" />
        <span className="relative z-10 flex items-center gap-2 text-[#FDFCF0] group-hover/btn:text-[#800000] transition-colors duration-500">
          View All {name}
          <FaArrowRight className="text-[8px] md:text-[9px] group-hover/btn:translate-x-1 transition-transform duration-500" />
        </span>
      </Link>
    </div>

    {/* Items List */}
    <div className="max-h-[250px] md:max-h-[350px] overflow-y-auto pr-1 no-scrollbar [&::-webkit-scrollbar]:w-[4px] md:[&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:bg-[#800000]/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#800000]">
      {items?.map((item: any, idx: number) => (
        <Link
          key={item.id || idx}
          href={getHref(item)}
          className="flex items-center gap-2 md:gap-3 p-2.5 md:p-3 rounded-xl md:rounded-2xl hover:bg-white/80 transition-all no-underline group/item mb-1 border border-transparent hover:border-[#800000]/10"
        >
          {iconKey && (
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-white flex items-center justify-center border border-slate-50 shrink-0 group-hover/item:scale-105 transition-transform shadow-sm">
              <Image
                src={item[iconKey]?.startsWith("http") ? item[iconKey] : `/${item[iconKey]}`}
                alt={item.name || "logo"}
                width={22}
                height={22}
                className="object-contain md:w-[26px] md:h-[26px]"
              />
            </div>
          )}
          <span className="text-[13px] md:text-sm font-semibold text-slate-700 group-hover/item:text-[#800000] transition-colors line-clamp-1">
            {item.name || item.merchant_name}
          </span>
        </Link>
      ))}
    </div>
  </div>
</div>
    );
  };

  return (
   <div className="max-w-7xl mx-auto px-4 lg:px-6 xl:px-10">
  <div className="flex h-16 md:h-20 items-center justify-between gap-4 md:gap-6">
    
    {/* LOGO - Scaled slightly for smaller screens */}
    <Link href="/" className="shrink-0 hover:scale-105 transition-transform duration-300">
      <Image 
        width={140} 
        height={45} 
        src={companyLogo} 
        alt="Logo" 
        className="h-7 md:h-9 w-auto object-contain" 
        priority 
      />
    </Link>

    {/* SEARCH COMPONENT - Responsive width constraint */}
    <div className="hidden lg:flex flex-1 max-w-xs xl:max-w-md mx-4 xl:mx-8">
      <NavSearch 
        companyId={company_id} 
        mer_slug={mer_slug} 
        slug_type={slug_type} 
        cat_slug={cat_slug} 
      />
    </div>

    {/* DESKTOP NAVIGATION - Adjusted gaps for responsiveness */}
    <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
      {/* HOME (Direct Link) */}
      <Link
        href="/"
        className={`text-[14px] xl:text-[15px] font-bold no-underline transition-all relative group flex items-center h-16 md:h-20 ${
          checkActive("Home") ? "text-[#800000]" : "text-slate-800 hover:text-[#800000]"
        }`}
      >
        Home
        <span className={`absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#800000] rounded-full transition-all duration-500 shadow-[0_1px_5px_rgba(128,0,0,0.4)] ${checkActive("Home") ? "w-6" : "w-0 group-hover:w-6"}`} />
      </Link>

      {/* DROPDOWN LABELS - Rendered with responsive padding/gap inside */}
      {renderDropdownLabel("Categories", categories, (c) => `/${c.url}`, "category_image")}
      {renderDropdownLabel("Stores", merchants, (m) => getMerchantHref(m, mer_slug, slug_type), "merchant_logo")}
      {renderDropdownLabel("Products", [{ name: "Branded Products" }], () => "/all-products")}
      {renderDropdownLabel("Events", events, (e) => `/events/${e.slug}`)}
      {renderDropdownLabel("Promotion", promotions, (p) => getPromotionHref(p, promotion_slug))}

      {/* BLOG (External Link) */}
      <Link
        href={navPaths.Blog}
        target="_blank"
        className="text-[14px] xl:text-[15px] font-bold no-underline transition-all relative group flex items-center h-16 md:h-20 text-slate-800 hover:text-[#800000]"
      >
        Blog
        <span className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#800000] rounded-full transition-all duration-500 shadow-[0_1px_5px_rgba(128,0,0,0.4)] w-0 group-hover:w-6" />
      </Link>
    </nav>

    {/* MOBILE NAVIGATION */}
    <div className="lg:hidden">
      <MobileNavMenu 
          company_id={company_id} 
          mer_slug={mer_slug} 
          slug_type={slug_type} 
          cat_slug={cat_slug} 
          categories={categories} 
          merchants={merchants} 
          events={events}
          promotions={promotions}
          promotion_slug={promotion_slug}
        />
    </div>
  </div>
</div>
  );
};

export default HeaderClient;