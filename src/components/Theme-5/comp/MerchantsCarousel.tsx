import Image from 'next/image'
import React from 'react'
import CarouselMerchantCard from './CarouselMerchantCard'

interface MerchantsCarouselProps {
  companyId?: string
  mer_slug_type?: string
  mer_slug?: string
}

const MerchantsCarousel: React.FC<MerchantsCarouselProps> = () => {
  const merchants = [
    { name: "Amazon", logo: "/api/placeholder/120/80", deals: "2,500+" },
    { name: "Walmart", logo: "/api/placeholder/120/80", deals: "1,800+" },
    { name: "Target", logo: "/api/placeholder/120/80", deals: "1,200+" },
    { name: "Best Buy", logo: "/api/placeholder/120/80", deals: "950+" },
    { name: "Nike", logo: "/api/placeholder/120/80", deals: "750+" },
    { name: "Apple", logo: "/api/placeholder/120/80", deals: "650+" }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Minimalist Header */}
        <div className="max-w-2xl mb-16 mb-12 border-l-4 border-indigo-600 pl-6">
          <h3 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Industry-Leading <span className='text-indigo-600'>Merchants</span>
          </h3>
          <p className="text-lg text-slate-500 font-medium">
            We partner with the worlds most ambitious brands to bring you unparalleled value.
          </p>
        </div>

        {/* Elegant Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-l border-slate-50">
          {merchants.map((merchant, index) => (
            <CarouselMerchantCard key={index} merchant={merchant} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MerchantsCarousel