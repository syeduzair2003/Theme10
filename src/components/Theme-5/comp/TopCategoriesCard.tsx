'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface TopCategoriesCardProps {
  category: {
    id?: string
    name?: string
    slug?: string
    image?: string
    count?: number
  }
}

const TopCategoriesCard = ({ category }: TopCategoriesCardProps) => {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group"
    >
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        {/* Image */}
        <div className="relative h-32 bg-gradient-to-br from-purple-100 to-blue-100 overflow-hidden">
          <Image
            src={category.image || ''}
            alt={category.name || ''}
            fill
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/200x128/8B5CF6/FFFFFF?text=${category.name}`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-gray-500">
            {category.count} offers
          </p>
        </div>

        {/* Hover Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
      </div>
    </Link>
  )
}

export default TopCategoriesCard