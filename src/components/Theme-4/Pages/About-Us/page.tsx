import React from "react";
import Image from "next/image";
import Link from "next/link";
import cookieService from "@/services/CookiesService";
import { apiFooterPagesData } from "@/apis/user";
import { FaAngleRight } from "react-icons/fa";
import PageBanner from "../../comp/PageBanner";

const AboutUs = async () => {
    const companyDomain = await cookieService.get("domain");
    const SLUG = "about-us";
    const pageData = (await apiFooterPagesData(companyDomain?.domain, SLUG))?.data;

    return (
        <>
            {/* Hero / Banner Section */}
            <PageBanner
                title="About Us"
                image="/themes/Theme_3/images/banner-illus-15.png"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "About Us", href: `` },
                ]} />

            {/* Content Section */}
            <section className="py-10 bg-gray-50">
                <div className="max-w-[1400px] mx-auto px-2 md:px-6">
                    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-3 md:p-8 relative">
                        {/* Decorative top accent */}
                        <span className="absolute top-0 left-0 w-full h-1 rounded-t-2xl bg-gradient-to-r from-orange-500 to-red-500"></span>

                        {/* Rich Content */}
                        <article
                            className="prose lg:prose-xl max-w-none"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "Content not available." }}
                        />
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutUs;
