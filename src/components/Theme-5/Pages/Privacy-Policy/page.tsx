import React from 'react'
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import cookieService from '@/services/CookiesService'
import { apiFooterPagesData } from '@/apis/user'

const PrivacyPolicy = async () => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;
  const SLUG = 'privacy-policy';
  const pageResponse = await apiFooterPagesData(companyDomain, SLUG);
  const pageData = pageResponse?.data;

  return (
    <div className="bg-white">
      <Header
        title={pageData?.page_name || "Privacy Policy"}
        subtitle="Last Updated: February 2026"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pageData?.page_name || 'Privacy Policy' }
        ]}
      />
      
      {/* Editorial Layout Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        {/* Subtle Decorative Element for Desktop */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />

        <div className="max-w-3xl mx-auto px-5 sm:px-8">
          {/* Main Content: Optimized Typography */}
          <article className="relative">
            <div
              className="prose prose-slate prose-lg max-w-none 
                prose-headings:text-slate-900 prose-headings:font-black prose-headings:tracking-tight
                prose-p:text-slate-600 prose-p:leading-relaxed
                prose-li:text-slate-600
                prose-strong:text-slate-900 prose-strong:font-bold
                prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
                selection:bg-indigo-100 selection:text-indigo-900"
              dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
            />
          </article>

          {/* Contact Support Section */}
          <div className="mt-20 p-8 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div>
              <h4 className="text-lg font-bold text-slate-900">Have questions?</h4>
              <p className="text-sm text-slate-500">Our legal team is here to clarify our terms.</p>
            </div>
            <button className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-full hover:bg-indigo-600 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  )
}

export default PrivacyPolicy