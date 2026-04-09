import React from "react";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "../../comp/ContactForm";
import cookieService from "@/services/CookiesService";
import { apiContactPage } from "@/apis/user";
import {
  faAt,
  faFacebook,
  faFlipboard,
  faInstagram,
  faLinkedin,
  faPinterest,
  faTiktok,
  faYoutube,
  faGreaterThan,
  FontAwesomeIcon,
  faMapPin,
  faEnvelopeOpen,
  faPhone,
  faEarth,
  faXTwitter,
} from "@/constants/icons";

const ContactUsPage = async () => {
  const companyDomain = (await cookieService.get("domain")).domain;
  const fullPageData = (await apiContactPage(companyDomain))?.data;
  const pageData = fullPageData?.CompanyContactUs;

  return (
    <main className="min-h-screen bg-[#fffde0]">
      <section className="relative mx-4 md:mx-10 mt-6 mb-16 overflow-hidden rounded-[2.5rem] bg-[#FDFBE7] border border-[#EADDCA]">
        <div className="max-w-7xl mx-auto px-8 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mt-[-16px]">
            <div className="flex flex-col items-center lg:items-start mt-1 text-center lg:text-left space-y-6">
              <div className="space-y-6 mt-8">
                {/* --- Breadcrumb (Minimalist Style) --- */}
                <nav className="flex items-center justify-center lg:justify-start gap-3 text-[11px] font-black uppercase tracking-[0.2em]">
                  <Link
                    href="/"
                    className="text-slate-400 hover:text-[#800000] transition-colors no-underline"
                  >
                    Home
                  </Link>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#800000]"></span>
                  <span className="text-[#800000]">Contact Us</span>
                </nav>

                <h1 className="text-4xl md:text-6xl font-black text-[#1A1A1A] leading-[1.1] tracking-tight">
                  Contact <span className="text-[#800000]">Us</span>
                </h1>
              </div>

              <div
                className="text-slate-600 max-w-lg leading-relaxed prose prose-slate 
                    prose-p:text-slate-600 prose-strong:text-[#1A1A1A] prose-a:text-[#800000]"
                dangerouslySetInnerHTML={{ __html: pageData?.details || "" }}
              />
            </div>

            {/* --- Image Section (Slightly smaller and shifted down) --- */}
            <div className="hidden lg:flex justify-end relative group translate-y-6 scale-90">
              {/* Decorative Shapes (Smaller Scale) */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-[#800000]/10 rounded-full" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 border-2 border-dashed border-[#EADDCA]/40 rounded-full" />

              {/* Glow Background */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-[#800000]/5 rounded-full blur-3xl group-hover:bg-[#800000]/15 transition-all duration-700" />

              {/* Main Image */}
              <div className="relative z-10 transition-all duration-500 group-hover:scale-105 group-hover:-translate-y-1">
                <Image
                  src="/themes/Theme_3/images/banner-illus-15.png"
                  alt="Contact"
                  width={320}
                  height={280}
                  className="object-contain drop-shadow-[0_15px_35px_rgba(128,0,0,0.1)] group-hover:drop-shadow-[0_25px_50px_rgba(128,0,0,0.2)] transition-all duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#800000]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#EADDCA]/30 rounded-full blur-[100px]" />
      </section>
      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Info Cards */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              Contact Information
            </h3>

            {/* Address */}
            {pageData?.address && (
              <div className="group flex items-start gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#800000] flex items-center justify-center text-white shadow-lg shadow-[#800000]/20">
                  <FontAwesomeIcon icon={faMapPin} className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-slate-900 text-lg">
                    Main Office
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    {pageData?.address}
                  </p>
                </div>
              </div>
            )}

            {/* Email & Phone Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
              {pageData?.email && (
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#800000] flex items-center justify-center text-white shadow-lg shadow-[#800000]/20">
                    <FontAwesomeIcon
                      icon={faEnvelopeOpen}
                      className="w-5 h-5"
                    />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Email Address</h5>
                    <p className="text-slate-600 break-all">
                      {pageData?.email}
                    </p>
                  </div>
                </div>
              )}

              {pageData?.phone_no && (
                <div className="flex items-center gap-5 p-6 rounded-2xl border border-slate-100 bg-slate-50/50 transition-all hover:bg-white hover:shadow-xl hover:shadow-slate-200/50">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#800000] flex items-center justify-center text-white shadow-lg shadow-[#800000]/20">
                    <FontAwesomeIcon icon={faPhone} className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900">Phone Number</h5>
                    <p className="text-slate-600">{pageData?.phone_no}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Social Links Card */}
            <div className="p-8 rounded-3xl bg-[#1A1A1A] text-white overflow-hidden relative group">
              <div className="relative z-10">
                <h5 className="text-xl font-bold mb-6 flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faEarth}
                    className="text-[#800000] w-5 h-5"
                  />
                  Follow Our Socials
                </h5>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      icon: faFacebook,
                      link: fullPageData?.company_data?.facebook,
                    },
                    {
                      icon: faXTwitter,
                      link: fullPageData?.company_data?.twitter,
                    },
                    {
                      icon: faPinterest,
                      link: fullPageData?.company_data?.pinterest,
                    },
                    {
                      icon: faYoutube,
                      link: fullPageData?.company_data?.youtube,
                    },
                    {
                      icon: faLinkedin,
                      link: fullPageData?.company_data?.linkedin,
                    },
                    {
                      icon: faInstagram,
                      link: fullPageData?.company_data?.instagram,
                    },
                    {
                      icon: faTiktok,
                      link: fullPageData?.company_data?.tiktok,
                    },
                    {
                      icon: faFlipboard,
                      link: fullPageData?.company_data?.flipboard,
                    },
                    { icon: faAt, link: fullPageData?.company_data?.threads },
                  ].map(
                    (social, index) =>
                      social.link && (
                        <Link
                          key={index}
                          href={social.link}
                          target="_blank"
                          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#800000] transition-all duration-300 hover:-translate-y-1 border border-white/5"
                        >
                          <FontAwesomeIcon
                            icon={social.icon}
                            className="w-4 h-4 text-white"
                          />
                        </Link>
                      ),
                  )}
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#800000]/10 rounded-full blur-3xl group-hover:bg-[#800000]/20 transition-colors" />
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <ContactForm domain={companyDomain} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUsPage;
