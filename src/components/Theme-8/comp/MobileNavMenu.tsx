"use client";
import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NavSearch from "./NavSearch";

const MobileNavMenu = ({ company_id, mer_slug, slug_type, cat_slug, categories, merchants }: any) => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    // Jab menu open ho to background scroll lock karne ke liye
    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [open]);

    return (
        <div className="lg:hidden">
            {/* Hamburger Button */}
            <button 
                onClick={() => setOpen(true)} 
                className="p-2.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
            >
                <FaBars size={22} />
            </button>

            {/* Full Screen Overlay Menu */}
            {open && (
                <div className="fixed inset-0 bg-white z-[10001] flex flex-col h-[100dvh] w-full overflow-hidden animate-in slide-in-from-right duration-300">
                    
                    {/* Header: Sticky at top */}
                    <div className="flex items-center justify-between p-5 border-b shrink-0 bg-white">
                        <span className="font-black text-2xl tracking-tighter text-blue-600 italic">MENU</span>
                        <button 
                            onClick={() => setOpen(false)} 
                            className="w-10 h-10 flex items-center justify-center bg-slate-100 hover:bg-red-50 hover:text-red-500 rounded-full transition-all"
                        >
                            <FaTimes size={20} />
                        </button>
                    </div>

                    {/* Content: Scrollable Area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden p-5 custom-scrollbar">
                        
                        {/* Search Section */}
                        <div className="mb-8">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Search</p>
                            <NavSearch companyId={company_id} mer_slug={mer_slug} slug_type={slug_type} cat_slug={cat_slug} />
                        </div>

                        {/* Navigation Links */}
                        <div className="space-y-2">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Explore</p>
                            
                            {/* Dropdown Groups */}
                            {[
                                { name: "Categories", data: categories, path: "/category" },
                                { name: "Stores", data: merchants, path: "/all-stores/A" }
                            ].map((group) => (
                                <div key={group.name} className="bg-slate-50/50 rounded-2xl overflow-hidden border border-slate-100 mb-2">
                                    <button 
                                        onClick={() => setActiveTab(activeTab === group.name ? null : group.name)}
                                        className="flex w-full items-center justify-between p-4 text-md font-bold text-slate-800"
                                    >
                                        {group.name}
                                        <FaChevronDown className={`transition-transform duration-300 text-slate-400 ${activeTab === group.name ? "rotate-180 text-blue-600" : ""}`} />
                                    </button>
                                    
                                    {activeTab === group.name && (
                                        <div className="px-4 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <div className="grid grid-cols-1 gap-2 border-t border-slate-100 pt-3">
                                                {group.data?.slice(0, 8).map((item: any) => (
                                                    <Link 
                                                        key={item.id} 
                                                        onClick={() => setOpen(false)}
                                                        href={item.url ? `/${item.url}` : `/store/${item.slug}`} 
                                                        className="flex items-center justify-between p-3 bg-white rounded-xl text-sm font-bold text-slate-600 no-underline shadow-sm border border-slate-50"
                                                    >
                                                        {item.name || item.merchant_name}
                                                        <FaArrowRight size={10} className="text-slate-300" />
                                                    </Link>
                                                ))}
                                                <Link 
                                                    href={group.path} 
                                                    onClick={() => setOpen(false)}
                                                    className="p-3 text-center text-blue-600 font-black text-xs uppercase tracking-wider"
                                                >
                                                    View All {group.name}
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            {/* Static Links */}
                            <Link 
                                href="/all-products" 
                                onClick={() => setOpen(false)}
                                className="block p-4 bg-slate-50 rounded-2xl font-bold text-slate-800 no-underline border border-slate-100 hover:bg-blue-50 transition-colors"
                            >
                                Products
                            </Link>
                            
                            <Link 
                                href="https://blog.gettopdiscounts.com" 
                                onClick={() => setOpen(false)}
                                className="block p-4 bg-slate-50 rounded-2xl font-bold text-slate-800 no-underline border border-slate-100 hover:bg-blue-50 transition-colors"
                            >
                                Blog
                            </Link>
                        </div>
                    </div>

                    {/* Footer: Fixed at bottom */}
                    <div className="p-6 bg-slate-900 shrink-0 text-center">
                        <p className="text-[10px] text-slate-500 font-black tracking-[0.2em] uppercase mb-2">© 2026 TOP DISCOUNTS</p>
                        <div className="flex justify-center gap-4 text-white/40 text-[9px] font-bold">
                            <span>PRIVACY</span>
                            <span>TERMS</span>
                            <span>CONTACT</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MobileNavMenu;