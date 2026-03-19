// import Image from 'next/image'
// import React from 'react'

// const FeaturedDeals = () => {
//   const deals = [
//     {
//       id: 1,
//       store: "Amazon",
//       title: "Up to 50% Off Electronics",
//       description: "Save big on laptops, smartphones, and more",
//       discount: "50% OFF",
//       code: "SAVE50",
//       image: "/api/placeholder/300/200",
//       expires: "2 days left"
//     },
//     {
//       id: 2,
//       store: "Nike",
//       title: "Free Shipping on All Orders",
//       description: "No minimum purchase required",
//       discount: "FREE SHIPPING",
//       code: "FREESHIP",
//       image: "/api/placeholder/300/200",
//       expires: "5 days left"
//     },
//     {
//       id: 3,
//       store: "Target",
//       title: "Buy 2 Get 1 Free",
//       description: "On selected home & garden items",
//       discount: "BUY 2 GET 1",
//       code: "B2G1FREE",
//       image: "/api/placeholder/300/200",
//       expires: "1 week left"
//     }
//   ]

//   return (
//     <section className="py-16 bg-white">
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Deals</h2>
//           <p className="text-xl text-gray-600">Dont miss out on these amazing offers</p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {deals.map((deal) => (
//             <div key={deal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100">
//               <div className="relative">
//                 <Image
//                   src={deal.image}
//                   alt={deal.title}
//                   fill
//                   className="w-full h-48 object-cover"
//                 />
//                 <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
//                   {deal.discount}
//                 </div>
//                 <div className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
//                   {deal.expires}
//                 </div>
//               </div>

//               <div className="p-6">
//                 <div className="flex items-center justify-between mb-3">
//                   <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
//                     {deal.store}
//                   </span>
//                 </div>

//                 <h3 className="text-xl font-bold text-gray-900 mb-2">{deal.title}</h3>
//                 <p className="text-gray-600 mb-4">{deal.description}</p>

//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-2">
//                     <span className="text-sm text-gray-500">Code:</span>
//                     <span className="bg-gray-100 px-3 py-1 rounded text-sm font-mono font-semibold">
//                       {deal.code}
//                     </span>
//                   </div>
//                   <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold">
//                     Get Deal
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center mt-12">
//           <button className="bg-gray-900 text-white px-8 py-3 rounded-full hover:bg-gray-800 transition-colors font-semibold">
//             View All Deals
//           </button>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default FeaturedDeals