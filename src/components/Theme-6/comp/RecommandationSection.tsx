import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RecommendationSection = () => {
    return (
        <section className="recom-section-full py-5 overflow-hidden" style={{background:"#fff"}}>
            <div className="container">
                <div className="row align-items-center">

                    {/* Left Media Column - Image Overlays */}
                    <div className="col-lg-7 col-md-12 position-relative">
                        <div className="recom-media-wrapper">
                            {/* Main Image with decorative circle background */}
                            <div className="recom-img-main-container">
                                <Image
                                    src="/themes/Theme_6/images/abt-pic1.png"
                                    alt="Traveler"
                                    width={300}
                                    height={350}
                                    className="recom-main-img"
                                    unoptimized
                                />
                            </div>

                            {/* Overlapping Circular Images */}
                            <div className="recom-circle-overlay sm-top">
                                <Image
                                    src="/themes/Theme_6/images/we-rec3-pic.jpg"
                                    alt="Mountain"
                                    width={180}
                                    height={180}
                                    unoptimized
                                />
                            </div>

                            <div className="recom-circle-overlay lg-mid">
                                <Image
                                    src="/themes/Theme_6/images/we-rec3-pic2.jpg"
                                    alt="Traveling"
                                    width={340}
                                    height={340}
                                    unoptimized
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Content Column */}
                    <div className="col-lg-5 col-md-12 position-relative mt-5 mt-lg-0">
                        <div className="recom-content-box pe-lg-5">
                            <h2 className="recom-title fw-bold mb-4">
                                We <span className="text-warning">Recommend</span> Beautiful Destinations Every Month
                            </h2>
                            <p className="recom-text mb-5 text-muted">
                                Travlla is a multi-award-winning strategy and content creation agency that specializes in travel marketing.
                            </p>

                            {/* Feature Cards */}
                            <div className="recom-feature mb-3 p-4 border rounded-4 d-flex align-items-center shadow-sm">
                                <div className="recom-icon me-3">
                                    <Image src="/themes/Theme_6/images/trv-icon/travel-guide.png" alt="icon" width={40} height={40} unoptimized />
                                </div>
                                <div>
                                    <h5 className="mb-1 fw-bold">Trusted travel guide</h5>
                                    <p className="mb-0 small text-muted">Reliable information to help travelers plan efficiently.</p>
                                </div>
                            </div>

                            <div className="recom-feature mb-4 p-4 border rounded-4 d-flex align-items-center shadow-sm">
                                <div className="recom-icon me-3">
                                    <Image src="/themes/Theme_6/images/trv-icon/mission-icon.png" alt="icon" width={40} height={40} unoptimized />
                                </div>
                                <div>
                                    <h5 className="mb-1 fw-bold">Mission & Vision</h5>
                                    <p className="mb-0 small text-muted">Connecting people to positive experiences through travel.</p>
                                </div>
                            </div>

                            {/* Action Area */}
                            <div className="d-flex align-items-center gap-4">
                                <Link href="/destination" className="btn btn-success rounded-pill px-5 py-3 fw-bold shadow">
                                    Discover More
                                </Link>
                                <div className="recom-avatars d-flex align-items-center">
                                    <div className="avatar-stack d-flex">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="avatar-circle border border-white border-2 rounded-circle overflow-hidden ms-n2">
                                                <Image src={`/themes/Theme_6/images/hpy-cus/pic${i}.jpg`} width={40} height={40} alt="customer" unoptimized />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="mb-0 fw-bold">3.5k</h6>
                                        <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>Happy Customer</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default RecommendationSection;