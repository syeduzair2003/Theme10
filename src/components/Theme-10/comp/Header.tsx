import React from "react";
import { apiNavCategory } from "@/apis/page_optimization";
import { FaChevronDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { headers } from "next/headers";
import Link from "next/link";
import NavSearch from "./NavSearch";
import MobileNavMenu from "./MobileNavMenu";
import { apiGetNavMerchants } from "@/apis/merchant";
import { apiGetEvents, apiGetAllPromotion } from "@/apis/user";
import Image from "next/image";
import {
  getBaseImageUrl,
  getMerchantHref,
  getPromotionHref,
} from "@/constants/hooks";

interface Props {
  company_id: string;
  domain: string;
  mer_slug: string;
  slug_type: string;
  cat_slug: string;
  promotion_slug: string;
  logo: string | null;
}

type GetHrefFn = (item: any) => string;

const Header = async ({
  company_id,
  domain,
  mer_slug,
  slug_type,
  cat_slug,
  logo,
  promotion_slug,
}: Props) => {
  const navLinks = [
    "Home",
    "Categories",
    "Stores",
    "Products",
    "Events",
    "Promotion",
    "Blog",
  ];
  const navPaths: Record<string, string> = {
    Home: "/",
    Categories: "/category",
    Stores: "/all-stores/A",
    Products: "/all-products",
    Events: "/events",
    Promotion: promotion_slug,
    Blog: "https://blog.gettopdiscounts.com",
  };


  const [categories, merchants, events, promotions] = await Promise.all([
  apiNavCategory(company_id).then((res) => res?.data),
  apiGetNavMerchants(company_id).then((res) => res?.data),
  apiGetEvents(company_id).then((res) => res?.data),
  apiGetAllPromotion(domain).then((res) => res?.data),
]);
  const headersList = await headers();
  const currentPath = headersList.get("x-pathname") || "/";
  const companyLogo = getBaseImageUrl(
    domain,
    logo,
    "/themes/Theme_2/images/logo/logo-dark.png",
  );

  const renderDropdown = (
    name: string,
    items: any[],
    getHref: GetHrefFn,
    iconKey?: string,
  ) => (
    <div className="relative group flex items-center h-20" key={name}>
      <Link
        href={navPaths[name]}
        className="text-slate-800 hover:text-[#800000] text-[15px] font-bold transition-all flex items-center gap-1.5 no-underline h-full relative"
      >
        {name}{" "}
        <FaChevronDown className="w-2 h-2 opacity-40 group-hover:rotate-180 transition-transform duration-500" />
        <span className="absolute bottom-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#800000] rounded-full transition-all duration-500 shadow-[0_1px_5px_rgba(128,0,0,0.4)] w-0 group-hover:w-6" />
      </Link>

      <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-72 bg-[#FEF9E7] rounded-[2.5rem] shadow-[0_20px_50px_rgba(128,0,0,0.15)] border border-white/60 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-3 group-hover:translate-y-0 transition-all duration-500 z-50 p-3 overflow-hidden">
        {/* VIEW ALL BUTTON */}
        <div className="mb-4 border-b border-[#800000]/5 pb-4">
          <Link
            href={navPaths[name]}
            className="group/btn relative flex items-center justify-center gap-3 py-3.5 border-2 border-[#800000] rounded-[18px] text-[10px] font-black uppercase tracking-[0.25em] text-[#800000] transition-all duration-500 no-underline overflow-hidden"
          >
            <span className="absolute inset-0 bg-[#800000] translate-y-[102%] group-hover/btn:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-[#D1C7A7] transition-colors duration-500">
              View All {name}
              <FaArrowRight className="text-[9px] group-hover/btn:translate-x-1 transition-transform duration-500" />
            </span>
          </Link>
        </div>

        {/* --- FLOATING SCROLLBAR --- */}
        <div
          className="max-h-[350px] overflow-y-auto pr-1
            [&::-webkit-scrollbar]:w-[6px] 
            [&::-webkit-scrollbar-track]:bg-transparent
            [&::-webkit-scrollbar-thumb]:bg-[#800000]/20 
            [&::-webkit-scrollbar-thumb]:rounded-full
            hover:[&::-webkit-scrollbar-thumb]:bg-[#800000]
            transition-all"
        >
          {items?.map((item: any) => (
            <Link
              key={item.id}
              href={getHref(item)}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/80 transition-all no-underline group/item mb-1 border border-transparent hover:border-[#800000]/10"
            >
              {iconKey && (
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-slate-50 shrink-0 group-hover/item:scale-105 transition-transform shadow-sm">
                  <Image
                    src={
                      item[iconKey]?.startsWith("http")
                        ? item[iconKey]
                        : `/${item[iconKey]}`
                    }
                    alt={item.name || "logo"}
                    width={26}
                    height={26}
                    className="object-contain"
                  />
                </div>
              )}
              <span className="text-sm font-semibold text-slate-700 group-hover/item:text-[#800000] transition-colors">
                {item.name || item.merchant_name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-[100] bg-[#F5F5DC]/85 backdrop-blur-md border-b border-[#800000]/5 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-10">
        <div className="flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 hover:scale-105 transition-transform duration-300"
          >
            <Image
              width={140}
              height={45}
              src={companyLogo}
              alt="Logo"
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <NavSearch
              companyId={company_id}
              mer_slug={mer_slug}
              slug_type={slug_type}
              cat_slug={cat_slug}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((name) => {
              if (name === "Categories")
                return renderDropdown(
                  name,
                  categories,
                  (c: any) => `/${c.url}`,
                  "category_image",
                );
              if (name === "Stores")
                return renderDropdown(
                  name,
                  merchants,
                  (m: any) => getMerchantHref(m, mer_slug, slug_type),
                  "merchant_logo",
                );
              if (name === "Events")
                return renderDropdown(
                  name,
                  events,
                  (e: any) => `/events/${e.slug}`,
                );
              if (name === "Promotion")
                return renderDropdown(name, promotions, (p: any) =>
                  getPromotionHref(p, promotion_slug),
                );

              const isActive = currentPath === navPaths[name];
              return (
                <Link
                  key={name}
                  href={navPaths[name]}
                  className={`text-[15px] font-bold no-underline transition-all relative group flex items-center h-20 ${isActive ? "text-[#800000]" : "text-slate-800 hover:text-[#800000]"}`}
                >
                  {name}
                  <span
                    className={`absolute bottom-5 left-1/2 -translate-x-1/2 h-0.5 bg-[#800000] rounded-full transition-all duration-500 shadow-[0_1px_5px_rgba(128,0,0,0.4)] ${isActive ? "w-6" : "w-0 group-hover:w-6"}`}
                  />
                </Link>
              );
            })}
          </nav>

          <MobileNavMenu
            nav={[]}
            company_id={company_id}
            mer_slug={mer_slug}
            slug_type={slug_type}
            cat_slug={cat_slug}
            categories={categories}
            merchants={merchants}
            events={events}
          />
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }`,
        }}
      />
    </header>
  );
};

export default Header;
