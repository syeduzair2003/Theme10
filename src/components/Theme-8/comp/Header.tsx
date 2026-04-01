import React from "react";
import { apiNavCategory } from "@/apis/page_optimization";
import { FaChevronDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NavSearch from "./NavSearch";
import MobileNavMenu from "./MobileNavMenu";
import { apiGetNavMerchants } from "@/apis/merchant";
import { apiGetEvents, apiGetAllPromotion } from "@/apis/user";
import Image from "next/image";
import { Merchant } from '@/services/dataTypes'
import { getBaseImageUrl, getMerchantHref, getPromotionHref } from "@/constants/hooks";

interface Props {
    company_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
    promotion_slug: string;
    logo: string | null;
    blog_url?: string;
    blog_title?: string;
    headerPromoMerchant: Merchant[] | null,
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
    blog_url,
    blog_title,
    headerPromoMerchant
}: Props) => {

    const navLinks = ["Home", "Categories", "Stores", "Products", "Events", "Promotion", "Blog"];

    const navPaths: Record<string, string> = {
        Home: "/",
        Categories: `/${cat_slug}`,
        Stores: "/all-stores/A",
        Products: "/all-products",
        Events: "/events",
        Promotion: `/${promotion_slug}`,
        Blog: blog_url || "#",
    };

    const [categoriesRes, merchantsRes, eventsRes, promotionsRes] = await Promise.all([
        apiNavCategory(company_id),
        apiGetNavMerchants(company_id),
        apiGetEvents(company_id),
        apiGetAllPromotion(domain),
    ]);

    const categories = categoriesRes?.data || [];
    const merchants = merchantsRes?.data || [];
    const events = eventsRes?.data || [];
    const promotions = promotionsRes?.data || [];
    const companyLogo = getBaseImageUrl(domain, logo, "/themes/Theme_2/images/logo/logo-dark.png");

    const renderDropdown = (name: string, items: any[], getHref: GetHrefFn, iconKey?: string) => (
        <div className="relative group flex items-center h-full" key={name}>
            {/* Nav Link */}
            <Link
                href={navPaths[name]}
                className="text-slate-600 group-hover:text-blue-600 text-[13px] uppercase tracking-widest font-black flex items-center gap-2 py-7 px-4 no-underline transition-all duration-300 relative"
            >
                {name}
                <FaChevronDown className="w-2 h-2 opacity-30 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-500" />
                {/* Underline Anim */}
                <span className="absolute bottom-6 left-4 right-8 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>

            {/* --- Premium Mega Dropdown --- */}
            <div className="absolute top-[calc(100%-5px)] left-1/2 -translate-x-1/2 w-[480px] opacity-0 invisible translate-y-6 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-500 z-[99999] pointer-events-none group-hover:pointer-events-auto">
                
                <div className="mt-3 bg-white/95 backdrop-blur-2xl rounded-[32px] shadow-[0_30px_90px_-15px_rgba(0,0,0,0.2)] border border-white p-4 overflow-hidden ring-1 ring-black/5">
                    
                    {/* Dropdown Header */}
                    <div className="px-3 pb-3 mb-2 border-b border-slate-100 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Featured {name}</span>
                        <div className="flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-blue-600">{items.length} Active Items</span>
                        </div>
                    </div>

                    {/* Items Grid (2 Columns for cleaner look) */}
                    <div className="max-h-[450px] overflow-y-auto pr-1 grid grid-cols-2 gap-2 custom-scrollbar">
                        {items.length > 0 ? (
                            items.map((item: any) => (
                                <Link
                                    key={item.id}
                                    href={getHref(item)}
                                    className="flex items-center gap-3 p-2 rounded-2xl no-underline transition-all duration-300 hover:bg-slate-50 group/item border border-transparent hover:border-slate-100"
                                >
                                    {iconKey ? (
                                        <div className="w-12 h-12 shrink-0 bg-white rounded-[14px] shadow-sm border border-slate-100 flex items-center justify-center p-2 group-hover/item:scale-110 group-hover/item:shadow-md transition-all duration-500">
                                            <Image
                                                src={getBaseImageUrl(domain, item[iconKey], "")}
                                                alt="icon"
                                                width={40}
                                                height={40}
                                                className="object-contain"
                                            />
                                        </div>
                                    ) : (
                                        <div className="w-12 h-12 shrink-0 bg-blue-50 rounded-[14px] flex items-center justify-center text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-500">
                                            <span className="text-sm font-black">{(item.name || item.merchant_name || "?")[0]}</span>
                                        </div>
                                    )}

                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[14px] font-bold text-slate-700 group-hover/item:text-blue-700 transition-colors truncate">
                                            {item.name || item.merchant_name}
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-400 group-hover/item:text-blue-400 transition-colors">View Deals</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-2 py-10 text-center">
                                <p className="text-sm text-slate-400 font-bold m-0 italic">No Items Found</p>
                            </div>
                        )}
                    </div>

                    {/* Dropdown Footer Button */}
                    <Link 
                        href={navPaths[name]} 
                        className="mt-3 group/btn flex items-center justify-center gap-2 py-4 bg-slate-900 rounded-[20px] text-[11px] font-black uppercase tracking-widest text-white hover:bg-blue-600 transition-all duration-300 no-underline shadow-lg shadow-slate-200"
                    >
                        Browse All {name}
                        <FaArrowRight className="text-[10px] group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <header className="sticky top-0 bg-white/80 backdrop-blur-xl border-b border-slate-100 z-[99999]">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-20">

                {/* LOGO */}
                <Link href="/" className="hover:opacity-80 transition-opacity shrink-0">
                    <Image src={companyLogo} alt="logo" width={140} height={40} className="object-contain" priority />
                </Link>

                {/* SEARCH - Central Placement */}
                <div className="hidden lg:flex flex-1 max-w-sm mx-10">
                    <NavSearch
                        companyId={company_id}
                        mer_slug={mer_slug}
                        slug_type={slug_type}
                        cat_slug={cat_slug}
                    />
                </div>

                {/* NAV LINKS */}
                <nav className="hidden lg:flex items-center h-full">
                    {navLinks.map((name) => {
                        if (name === "Categories")
                            return renderDropdown(name, categories, (c: any) => `/${c.url}`, "category_image");

                        if (name === "Stores")
                            return renderDropdown(name, merchants, (m: any) => getMerchantHref(m, mer_slug, slug_type), "merchant_logo");

                        if (name === "Events" && events.length > 0)
                            return renderDropdown(name, events, (e: any) => `/events/${e.slug}`);

                        if (name === "Promotion" && promotions.length > 0)
                            return renderDropdown(name, promotions, (p: any) => getPromotionHref(p, promotion_slug));

                        // Simple Links (Home, Products, Blog)
                        const isBlog = name === "Blog";
                        if (isBlog && !blog_url) return null;
                        
                        const href = isBlog ? blog_url : navPaths[name];
                        const label = isBlog ? (blog_title || "Blog") : name;

                        return (
                            <Link 
                                key={name} 
                                href={href || "#"}
                                className="text-[13px] uppercase tracking-widest font-black text-slate-600 hover:text-blue-600 py-7 px-4 no-underline transition-all duration-300 relative group"
                            >
                                {label}
                                <span className="absolute bottom-6 left-4 right-4 h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
                            </Link>
                        );
                    })}
                </nav>

                {/* MOBILE MENU */}
                <div className="lg:hidden">
                    <MobileNavMenu
                        categories={categories}
                        merchantData={merchants}
                        events={events}
                        promotions={promotions}
                        cat_slug={cat_slug}
                        mer_slug={mer_slug}
                        mer_slug_type={slug_type}
                        promo_slug={promotion_slug}
                        blog_url={blog_url}
                        blog_title={blog_title}
                        companyLogo={companyLogo}
                        companyId={company_id}
                        companyDomain={domain}
                        headerPromoMerchant={headerPromoMerchant}
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;