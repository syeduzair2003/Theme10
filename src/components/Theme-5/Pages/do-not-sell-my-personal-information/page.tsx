import React from 'react'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import Header from '../../comp/Header';
import Footer from '../../comp/Footer'

const DoNotSell = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = 'do-not-sell-my-personal-information';
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <>
      <Header
        title="Do Not Sell"
        subtitle="My Personal Information"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pageData?.page_name || 'Do Not Sell My Personal Information' }
        ]}
      />

      <section className="py-12 md:py-16 lg:py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl md:rounded-[2.5rem] shadow-sm border border-slate-100 p-6 md:p-10 lg:p-14">
            <div
              className="prose prose-slate prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-indigo-600 prose-a:font-semibold hover:prose-a:text-indigo-700 prose-strong:text-slate-900 prose-ul:text-slate-600 prose-ol:text-slate-600"
              dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default DoNotSell