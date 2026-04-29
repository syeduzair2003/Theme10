import Link from 'next/link';
import React from 'react';
import { ArrowRight, Tag, Zap, ShieldCheck } from 'lucide-react';

interface Props {
    keywords: string[];
    mer_slug: string;
    cat_slug: string;
}

const HeroSection = ({ keywords, mer_slug, cat_slug }: Props) => {
    const displayTags = keywords?.slice(0, 8) ?? [];

    return (
        <section className="relative w-full min-h-[550px] md:min-h-[750px] flex items-center justify-center overflow-hidden bg-[#020617] pt-28 pb-16 px-4">
            
            {/* --- Background Image with Overlay --- */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80" 
                    alt="Background Tech"
                    className="w-full h-full object-cover opacity-20" // Kam opacity taaki text nazar aaye
                />
                {/* Gradient Overlays for depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#020617] via-transparent to-[#020617]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">

                {/* --- Slim Badge --- */}
                <div className="mb-6 inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 text-indigo-400 text-[10px] font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Verified Tech Coupons
                </div>

                {/* --- Headline: Optimized Size --- */}
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight mb-5 leading-[1.1]">
                    RENT PREMIUM GEAR <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">WITHOUT THE PREMIUM PRICE</span>
                </h1>

                {/* --- Description: Subtle --- */}
                <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-xl mb-10 leading-relaxed">
                    Access verified discount codes for top-tier electronics and rental stores. 
                    Updated daily for the tech-savvy professional.
                </p>

                {/* --- Sleek Action Buttons --- */}
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-14 w-full justify-center">
                    <Link
                        href={`/all-stores/A`}
                        className="group relative px-7 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <span>Browse Deals</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href={`/${cat_slug}`}
                        className="group px-7 py-3 bg-white/5 backdrop-blur-sm text-white border border-white/10 hover:border-white/20 rounded-xl font-bold text-sm transition-all duration-300 hover:bg-white/10 flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <span>Categories</span>
                    </Link>
                </div>

                {/* --- Compact Trending Tags --- */}
                {displayTags.length > 0 && (
                    <div className="flex flex-col items-center gap-4 w-full">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Tag size={12} className="text-indigo-500" />
                            Popular Searches
                        </span>
                        
                        <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl">
                            {displayTags.map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/search?query=${encodeURIComponent(tag)}`}
                                    className="px-3.5 py-1.5 bg-white/5 hover:bg-indigo-600/20 border border-white/5 hover:border-indigo-500/50 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-white transition-all duration-300"
                                >
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default HeroSection;