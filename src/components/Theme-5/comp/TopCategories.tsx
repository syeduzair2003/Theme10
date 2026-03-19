import React from 'react'
import Link from 'next/link'
import TopCategoriesCard from './TopCategoriesCard'

interface TopCategoriesProps {
  categories?: Array<{
    id?: string
    name?: string
    slug?: string
    image?: string
    count?: number
  }>
  title?: string
}

const TopCategories: React.FC<TopCategoriesProps> = ({
  categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', image: '/categories/electronics.jpg', count: 150 },
    { id: '2', name: 'Fashion', slug: 'fashion', image: '/categories/fashion.jpg', count: 200 },
    { id: '3', name: 'Home & Garden', slug: 'home-garden', image: '/categories/home.jpg', count: 120 },
    { id: '4', name: 'Sports', slug: 'sports', image: '/categories/sports.jpg', count: 80 },
    { id: '5', name: 'Beauty', slug: 'beauty', image: '/categories/beauty.jpg', count: 90 },
    { id: '6', name: 'Books', slug: 'books', image: '/categories/books.jpg', count: 60 }
  ],
  title = "Top Categories"
}) => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover amazing deals across our most popular categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <TopCategoriesCard key={category.id} category={category} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/category"
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            View All Categories
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopCategories