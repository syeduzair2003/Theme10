'use client'
import React from 'react'

interface Offer {
  id: string
  title: string
  discount: string
  merchant: string
  image: string
}

interface Props {
  offers?: Offer[]
  title?: string
}

const BestOffersCarousel: React.FC<Props> = ({
  offers = [
    { id: '1', title: 'Summer Sale', discount: '50% OFF', merchant: 'Amazon', image: '/offers/offer1.jpg' },
    { id: '2', title: 'Tech Deals', discount: '30% OFF', merchant: 'Best Buy', image: '/offers/offer2.jpg' }
  ],
  title = "Best Offers"
}) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        <div className="relative">
          <div className="flex space-x-4 overflow-x-auto pb-4">
            {offers.map((offer) => (
              <div key={offer.id} className="flex-shrink-0 w-80 bg-white rounded-xl shadow-lg p-6">
                <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">{offer.discount}</span>
                </div>
                <h3 className="font-semibold mb-2">{offer.title}</h3>
                <p className="text-gray-600 text-sm">{offer.merchant}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BestOffersCarousel