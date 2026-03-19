import React from 'react'
import Link from 'next/link';
import TopMerchants from './TopMerchants';
import { apiGetTopMerchants } from '@/apis/page_optimization';
import { splitHeading } from '@/constants/hooks';
import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
interface Props {
    companyId: string;
    mer_slug: string;
    mer_slug_type: string;
}
const MerchantsCarousel = async ({ companyId, mer_slug, mer_slug_type }: Props) => {
    // const merchants = await apiGetMerchants(companyId);
    const merchants = await apiGetTopMerchants(companyId);
    const [firstHalf, secondHalf] = splitHeading(merchants?.data?.top_merchants_widget?.widget_heading);
    const heading = merchants?.data?.top_merchants_widget?.widget_heading ? merchants?.data?.top_merchants_widget?.widget_heading : "Top Merchants"
    if (merchants.data?.merchants?.length > 0) {
        return (
            <>
                <section className="merchant-carousel-section" style={{ padding: "5% 8%" }}>
                    <div className="container">
                        <div className="section-header row mb-3">
                            <div className="col-9 col-md-9 col-sm-9 col-lg-10 col-xl-10 section-title-center mb-3 no-before">
                                <h1 className="top-stores-heading animate-heading d-inline">
                                    {/* <span className="top-text">{firstHalf ? firstHalf : `Top`} </span>
                                <span className="stores-text"> {secondHalf ? secondHalf : `Merchants`}</span> */}
                                    <span className="stores-text">{heading}</span>
                                </h1>
                            </div>
                            <div className="col-3 col-md-3 col-sm-3 col-lg-2 col-xl-2 view-all-merchants">
                                <Link href={`/all-stores/A`} className="d-center gap-1" target='_blank'>
                                    <span className="p2-color fw-bold">View All</span>
                                    <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                </Link>
                            </div>
                            <div className='col-lg-12 col-xl-12'>
                                <p>
                                    {merchants?.data?.top_merchants_widget?.widget_text}
                                </p>
                            </div>
                        </div>
                        <TopMerchants merchantData={merchants?.data?.merchants} mer_slug_type={mer_slug_type} mer_slug={mer_slug} />
                    </div>
                </section>
            </>
        )
    }
}
export default MerchantsCarousel