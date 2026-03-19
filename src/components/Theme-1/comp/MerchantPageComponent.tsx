import React from 'react'
import MerchantFilter from '@theme1/comp/MerchantFilter'
import ExclusiveMerchants from '@theme1/comp/ExclusiveMerchants'

import { apiGetMerchants } from '@/apis/merchant';
import { CompanyData } from '@/services/dataTypes';
import { apiGetPromotionalMerchants } from '@/apis/page_optimization';

export const dynamic = 'force-dynamic';
interface Props {
    slug_type: string;
    company_id: string;
    store_slug: string;
}

const MerchantPageComponent = async ({ slug_type, company_id, store_slug }: Props) => {
    const merchantResponse = await apiGetMerchants(company_id);
    const merchantData = merchantResponse.data;
    const featuredMerchants = (await apiGetPromotionalMerchants(company_id)).data
    return (
        <>
            <section className='all-product pt-4 pb-5 custom-bg-color-one' style={{ paddingLeft: '50px', paddingRight: '50px' }}>
                <div className="container container-two">
                    <div className="row">
                        <div className="col-lg-9">
                            <div
                                className="tab-pane fade show active"
                                id="pills-product"
                                role="tabpanel"
                                aria-labelledby="pills-product-tab"
                                tabIndex={0}
                            >
                                <div className="row gy-4 list-grid-wrapper">
                                    <div className="col-xl-12 col-md-12">
                                        <MerchantFilter
                                            merchant={merchantData}
                                            mer_slug_type={slug_type}
                                            mer_slug={store_slug} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <ExclusiveMerchants
                                merchants={featuredMerchants}
                                mer_slug_type={slug_type}
                                mer_slug={store_slug} 
                                heading="Featured Merchants"
                                />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default MerchantPageComponent
