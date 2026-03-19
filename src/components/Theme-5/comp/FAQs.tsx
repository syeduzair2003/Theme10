import React from 'react';
import { apiHomePageFaqs } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import FAQList from './FAQList';


interface FAQsProps {
  companyId?: string;
}

const FAQs = async ({ companyId }: FAQsProps) => {
  if (!companyId) return null;

  const companyDomain = (await cookieService.get("domain")).domain;
  const response = await apiHomePageFaqs(companyDomain);
  const faqs = response?.data || [];

  if (!faqs.length) return null;

  return (
    <section className="py-24 bg-[#F8FAFC] relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-indigo-50/50 blur-3xl rounded-full pointer-events-none opacity-60" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Centered Header */}
        <div className="mb-12 border-l-4 border-indigo-600 pl-6">
          <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-6">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>

          <p className="text-lg font-medium text-slate-500 leading-relaxed">
            Find quick answers to common questions about our deals, coupons, and savings platform.
          </p>
        </div>

        {/* Grid Layout */}
        <FAQList faqs={faqs} />
      </div>
    </section>
  );
};

export default FAQs;