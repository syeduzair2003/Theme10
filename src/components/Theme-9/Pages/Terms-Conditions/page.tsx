import React from "react";
import Image from "next/image";
import Link from "next/link";
import cookieService from "@/services/CookiesService";
import { apiFooterPagesData } from "@/apis/user";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";

const TermsConditions = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = "terms-of-services";
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <main className="min-h-screen bg-[#fffde0]">
      {/* Banner Section */}
      <section className="relative mx-4 md:mx-10 mt-6 mb-12 overflow-hidden rounded-[2.5rem] bg-[#FDFBE7] border border-[#EADDCA]">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#800000]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EADDCA]/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="absolute bottom-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#800000] via-[#a00000] to-[#800000] z-20" />

        <div className="max-w-7xl mx-auto px-8 py-12 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
              <div className="space-y-4">
                {/* Breadcrumb */}
                <nav className="flex items-center justify-center lg:justify-start gap-3 text-[11px] font-black uppercase tracking-[0.2em]">
                  <Link
                    href="/"
                    className="no-underline text-slate-400 hover:text-[#800000] transition-colors"
                  >
                    Home
                  </Link>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                  <span className="text-[#800000] uppercase tracking-[0.15em]">
                    {pageData?.page_name}
                  </span>
                </nav>

                {/* Heading */}
                <h1 className="text-4xl md:text-5xl font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Terms Of <span className="text-[#800000]">Services</span>
                </h1>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="hidden order-1 lg:order-2 lg:flex justify-end relative group translate-y-6 scale-90">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#800000]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-dashed border-[#EADDCA]/40 rounded-full" />

              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#800000]/5 rounded-full blur-3xl group-hover:bg-[#800000]/15 transition-all duration-700" />

              {/* Main Image Container */}
              <div className="relative transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-2">
                <Image
                  src="/themes/Theme_3/images/banner-illus-15.png"
                  alt="Terms of Service"
                  width={320}
                  height={280}
                  className="object-contain drop-shadow-[0_15px_35px_rgba(128,0,0,0.1)] group-hover:drop-shadow-[0_25px_50px_rgba(128,0,0,0.2)] transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 bg-[#800000]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EADDCA]/30 rounded-full blur-[100px]" />
      </section>

      {/* Content Section */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[2.5rem] border border-[#EADDCA] shadow-2xl shadow-[#800000]/5 overflow-hidden">
          <div className="h-2 w-full bg-[#800000]" />

          <div className="p-8 md:p-16 lg:p-20">
            <article
              className="prose prose-slate lg:prose-lg max-w-none 
                   prose-headings:text-[#1A1A1A] prose-headings:font-black prose-headings:tracking-tight
                   prose-p:text-slate-600 prose-p:leading-relaxed prose-p:mb-6
                   prose-strong:text-[#800000] prose-strong:font-bold
                   prose-li:text-slate-600 prose-li:marker:text-[#800000]
                   prose-a:text-[#800000] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-[2rem] prose-img:shadow-2xl
                   prose-hr:border-[#EADDCA]"
              dangerouslySetInnerHTML={{
                __html: pageData?.page_description || "Content not available.",
              }}
            />
          </div>

          <div className="px-8 py-6 bg-[#FEF9E7]/30 border-t border-[#EADDCA] text-center">
            <p className="text-slate-400 text-sm italic">
              By continuing to use our services, you agree to the terms
              mentioned above.
            </p>
          </div>
        </div>

        {/* Bottom Support Callout */}
        <div className="mt-12 text-center space-y-3">
          <p className="text-slate-500 font-medium">
            Have questions about our terms?
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center text-[#800000] font-bold hover:gap-2 transition-all group no-underline"
          >
            Contact Legal Support
            <span className="ml-1 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default TermsConditions;
