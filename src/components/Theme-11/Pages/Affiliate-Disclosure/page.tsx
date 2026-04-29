import React from 'react'
import BreadcrumbSection from '../../comp/BreadcrumbSection'
import cookieService from '@/services/CookiesService';
import { apiFooterPagesData } from '@/apis/user';

const page = async () => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const SLUG = 'affiliate-disclosure';
    const pageData = (await apiFooterPagesData(companyDomain, SLUG)).data;

    return (
        <div className="bg-[#fcfcfa] min-h-screen">
            <BreadcrumbSection 
                title={pageData?.page_name || "Affiliate Disclosure"} 
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "Affiliate Disclosure", href: "/affiliate-disclosure" }
                ]} 
            />

            <section className="py-16 md:py-24 px-4 relative overflow-hidden">
                {/* Decorative background elements consistent with Theme-11 */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl z-0 opacity-[0.03] pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-[#8bc94a] rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#ff912f] rounded-full blur-[100px]"></div>
                </div>

                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)]">
                        <div
                            className="about-us-content text-gray-700 text-lg leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: pageData?.page_description || "<p class='text-center py-10'>Content not available.</p>" }}
                        />
                    </div>
                </div>
            </section>

            <style dangerouslySetInnerHTML={{ __html: `
                .about-us-content a {
                    color: #ff912f;
                    font-weight: 600;
                    text-decoration: none;
                    border-bottom: 2px solid rgba(255, 145, 47, 0.2);
                    transition: all 0.3s ease;
                }
                .about-us-content a:hover {
                    color: #8bc94a;
                    border-bottom-color: #8bc94a;
                    background-color: rgba(139, 201, 74, 0.05);
                }
                .about-us-content h1, .about-us-content h2, .about-us-content h3 {
                    color: #2d3748;
                    font-weight: 800;
                    margin-top: 2.5rem;
                    margin-bottom: 1.25rem;
                    line-height: 1.3;
                }
                .about-us-content h1 { font-size: 2.25rem; }
                .about-us-content h2 { font-size: 1.875rem; }
                .about-us-content h3 { font-size: 1.5rem; }
                .about-us-content p {
                    margin-bottom: 1.5rem;
                }
                .about-us-content ul, .about-us-content ol {
                    margin-bottom: 1.5rem;
                    padding-left: 1.5rem;
                }
                .about-us-content li {
                    margin-bottom: 0.5rem;
                }
                .about-us-content strong {
                    color: #1a202c;
                    font-weight: 700;
                }
            ` }} />
        </div>
    )
}

export default page