import { apiGetAllEvents } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react';
import BreadcrumbSection from '../../comp/BreadcrumbSection';
import { getEventsHref } from '@/constants/hooks';
import Link from 'next/link';

const page = async () => {

    const companyDomain = (await cookieService.get("domain")).domain;
    const events = (await apiGetAllEvents(companyDomain)).data;

    return (
      <>
        <BreadcrumbSection 
            title="Events" 
            breadcrumbs={[
                { label: "Home", href: "/" }, 
                { label: "Events", href: "/events" }
            ]} 
        />

        <section className="py-16 md:py-24 px-4 overflow-hidden relative">
                        <div className="absolute top-40 right-0 w-96 h-96 bg-[#8bc94a]/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
                        <div className="absolute bottom-20 left-0 w-72 h-72 bg-[#ff912f]/5 rounded-full blur-3xl -z-10"></div>
        
                        <div className="container mx-auto max-w-7xl">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                {events?.length > 0 ? (
                                    events?.map((event: any, index: number) => (
                                        <Link 
                                            key={index} 
                                            href={getEventsHref(event, "slug")} 
                                            className="group relative"
                                        >
                                            <div className="h-full bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-8 flex flex-col items-center justify-between text-center transition-all duration-500 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 group-hover:border-[#8bc94a]/30 overflow-hidden">
                                                
                                                {/* Corner Accent */}
                                                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-[#8bc94a]/10 to-transparent rounded-bl-3xl transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:-translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
                                                
                                                <div className="mb-8 relative">
                                                    <h3 className="text-xl md:text-2xl font-bold text-gray-800 leading-tight group-hover:text-[#8bc94a] transition-colors duration-300">
                                                        {event?.name}
                                                    </h3>
                                                </div>
        
                                                <div className="flex items-center gap-2 py-2 px-4 rounded-full bg-gray-50 text-gray-400 group-hover:bg-[#ff912f]/10 group-hover:text-[#ff912f] transition-all duration-300 text-sm font-semibold">
                                                    <span>View Offers</span>
                                                    <svg 
                                                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                                                        fill="none" 
                                                        stroke="currentColor" 
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </div>
                                                
                                                {/* Bottom Accent Line Decoration */}
                                                <div className="absolute bottom-0 left-0 w-0 h-1 bg-[#8bc94a] group-hover:w-full transition-all duration-700"></div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                                            <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 00-2 2H6a2 2 0 00-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                            </svg>
                                        </div>
                                        <h3 className="text-xl font-medium text-gray-500">No promotions found</h3>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                    </>
    )
}

export default page