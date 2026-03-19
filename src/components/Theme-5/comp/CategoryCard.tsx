'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
interface Category {
  id: string
  name: string
  slug: string
  image: string
  count: number
}

interface CategoryCardProps {
  category: Category
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
        <div className="h-32 bg-gradient-to-br from-purple-100 to-blue-100 relative">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://via.placeholder.com/200x128/8B5CF6/FFFFFF?text=${category.name}`
            }}
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
          <p className="text-sm text-gray-500">{category.count} offers</p>
        </div>
      </div>
    </Link>
  )
}

export default CategoryCard