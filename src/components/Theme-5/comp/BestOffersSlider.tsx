// import React from 'react'
// import { apiGetPopularDeals } from '@/apis/page_optimization'
// import { getLastUpdateDate, splitHeading } from '@/constants/hooks'
// import BestOffersCard from './BestOffersCard'
// import cookieService from '@/services/CookiesService'

// interface BestOffersSliderProps {
//   companyId: string
//   mer_slug_type?: string
//   mer_slug?: string
// }

// const BestOffersSlider = async ({ companyId }: BestOffersSliderProps) => {
//   const response = await apiGetPopularDeals(companyId)
//   const companyDomain = (await cookieService.get("domain")).domain
//   const offers = response?.data?.offers || []
//   const [first, second] = splitHeading(response?.data?.popular_deals_widget?.widget_heading || "Trending Deals")
//   const content = response?.data?.popular_deals_widget?.widget_text

//   if (offers?.length === 0) return null

//   return (
//     <section className="py-20 bg-[#F8FAFC] overflow-hidden">
//       <div className="container mx-auto px-4 mb-10">
//         <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-l-4 border-indigo-600 pl-6">
//           <div>
//             <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
//               {first} <span className="text-indigo-600">{second}</span>
//             </h2>
//             <p className="text-lg text-slate-500 font-medium">
//               {content}
//             </p>
//             <p className="text-sm text-slate-900 font-bold mt-2">
//               This Week's Hottest Deals — Verified on {getLastUpdateDate(1)} by Our Team.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="relative group">
//         <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>
//         <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#F8FAFC] to-transparent z-10 pointer-events-none"></div>

//         {/* Added 'slider-container' class to target it in the CSS below */}
//         <div className="flex py-4 slider-container" style={{
//           width: 'max-content',
//           animation: 'scroll 30s linear infinite'
//         }}>
//           <style dangerouslySetInnerHTML={{
//             __html: `
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(calc(-280px * 8 - 32px * 8)); }
//         }
//         .slider-container:hover {
//           animation-play-state: paused !important;
//         }
//       `
//           }} />

//           {[...offers, ...offers].slice(0, 16).map((item: any, index: number) => (
//             <BestOffersCard key={index} item={item} companyDomain={companyDomain} />
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }

// export default BestOffersSlider
