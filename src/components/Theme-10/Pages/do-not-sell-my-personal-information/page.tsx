import { apiFooterPagesData } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import React from "react";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import Image from "next/image";
import Link from "next/link";

const PrivacyPage = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const SLUG = "do-not-sell-my-personal-information";
  const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

  return (
    <main className="min-h-screen bg-[#fffde0]">
      {/* Header / Banner Section */}
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
                <nav className="flex items-center justify-center lg:justify-start gap-3 text-[11px] font-black uppercase tracking-[0.2em] pt-8">
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
                  Do Not Share
                  <br />{" "}
                  <span className="text-[#800000]">My Personal Info</span>
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
                  alt="Security"
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
      <section className="px-6 pb-32 bg-[#FEF9E7]/50">
        {" "}
        <div className="max-w-4xl mx-auto">
          {/* Content Container */}
          <div className="relative bg-white rounded-[2.5rem] border border-[#EADDCA] p-8 md:p-16 shadow-2xl shadow-[#800000]/5">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 lg:left-16 lg:translate-x-0 w-14 h-14 bg-[#800000] rounded-2xl shadow-xl shadow-[#800000]/20 flex items-center justify-center text-[#D1C7A7]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
                />
              </svg>
            </div>

            <article
              className="prose prose-slate lg:prose-lg max-w-none 
                   prose-headings:text-[#1A1A1A] prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight
                   prose-p:text-slate-600 prose-p:leading-relaxed
                   prose-strong:text-[#800000] prose-a:text-[#800000] 
                   prose-a:no-underline hover:prose-a:underline
                   prose-ul:list-disc prose-li:marker:text-[#800000]"
              dangerouslySetInnerHTML={{
                __html: pageData?.page_description || "Content not available.",
              }}
            />
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-slate-400 text-[11px] font-bold uppercase tracking-widest">
            Protecting your personal data is our top priority. Need help?{" "}
            <Link
              href="/contact-us"
              className="text-[#800000] hover:text-[#a00000] transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
