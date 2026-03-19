// import React from 'react'
// import Link from 'next/link'
// import Image from 'next/image'

// interface TopMerchantsCardProps {
//   merchant: {
//     id?: string
//     name?: string
//     slug?: string
//     logo?: string
//     description?: string
//     offers_count?: number
//     rating?: number
//     featured?: boolean
//   }
// }

// const TopMerchantsCard = ({ merchant }: TopMerchantsCardProps) => {

//   return (
//     <Link
//       href={`/merchant/${merchant.slug}`}
//       className="group"
//     >
//       <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden relative">
//         {/* Featured Badge */}
//         {merchant.featured && (
//           <div className="absolute top-4 right-4 z-10">
//             <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
//               Featured
//             </span>
//           </div>
//         )}

//         {/* Logo Section */}
//         <div className="relative h-32 bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center p-6">
//           <Image
//             src={merchant.logo || ''}
//             alt={merchant.name || ''}
//             fill
//             className="max-h-16 max-w-24 object-contain group-hover:scale-110 transition-transform duration-300"
//             onError={(e) => {
//               const target = e.target as HTMLImageElement
//               target.src = `https://via.placeholder.com/100x60/8B5CF6/FFFFFF?text=${merchant.name}`
//             }}
//           />
//           <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//         </div>

//         {/* Content */}
//         <div className="p-6">
//           <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
//             {merchant.name}
//           </h3>
//           <p className="text-gray-600 text-sm mb-4 line-clamp-2">
//             {merchant.description}
//           </p>

//           {/* Action Button */}
//           <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 rounded-lg transition-all duration-200 transform group-hover:scale-105">
//             View Offers
//           </button>
//         </div>

//         {/* Hover Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:to-blue-600/5 transition-all duration-300 rounded-2xl pointer-events-none" />
//       </div>
//     </Link>
//   )
// }

// export default TopMerchantsCard