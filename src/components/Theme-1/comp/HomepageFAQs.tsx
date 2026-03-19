import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import StoreCardHorizontal from './StoreCardHorizontal';
import Image from 'next/image'

interface Props {
    store_slug: string,
    slug_type: string
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data
    const faqs = (await apiHomePageFaqs(companyDomain)).data;
    return (
        <section className="padding-y-60 position-relative z-index-1 overflow-hidden">
            <div className="container">
                <Image src="/themes/Theme_1/images/shapes/pattern.png" alt="pattern" className="bg-pattern"
                    width={1000} height={400}
                />
                <div className="row">
                    {faqs?.length > 0 && (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3 mb-2">
                            <div className="section-heading__inner w-lg">
                                <h2 className="section-heading__title">
                                    <span className="stores-text">Frequently Asked Questions (FAQ)</span>
                                </h2>
                            </div>
                            <div className="row justify-content-center justify-content-sm-start">
                                <Accordion defaultActiveKey="0">
                                    {faqs?.map((faq, idx) => (
                                        <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    )}
                    {promoMerchants?.length > 0 && (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3">
                            <div className="section-heading__inner w-lg">
                                <h2 className="section-heading__title">
                                    <span className="stores-text">Newly Added Stores</span>
                                </h2>
                            </div>
                            {promoMerchants?.length > 0 &&
                                <div className="row g-3">
                                    {promoMerchants?.map((merchant, i) => {
                                        if (i > 5) return null;
                                        return (
                                            <div className="col-12" key={i}>
                                                <StoreCardHorizontal merchant={merchant} mer_slug={store_slug} slug_type={slug_type} />
                                            </div>
                                        )
                                    })}
                                </div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}

export default HomepageFAQs
