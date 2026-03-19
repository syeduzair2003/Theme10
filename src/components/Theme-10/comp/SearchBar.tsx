// "use client"
// import React, { useRef, useState, useEffect } from 'react'
// import { apiGetAllUpdatedKeywords, apiSearchResult } from '@/apis/user'
// import { ellipse, getBaseImageUrl, getCategoryHref, getMerchantHref } from '@/constants/hooks'
// import { MetaKeywordsResponse, SearchCategories, SearchMerchant } from '@/services/dataTypes'
// import { usePathname, useRouter, useSearchParams } from 'next/navigation'
// import Link from 'next/link'
// import Image from "next/image"
// import { Search } from "lucide-react"

// interface Props {
//   companyId: string
//   mer_slug: string
//   slug_type: string
//   cat_slug: string
//   domain: string
// }

// const SearchBar = ({ companyId, mer_slug, slug_type, cat_slug, domain }: Props) => {

//   const [open, setOpen] = useState(false)
//   const [search, setSearch] = useState("")
//   const [tags, setTags] = useState<MetaKeywordsResponse[]>([])
//   const [categories, setCategories] = useState<SearchCategories[]>([])
//   const [merchants, setMerchants] = useState<SearchMerchant[]>([])
//   const inputRef = useRef<HTMLInputElement>(null)
//   const router = useRouter()
//   const pathname = usePathname()

//   /* 🔹 FETCH TAGS */
//   useEffect(() => {
//     apiGetAllUpdatedKeywords(domain).then(res => {
//       if (res?.data) setTags(res.data)
//     })
//   }, [domain])

//   /* 🔹 SEARCH API */
//   useEffect(() => {
//     const timer = setTimeout(async () => {
//       if (search.trim().length < 3) {
//         setCategories([])
//         setMerchants([])
//         return
//       }
//       const res = await apiSearchResult(search, companyId)
//       setCategories(res?.data?.categories || [])
//       setMerchants(res?.data?.merchants || [])
//     }, 500)

//     return () => clearTimeout(timer)
//   }, [search])

//   /* 🔹 CLOSE ON ROUTE CHANGE */
//   useEffect(() => {
//     setOpen(false)
//   }, [pathname])

//   const submitSearch = () => {
//     if (!search.trim()) return
//     router.push(`/search?query=${encodeURIComponent(search.trim())}`)
//     setOpen(false)
//   }

//   return (
//     <div className="relative">

//       {/* 🔍 ICON INPUT */}
//       <button
//         onClick={() => {
//           setOpen(true)
//           setTimeout(() => inputRef.current?.focus(), 100)
//         }}
//         className="flex h-9 w-9 items-center justify-center rounded-full border hover:bg-gray-100"
//       >
//         <Search size={18} />
//       </button>

//       {/* 🔽 SEARCH PANEL */}
//       {open && (
//         <div className="absolute right-0 top-12 z-50 w-[420px] rounded-xl border bg-white shadow-xl">

//           {/* INPUT */}
//           <div className="flex items-center gap-2 border-b px-4 py-3">
//             <Search size={16} className="text-gray-400" />
//             <input
//               ref={inputRef}
//               type="text"
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && submitSearch()}
//               placeholder="Search stores, categories..."
//               className="w-full outline-none text-sm"
//             />
//           </div>

//           {/* TAGS */}
//           {tags.length > 0 && (
//             <div className="p-4 border-b">
//               <p className="text-xs text-gray-400 mb-2">Popular Searches</p>
//               <div className="flex flex-wrap gap-2">
//                 {tags.map((item, i) => (
//                   <Link
//                     key={i}
//                     href={item.merchant
//                       ? getMerchantHref(item.merchant, mer_slug, slug_type)
//                       : `/search?query=${item.keyword}`}
//                     className="rounded-full border px-3 py-1 text-xs hover:bg-gray-100"
//                   >
//                     {item.keyword}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* RESULTS */}
//           <div className="max-h-[300px] overflow-y-auto p-4 space-y-4">

//             {/* STORES */}
//             {merchants.length > 0 && (
//               <div>
//                 <p className="text-xs text-gray-400 mb-2">Stores</p>
//                 <div className="grid grid-cols-3 gap-3">
//                   {merchants.map((item, i) => (
//                     <Link key={i} href={getMerchantHref(item, mer_slug, slug_type)}>
//                       <div className="flex flex-col items-center gap-1 text-center">
//                         <Image
//                           src={getBaseImageUrl(domain, item.merchant_logo, "")}
//                           alt={item.merchant_name}
//                           width={60}
//                           height={40}
//                           className="object-contain"
//                         />
//                         <span className="text-xs">
//                           {ellipse(item.merchant_name, 20)}
//                         </span>
//                       </div>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* CATEGORIES */}
//             {categories.length > 0 && (
//               <div>
//                 <p className="text-xs text-gray-400 mb-2">Categories</p>
//                 <div className="flex flex-wrap gap-2">
//                   {categories.map((item, i) => (
//                     <Link
//                       key={i}
//                       href={getCategoryHref(item, cat_slug, slug_type)}
//                       className="rounded-full border px-3 py-1 text-xs hover:bg-gray-100"
//                     >
//                       {item.name}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {search.length >= 3 && merchants.length === 0 && categories.length === 0 && (
//               <p className="text-sm text-gray-400 text-center">
//                 No results found
//               </p>
//             )}

//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default SearchBar
