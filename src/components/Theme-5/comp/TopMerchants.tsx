// import React from 'react'
// import Link from 'next/link'
// import TopMerchantsCard from './TopMerchantsCard'

// interface TopMerchantsProps {
//   merchants?: Array<{
//     id?: string
//     name?: string
//     slug?: string
//     logo?: string
//     description?: string
//     offers_count?: number
//     rating?: number
//     featured?: boolean
//   }>
//   title?: string
// }

// const TopMerchants: React.FC<TopMerchantsProps> = ({
//   merchants = [
//     { id: '1', name: 'Amazon', slug: 'amazon', logo: '/merchants/amazon.png', description: 'Everything you need', offers_count: 50, rating: 4.8, featured: true },
//     { id: '2', name: 'Nike', slug: 'nike', logo: '/merchants/nike.png', description: 'Just Do It', offers_count: 25, rating: 4.7, featured: true },
//     { id: '3', name: 'Apple', slug: 'apple', logo: '/merchants/apple.png', description: 'Think Different', offers_count: 15, rating: 4.9, featured: true },
//     { id: '4', name: 'Samsung', slug: 'samsung', logo: '/merchants/samsung.png', description: 'Innovation for All', offers_count: 30, rating: 4.6, featured: false },
//     { id: '5', name: 'Adidas', slug: 'adidas', logo: '/merchants/adidas.png', description: 'Impossible is Nothing', offers_count: 20, rating: 4.5, featured: false },
//     { id: '6', name: 'Target', slug: 'target', logo: '/merchants/target.png', description: 'Expect More Pay Less', offers_count: 40, rating: 4.4, featured: false }
//   ],
//   title = "Top Merchants"
// }) => {


  
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
//             {title}
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Shop from the worlds most trusted brands and save more
//           </p>
//         </div>

//         {/* Merchants Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {merchants.map((merchant) => (
//             <TopMerchantsCard key={merchant.id} merchant={merchant} />
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className="text-center mt-12">
//           <Link
//             href="/merchants"
//             className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
//           >
//             View All Merchants
//             <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
//             </svg>
//           </Link>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default TopMerchants