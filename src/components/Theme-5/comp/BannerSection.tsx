import React from 'react'
import { getBaseImageUrl } from '@/constants/hooks'
import Image from 'next/image'

interface BannerSectionProps {
  companyDomain: string
  title?: string
  subtitle?: string
  bannerImage?: string
  ctaText?: string
  ctaLink?: string
}

const BannerSection = ({ 
  companyDomain, 
  title = "Discover Amazing Deals", 
  subtitle = "Hand-picked offers from top brands worldwide",
  bannerImage = "/shared-assets/BANNER.png",
  ctaText = "Shop Now",
  ctaLink = "#"
}: BannerSectionProps) => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-indigo-50 via-white to-violet-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Content Side */}
          <div className="lg:w-1/2 space-y-8">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-[2px] bg-indigo-600"></div>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-600">
                  Premium Collection
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                {title.split(' ').map((word, index) => 
                  index === title.split(' ').length - 1 ? (
                    <span key={index} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                      {word}
                    </span>
                  ) : word + ' '
                )}
              </h1>
              
              <p className="text-xl text-slate-500 font-medium leading-relaxed max-w-lg">
                {subtitle}
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex items-center gap-6">
              <a
                href={ctaLink}
                className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-indigo-200 hover:-translate-y-1"
              >
                {ctaText}
              </a>
              
              {/* Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">1000+</div>
                  <div className="text-slate-500 font-medium">Deals</div>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">50+</div>
                  <div className="text-slate-500 font-medium">Brands</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Side */}
          <div className="lg:w-1/2 relative">
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-100 border-8 border-white">
              <Image
                src={getBaseImageUrl(companyDomain, bannerImage, "/api/placeholder/600/450")}
                alt="Banner"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-bold text-slate-900">Live Deals</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-indigo-400 to-violet-400 rounded-full opacity-20 blur-xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-violet-400 to-pink-400 rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-indigo-600 rounded-full"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-violet-600 rounded-full"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-violet-600 rounded-full"></div>
      </div>
    </section>
  )
}

export default BannerSection