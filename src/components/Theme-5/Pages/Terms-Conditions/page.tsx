import React from 'react'
import Footer from '../../comp/Footer'
import Header from '../../comp/Header'
import cookieService from '@/services/CookiesService'
import { apiFooterPagesData } from '@/apis/user'

const TermsConditions = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = 'terms-of-services';
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <>
      <Header
        title={pageData?.page_name || "Terms & Conditions"}
        subtitle=""
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: pageData?.page_name || 'Terms & Conditions' }
        ]}
      />
      
      <section className="py-20 bg-[#FBFDFF] min-h-screen -mt-10 relative z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(15,23,42,0.03)] border border-slate-50 p-10 md:p-14">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  )
}

export default TermsConditions
