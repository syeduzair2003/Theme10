import { getBaseImageUrl, parseDiscountTag } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
    discountTag?: string | null;
}

const MerchantForProduct = ({ merchant_name, merchant_logo, companyDomain, merchant_href, discountTag }: Props) => {
    const parsedDiscount = parseDiscountTag(discountTag)
    
    return (
        <Link href={merchant_href} className="group block h-full">
            <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_-15px_rgba(37,99,235,0.15)] hover:border-blue-100 transition-all duration-500 flex flex-col h-full overflow-hidden">
                
                {/* Modern Discount Badge */}
                {parsedDiscount && (
                    <div className="absolute top-6 right-6 z-10">
                        <div className="bg-slate-900 text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl group-hover:bg-blue-600 transition-colors duration-300">
                            {parsedDiscount.value} {parsedDiscount.middle}
                        </div>
                    </div>
                )}

                <div className="flex-1 space-y-6">
                    {/* Brand Identity / Logo */}
                    <div className="w-20 h-20 bg-slate-50 rounded-[1.8rem] p-4 flex items-center justify-center relative group-hover:bg-white transition-all duration-500 border border-slate-50 group-hover:border-blue-50 group-hover:scale-105 group-hover:rotate-3 shadow-sm">
                        <div className="relative w-full h-full">
                            <Image
                                src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                                alt={`${merchant_name} logo`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-3">
                        <h3 className="text-xl font-black text-slate-900 leading-tight uppercase tracking-tight group-hover:text-blue-600 transition-colors italic">
                            {merchant_name}
                        </h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider leading-relaxed">
                            Verified premium <br/> collections & offers
                        </p>
                    </div>
                </div>

                {/* Modern Footer Action */}
                <div className="mt-10 flex items-center justify-between border-t border-slate-50 pt-6">
                    <span className="text-slate-900 font-black text-[10px] uppercase tracking-[0.2em] group-hover:text-blue-600 transition-colors">
                        View Products
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 transform group-hover:translate-x-2 shadow-sm">
                        <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </div>
                </div>

                {/* Decorative Bottom Glow Effect (Hidden by default, shows on hover) */}
                <div className="absolute -bottom-24 -right-24 w-40 h-40 bg-blue-400/10 blur-[60px] rounded-full group-hover:bg-blue-400/20 transition-all duration-700"></div>
            </div>
        </Link>
    )
}

export default MerchantForProduct