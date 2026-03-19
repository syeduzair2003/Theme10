// HomeCategoriesRender.tsx
import React from 'react'

const HomeCategoriesRender: React.FC = () => (
  <section className="py-8">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center mb-8">
        Popular Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl shadow-lg p-4 text-center hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-2xl">🛍️</span>
            </div>
            <h3 className="font-semibold">Category {i}</h3>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default HomeCategoriesRender