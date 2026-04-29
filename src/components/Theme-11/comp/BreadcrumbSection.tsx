import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    title: string;
    breadcrumbs: BreadcrumbItem[];
    imageSrc?: string;
    imageAlt?: string;
}

const BreadcrumbSection = ({
    title,
    breadcrumbs,
    imageSrc,
    imageAlt = "Breadcrumb Image",
}: Props) => {
    return (
        <div className="bg-[#fcfcfa] pt-32 pb-10 md:pt-40 md:pb-16 relative overflow-hidden" style={{ background: 'linear-gradient(to bottom, #ffffff, #fdfbfa)' }}>
            {/* Subtle background decoration for premium feel */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8bc94a]/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#ff912f]/[0.03] rounded-full blur-3xl -translate-y-1/2 -translate-x-1/3 z-0 pointer-events-none"></div>

            <div className="container mx-auto px-4 max-w-7xl relative z-10">
                <div className={`flex flex-col md:flex-row items-center ${imageSrc ? 'justify-between text-left' : 'justify-center text-center'}`}>
                    
                    {/* Text and Breadcrumbs Area */}
                    <div className={`flex flex-col ${imageSrc ? 'md:w-3/5 items-center md:items-start' : 'items-center'} mb-10 md:mb-0`}>
                        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-sm leading-tight">
                            {title}
                        </h1>
                        
                        {/* Floating Interactive Breadcrumb */}
                        <nav aria-label="Breadcrumb" className={`inline-block relative z-10 w-full max-w-full overflow-x-auto pb-4 md:pb-0 hide-scrollbar flex justify-center ${imageSrc ? 'md:justify-start' : 'md:justify-center'}`}>
                            <ol className="inline-flex items-center space-x-1 md:space-x-3 bg-white/80 backdrop-blur-md px-5 md:px-7 py-2.5 md:py-3 rounded-full border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.12)] whitespace-nowrap">
                                {breadcrumbs.map((crumb, idx) => {
                                    const isLast = idx === breadcrumbs.length - 1;
                                    const isFirst = idx === 0;

                                    return (
                                        <li key={idx} className="inline-flex items-center">
                                            {/* Separator Chevron */}
                                            {!isFirst && (
                                                <svg className="w-4 h-4 text-gray-300 mx-1 md:mx-2.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                                                </svg>
                                            )}
                                            
                                            {/* Link or Static Text */}
                                            {crumb.href && !isLast ? (
                                                <Link href={crumb.href} className="inline-flex items-center text-[13px] md:text-sm font-semibold transition-all duration-300 no-underline text-gray-500 hover:text-[#8bc94a] group">
                                                    {isFirst && (
                                                        <svg className="w-4 h-4 mr-1.5 md:mr-2 text-gray-400 group-hover:text-[#8bc94a] transition-colors" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
                                                        </svg>
                                                    )}
                                                    <span className="capitalize">{crumb.label}</span>
                                                </Link>
                                            ) : (
                                                <span className={`text-[13px] md:text-sm font-bold tracking-wider ${isLast ? 'text-[#ff912f] capitalize' : 'text-gray-500 capitalize'} flex items-center`}>
                                                    {crumb.label === "other" && isLast ? "#" : crumb.label}
                                                </span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                        
                        {/* Solid Green Divider under breadcrumb */}
                        <div className="hidden md:block w-32 h-[2px] mt-8 rounded-full bg-[#8bc94a]"></div>

                    </div>

                    {/* Optional Image Area */}
                    {imageSrc && (
                        <div className="md:w-2/5 flex justify-center md:justify-end mt-8 md:mt-0 relative w-full h-[220px] md:h-[280px]">
                            {/* Decorative background circle behind image */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[220px] h-[220px] md:w-[280px] md:h-[280px] bg-white rounded-full shadow-[0_0_40px_rgba(139,201,74,0.06)] border border-[#8bc94a]/10 z-0"></div>
                            
                            <div className="relative z-10 w-full h-full flex items-center justify-center transform transition-transform duration-700 hover:scale-105">
                                <Image
                                    src={imageSrc}
                                    alt={imageAlt}
                                    fill
                                    className="object-contain drop-shadow-xl"
                                    unoptimized
                                    priority
                                />
                            </div>
                        </div>
                    )}

                </div>
            </div>
            
            {/* Custom scrollbar class locally for mobile breadcrumb overscroll */}
            <style dangerouslySetInnerHTML={{__html: `
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}} />
        </div>
    );
};

export default BreadcrumbSection;