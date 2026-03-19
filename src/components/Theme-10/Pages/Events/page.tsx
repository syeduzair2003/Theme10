import cookieService from '@/services/CookiesService';
import React from 'react'
import { apiGetAllEvents } from '@/apis/user';
import { EventResponse } from '@/services/dataTypes';
import { getEventsHref } from '@/constants/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { faChevronRight, faStar } from '@/constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EventsPage = async () => {
    const domainData = await cookieService.get("domain");
    const companyDomain = domainData?.domain;
    const eventsResponse = await apiGetAllEvents(companyDomain);
    const events = eventsResponse?.data || [];

    return (
        <main className="min-h-screen bg-gray-50/50">
            {/* --- Hero / Banner Section --- */}
            <section className="relative mx-4 md:mx-8 lg:mx-12 mt-6 overflow-hidden rounded-3xl bg-slate-900 py-12 md:py-20 shadow-2xl">
                {/* Background Pattern Decors */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full" />
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                        {/* Left Side: Content */}
                        <div className="w-full lg:w-1/2 text-center lg:text-left">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                Our <span className="text-blue-400">Trending</span> Events
                            </h1>
                            
                            {/* Breadcrumb */}
                            <nav className="mt-6 flex justify-center lg:justify-start items-center gap-3 text-sm font-medium">
                                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                                    Home
                                </Link>
                                <FontAwesomeIcon icon={faChevronRight} className="text-[10px] text-gray-600" />
                                <span className="text-blue-400">Events</span>
                            </nav>
                        </div>

                        {/* Right Side: Illustration */}
                        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-blue-500/10 blur-2xl group-hover:bg-blue-500/20 transition-all duration-500" />
                                <Image 
                                    src="/themes/Theme_3/images/banner-illus-5.png" 
                                    alt="Trending Events" 
                                    width={400} 
                                    height={350} 
                                    className="relative object-contain transform hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Events Listing Section --- */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6">
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-200 pb-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Active Events</h2>
                            <p className="text-gray-500 mt-2">Discover the best offers across all our curated events.</p>
                        </div>
                        <div className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full">
                            Total Events: {events?.length}
                        </div>
                    </div>

                    {/* Grid Layout */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {events?.length > 0 ? (
                            events.map((event: EventResponse, index: number) => (
                                <Link 
                                    key={index} 
                                    href={getEventsHref(event, 'slug')}
                                    className="group relative bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-100 no-underline"
                                >
                                    <div className="flex flex-col h-full justify-between gap-6">
                                        <div className="space-y-3">
                                            {/* Icon/Decoration */}
                                            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 shadow-sm">
                                                <FontAwesomeIcon icon={faStar} className="w-5 h-5" />
                                            </div>
                                            
                                            <h3 className="text-xl font-bold text-gray-800 line-clamp-2 leading-snug">
                                                {event?.name}
                                            </h3>
                                        </div>

                                        {/* View Button (Mockup style) */}
                                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
                                            <div className="flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Live Offers</span>
                                            </div>
                                            <div className="bg-gray-900 text-white p-2 rounded-lg group-hover:bg-blue-600 transition-colors">
                                                <FontAwesomeIcon icon={faChevronRight} className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* Subtle Gradient Hover Overlay */}
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full py-20 text-center">
                                <p className="text-gray-400 text-lg">No events available right now.</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}

export default EventsPage