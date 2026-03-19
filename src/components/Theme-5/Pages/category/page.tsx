import React from 'react'
import Link from 'next/link'
import cookieService from '@/services/CookiesService'
import { apiCompanyUpdatedData } from '@/apis/user'
import { apiGetMerchants } from '@/apis/merchant'
import CategoryPageLayout from '../../comp/CategoryPageLayout'
import CategoryPageSchema from '@/components/shared/SchemaScripts/CategoryPageSchema'
import Footer from '../../comp/Footer'

const page = async () => {
  const companyDomain = await cookieService.get("domain")
  const response = (await apiCompanyUpdatedData(companyDomain)).data
  const trendingMerchants = (await apiGetMerchants(response?.unique_id || '')).data

  const socialLinks = {
    facebook: response?.facebook,
    twitter: response?.twitter,
    instagram: response?.instagram,
    linkedin: response?.linkedin,
    pinterest: response?.pinterest,
    youtube: response?.youtube,
    flipboard: response?.flipboard,
    tiktok: response?.tiktok,
    threads: response?.threads,
  }

  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-slate-900">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-3/5 space-y-6 text-center lg:text-left">
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-[1.05]">
                Our Popular <span className="text-indigo-400">Categories</span>
              </h1>
              <nav className="inline-flex items-center px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-slate-400 backdrop-blur-md">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span className="mx-3 opacity-30">/</span>
                <span className="text-indigo-400">Categories</span>
              </nav>
            </div>
          </div>
        </div>
      </section>

      {/* Main Directory Section */}
      <div className="py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="w-full">
            <CategoryPageLayout company_id={response?.unique_id || ''} />
          </div>
        </div>
      </div>

      <Footer />

      <CategoryPageSchema
        company_name={response?.company_name}
        company_logo={response?.company_logo}
        socialLinks={socialLinks}
        company_id={response?.unique_id || ''}
      />
    </>
  )
}

export default page