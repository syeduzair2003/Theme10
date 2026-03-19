import { OffersOffer } from '@/services/dataTypes';
import React from 'react'
import { apiGetPopularProducts } from '@/apis/page_optimization';
// import OffersCard from './OffersCard';
import { splitHeading } from '@/constants/hooks';
import Link from 'next/link';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import ProductCard from './ProductCard';
import OfferSlider from './OfferSlider';

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}
const TrendingProducts = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    const response = await apiGetPopularProducts(companyId);
    const [firstHalf, secondHalf] = splitHeading(response?.data?.home_page_widget?.widget_heading);
    const content = response?.data?.home_page_widget?.widget_text
    const couponData = response?.data?.offers;
    const count = 8;
    if (couponData?.length > 0) {
        return (
            <section className="bg-[#0B0F1A] py-16 px-6 lg:px-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                            {firstHalf || 'Trending'} <span className="text-blue-500">{secondHalf || 'Products'}</span>
                        </h2>
                        <p className="text-slate-400 max-w-2xl text-sm leading-relaxed">
                            {content}
                        </p>
                    </div>
                    <Link href="/all-products" className="group flex items-center gap-2 text-blue-400 font-bold text-sm hover:text-blue-300 transition-all">
                        View More Deals 
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>

                {/* <OfferSlider>
                    {couponData.slice(0, 8).map((item: any, i: number) => (
                        <ProductCard 
                            key={i} 
                            offer={item} 
                            mer_slug_type={mer_slug_type} 
                            mer_slug={mer_slug} 
                            type={item?.offer?.offer_type?.name} 
                        />
                    ))}
                </OfferSlider> */}
                <div className="max-w-7xl mx-auto">
    <OfferSlider>
      {couponData.slice(0, 8).map((item: any, i: number) => (
        <ProductCard
          key={i}
          offer={item}
          mer_slug={mer_slug}
          mer_slug_type={mer_slug_type}
          type={item?.offer?.offer_type?.name}
        />
      ))}
    </OfferSlider>
  </div>
            </div>
        </section>
        )
    }
}

export default TrendingProducts
