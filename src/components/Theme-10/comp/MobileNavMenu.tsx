"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NavSearch from "./NavSearch";

const MobileNavMenu = ({
  company_id,
  mer_slug,
  slug_type,
  cat_slug,
  categories,
  merchants,
}: any) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // Screen scroll lock jab menu open ho
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    <div className="lg:hidden">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="p-2.5 text-[#800000] bg-white border border-[#800000]/10 rounded-xl shadow-sm active:scale-90 transition-transform"
      >
        <FaBars size={20} />
      </button>

      {open && (
        <div className="fixed inset-0 top-0 left-0 w-screen h-screen bg-[#F5F5DC] z-[9999] flex flex-col animate-in slide-in-from-right duration-500 overflow-hidden">
          {/* Header Section */}
          <div className="flex items-center justify-between p-6 bg-white border-b border-[#800000]/5 shrink-0">
            <span className="font-black text-xl tracking-tighter text-[#800000]">
              MENU
            </span>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center bg-[#800000] text-white rounded-full shadow-lg active:scale-90 transition-all"
            >
              <FaTimes size={18} />
            </button>
          </div>

          {/* Content Section - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar bg-[#F5F5DC]">
            {/* Search in Mobile */}
            <div className="bg-white rounded-2xl p-1 shadow-sm border border-[#800000]/5">
              <NavSearch
                companyId={company_id}
                mer_slug={mer_slug}
                slug_type={slug_type}
                cat_slug={cat_slug}
              />
            </div>

            <div className="space-y-6">
              {[
                { name: "Categories", data: categories, path: "/category" },
                { name: "Stores", data: merchants, path: "/all-stores/A" },
              ].map((group) => (
                <div
                  key={group.name}
                  className="bg-white/60 rounded-2xl p-4 border border-white"
                >
                  <button
                    onClick={() =>
                      setActiveTab(activeTab === group.name ? null : group.name)
                    }
                    className="flex w-full items-center justify-between text-[17px] font-bold text-slate-800"
                  >
                    <span
                      className={
                        activeTab === group.name ? "text-[#800000]" : ""
                      }
                    >
                      {group.name}
                    </span>
                    <FaChevronDown
                      className={`text-sm transition-transform duration-300 ${activeTab === group.name ? "rotate-180 text-[#800000]" : "text-slate-400"}`}
                    />
                  </button>

                  {activeTab === group.name && (
                    <div className="grid grid-cols-2 gap-2 mt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                      {group.data?.slice(0, 10).map((item: any) => (
                        <Link
                          key={item.id}
                          href={
                            item.url ? `/${item.url}` : `/store/${item.slug}`
                          }
                          className="p-3 bg-white rounded-xl text-[13px] font-bold text-slate-600 no-underline border border-slate-50 active:bg-[#800000] active:text-white transition-colors"
                          onClick={() => setOpen(false)}
                        >
                          {item.name || item.merchant_name}
                        </Link>
                      ))}
                      <Link
                        href={group.path}
                        className="col-span-2 mt-2 p-3 text-center text-[#800000] font-black text-xs uppercase tracking-widest no-underline border-t border-[#800000]/5"
                        onClick={() => setOpen(false)}
                      >
                        View All {group.name}{" "}
                        <FaArrowRight className="inline ml-1 w-3" />
                      </Link>
                    </div>
                  )}
                </div>
              ))}

              {/* Simple Links */}
              <div className="px-4 space-y-6 pt-2 pb-10">
                <Link
                  onClick={() => setOpen(false)}
                  href="/all-products"
                  className="block text-[18px] font-extrabold text-slate-800 no-underline"
                >
                  Products
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  href="/events"
                  className="block text-[18px] font-extrabold text-slate-800 no-underline"
                >
                  Events
                </Link>
                <Link
                  onClick={() => setOpen(false)}
                  href="https://blog.gettopdiscounts.com"
                  className="block text-[18px] font-extrabold text-slate-800 no-underline"
                >
                  Blog
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-white border-t border-[#800000]/5 shrink-0">
            <p className="text-center text-[10px] text-slate-400 font-black tracking-[0.3em] uppercase">
              © 2026 GETTOPDISCOUNTS LLC
            </p>
          </div>
        </div>
      )}

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
