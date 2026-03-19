import React from 'react'
import { apiGetPopularDeals } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import OfferCard from '../comp/OfferCard';
import { Reveal } from '../comp/MotionWrapper'; // Import the wrapper

interface Props {
    companyId: string;
    mer_slug_type: string;
    mer_slug: string;
}

const FeaturedDeals = async ({ companyId, mer_slug_type, mer_slug }: Props) => {
    // Server-side Data Fetching
    const response = await apiGetPopularDeals(companyId);
    const bestOffers = response.data;
    
    if (!bestOffers?.offers?.length) return null;

    const [firstHalf, secondHalf] = splitHeading(bestOffers?.popular_deals_widget?.widget_heading);
    const content = bestOffers?.popular_deals_widget?.widget_text;
    const count = 6;

    return (
        <section className="bg-white py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Animation */}
                <Reveal>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
                        <div>
                            <p className="text-blue-500 font-semibold text-sm mb-2 uppercase tracking-wide">
                                Handpicked for you
                            </p>
                            <h2 className="text-5xl md:text-6xl font-black text-gray-900 mb-4 tracking-tight">
                                {firstHalf ? firstHalf : `Featured`} <span className="text-blue-600">{secondHalf ? secondHalf : `Deals`}</span>
                            </h2>
                            <p className="text-gray-500 text-lg max-w-2xl">
                                {content}
                            </p>
                        </div>
                    </div>
                </Reveal>

                {/* Grid with Individual Reveal for each card */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bestOffers?.offers?.slice(0, count)?.map((item: any, i: number) => (
                        <Reveal key={i} delay={i * 0.1}> {/* Har card thoda late aayega */}
                            <OfferCard 
                                offer={item} 
                                mer_slug_type={mer_slug_type} 
                                mer_slug={mer_slug} 
                            />
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedDeals;