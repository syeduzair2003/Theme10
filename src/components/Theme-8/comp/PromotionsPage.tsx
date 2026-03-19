import { apiGetAllPromotion } from '@/apis/user';
import { getPromotionHref } from '@/constants/hooks';
import { faGreaterThan, FontAwesomeIcon } from '@/constants/icons';
import cookieService from '@/services/CookiesService';
import { Promotion } from '@/services/dataTypes';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PromotionsPage = async ({ promotionSlug }: { promotionSlug: string }) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promotions = (await apiGetAllPromotion(companyDomain)).data;

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans selection:bg-blue-100 selection:text-blue-600">
            {/* --- PREMIUM HERO SECTION --- */}
            <section className="relative pt-32 pb-20 overflow-hidden mx-4 md:mx-10 mt-6 bg-slate-900 rounded-[3rem] shadow-2xl">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-blue-600/30 to-purple-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] -ml-20 -mb-20"></div>
                
                <div className="container mx-auto px-8 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                        <div className="max-w-2xl text-center lg:text-left">
                            <nav className="inline-flex items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-8 border border-white/10 shadow-inner">
                                <ol className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-white p-0 m-0 list-none">
                                    <li>
                                        <Link href="/" className="no-underline text-slate-300 hover:text-white transition-colors duration-300">
                                            Home
                                        </Link>
                                    </li>
                                    
                                    {/* Replacement for FontAwesome Icon - Reliable SVG */}
                                    <li className="flex items-center">
                                        <svg 
                                            width="6" 
                                            height="10" 
                                            viewBox="0 0 6 10" 
                                            fill="none" 
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="opacity-60"
                                        >
                                            <path 
                                                d="M1 9L5 5L1 1" 
                                                stroke="currentColor" 
                                                strokeWidth="2" 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </li>

                                    <li className="text-blue-400 font-black">
                                        Promotions
                                    </li>
                                </ol>
                            </nav>
                            
                            <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                                Big Savings. <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                                    Exclusive Deals.
                                </span>
                            </h1>
                            
                            <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed">
                                Experience the next level of shopping with our handpicked daily promotions and trending brand offers.
                            </p>
                        </div>

                        <div className="relative hidden lg:block group">
                            {/* Animated Image Glow */}
                            <div className="absolute inset-0 bg-blue-500 rounded-full blur-[100px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
                            <div className="relative z-10 transform group-hover:rotate-3 transition-transform duration-500">
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-5.png" 
                                    alt="Promotions Illustration" 
                                    width={450} 
                                    height={400} 
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- PROMOTIONS GRID --- */}
            <section className="container mx-auto px-6 py-24">
                {/* <div className="flex items-center justify-between mb-16 border-b border-slate-200 pb-8">
                    <div>
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Active Events</h2>
                        <p className="text-slate-500 font-medium mt-1">Showing {promotions?.length || 0} active campaigns</p>
                    </div>
                    <div className="hidden md:block">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-600 animate-pulse"></div>
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Live Now</span>
                        </div>
                    </div>
                </div> */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {promotions?.length > 0 ? (
                        promotions.map((promotion: Promotion, index: number) => (
                            <Link key={index} href={getPromotionHref(promotion, promotionSlug)} className="no-underline group relative block h-full">
                                
                                {/* 1. Animated Border Glow (Srf Hover par dikhega) */}
                                <div className="absolute -inset-[1px] bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-500"></div>
                                
                                {/* 2. Main Card Body */}
                                <div className="relative bg-white rounded-[2.5rem] p-1 h-full overflow-hidden shadow-sm group-hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                    
                                    {/* Inner Content Wrapper */}
                                    <div className="relative bg-gradient-to-b from-slate-50 to-white rounded-[2.3rem] p-8 h-full flex flex-col">
                                        
                                        {/* Top Section: Index & Status */}
                                        <div className="flex justify-between items-start mb-10">
                                            <div className="relative">
                                                <span className="text-6xl font-black text-slate-100 absolute -top-6 -left-2 group-hover:text-blue-50 transition-colors duration-500">
                                                    0{index + 1}
                                                </span>
                                                <div className="relative z-10 w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">
                                                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping"></div>
                                                </div>
                                            </div>
                                            <div className="px-4 py-1.5 bg-white border border-slate-100 rounded-full shadow-sm">
                                                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400 group-hover:text-blue-600 transition-colors">
                                                    Special Event
                                                </span>
                                            </div>
                                        </div>

                                        {/* Middle Section: Title & Content */}
                                        <div className="flex-grow">
                                            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-4 group-hover:translate-x-1 transition-transform duration-500">
                                                {promotion?.name}
                                            </h3>
                                            <div className="w-10 h-1 bg-blue-600 rounded-full mb-6 group-hover:w-24 transition-all duration-700"></div>
                                            <p className="text-slate-500 text-sm font-medium leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                                Unlocking exclusive membership rewards and premium discounts for <span className="text-slate-900 font-bold">{promotion?.name}</span> subscribers.
                                            </p>
                                        </div>

                                        {/* Bottom Section: CTA */}
                                        <div className="mt-12 flex items-center gap-4">
                                            <div className="flex-grow h-[50px] bg-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500 overflow-hidden relative">
                                                <span className="text-white text-[11px] font-black uppercase tracking-[0.2em] relative z-10">
                                                    Explore Deals
                                                </span>
                                                {/* Hover filling effect */}
                                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                            </div>
                                            
                                            <div className="w-[50px] h-[50px] rounded-2xl border-2 border-slate-100 flex items-center justify-center group-hover:border-blue-200 transition-colors">
                                                <svg 
                                                    width="14" 
                                                    height="14" 
                                                    viewBox="0 0 14 14" 
                                                    fill="none" 
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="text-slate-400 group-hover:text-blue-600 group-hover:rotate-45 transition-all duration-500"
                                                >
                                                    <path d="M1 13L13 1M13 1H4.5M13 1V9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Background Decorative Pattern */}
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="40" cy="40" r="38" stroke="black" strokeWidth="4" strokeDasharray="8 8"/>
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-slate-900 font-black uppercase tracking-widest text-sm">No Active Promotions</h3>
                            <p className="text-slate-400 text-xs mt-2 font-medium">Please check back later for new events.</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default PromotionsPage;