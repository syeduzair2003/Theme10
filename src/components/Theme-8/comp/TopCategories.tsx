import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Fixed import
import { getBaseImageUrl } from '@/constants/hooks';
import cookieService from '@/services/CookiesService';
import { CategoryData } from '@/services/dataTypes';
import { ChevronRight } from 'lucide-react';

interface Props {
    category: CategoryData;
}

const TopCategories = async ({ category }: Props) => {
    const companyDomain = await cookieService.get("domain");
    const domain = companyDomain?.domain;
    
    const imageSrc = category?.category_image 
        ? getBaseImageUrl(domain, category.category_image, "")
        : "https://images.unsplash.com/photo-1445205170230-053b830c6050?w=300&q=80";

    return (
        <Link 
            href={`/${category?.url}`}
            className="no-underline group relative flex flex-col items-center w-full max-w-[160px] mx-auto transition-all duration-300"
        >
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white border border-slate-100 shadow-sm group-hover:shadow-lg group-hover:border-blue-100 transition-all duration-500 mb-3 flex items-center justify-center p-4">
                {/* Fixed: img to Image with proper Next.js props */}
                <Image 
                    src={imageSrc} 
                    alt={category?.name || "Category"} 
                    width={112} 
                    height={112}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                />
            </div>
            
            <div className="text-center">
                <h4 className="text-sm font-extrabold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 mb-1">
                    {category?.name}
                </h4>
                
                <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 group-hover:bg-blue-600 rounded-full border border-slate-100 transition-all duration-300">
                    <span className="text-[9px] font-bold text-slate-500 group-hover:text-white uppercase tracking-tight">
                        {category?.total_offers ? `${category.total_offers}` : '12'} Deals
                    </span>
                    <ChevronRight size={10} className="text-slate-400 group-hover:text-white" />
                </div>
            </div>
        </Link>
    );
}

export default TopCategories;