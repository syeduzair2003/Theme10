"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NavSearch from "./NavSearch";
import { getMerchantHref, getPromotionHref } from "@/constants/hooks";

const MobileNavMenu = ({
  company_id,
  mer_slug,
  slug_type,
  cat_slug,
  categories,
  merchants,
  events,
  promotions,
  promotion_slug,
}: any) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const navGroups = [
    { name: "Categories", data: categories, path: "/category", type: "cat" },
    { name: "Stores", data: merchants, path: "/all-stores/A", type: "mer" },
    {
      name: "Products",
      data: [{ id: "p1", name: "Branded Products", slug: "all-products" }],
      path: "/all-products",
      type: "prod",
    },
    { name: "Events", data: events, path: "/events", type: "event" },
    {
      name: "Promotion",
      data: promotions,
      path: `/${promotion_slug}`,
      type: "promo",
    },
  ];

  return (
    <div className="lg:hidden">
      {/* Burger Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 text-[#800000] bg-white border border-[#800000]/10 rounded-xl shadow-sm active:scale-95 transition-transform"
      >
        <FaBars size={20} />
      </button>

      {/* --- BACKDROP --- */}
      <div
        className={`fixed inset-0 bg-black/60 z-[9998] transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setOpen(false)}
      />

      {/* --- SIDEBAR DRAWER --- */}
      {/* h-screen aur h-[100dvh] use kiya hai takay mobile browser bar ko handle kar sakay */}
      <div
        className={`fixed top-0 right-0 h-screen h-[100dvh] w-[80%] max-w-[360px] bg-[#F5F5DC] z-[9999] flex flex-col shadow-2xl transition-transform duration-500 ease-in-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between p-5 bg-white border-b border-[#800000]/5 shrink-0">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="relative h-9 w-32"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-full w-auto object-contain object-left"
            />
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="w-10 h-10 flex items-center justify-center bg-[#800000] text-white rounded-full shadow-lg active:scale-90 transition-all"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Content Section - Scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6 no-scrollbar">
          {/* Search Box */}
          <div className="bg-white rounded-2xl p-1 shadow-sm border border-[#800000]/5">
            <NavSearch
              companyId={company_id}
              mer_slug={mer_slug}
              slug_type={slug_type}
              cat_slug={cat_slug}
            />
          </div>

          <div className="space-y-4">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="block bg-white/60 rounded-2xl p-4 border border-white/50 text-[15px] font-bold text-slate-800 no-underline active:text-[#800000]"
            >
              Home
            </Link>

            {navGroups.map((group) => (
              <div
                key={group.name}
                className="bg-white/60 rounded-2xl p-4 border border-white/50"
              >
                <button
                  onClick={() =>
                    setActiveTab(activeTab === group.name ? null : group.name)
                  }
                  className="flex w-full items-center justify-between text-[15px] font-bold text-slate-800"
                >
                  <span
                    className={activeTab === group.name ? "text-[#800000]" : ""}
                  >
                    {group.name}
                  </span>
                  <FaChevronDown
                    className={`text-sm transition-transform duration-300 ${activeTab === group.name ? "rotate-180 text-[#800000]" : "text-slate-400"}`}
                  />
                </button>

                {activeTab === group.name && (
                  <div className="grid grid-cols-2 gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                    {group.data?.slice(0, 10).map((item: any, idx: number) => {
                      let href = "#";
                      if (group.type === "cat") href = `/${item.url}`;
                      if (group.type === "mer")
                        href = getMerchantHref(item, mer_slug, slug_type);
                      if (group.type === "event") href = `/events/${item.slug}`;
                      if (group.type === "promo")
                        href = getPromotionHref(item, promotion_slug);
                      if (group.type === "prod") href = `/all-products`;

                      return (
                        <Link
                          key={idx}
                          href={href}
                          className="p-3 bg-white rounded-xl text-[11px] font-bold text-slate-600 no-underline border border-slate-50 active:bg-[#800000] active:text-white transition-colors text-center"
                          onClick={() => setOpen(false)}
                        >
                          {item.name || item.merchant_name}
                        </Link>
                      );
                    })}

                    <Link
                      href={group.path}
                      className="col-span-2 mt-2 p-3 text-center text-[#800000] font-black text-[9px] uppercase tracking-widest no-underline border-t border-[#800000]/5"
                      onClick={() => setOpen(false)}
                    >
                      View All {group.name}{" "}
                      <FaArrowRight className="inline ml-1 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))}

            <Link
              onClick={() => setOpen(false)}
              href="https://blog.gettopdiscounts.com"
              className="block bg-white/60 rounded-2xl p-4 border border-white/50 text-[15px] font-bold text-slate-800 no-underline active:text-[#800000]"
            >
              Blog
            </Link>
          </div>
        </div>

        {/* Footer Section */}
        <div className="p-5 bg-white border-t border-[#800000]/5 shrink-0 mt-auto">
          <p className="text-center text-[9px] text-slate-400 font-black tracking-[0.2em] uppercase">
            © 2026 GETTOPDISCOUNTS LLC
          </p>
        </div>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MobileNavMenu;
