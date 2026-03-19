import React from 'react'
import CategoryCard from './CategoryCard'

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

const CategoryCards: React.FC<Props> = ({
  categories = [
    { id: '1', name: 'Electronics', slug: 'electronics', image: '/categories/electronics.jpg', count: 150 },
    { id: '2', name: 'Fashion', slug: 'fashion', image: '/categories/fashion.jpg', count: 200 }
  ],
  title = "Shop by Category"
}) => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center mb-12">
          {title}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryCards