import React from 'react'
import Link from 'next/link'

interface Category {
  id: string
  name: string
  slug: string
  image: string
  count: number
}

interface Props {
  categories?: Category[]
  title?: string
}

const CategoryCardsTwo: React.FC<Props> = ({
  categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', image: '/categories/electronics.jpg', count: 150 }
  ],
  title = "Categories"
}) => {
  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} href={`/category/${category.slug}`}>
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="font-semibold text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} offers</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryCardsTwo