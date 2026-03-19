import Image from 'next/image'
import React from 'react'
import { apiGetStepsToAvail } from '@/apis/page_optimization';
// import Image from '@/components/shared/Image';

interface Props {
    companyId: string;
}
const StepsToAvail = async ({ companyId }: Props) => {
    const response = await apiGetStepsToAvail(companyId);
    const stepsToAvailResponse = response.data;
    if (stepsToAvailResponse?.length > 0) {
    return (
        <section className="seller padding-y-60">
            <div className="container">
                <div className="row gy-4">
                    {stepsToAvailResponse.map((step, index) => (
                        <div className="col-lg-4" key={step.id}>
                            <div className={`seller-item ${index === 1 ? 'bg-two' : ''} position-relative z-index-1 h-100`}>
                                {index === 0 && (
                                    <Image
                                        src="/themes/Theme_1/images/shapes/seller-bg.png"
                                        className="position-absolute start-0 top-0 z-index--1"
                                        alt={step.heading}
                                        height={100}
                                        width={100}
                                    />
                                )}
                                {index === 1 && (
                                    <Image
                                        src="/themes/Theme_1/images/shapes/seller-bg-two.png"
                                        className="position-absolute start-0 top-0 z-index--1"
                                        alt={step.heading}
                                        height={100}
                                        width={100}
                                    />
                                )}
                                {index === 2 && (
                                    <>
                                        <Image
                                            src="/themes/Theme_1/images/shapes/spider-net-sm.png"
                                            alt={step.heading}
                                            className="spider-net position-absolute top-0 end-0 z-index--1"
                                            height={100}
                                            width={100}
                                        />
                                        <Image
                                            src="/themes/Theme_1/images/shapes/arrow-shape.png"
                                            alt="svg"
                                            className="arrow-shape"
                                            height={100}
                                            width={100}
                                        />
                                    </>
                                )}
                                <h3 className="seller-item__title f-20 sp-2">{step.heading}</h3>
                                <p className="seller-item__desc fw-500 text-heading text-justify-custom f-14 sp-1 fs-10">{step.text}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
    }
}

export default StepsToAvail
 