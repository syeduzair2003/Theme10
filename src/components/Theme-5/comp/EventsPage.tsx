import React from 'react'
import Link from 'next/link'
import cookieService from '@/services/CookiesService'
import { apiGetAllEvents } from '@/apis/user'
import { EventResponse } from '@/services/dataTypes'
import { getEventsHref } from '@/constants/hooks'
import Image from 'next/image'

const EventsPage = async () => {
  const companyDomain = (await cookieService.get("domain")).domain
  const events = (await apiGetAllEvents(companyDomain)).data
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent text-center mb-8 md:mb-12">
          Special Events
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {events?.map((event: EventResponse, index: number) => (
            <Link key={index} href={getEventsHref(event, 'slug')}>
              <div className="bg-white rounded-xl md:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
                <div className="h-40 md:h-48 bg-gradient-to-br from-purple-100 to-blue-100 relative flex items-center justify-center">
                  <Image
                    src={`/shared-assets/${event.slug}.png`}
                    alt={event.name}
                    width={100}
                    height={100}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                    }}
                  />
                  <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    View Offers
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{event.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{event.description || 'Special event with amazing offers'}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventsPage