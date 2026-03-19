import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import MerchantFaqsAccordion from './MerchantFaqsAccordionProps';
import StoreCardHorizontal from './StoreCardHorizontal';


interface Props {
    slug_type: string;
    store_slug: string;
}

const HomeFaqsSection = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data
    const faqs = (await apiHomePageFaqs(companyDomain)).data;
    if (faqs?.length === 0 && promoMerchants?.length === 0) return null;
    return (
        <section className="faq-stores-section popular-stores bg padTB60">
            <div className="container">
                <div className="row g-4">
                    {faqs?.length > 0 && (
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="section-box p-3 h-100 rounded-3 shadow-sm">
                                <h2 className="py-2 section-title opacity-80">
                                    Frequently Asked Questions (FAQ)
                                </h2>
                                <div className="faq-wrapper mt-3">
                                    <Accordion defaultActiveKey="0">
                                        {faqs.map((faq, idx) => (
                                            <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                                        ))}
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                    )}

                    {promoMerchants?.length > 0 && (
                        <div className="col-xl-6 col-lg-6 col-md-12">
                            <div className="section-box p-3 h-100 rounded-3 shadow-sm">
                                <h2 className="py-2 section-title opacity-80">
                                    Recently Updated Stores
                                </h2>

                                <div className="stores-list mt-3">
                                    {promoMerchants?.slice(0, 7)?.map((merchant, i) => (
                                        <StoreCardHorizontal
                                            key={i}
                                            merchant={merchant}
                                            mer_slug={store_slug}
                                            mer_slug_type={slug_type}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}

export default HomeFaqsSection
