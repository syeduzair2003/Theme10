// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { apiGetTopCategories } from '@/apis/page_optimization';
// import { getBaseImageUrl } from '@/constants/hooks';
// import FooterNewsletter from './FooterNewsletter';
// import cookieService from '@/services/CookiesService';
// import { apiGetDisclaimer } from '@/apis/user';
// import { faEnvelopeOpen, faMapPin, faPhone, FontAwesomeIcon } from '@/constants/icons';

// interface Props {
//   companyFooterLogo: string | null;
//   company_id: string;
//   socialLinks: {
//     facebook?: string | null;
//     twitter?: string | null;
//     instagram?: string | null;
//     linkedin?: string | null;
//     pinterest?: string | null;
//     youtube?: string | null;
//     flipboard?: string | null;
//     threads?: string | null;
//     tiktok?: string | null;
//     trust_pilot?: string | null;
//   };
//   blog_title?: string;
//   blog_url?: string;
//   companyName: string;
// }

// const FooterTwo = async ({ companyFooterLogo, company_id, socialLinks, blog_title, companyName, blog_url }: Props) => {
//   const topCategoriesResponse = (await apiGetTopCategories(company_id)).data;
//   const companyDomain = await cookieService.get("domain");
//   const disclaimer = (await apiGetDisclaimer(companyDomain.domain)).data;

//   const socialMediaPlatforms = [
//     { key: 'facebook', label: 'Facebook', icon: 'facebook.png' },
//     { key: 'twitter', label: 'Twitter', icon: 'twitter-2.png' },
//     { key: 'pinterest', label: 'Pinterest', icon: 'pinterest.png' },
//     { key: 'youtube', label: 'YouTube', icon: 'youtube.png' },
//     { key: 'linkedin', label: 'LinkedIn', icon: 'linkedin.png' },
//     { key: 'instagram', label: 'Instagram', icon: 'instagram.png' },
//     { key: 'tiktok', label: 'TikTok', icon: 'tiktok.png' },
//   ];

//   return (
//     <footer className="bg-slate-950 text-slate-300 font-sans">
//       <div className="container mx-auto px-6 lg:px-20 pt-16">

//         {/* Top Row: Logo & Socials */}
//         <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800">
//           <Link href="/" className="transition-opacity hover:opacity-80">
//             <Image
//               src={getBaseImageUrl(companyDomain.domain, companyFooterLogo, "/themes/Theme_5/images/logo.png")}
//               height={60}
//               width={180}
//               className="object-contain brightness-0 invert"
//               alt="logo"
//             />
//           </Link>

//           <div className="flex flex-col items-center md:items-end gap-4">
//             <ul className="flex items-center gap-3">
//               {socialMediaPlatforms.map((platform) => {
//                 const link = socialLinks[platform.key as keyof typeof socialLinks];
//                 if (!link) return null;
//                 return (
//                   <li key={platform.key}>
//                     <Link href={link} aria-label={platform.label} target="_blank" rel="nofollow"
//                       className="block p-2 rounded-full bg-slate-900 border border-slate-800 hover:border-indigo-500 hover:bg-indigo-500/10 transition-all">
//                       <Image
//                         src={getBaseImageUrl(companyDomain.domain, `/shared-assets/social/${platform.icon}`, "")}
//                         alt={platform.label}
//                         width={30}
//                         height={30}
//                       />
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//             {socialLinks?.trust_pilot && (
//               <div dangerouslySetInnerHTML={{ __html: socialLinks?.trust_pilot || "" }} />
//             )}
//           </div>
//         </div>

//         {/* Middle Section: Links Grid */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-12 py-16">

//           {/* Categories */}
//           <div className="space-y-6">
//             <h4 className="text-white font-bold uppercase tracking-widest text-xs">Top Categories</h4>
//             <ul className="space-y-3 text-sm">
//               {topCategoriesResponse?.categories?.slice(0, 6).map((item, i) => (
//                 <li key={i}>
//                   <Link href={`/${item?.url}`}>{item.name}</Link></li>
//               ))}
//             </ul>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-6">
//             <h4 className="text-white font-bold uppercase tracking-widest text-xs">Navigation</h4>
//             <ul className="space-y-3 text-sm text-slate-400">
//               <li><Link href="/" className="hover:text-indigo-400">Home</Link></li>
//               <li><Link href="{`/category`}" className="hover:text-indigo-400">All Categories</Link></li>
//               <li><Link href="`{/all-stores/A}`" className="hover:text-indigo-400">Browse Stores</Link></li>
//               {blog_title && blog_url && <li><Link href={blog_url} className="hover:text-indigo-400">{blog_title}</Link></li>}
//               {disclaimer?.footer_pages?.map((item, i) => (
//                 <li key={i}><Link href={`/${item?.slug}`} className="hover:text-indigo-400 capitalize">{item?.page_name}</Link></li>
//               ))}
//             </ul>
//           </div>

//           {/* Newsletter Section */}
//           <div className="col-span-2 md:col-span-2 lg:col-span-2 space-y-6">
//             <h4 className="text-white font-bold uppercase tracking-widest text-xs">Newsletter</h4>
//             <p className="text-sm text-slate-400 max-w-xs leading-relaxed">
//               Subscribe our newsletter to get our latest update & news
//             </p>
//             <FooterNewsletter companyId={company_id} />
//           </div>
//         </div>

//         {/* Contacts & Info */}
//         {disclaimer?.CompanyContactUs?.phone_no || disclaimer?.CompanyContactUs?.email || disclaimer?.CompanyContactUs?.address && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-slate-900">
//             {[
//               { icon: faPhone, val: disclaimer.CompanyContactUs.phone_no },
//               { icon: faEnvelopeOpen, val: disclaimer.CompanyContactUs.email },
//               { icon: faMapPin, val: disclaimer.CompanyContactUs.address }
//             ].map((item, idx) => item.val && (
//               <div key={idx} className="flex items-center gap-4 text-sm text-slate-500">
//                 <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center border border-slate-800">
//                   <FontAwesomeIcon icon={item.icon} className="text-indigo-500 w-3 h-3" />
//                 </div>
//                 <span className="truncate">{item.val}</span>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Bottom Bar: Copyright & Disclaimer */}
//         <div className="border-t border-slate-900 py-10">
//           <div className="flex flex-col gap-6 text-center md:text-left">
//             <div className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
//               © {new Date().getFullYear()} {companyDomain.domain === 'gettopdiscounts.com' ? (
//                 <span>GetTopDiscounts LLC — A U.S.-registered company.</span>
//               ) : (
//                 <span>{companyName} All rights reserved.</span>
//               )}
//             </div>

//             {disclaimer?.disclaimer?.disclaimer && (
//               <div
//                 className="text-[11px] leading-relaxed text-slate-600 border-l-2 border-slate-800 pl-4 italic"
//                 dangerouslySetInnerHTML={{ __html: disclaimer.disclaimer.disclaimer }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default FooterTwo;