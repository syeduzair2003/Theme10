import React from "react";
import { apiHomePageFaqs } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import FaqListClient from "./FaqListClient"; // Import naya component

interface Props {
  slug_type: string;
  store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const faqs = (await apiHomePageFaqs(companyDomain)).data;

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="bg-[#fffde0] py-16 px-6">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16 flex flex-col items-start">
          <span className="bg-[#800000]/5 backdrop-blur-md text-[#800000] px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.35em] border border-[#800000]/20 shadow-[0_5px_15px_rgba(128,0,0,0.05)] hover:bg-[#8f4848] hover:text-white transition-all duration-500 cursor-default inline-block">
            Support Center
          </span>

          <div className="w-full text-center mt-6">
            <h2 className="text-5xl md:text-6xl font-black text-[#1A1A1A] tracking-tighter leading-[1.1] max-w-3xl mx-auto">
              Everything you <br />
              <span className="text-[#800000] drop-shadow-[0_0_10px_rgba(128,0,0,0.4)] brightness-125">
                need to know.
              </span>
            </h2>
          </div>
        </div>

        {/* Dynamic Faq List */}
        <FaqListClient faqs={faqs} />
      </div>
    </section>
  );
};

export default HomepageFAQs;
