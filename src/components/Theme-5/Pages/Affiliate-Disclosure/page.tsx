import React from 'react'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';
import Header from '../../comp/Header';
import Footer from '../../comp/Footer'
import Link from 'next/link';

const AffiliateDisclosure = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = 'affiliate-disclosure';
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <>
      <Header
        title="Affiliate"
        subtitle="Disclosure"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Affiliate Disclosure' }
        ]}
      />

      {/* Reading Progress Bar - Sits at the top of the content */}
      <div className="sticky top-0 z-30 w-full h-1.5 bg-slate-100 lg:hidden">
        <div className="h-full bg-indigo-600 w-1/3" /> {/* You can animate this width based on scroll */}
      </div>

      <section className="relative py-10 md:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-5 sm:px-8">

          {/* Editorial Meta Info */}
          <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400">Policy Document</span>
              <span className="text-sm font-bold text-slate-900">Transparency Matters</span>
            </div>
          </div>

          {/* Main Content: No clunky boxes, just pure typography */}
          <article className="relative">
            <div
              className="prose prose-slate prose-base md:prose-lg max-w-none 
            prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
            prose-p:text-slate-600 prose-p:leading-relaxed
            prose-strong:text-slate-900 prose-strong:font-extrabold
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-ul:list-disc prose-li:marker:text-indigo-500"
              dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
            />
          </article>

          {/* Mobile-Friendly Callout at the end */}
          <div className="mt-16 p-6 md:p-10 rounded-[2rem] bg-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-bold">Need clarification?</h4>
              <p className="text-slate-400 text-sm">Were happy to explain our affiliate relationships.</p>
            </div>
            <Link href="/contact-us" className="whitespace-nowrap px-8 py-3 bg-indigo-600 hover:bg-indigo-500 rounded-full text-sm font-bold transition-all">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

export default AffiliateDisclosure