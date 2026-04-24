import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import CatPage from "@/components/Theme-9/comp/CatPage";
import cookieService from "@/services/CookiesService";
import { apiCompanyUpdatedData } from "@/apis/user";
import CategoryPageSchema from "@/components/shared/SchemaScripts/CategoryPageSchema";

const page = async () => {
  const companyDomain = await cookieService.get("domain");
  const response = (await apiCompanyUpdatedData(companyDomain)).data;

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
  };

  return (
    <main className="min-h-screen bg-[#fffde0]">
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-[#fffde0] pt-24 pb-10 mt-8 rounded-b-[5rem] shadow-[0_30px_70px_rgba(128,0,0,0.04)]">
        {/* Animated Background Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#800000]/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[#800000]/5 blur-[120px] rounded-full" />

        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            {/* Minimal Breadcrumb */}
            <nav className="flex items-center space-x-4 text-[10px] md:text-[11px] font-black tracking-[0.4em] mb-5 text-[#1A1A1A]/40 uppercase">
              <Link
                href="/"
                className="hover:text-[#800000] transition-colors no-underline"
              >
                Home
              </Link>
              <span className="w-1.5 h-1.5 rounded-full bg-[#800000]" />
              <span className="text-[#800000]">Categories</span>
            </nav>

            {/* Main Centered Heading */}
            <h1 className="text-5xl md:text-7xl lg:text-7xl font-black text-[#1A1A1A] leading-[1] tracking-tighter mb-8">
              Explore Our <br />
              <span className="text-[#800000] relative italic px-4">
                Top-Rated
              </span>
              <br /> Categories
            </h1>

            {/* Description with Max Width */}
            <p className="text-[#1A1A1A]/60 text-base md:text-xl max-w-2xl font-medium leading-relaxed mb-0">
              Discover exclusive deals and premium brands curated just for you.{" "}
              <br className="hidden md:block" />
              Your journey to the best discounts starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <CatPage company_id={response?.unique_id} />
      </div>

      <CategoryPageSchema
        company_name={response?.company_name}
        company_logo={response?.company_logo}
        socialLinks={socialLinks}
        company_id={response?.unique_id}
      />
    </main>
  );
};

export default page;
