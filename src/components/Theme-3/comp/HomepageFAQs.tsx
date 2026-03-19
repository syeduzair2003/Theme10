import React from 'react'
import Accordion from 'react-bootstrap/Accordion';
import MerchantFaqsAccordion from './MerchantFaqsAccordion';
import StoreCardHorizontal from './StoreCardHorizontal';
import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';

interface Props {
    slug_type: string;
    store_slug: string;
}

const HomepageFAQs = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data
    const faqs = (await apiHomePageFaqs(companyDomain)).data;

    return (
        <section className="merchant-carousel-section" style={{ padding: "5% 8%" }}>
            <div className="container">
                <div className="row">
                    {faqs?.length > 0 && (
                        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3 mb-2">
                            <div className="section-header d-flex align-items-center justify-content-between">
                                <div className="section-title-center text-center no-before mb-3">
                                    <h2 className="top-stores-heading animate-heading f-25">
                                        <span className="stores-text">Frequently Asked Questions (FAQ)</span>
                                    </h2>
                                </div>
                            </div>
                            <div className="row justify-content-center justify-content-sm-start">
                                <Accordion defaultActiveKey="0">
                                    {faqs.map((faq, idx) => (
                                        <MerchantFaqsAccordion key={idx} faq={faq} index={idx} />
                                    ))}
                                </Accordion>
                            </div>
                        </div>
                    )}
                    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 mt-3 d-flex flex-column" >
                        {/* Header stays at the top */}
                        <div className="section-header d-flex align-items-center justify-content-between flex-shrink-0">
                            <div className="section-title-center text-center no-before mb-3">
                                <h2 className="top-stores-heading animate-heading f-25">
                                    <span className="stores-text">Newly Added Stores</span>
                                </h2>
                            </div>
                        </div>

                        {/* The Scrollable Container */}
                        {promoMerchants?.length > 0 && (
                            <div
                                className="row d-flex justify-content-center top-stores px-1 px-md-2 cus-row flex-grow-1"
                                style={{
                                    maxHeight: "750px",       
                                    overflowY: 'auto',
                                    overflowX: 'hidden'
                                }}
                            >
                                {promoMerchants?.map((merchant, i) => (
                                    <div className="col-12" key={merchant.id || i}>
                                        <StoreCardHorizontal
                                            merchant={merchant}
                                            mer_slug={store_slug}
                                            mer_slug_type={slug_type}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomepageFAQs