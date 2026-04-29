import Link from 'next/link';
import React from 'react';
import { ArrowRight, Tag } from 'lucide-react';

interface Props {
    keywords: string[];
    mer_slug: string;
    cat_slug: string;
}

const HeroSection = ({ keywords, mer_slug, cat_slug }: Props) => {
    const displayTags = keywords?.slice(0, 8) ?? [];

    return (
        <section className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#8bc94a]/40 via-[#f0fdf4] to-[#fff7ed]/80 pt-28 sm:pt-36 md:pt-48 pb-20 sm:pb-32 px-4 font-sans">

            {/* CSS-animated background orbs */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="hero-orb-green absolute top-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#8bc94a]/25 blur-[100px]" />
                <div className="hero-orb-orange absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#ff912f]/10 blur-[120px]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center">

                {/* Badge */}
                <div className="hero-fade-in mb-6 inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-[#8bc94a]/30 text-[#8bc94a] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#8bc94a] animate-pulse inline-block" />
                    Updated Daily · Verified Codes
                </div>

                {/* Main Headline */}
                <h1 className="hero-fade-in-delay-1 text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[5.5rem] font-extrabold text-[#0B1121] tracking-tight uppercase mb-3 leading-[1.1]">
                    Exclusive Deals &amp; Promo Codes
                </h1>

                {/* Description */}
                <p className="hero-fade-in-delay-3 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mb-10 md:mb-12 leading-relaxed font-medium">
                    Handpicked discount codes from hundreds of top stores—{' '}
                    <br className="hidden md:block" />
                    verified and updated every single day.
                </p>

                {/* CTA Buttons */}
                <div className="hero-fade-in-delay-4 flex flex-col sm:flex-row items-center gap-4 mb-12 w-full justify-center">
                    {/* Primary — Browse Deals */}
                    <Link
                        href={`/all-stores/A`}
                        className="group relative overflow-hidden bg-[#8bc94a] text-white px-9 py-4 rounded-full font-bold text-lg shadow-[0_10px_30px_rgba(139,201,74,0.35)] hover:shadow-[0_14px_40px_rgba(139,201,74,0.5)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center no-underline"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out skew-x-12" />
                        <span>Browse Top Deals</span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
                    </Link>

                    {/* Secondary — Categories */}
                    <Link
                        href={`/${cat_slug}`}
                        className="group relative overflow-hidden bg-white/90 backdrop-blur text-[#0B1121] border border-gray-200 hover:border-[#ff912f] px-9 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-3 w-full sm:w-auto justify-center no-underline"
                    >
                        <span className="group-hover:text-[#ff912f] transition-colors duration-200">
                            View All Categories
                        </span>
                    </Link>
                </div>

                {/* Keyword Tags */}
                {displayTags.length > 0 && (
                    <div className="hero-fade-in-delay-5 flex flex-col items-center gap-3 w-full">
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                            <Tag size={12} />
                            Trending Searches
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-2.5">
                            {displayTags.map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/search?query=${encodeURIComponent(tag)}`}
                                    className="hero-tag px-4 py-2 bg-white/75 hover:bg-[#8bc94a] hover:text-white backdrop-blur border border-white/60 hover:border-[#8bc94a] rounded-full text-sm font-semibold text-gray-600 shadow-sm hover:shadow-[0_6px_18px_rgba(139,201,74,0.28)] transition-all duration-300 no-underline"
                                    style={{ animationDelay: `${0.8 + i * 0.08}s` }}
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