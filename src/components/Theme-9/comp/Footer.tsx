import React from "react";
import Link from "next/link";
import Image from "next/image";
import { apiGetTopCategories } from "@/apis/page_optimization";
import { getBaseImageUrl } from "@/constants/hooks";
import FooterNewsletter from "./FooterNewsletter";
import cookieService from "@/services/CookiesService";
import BackToTopButton from "./BackToTopButton";
import { apiGetDisclaimer } from "@/apis/user";
import {
  faEnvelopeOpen,
  faMapPin,
  faPhone,
  FontAwesomeIcon,
} from "@/constants/icons";

interface Props {
  companyFooterLogo: string | null;
  company_id: string;
  socialLinks: {
    facebook?: string | null;
    twitter?: string | null;
    instagram?: string | null;
    linkedin?: string | null;
    pinterest?: string | null;
    youtube?: string | null;
    flipboard?: string | null;
    threads?: string | null;
    tiktok?: string | null;
    trust_pilot?: string | null;
  };
  blog_title?: string;
  blog_url?: string;
  companyName: string;
}

const Footer = async ({
  companyFooterLogo,
  company_id,
  socialLinks,
  blog_title,
  companyName,
  blog_url,
}: Props) => {
  const topCategoriesResponse = (await apiGetTopCategories(company_id)).data;
  const companyDomain = await cookieService.get("domain");
  const disclaimer = (await apiGetDisclaimer(companyDomain.domain)).data;

  const socialMediaPlatforms = [
    { key: "facebook", label: "Facebook", icon: "facebook.png" },
    { key: "twitter", label: "Twitter", icon: "twitter-2.png" },
    { key: "pinterest", label: "Pinterest", icon: "pinterest.png" },
    { key: "youtube", label: "YouTube", icon: "youtube.png" },
    { key: "linkedin", label: "LinkedIn", icon: "linkedin.png" },
    { key: "instagram", label: "Instagram", icon: "instagram.png" },
    { key: "tiktok", label: "TikTok", icon: "tiktok.png" },
  ];

  return (
    <footer className="relative bg-[#800000] text-slate-300 pt-20 pb-10 overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FFFDF5]/40 via-[#FFFDF5] to-transparent opacity-100 shadow-[0_0_20px_rgba(255,253,245,0.4),0_1px_10px_rgba(0,0,0,0.5)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Upper Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          <div className="lg:col-span-4 space-y-8">
            <Link
              href="/"
              className="inline-block bg-white p-3 rounded-2xl shadow-xl shadow-blue-500/10 transition-transform hover:scale-105"
            >
              <Image
                src={getBaseImageUrl(
                  companyDomain.domain,
                  companyFooterLogo,
                  "/themes/Theme_3/images/logo.png",
                )}
                height={50}
                width={160}
                className="h-10 w-auto object-contain"
                alt="logo"
              />
            </Link>
            <p className="text-slate-400 leading-relaxed text-sm max-w-sm">
              Connecting you to the best deals and premium savings across your
              favorite global brands. Shopping made smarter.
            </p>
            <div className="flex flex-wrap gap-3">
              {socialMediaPlatforms?.map((platform) => {
                const link =
                  socialLinks[platform.key as keyof typeof socialLinks];
                if (!link) return null;
                return (
                  <Link
                    key={platform.key}
                    href={link}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-black/40 border border-[#FFFDF5]/20 text-[#FFFDF5]/70 hover:text-[#FFFDF5] hover:border-[#FFFDF5]/60 hover:bg-black/60 transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.4)] hover:shadow-[0_0_20px_rgba(255,253,245,0.15)] active:scale-95 group backdrop-blur-sm"
                    target="_blank"
                  >
                    <Image
                      src={getBaseImageUrl(
                        companyDomain.domain,
                        `/shared-assets/social/${platform.icon}`,
                        "",
                      )}
                      alt={platform.label}
                      width={18}
                      height={18}
                      className="opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="bg-gradient-to-br from-[#0a0a0a] to-[#000000] border border-[#FFFDF5]/5 rounded-tr-[3rem] rounded-bl-[3rem] p-8 md:p-10 relative overflow-hidden group hover:border-[#FFFDF5]/20 transition-all duration-700 shadow-[0_30px_60px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_70px_rgba(255,253,245,0.08)] active:scale-[0.99]">
              <div className="absolute top-0 right-0 p-4 opacity-5 translate-x-4 -translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-700">
                <FontAwesomeIcon
                  icon={faEnvelopeOpen}
                  className="text-9xl text-white"
                />
              </div>
              <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Join the Elite Club
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Get exclusive early access to flash sales and hidden coupons
                    directly in your inbox.
                  </p>
                </div>
                <FooterNewsletter companyId={company_id} />
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 border-t border-[#FFFDF5]/10 pt-16 pb-2">
          {/* 1. Trending Categories */}
          <div className="group/card p-6 rounded-2xl border border-[#FFFDF5]/5 bg-black/70 hover:border-[#FFFDF5]/20 hover:bg-black/60 transition-all duration-700 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <h4 className="text-[#FFFDF5] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-8 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF5] shadow-[0_0_10px_#FFFDF5]"></span>
              Trending Categories
            </h4>
            <ul className="space-y-4">
              {topCategoriesResponse?.categories
                ?.slice(0, 6)
                .map((item: any, i: number) => (
                  <li key={i} className="group/link">
                    <Link
                      href={`/${item?.url}`}
                      className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium tracking-wide no-underline flex items-center gap-0 group-hover/link:gap-3 transition-all duration-500"
                    >
                      <span className="w-0 h-[1px] bg-[#FFFDF5] group-hover/link:w-4 transition-all duration-500"></span>
                      <span className="group-hover/link:translate-x-1 transition-transform duration-500">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* 2. Navigation */}
          <div className="group/card p-6 rounded-2xl border border-[#FFFDF5]/5 bg-black/70 hover:border-[#FFFDF5]/20 hover:bg-black/60 transition-all duration-700 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <h4 className="text-[#FFFDF5] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-8 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF5] shadow-[0_0_10px_#FFFDF5]"></span>
              Navigation
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/"
                  className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline hover:translate-x-1 inline-block transition-all duration-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline hover:translate-x-1 inline-block transition-all duration-500"
                >
                  Categories
                </Link>
              </li>
              {disclaimer?.footer_pages?.map((item: any, i: number) => (
                <li key={i}>
                  <Link
                    href={`/${item?.slug}`}
                    className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline capitalize hover:translate-x-1 inline-block transition-all duration-500"
                  >
                    {item?.page_name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Resources */}
          <div className="group/card p-6 rounded-2xl border border-[#FFFDF5]/5 bg-black/70 hover:border-[#FFFDF5]/20 hover:bg-black/60 transition-all duration-700 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <h4 className="text-[#FFFDF5] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-8 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF5] shadow-[0_0_10px_#FFFDF5]"></span>
              Resources
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/all-stores/A"
                  className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline hover:translate-x-1 inline-block transition-all duration-500"
                >
                  All Stores
                </Link>
              </li>
              {blog_title && blog_url && (
                <li>
                  <Link
                    href={blog_url}
                    className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline hover:translate-x-1 inline-block transition-all duration-500"
                  >
                    {blog_title}
                  </Link>
                </li>
              )}
              <li>
                <Link
                  href="/contact-us"
                  className="text-[#FFFDF5]/80 hover:text-[#FFFDF5]/50 text-[13px] font-medium no-underline hover:translate-x-1 inline-block transition-all duration-500"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* 4. Reach Out (Contact Badges) */}
          <div className="group/card p-6 rounded-2xl border border-[#FFFDF5]/5 bg-black/70 hover:border-[#FFFDF5]/20 hover:bg-black/60 transition-all duration-700 shadow-xl relative overflow-hidden backdrop-blur-sm">
            <h4 className="text-[#FFFDF5] font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-3 mb-8 opacity-90">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFFDF5] shadow-[0_0_10px_#FFFDF5]"></span>
              Reach Out
            </h4>
            <div className="flex flex-col gap-4">
              {disclaimer?.CompanyContactUs?.email && (
                <div className="p-4 rounded-xl bg-black/40 border border-[#FFFDF5]/10 flex items-center gap-3 hover:border-[#FFFDF5]/30 transition-all group/contact">
                  <FontAwesomeIcon
                    icon={faEnvelopeOpen}
                    className="text-[#FFFDF5] opacity-70 w-3.5 h-3.5 group-hover/contact:opacity-100 group-hover/contact:scale-110 transition-all"
                  />
                  <span className="text-[11px] font-bold truncate text-[#FFFDF5]/60 group-hover/contact:text-[#FFFDF5]">
                    {disclaimer?.CompanyContactUs?.email}
                  </span>
                </div>
              )}
              {disclaimer?.CompanyContactUs?.phone_no && (
                <div className="p-4 rounded-xl bg-black/40 border border-[#FFFDF5]/10 flex items-center gap-3 hover:border-[#FFFDF5]/30 transition-all group/contact">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-[#FFFDF5] opacity-70 w-3.5 h-3.5 group-hover/contact:opacity-100 group-hover/contact:scale-110 transition-all"
                  />
                  <span className="text-[11px] font-bold text-[#FFFDF5]/60 group-hover/contact:text-[#FFFDF5]">
                    {disclaimer?.CompanyContactUs?.phone_no}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row - Disclaimer & Copyright */}
        <div className="w-full mt-16 pt-10 border-t border-[#FFFDF5]/5">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start justify-between gap-10">
            {/* Left Side: Copyright & Registration Info */}
            <div className="w-full lg:w-1/4 shrink-0 text-center lg:text-left">
              <div className="text-[10px] tracking-[0.2em] font-black text-[#FFFDF5]/40 uppercase space-y-2">
                {companyDomain.domain === "gettopdiscounts.com" ? (
                  <>
                    <div className="text-[#FFFDF5] text-xs">
                      © {new Date().getFullYear()} GETTOPDISCOUNTS LLC
                    </div>
                    <div className="flex items-center justify-center lg:justify-start gap-2 opacity-60">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                      <span className="font-extrabold text-[#FFFDF5]">U.S. REGISTERED</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-[#FFFDF5] text-xs uppercase">
                      {companyName}
                    </div>
                    <div className="opacity-60">
                      © {new Date().getFullYear()} ALL RIGHTS RESERVED
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Side: Disclaimer Box */}
            {disclaimer?.disclaimer?.disclaimer && (
              <div className="relative flex-1 w-full pb-4 p-6 md:p-6 rounded-[2rem] bg-black border border-[#FFFDF5]/5 hover:border-[#FFFDF5]/10 transition-all duration-500 group/disc backdrop-blur-sm">
                {/* Dynamic Disclaimer Heading Badge (Based on Screenshot Image_4) */}
                <div className="absolute -top-4 left-6 lg:left-8 z-20 flex items-center group/badge cursor-default">
                  {/* 1. Yellow Warning Triangle with Exclamation */}
                  <div className="relative z-30 shrink-0 transform -rotate-[5deg] -translate-x-1 hover:rotate-0 transition-transform duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-10 h-10 md:w-11 md:h-11 drop-shadow-lg"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12.0122 3.19302C12.3392 2.62886 13.1608 2.62886 13.4878 3.19302L21.4334 16.9032C21.7588 17.4646 21.3533 18.1667 20.7013 18.1667H3.29868C2.64672 18.1667 2.2412 17.4646 2.56658 16.9032L10.5122 3.19302H12.0122Z"
                        fill="#FBBF24" /* Tailwing Amber-400 (Screenshot yellow) */
                        stroke="#FBBF24"
                        strokeWidth="0.5"
                      />
                      <rect
                        x="11.5"
                        y="7.5"
                        width="2.5"
                        height="6.5"
                        rx="1.25"
                        fill="white"
                      />
                      <circle cx="12.75" cy="16.25" r="1.25" fill="white" />
                    </svg>
                  </div>

                  <div className="relative -ml-4 pl-6 pr-6 py-2.5 bg-[#E62E2E] rounded-full shadow-2xl border-t border-[#FFFDF5]/10 group-hover/badge:bg-[#EF4444] transition-colors overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/badge:translate-x-full transition-transform duration-1000" />

                    <span
                      className="relative z-10 text-[#FFFDF5] font-black text-xs md:text-sm uppercase tracking-tight flex items-center leading-none"
                      style={{
                        fontFamily:
                          'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
                        fontStretch: "condensed",
                        fontWeight: 1000,
                      }}
                    >
                      DISCLAIMER
                    </span>
                  </div>
                </div>

                <div className="relative z-10 pt-3">
                  <div
                    className="text-[11px] md:text-[12px] leading-relaxed text-[#FFFDF5]/80 group-hover/disc:text-[#FFFDF5]/50 transition-colors italic text-left"
                    dangerouslySetInnerHTML={{
                      __html: disclaimer?.disclaimer?.disclaimer || "",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <BackToTopButton />
    </footer>
  );
};

export default Footer;
