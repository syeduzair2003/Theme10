import React from "react";
import { apiNavCategory } from "@/apis/page_optimization";
import { FaChevronDown } from "react-icons/fa";
import { headers } from "next/headers";
import Link from "next/link";
import HeaderSearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { apiGetNavMerchants } from "@/apis/merchant";
import { apiGetEvents , apiGetAllPromotion} from "@/apis/user";
import Image from "next/image";
import { getBaseImageUrl, getMerchantHref, getPromotionHref } from "@/constants/hooks";
import { g } from "framer-motion/client";

interface Props {
    company_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
    cat_slug: string;
    promotion_slug: string;
    logo: string | null;
}

const Header = async ({ company_id, domain, mer_slug, slug_type, cat_slug, logo, promotion_slug }: Props) => {
    const navLinks = ["Home", "Categories", "Stores", "Products", "Events", "Promotion", "Blog"];
    const navPaths: Record<string, string> = {
        Home: "/",
        Categories: "/category",
        Stores: "/all-stores/A",
        Products: "/all-products",
        Events: "/events",
        Promotion: promotion_slug,
        Blog: "https://blog.gettopdiscounts.com",
    };

    // server side fetch
    const categories = (await apiNavCategory(company_id))?.data;
    const merchants = (await apiGetNavMerchants(company_id))?.data;
    const events = (await apiGetEvents(company_id))?.data;
    const promotions = (await apiGetAllPromotion(domain))?.data;
    // console.log('promotions',promotions);
    const headersList = headers();
    const currentPath = (await headersList).get("x-pathname") || "/";
    const companyLogo = getBaseImageUrl(domain , logo, "/themes/Theme_2/images/logo/logo-dark.png");
    // console.log("Domain: ",domain)
    // console.log("Company Logo: ",companyLogo)
    // console.log("Logo: ",logo)

    const nav = navLinks.map((name) => {
        const pathMatch = name.toLowerCase();
        const isActive = currentPath.toLowerCase().includes(pathMatch);

        if (name === "Categories") {
            if (!categories?.length) return null;
            return (
                <div className="relative group flex gray-dark cursor-pointer oswald" key={name}>
                    <Link href={navPaths[name]} className="no-underline rounded-md text-[#484848] text-sm font-medium nav-links">
                        {name}
                    </Link>
                    <FaChevronDown className="w-[9px] self-center ml-[5px]" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 rounded-md shadow-lg hidden group-hover:block bg-white ring-1 ring-[#ef4518] ring-opacity-5 overflow-y-auto max-h-[300px] z-50 gradient-scroll">
                        {
                            categories?.map((category: any) => {
                                return (
                                    <Link href={`/${category?.url}`} key={category?.id} className="no-underline px-4 py-2 nav-links1 gray-dark cursor-pointer flex items-center hover:bg-gray-100">
                                        <Image width={20} height={10} className="z-0 text-gray-500" src={`/${category?.category_image}`} alt={`${category?.name}`} />
                                        <span className="z-40 ml-4">{category?.name}</span>
                                    </Link>
                                )
                            })
                        }

                    </div>
                </div>
            );
        }

       if (name === "Stores") {
            if (!merchants?.length) return null;

            return (
                <div className="relative group flex items-center text-gray-700 cursor-pointer" key={name}>
                
                    <Link
                        href={navPaths[name]}
                        className="no-underline rounded-md text-[#484848] text-sm font-medium nav-links flex items-center"
                    >
                        {name}
                    </Link>

                    <FaChevronDown className="w-[9px] ml-1" />

                    {/* DROPDOWN */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 rounded-xl shadow-xl hidden group-hover:block bg-white border border-[#ef4518] overflow-y-auto max-h-[300px] z-50 gradient-scroll">


                        {merchants.map((m: any) => (
                        <Link
                            key={m.id}
                            href={getMerchantHref(m, mer_slug, slug_type)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 no-underline hover:bg-gray-100 transition"
                        >
                            
                            {/* FIXED IMAGE BOX */}
                            <div className="w-10 h-10 flex items-center justify-center rounded-full border border-[#ef4518] bg-white overflow-hidden shrink-0">
                            <Image
                                src={`/${m.merchant_logo}`}
                                alt={m.merchant_name}
                                width={32}
                                height={32}
                                className="object-contain transition-transform duration-200 group-hover:scale-105"
                            />
                            </div>

                            {/* TEXT */}
                            <span className="whitespace-nowrap">{m.merchant_name}</span>

                        </Link>
                        ))}
                    </div>
                </div>
            );
        }


        if (name === "Events") {
            if (!events?.length) return null;
            return (
                <div className="relative group flex gray-dark cursor-pointer" key={name}>
                    <Link href={navPaths[name]} className=" no-underline rounded-md text-[#484848] text-sm font-medium nav-links">
                        {name}
                    </Link>
                    <FaChevronDown className="w-[9px] self-center ml-[5px]" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 rounded-md shadow-lg hidden group-hover:block bg-white ring-1 ring-[#ef4518] ring-opacity-5 overflow-y-auto max-h-[300px] z-50">
                        {events?.map((e: any) => (
                            <Link
                                href={`/events/${e?.slug}`}
                                key={e?.id}
                                className="px-4 py-2 gray-dark no-underline cursor-pointer flex items-center hover:bg-gray-100"
                            >
                                <span className="z-40 ml-4">{e?.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        if (name === "Promotion") {
            if (!promotions?.length) return null;
            return (
                <div className="relative group flex gray-dark cursor-pointer" key={name}>
                    <Link href={`/${navPaths[name]}`} className="no-underline rounded-md text-[#484848] text-sm font-medium nav-links">
                        {name}
                    </Link>
                    <FaChevronDown className="w-[9px] self-center ml-[5px]" />
                    <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 rounded-md shadow-lg hidden group-hover:block bg-white ring-1 ring-[#ef4518] ring-opacity-5 overflow-y-auto max-h-[300px] z-50">
                        {promotions?.map((e: any) => (
                            <Link
                                href={getPromotionHref(e, promotion_slug)}
                                key={e?.id}
                                className=" no-underline px-4 py-2 gray-dark cursor-pointer flex items-center hover:bg-gray-100"
                            >
                                <span className="z-40 ml-4">{e?.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            );
        }

        // if (name === "Promotions") {
        //     return (
        //         <div className="relative group flex gray-dark cursor-pointer" key={name}>
        //         <Link href="/promotion" className="rounded-md text-sm font-medium nav-links">
        //             {name}
        //         </Link>

        //         {promotions && promotions.length > 0 && (
        //             <>
        //             <FaChevronDown className="w-[9px] self-center ml-[5px]" />
        //             <div className="absolute left-1/2 -translate-x-1/2 top-full w-64 rounded-md shadow-lg hidden group-hover:block bg-white ring-1 ring-[#ef4518] ring-opacity-5 overflow-y-auto max-h-[300px] z-50">
        //                 {promotions.map((p: any) => (
        //                 <Link
        //                     href={`/promotions/${p.slug}`}
        //                     key={p.id}
        //                     className="px-4 py-2 gray-dark cursor-pointer flex items-center hover:bg-gray-100"
        //                 >
        //                     <span className="z-40 ml-4">{p.name}</span>
        //                 </Link>
        //                 ))}
        //             </div>
        //             </>
        //         )}
        //         </div>
        //     );
        //     }

        
        return (
            <div key={name}>
                <Link
                    href={navPaths[name]}
                    className={`no-underline rounded-md px-3 py-2 text-lg font-semibold nav-links ${isActive ? "nav-active" : "gray-dark"
                        }`}
                >
                    {name}
                </Link>
            </div>
        );
    });

    return (
        <nav className="relative oswald sticky top-0 z-50 bg-white">
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="sm:flex flex-1 items-center">
                        <Link
                        href={`/`}>
                            <Image
                                width={100}
                                height={50}
                                src={`${companyLogo}`}
                                alt="Logo"
                                className="h-[50px] w-auto"
                            />
                        </Link>
                    </div>

                    {/* Mobile button + menu lives in client */}
                    <MobileMenu nav={nav} company_id={company_id} mer_slug={mer_slug} slug_type={slug_type} cat_slug={cat_slug} categories={categories} merchants={merchants} events={events} />

                    {/* Search */}
                    <div className="hidden sm:flex sm:flex-1 sm:justify-center">
                        <HeaderSearchBar
                            companyId={company_id}
                            mer_slug={mer_slug}
                            slug_type={slug_type}
                            cat_slug={cat_slug}
                        />
                    </div>

                    {/* Desktop nav */}
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4">{nav}</div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
