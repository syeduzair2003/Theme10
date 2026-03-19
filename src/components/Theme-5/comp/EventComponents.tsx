import React from 'react'

export const EventBanner: React.FC = () => (
  <div className="h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
    <h2 className="text-white text-xl font-bold">Special Event</h2>
  </div>
)

export const EventMerchant: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="font-semibold">Event Merchant</h3>
  </div>
)

export const EventOffer: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="font-semibold">Event Offer</h3>
  </div>
)

export const EventOfferCard: React.FC = () => (
  <div className="bg-white rounded-xl shadow-lg p-4">
    <h3 className="font-semibold">Event Offer Card</h3>
  </div>
)

export const EventSlider: React.FC = () => (
  <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-8">
    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
      Event Slider
    </h2>
  </div>
)