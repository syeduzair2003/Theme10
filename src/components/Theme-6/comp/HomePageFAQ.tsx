import { apiHomePageFaqs, apiRecentlyUpdatedStores } from '@/apis/user';
import cookieService from '@/services/CookiesService';
import React from 'react';
import FaqAccordionList from './FaqAccordionList';
import StoreCardHorizontal from './StoreCardHorizontal';

interface Props {
    store_slug: string,
    slug_type: string
}

const HomepageFAQ = async ({ store_slug, slug_type }: Props) => {
    const companyDomain = (await cookieService.get("domain")).domain;
    const promoMerchants = (await apiRecentlyUpdatedStores(companyDomain)).data;
    const faqs = (await apiHomePageFaqs(companyDomain)).data;

    return (
        <section className="padding-y-60 position-relative z-index-1 overflow-hidden">
            <div className="container">
                <div className="row g-4"> {/* Added gap-4 for consistent gutter spacing between columns */}
                    
                    {/* FAQ Column */}
                    {faqs?.length > 0 && (
                        <div className="col-lg-6 col-md-12">
                            {/* Standardized heading wrapper with mb-4 */}
                            <div className="section-heading__inner mb-4">
                                <h2 className="section-heading__title m-0">
                                    <span className="stores-text" style={{fontSize:"35px", fontWeight:"600"}}>Frequently Asked Questions (FAQ)</span>
                                </h2>
                            </div>
                          
                            {/* Content starts here */}
                            <div className="faq-content-container">
                                <FaqAccordionList faqs={faqs} />
                            </div>
                        </div>
                    )}

                    {/* Stores Column */}
                    {promoMerchants?.length > 0 && (
                        <div className="col-lg-6 col-md-12">
                            {/* Standardized heading wrapper with mb-4 to match left side */}
                            <div className="section-heading__inner mb-4">
                                <h2 className="section-heading__title m-0">
                                    <span className="stores-text"  style={{fontSize:"35px", fontWeight:"600"}}>Newly Added Stores</span>
                                </h2>
                            </div>

                            {/* Using row g-3 here. To ensure vertical alignment, 
                                make sure the margin-top of this row is 0 */}
                            <div className="row g-3 m-0">
                                {promoMerchants.slice(0, 6).map((merchant, i) => (
                                    <div className="col-12 p-0 mb-3" key={i}>
                                        <StoreCardHorizontal 
                                            merchant={merchant} 
                                            mer_slug={store_slug} 
                                            slug_type={slug_type} 
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HomepageFAQ;