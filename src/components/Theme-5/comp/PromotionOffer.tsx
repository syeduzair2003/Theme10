// import { apiGetPromotionOffers, apiGetSubPromotion } from '@/apis/page_optimization'
// import { apiCompanyUpdatedData } from '@/apis/user'
// import { cleanHtmlContent, extractFirstSentences, getBaseImageUrl, getMerchantHref, getPromotionHref } from '@/constants/hooks'
// import cookieService from '@/services/CookiesService'
// import { MerchantWithOffers, Offer, SubPromotion } from '@/services/dataTypes'
// import Link from 'next/link'
// import React from 'react'
// import { stripHtml } from 'string-strip-html'
// import MerchantDetailsShort from './MerchantDetailsShort'
// import MerchantDetailsFull from './MerchantDetailsFull'
// import CouponCard from './CouponCard'
// import SidebarRoundMerchantCard from './SidebarRoundMerchantCard'
// import Image from 'next/image'

// type MerchantOfferItem = {
//     offer: Offer
//     merchant: MerchantWithOffers
// } 

// const PromotionOffer = async ({ params }: { params: string }) => {
//     const slug = params
//     const companyDomain = await cookieService.get("domain")
//     const response = await apiCompanyUpdatedData(companyDomain)
//     const companyData = response?.data

//     const [promotion, subPromotions] = await Promise.all([
//         apiGetPromotionOffers(companyData?.unique_id, slug).then(res => res.data),
//         apiGetSubPromotion(companyData?.unique_id, slug).then(res => res.data),
//     ])

//     const allOffers: MerchantOfferItem[] =
//         promotion?.merchants?.flatMap((merchant) =>
//             (merchant?.offers || []).map((offer) => ({
//                 offer,
//                 merchant,
//             }))
//         ) || []

//     const cleanDesc = cleanHtmlContent(promotion?.promotion?.description || '')
//     const plainDesc = stripHtml(cleanDesc).result
//     const shortDesc = extractFirstSentences(plainDesc)
//     const showFullDetailsSection = plainDesc.length > (shortDesc.length + 5)

//     return (
//         <>
//             <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-12 rounded-3xl mx-4 mt-4">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
//                         <Link href="/" className="text-gray-700 hover:text-purple-600">Home</Link>
//                         <span className="text-gray-400">/</span>
//                         <Link href={`/${companyData?.promotion_slug}`} className="text-gray-700 hover:text-purple-600 capitalize">Promotions</Link>
//                         <span className="text-gray-400">/</span>
//                         <span className="text-gray-900 capitalize">{promotion?.promotion?.name}</span>
//                     </nav>
//                     <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
//                         {promotion?.promotion?.name}
//                     </h1>
//                     {promotion?.promotion?.description && (
//                         <div className="mb-6">
//                             <MerchantDetailsShort details={promotion?.promotion?.description} />
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <section className="py-12">
//                 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                     {subPromotions && subPromotions.length > 0 && (
//                         <div className="mb-16">
//                             <h2 className="text-3xl font-bold text-gray-900 mb-8">
//                                 Suggested {promotion?.promotion?.name} by Categories
//                             </h2>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                                 {subPromotions.map((item: SubPromotion, index: number) => (
//                                     <Link
//                                         key={index}
//                                         href={getPromotionHref(item, companyData?.promotion_slug)}
//                                         className="group block"
//                                     >
//                                         <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
//                                             <Image
//                                                 src={getBaseImageUrl(companyDomain?.domain, item?.category_image, "")}
//                                                 alt={item?.category_name}
//                                                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                                                 height={250}
//                                                 width={400}
//                                             />
//                                             <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
//                                                 <span className="text-white text-2xl font-bold text-center px-4">
//                                                     {item?.category_detail || item?.category_name}
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <h3 className="text-xl font-bold text-gray-900 mt-4 text-center group-hover:text-purple-600 transition-colors">
//                                             {item?.category_name}
//                                         </h3>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     )}

//                     <div className="mb-16">
//                         <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Rated Deals</h2>
//                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                             {allOffers?.map((item, index) => (
//                                 <CouponCard
//                                     key={index}
//                                     product={item?.offer}
//                                     merchantHref={getMerchantHref(
//                                         item.merchant,
//                                         companyData?.store_slug,
//                                         companyData?.slug_type
//                                     )}
//                                     domain={companyDomain.domain}
//                                     merchant_name={item.merchant?.merchant_name}
//                                     merchant_logo={item.merchant?.merchant_logo}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     <div className="mb-16">
//                         <h2 className="text-3xl font-bold text-gray-900 mb-8">
//                             Top Rated Merchants in {promotion?.promotion?.name}
//                         </h2>
//                         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
//                             {allOffers?.map((item, index) => (
//                                 <SidebarRoundMerchantCard
//                                     key={index}
//                                     merSlug={companyData?.store_slug}
//                                     slugType={companyData?.slug_type}
//                                     merchant={item?.merchant}
//                                 />
//                             ))}
//                         </div>
//                     </div>

//                     {showFullDetailsSection && (
//                         <div className="bg-gray-50 rounded-2xl p-8">
//                             <MerchantDetailsFull details={promotion?.promotion?.description} />
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </>
//     )
// }

// export default PromotionOffer