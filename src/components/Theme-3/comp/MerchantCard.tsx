import Image from 'next/image'
import React from 'react'
import Link from 'next/link';
import { getBaseImageUrl } from '@/constants/hooks';
// import Image from "@/components/shared/Image";

interface Props {
    merchant_name: string;
    merchant_logo: string;
    companyDomain: string;
    merchant_href: string;
}

const MerchantCard = ({ merchant_name, merchant_logo, companyDomain, merchant_href }: Props) => {
    const nameParts = merchant_name.trim().split(' ');

    return (
        <div className="col-12 col-sm-12 mt-6 col-lg-4 col-xxl-4 p-3">
            <Link href={merchant_href}>
                <div className="single-box transition rounded-2 n1-bg-color cus-border border b-fourth pt-2 px-3 px-md-4 pb-3 pb-md-4 d-center flex-column mt-9 h-100">
                    <span className="d-center justify-content-start gap-1 position-relative w-100 mt-lg-5">
                        <span className="d-center position-absolute bottom-0 start-0 border rounded-2 overflow-hidden" style={{ width: '120px', height: '70px', background: 'white' }}>
                            <Image
                                // className="w-100"
                                src={getBaseImageUrl(companyDomain, merchant_logo, "")}
                                alt={`${merchant_name} logo`}
                                width={100}
                                height={100}
                                objectFit="contain"
                                style={{ maxWidth: '120px', maxHeight: '70px' }}
                            />
                        </span>
                    </span>
                    <div className="d-flex justify-content-center flex-column">
                        {(() => {
                            // const nameParts = merchant?.merchant_name.trim().split(' ');
                            if (nameParts.length === 1) {
                                return (
                                    <>
                                        <span className="f11-color fw-bold fs-four">{nameParts[0]}</span>
                                    </>
                                );
                            } else if (nameParts.length === 2) {
                                return (
                                    <div className='d-flex align-items-center justify-content-center gap-1'>
                                        <span className="f11-color fw-bold fs-four">{nameParts[0]}</span>
                                        <span className="fs-eight fw-bold">{nameParts[1]}</span>
                                    </div>
                                );
                            } else {
                                return (
                                    <div className='d-flex align-items-center justify-content-center gap-1'>
                                        <span className="f11-color fw-bold fs-four">{nameParts[0]}</span>
                                        <span className="fs-eight fw-bold">{nameParts.slice(1).join(' ')}</span>
                                    </div>
                                );
                            }
                        })()}
                    </div>
                    <div className="rounded-1 w-100 d-center gap-2 gap-md-3 mt-3 mt-md-5 justify-content-start p1-2nd-bg-color cus-border border b-eighth p-1">
                        <div className="d-center fav-icon rounded-2 n1-bg-color box-shadow-p1">
                            <Image className="max-un" src="/themes/Theme_3/images/fav.png" alt="svg" width={120} height={70} />
                        </div>
                        <span className="p2-color fs-eight fw-bold">View All Offers</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default MerchantCard
