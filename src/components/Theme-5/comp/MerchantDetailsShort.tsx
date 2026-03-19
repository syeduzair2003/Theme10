'use client'
import React from 'react'
import { discardHTMLTags } from '@/constants/hooks'

interface Props {
    details: string
    showButton?: boolean
}

const MerchantDetailsShort = ({ details, showButton = false }: Props) => {
    const cleanDetails = discardHTMLTags(details)
    const shortDetails = cleanDetails.length > 200 ? cleanDetails.substring(0, 200) + '...' : cleanDetails

    const scrollToDetails = () => {
        const element = document.getElementById('full-details-section')
        if (element) {
            const offset = 80
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
            window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' })
        }
    }

    return (
        <div className="relative max-w-2xl mx-auto mt-8 group/details">
            {/* Animated Background Glow (Centered behind text) */}
            <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full scale-0 group-hover/details:scale-100 transition-transform duration-700 ease-out" />

            <div className="relative z-10 text-center px-6 py-8 rounded-[2rem] border border-transparent hover:border-slate-100 hover:bg-white/50 hover:backdrop-blur-sm transition-all duration-500">

                {/* Floating Top Label */}
                <span className="inline-flex items-center justify-center space-x-2 text-indigo-600 font-black uppercase text-[10px] tracking-[0.3em] mb-4">
                    <span className="w-8 h-[1px] bg-indigo-200 group-hover/details:w-12 transition-all duration-500" />
                    <span>Overview</span>
                    <span className="w-8 h-[1px] bg-indigo-200 group-hover/details:w-12 transition-all duration-500" />
                </span>

                {/* Details Text with Entrance Animation */}
                <div className="prose prose-slate max-w-none transform transition-all duration-500 group-hover/details:translate-y-[-2px]">
                    <p className="text-[16px] font-medium text-slate-500 leading-relaxed tracking-tight italic">
                        &ldquo;{shortDetails}&rdquo;
                    </p>
                </div>

                {/* Bottom Decorative Element */}
                <div className="mt-6 flex justify-center space-x-1">
                    <div className="w-1 h-1 rounded-full bg-slate-200 group-hover/details:bg-indigo-400 transition-colors" />
                    <div className="w-4 h-1 rounded-full bg-slate-100 group-hover/details:bg-indigo-500 transition-all duration-500" />
                    <div className="w-1 h-1 rounded-full bg-slate-200 group-hover/details:bg-indigo-400 transition-colors" />
                </div>

                {/* View Details Button */}
                {showButton && (
                    <button
                        onClick={scrollToDetails}
                        className="mt-6 text-indigo-600 hover:text-indigo-700 text-sm font-semibold underline underline-offset-4 transition-colors duration-300"
                    >
                        See Full Details →
                    </button>
                )}
            </div>
        </div>
    )
}

export default MerchantDetailsShort