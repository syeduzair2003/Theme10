"use client";
import React, { useState } from "react";
import { FaBars, FaTimes, FaChevronDown, FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import NavSearch from "./NavSearch";

const MobileNavMenu = ({ company_id, mer_slug, slug_type, cat_slug, categories, merchants }: any) => {
    const [open, setOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);

    return (
        <div className="lg:hidden">
            <button onClick={() => setOpen(true)} className="p-2 text-slate-700 bg-slate-100 rounded-xl">
                <FaBars size={20} />
            </button>

            {open && (
                <div className="fixed inset-0 bg-white z-[200] flex flex-col animate-in slide-in-from-right duration-300">
                    <div className="flex items-center justify-between p-6 border-b">
                        <span className="font-black text-xl tracking-tighter text-blue-600">MENU</span>
                        <button onClick={() => setOpen(false)} className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full">
                            <FaTimes size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        <NavSearch companyId={company_id} mer_slug={mer_slug} slug_type={slug_type} cat_slug={cat_slug} />

                        <div className="space-y-4">
                            {[
                                { name: "Categories", data: categories, path: "/category" },
                                { name: "Stores", data: merchants, path: "/all-stores/A" }
                            ].map((group) => (
                                <div key={group.name} className="border-b border-slate-50 pb-4">
                                    <button 
                                        onClick={() => setActiveTab(activeTab === group.name ? null : group.name)}
                                        className="flex w-full items-center justify-between text-lg font-bold text-slate-800"
                                    >
                                        {group.name}
                                        <FaChevronDown className={`transition-transform ${activeTab === group.name ? "rotate-180" : ""}`} />
                                    </button>
                                    {activeTab === group.name && (
                                        <div className="grid grid-cols-2 gap-2 mt-4 animate-in fade-in slide-in-from-top-1">
                                            {group.data?.slice(0, 10).map((item: any) => (
                                                <Link key={item.id} href={item.url ? `/${item.url}` : `/store/${item.slug}`} 
                                                    className="p-3 bg-slate-50 rounded-xl text-sm font-semibold text-slate-600 no-underline">
                                                    {item.name || item.merchant_name}
                                                </Link>
                                            ))}
                                            <Link href={group.path} className="col-span-2 p-3 text-center text-blue-600 font-bold text-sm">
                                                View All {group.name} <FaArrowRight className="inline ml-1 w-3" />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            ))}
                            
                            <Link href="/all-products" className="block text-lg font-bold text-slate-800 no-underline">Products</Link>
                            <Link href="https://blog.gettopdiscounts.com" className="block text-lg font-bold text-slate-800 no-underline">Blog</Link>
                        </div>
                    </div>

                    <div className="p-6 bg-slate-50">
                        <p className="text-center text-xs text-slate-400 font-bold tracking-widest uppercase">© 2026 TOP DISCOUNTS</p>
                    </div>
                </div>
            )}
        </div>
    );
};
export default MobileNavMenu;