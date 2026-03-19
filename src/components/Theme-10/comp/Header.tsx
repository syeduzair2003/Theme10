import React from "react";
import { apiNavCategory } from "@/apis/page_optimization";
import { FaChevronDown } from "react-icons/fa";
import { headers } from "next/headers";
import Link from "next/link";
import NavSearch from "./NavSearch";
import MobileNavMenu from "./MobileNavMenu";
import { apiGetNavMerchants } from "@/apis/merchant";
import { apiGetEvents, apiGetAllPromotion } from "@/apis/user";
import Image from "next/image";
import { getBaseImageUrl, getMerchantHref, getPromotionHref } from "@/constants/hooks";

interface Props {
    company_id: string; domain: string; mer_slug: string; slug_type: string;
    cat_slug: string; promotion_slug: string; logo: string | null;
}

// Fixed Function type by defining a specific signature
type GetHrefFn = (item: any) => string;

const Header = async ({ company_id, domain, mer_slug, slug_type, cat_slug, logo, promotion_slug }: Props) => {
    const navLinks = ["Home", "Categories", "Stores", "Products", "Events", "Promotion", "Blog"];
    const navPaths: Record<string, string> = {
        Home: "/", Categories: "/category", Stores: "/all-stores/A",
        Products: "/all-products", Events: "/events", Promotion: promotion_slug,
        Blog: "https://blog.gettopdiscounts.com",
    };

    const categories = (await apiNavCategory(company_id))?.data;
    const merchants = (await apiGetNavMerchants(company_id))?.data;
    const events = (await apiGetEvents(company_id))?.data;
    const promotions = (await apiGetAllPromotion(domain))?.data;
    const headersList = await headers();
    const currentPath = headersList.get("x-pathname") || "/";
    const companyLogo = getBaseImageUrl(domain, logo, "/themes/Theme_2/images/logo/logo-dark.png");

    // Updated 'getHref' parameter type from Function to GetHrefFn
    const renderDropdown = (name: string, items: any[], getHref: GetHrefFn, iconKey?: string) => (
        <div className="relative group flex items-center" key={name}>
            <Link href={navPaths[name]} className="text-slate-600 hover:text-blue-600 text-[15px] font-semibold transition-colors flex items-center gap-1 no-underline py-5">
                {name} <FaChevronDown className="w-2.5 h-2.5 opacity-50 group-hover:rotate-180 transition-transform" />
            </Link>
            
            {/* Dropdown Menu with improved shadow and animation classes */}
            <div className="absolute top-[100%] left-1/2 -translate-x-1/2 w-72 bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-50 p-3 overflow-hidden">
                <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
                    {items?.map((item: any) => (
                        <Link key={item.id} href={getHref(item)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors no-underline group/item">
                            {iconKey && (
                                <div className="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 group-hover/item:scale-110 transition-transform">
                                    <Image src={item[iconKey]?.startsWith('http') ? item[iconKey] : `/${item[iconKey]}`} 
                                           alt={item.name || "logo"} width={28} height={28} className="object-contain" />
                                </div>
                            )}
                            <span className="text-sm font-medium text-slate-700 group-hover/item:text-blue-600">
                                {item.name || item.merchant_name}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <header className="sticky top-0 z-[100] bg-white/80 backdrop-blur-md border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between gap-4">
                    
                    {/* Logo */}
                    <Link href="/" className="shrink-0 hover:opacity-80 transition-opacity">
                        <Image width={140} height={45} src={companyLogo} alt="Logo" className="h-10 w-auto object-contain" priority />
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden lg:flex flex-1 max-w-md mx-8">
                        <NavSearch companyId={company_id} mer_slug={mer_slug} slug_type={slug_type} cat_slug={cat_slug} />
                    </div>

                    {/* Desktop Menu */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navLinks.map((name) => {
                            if (name === "Categories") return renderDropdown(name, categories, (c: any) => `/${c.url}`, "category_image");
                            if (name === "Stores") return renderDropdown(name, merchants, (m: any) => getMerchantHref(m, mer_slug, slug_type), "merchant_logo");
                            if (name === "Events") return renderDropdown(name, events, (e: any) => `/events/${e.slug}`);
                            if (name === "Promotion") return renderDropdown(name, promotions, (p: any) => getPromotionHref(p, promotion_slug));
                            
                            const isActive = currentPath === navPaths[name];
                            return (
                                <Link key={name} href={navPaths[name]} 
                                    className={`text-[15px] font-semibold no-underline transition-all relative group ${isActive ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}`}>
                                    {name}
                                    {/* Underline animation */}
                                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Button */}
                    <MobileNavMenu nav={[]} company_id={company_id} mer_slug={mer_slug} slug_type={slug_type} cat_slug={cat_slug} categories={categories} merchants={merchants} events={events} />
                </div>
            </div>
        </header>
    );
};
export default Header;