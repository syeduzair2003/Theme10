import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { getBaseImageUrl } from '@/constants/hooks';

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
}

const MerchantCard = ({ merchant_name, merchant_logo, companyDomain, merchant_href }: Props) => {
    const nameParts = merchant_name.trim().split(' ');

    return (
        <Link href={merchant_href} className="no-underline group block h-full">
            <div className="relative h-full bg-white rounded-[2rem] p-6 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.25)] flex flex-col items-center text-center overflow-hidden border border-slate-100">
                
                {/* 1. Background Decorative Mesh - Sirf hover par chamkega */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors duration-500"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors duration-500"></div>

                {/* 2. Floating Logo Container */}
                <div className="relative mb-8 mt-4">
                    {/* Ring animation on hover */}
                    <div className="absolute inset-0 bg-blue-600 rounded-2xl blur-md opacity-0 group-hover:opacity-20 group-hover:scale-125 transition-all duration-500"></div>
                    
                    <div className="relative w-28 h-28 bg-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] border border-slate-50 p-4 flex items-center justify-center z-10 group-hover:-rotate-3 group-hover:scale-110 transition-all duration-500">
                        <Image
                            src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                            alt={`${merchant_name} logo`}
                            width={80}
                            height={80}
                            className="object-contain transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* 3. Typography with Gradient Text */}
                <div className="flex flex-col flex-grow items-center mb-6">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight transition-all duration-300 group-hover:text-blue-600">
                        <span className="block text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 group-hover:from-blue-700 group-hover:to-indigo-600">
                            {nameParts[0]}
                        </span>
                        {nameParts.length > 1 && (
                            <span className="block text-sm font-bold uppercase tracking-[0.2em] text-slate-400 mt-1 group-hover:text-slate-500">
                                {nameParts.slice(1).join(' ')}
                            </span>
                        )}
                    </h3>
                </div>

                {/* 4. Modern Action Button - Bilkul hatke! */}
                <div className="relative w-full overflow-hidden rounded-xl py-3 px-4 bg-slate-900 group-hover:bg-blue-600 transition-all duration-300 shadow-lg shadow-slate-200 group-hover:shadow-blue-200">
                    <div className="flex items-center justify-center gap-2 relative z-10">
                        <span className="text-xs font-black text-white uppercase tracking-widest">
                            Grab Coupons
                        </span>
                        <svg className="w-4 h-4 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7-7 7M5 12h16" />
                        </svg>
                    </div>
                    
                    {/* Gloss effect on button */}
                    <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-700"></div>
                </div>

                {/* 5. Subtle Discount Badge Overlay (Optional Style) */}
                <div className="absolute top-4 left-4">
                    <div className="bg-emerald-500/10 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter border border-emerald-500/20 backdrop-blur-sm">
                        Verified
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default MerchantCard;