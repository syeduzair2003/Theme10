import React from 'react'
import Link from 'next/link'
import cookieService from '@/services/CookiesService'
import { apiGetAllEvents, apiCompanyUpdatedData } from '@/apis/user'
import { EventResponse } from '@/services/dataTypes'
import { getEventsHref } from '@/constants/hooks'
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'

const EventsPage = async () => {
  const companyDomain = await cookieService.get("domain")
  const response = (await apiCompanyUpdatedData(companyDomain)).data
  const events = (await apiGetAllEvents(companyDomain.domain)).data

  return (
    <>
      <Header
        title="Our Trending"
        subtitle="Events"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events' }
        ]}
      />

      {/* Events Grid Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          {events?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map((event: EventResponse, index: number) => (
                <Link
                  key={index}
                  href={getEventsHref(event, 'slug')}
                  className="group relative bg-white rounded-xl p-8 border border-slate-200 hover:border-indigo-600 transition-all duration-300 shadow-md hover:shadow-[0_35px_60px_-15px_rgba(79,70,229,0.2)]"
                >
                  <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                    {event?.name}
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-indigo-600 transition-colors">
                      View Offers
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border-2 border-dashed border-slate-100 rounded-3xl">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 12H4" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium">No active events found.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  )
}

export default EventsPage