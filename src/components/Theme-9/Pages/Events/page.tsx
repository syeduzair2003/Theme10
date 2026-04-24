import cookieService from "@/services/CookiesService";
import React from "react";
import { apiGetAllEvents } from "@/apis/user";
import { EventResponse } from "@/services/dataTypes";
import { getEventsHref } from "@/constants/hooks";
import Link from "next/link";
import Image from "next/image";
import { faChevronRight, faStar } from "@/constants/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EventsPage = async () => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;
  const eventsResponse = await apiGetAllEvents(companyDomain);
  const events = eventsResponse?.data || [];

  return (
    <main className="min-h-screen bg-[#fffde0]">
      {/* Hero/Banner Section */}
      <section className="relative mx-4 md:mx-8 lg:mx-12 mt-12 overflow-hidden rounded-[2.5rem] bg-[#FDFBE7] py-10 md:py-12 shadow-md border border-[#EADDCA]">
        <div className="container mx-auto px-10 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Side Content */}
            <div className="w-full lg:w-[55%] text-center lg:text-left">
              {/* Breadcrumb */}
              <nav className="mb-4 flex justify-center lg:justify-start items-center gap-2 text-[10px] font-black uppercase tracking-[0.15em]">
                <Link
                  href="/"
                  className="text-slate-400 hover:text-[#800000] transition-colors"
                >
                  Home
                </Link>
                <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                <span className="text-[#800000]">Events</span>
              </nav>

              {/* Heading */}
              <h1 className="text-3xl md:text-5xl lg:text-[3.2rem] font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                Our <span className="text-[#800000]">Trending</span> <br />
                Events
              </h1>

              <div className="mt-6 flex items-start gap-4 max-w-lg mx-auto lg:mx-0">
                {/* Vertical Line */}
                <div className="w-[4px] h-10 bg-[#800000] rounded-full shrink-0" />
                <p className="text-slate-600 text-sm md:text-base font-medium leading-relaxed text-left">
                  Discover handpicked premium offers and seasonal events
                  tailored for your lifestyle. Save big with our verified
                  exclusive discounts.
                </p>
              </div>
            </div>

            {/* Right Side Illustration */}
            <div className="w-full lg:w-[40%] flex justify-center lg:justify-end mt-4">
              <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-[#800000]/5 rounded-[3rem] rotate-6 scale-95" />
                <div className="absolute inset-0 bg-[#EADDCA]/30 rounded-[3rem] -rotate-3 transition-transform group-hover:-rotate-6 duration-700 shadow-sm" />

                {/* Main Image Container */}
                <div className="relative z-10 w-[80%] h-[80%] flex items-center justify-center">
                  <Image
                    src="/themes/Theme_3/images/banner-illus-5.png"
                    alt="Trending Events"
                    width={310}
                    height={270}
                    className="object-contain transition-all duration-700 hover:scale-105 drop-shadow-2xl"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Events Listing Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#EADDCA] pb-8">
            <div className="relative">
              <div className="absolute -left-4 top-1 w-1 h-8 bg-[#800000] rounded-full hidden md:block" />

              <h2 className="text-3xl font-black text-[#1A1A1A] tracking-tight uppercase">
                Active <span className="text-[#800000]">Events</span>
              </h2>
              <p className="text-slate-500 mt-2 text-sm font-medium">
                Discover the best offers across all our curated events.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 text-[11px] font-black text-[#800000] bg-[#800000]/5 border border-[#800000]/20 px-5 py-2.5 rounded-full uppercase tracking-widest shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#800000] animate-pulse" />
              Total Events:{" "}
              <span className="text-[#1A1A1A] ml-1">{events?.length}</span>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events?.length > 0 ? (
              events.map((event: EventResponse, index: number) => (
                <Link
                  key={index}
                  href={getEventsHref(event, "slug")}
                  className="group relative bg-[#FDFBE7]/50 backdrop-blur-sm border border-[#EADDCA] rounded-[2rem] p-7 transition-all duration-500 hover:shadow-[0_20px_40px_rgba(128,0,0,0.1)] hover:-translate-y-3 hover:border-[#800000]/30 no-underline overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#800000]/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-[3] duration-700" />

                  <div className="flex flex-col h-full justify-between gap-8 relative z-10">
                    <div className="space-y-4">
                      <div className="w-14 h-14 bg-white border border-[#EADDCA] rounded-2xl flex items-center justify-center text-[#800000] shadow-sm group-hover:bg-[#800000] group-hover:text-white group-hover:border-[#800000] transition-all duration-500 transform group-hover:rotate-[10deg]">
                        <FontAwesomeIcon icon={faStar} className="w-6 h-6" />
                      </div>

                      <h3 className="text-xl font-black text-[#1A1A1A] line-clamp-2 leading-tight group-hover:text-[#800000] transition-colors duration-300">
                        {event?.name}
                      </h3>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex items-center justify-between mt-2 pt-5 border-t border-[#EADDCA]/60">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#800000] animate-pulse" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          Live Offers
                        </span>
                      </div>

                      <div className="bg-[#1A1A1A] text-white w-10 h-10 rounded-xl flex items-center justify-center group-hover:bg-[#800000] group-hover:shadow-[0_5px_15px_rgba(128,0,0,0.3)] transition-all duration-300">
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="w-3 h-3"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-br from-[#800000]/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              ))
            ) : (
              <div className="col-span-full py-24 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FDFBE7] rounded-full mb-4 border border-[#EADDCA]">
                  <div className="w-10 h-10 border-2 border-dashed border-[#800000]/30 rounded-full animate-spin" />
                </div>
                <p className="text-slate-400 text-lg font-medium">
                  No events available right now.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default EventsPage;
