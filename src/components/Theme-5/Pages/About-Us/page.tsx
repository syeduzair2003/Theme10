import React from 'react'
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import cookieService from '@/services/CookiesService'
import { apiFooterPagesData } from '@/apis/user'

const AboutUs = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = 'about-us';
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <div className="bg-white">
      <Header
        title={pageData?.page_name || "About Us"}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pageData?.page_name || 'About Us' }
        ]}
      />

      {/* Main Content Section */}
      <section className="relative py-12 md:py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent" />

        <div className="max-w-4xl mx-auto px-5 sm:px-8">
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
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default AboutUs