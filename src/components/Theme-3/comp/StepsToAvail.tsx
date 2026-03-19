import { faBriefcase, faUserGear, faWallet, FontAwesomeIcon } from '@/constants/icons';
import Link from 'next/link';
import React from 'react'
const StepsToAvail = () => {
    return (
        <section className='s1-2nd-bg-color'>
            <div className="container py-10">
                <div className="row gy-8">
                    <div className="col-md-6 col-xl-4">
                        <div className="single-box n1-bg-color position-relative px-4 px-md-6 py-4 py-md-7 d-center flex-wrap gap-3 gap-md-4 rounded-4 cus-border border">
                            <div className="d-center align-items-start flex-wrap flex-sm-nowrap justify-content-start gap-3 gap-md-4">
                               <FontAwesomeIcon icon={faUserGear} style={{ width: '16px', height: '16px', color: 'black' }}/>
                                <div className="text-area d-grid gap-2">
                                    <Link href="#"><h5 className="fw-bolder transition n17-color">Log In & Shop</h5></Link>
                                    <span className="fs-eight n17-color transition">Click to select your favorite coupon, explore amazing deals, and start shopping.</span>
                                </div>
                            </div>
                            {/* <span className="abs-area d-center pe-none fs-four position-absolute rounded-2 me-5 f5-color end-0 f1-bg-color cus-border border b-twelfth">1</span> */}
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <div className="single-box n1-bg-color position-relative px-4 px-md-6 py-4 py-md-7 d-center flex-wrap gap-3 gap-md-4 rounded-4 cus-border border">
                            <div className="d-center align-items-start flex-wrap flex-sm-nowrap justify-content-start gap-3 gap-md-4">
                                <FontAwesomeIcon icon={faBriefcase} style={{ width: '16px', height: '16px', color: 'black' }}/>
                                <div className="text-area d-grid gap-2">
                                    <Link href="#"><h5 className="fw-bolder transition n17-color">Cashback Earned</h5></Link>
                                    <span className="fs-eight n17-color transition">Cashback rewards are instantly added to your Couponly wallet, ready for future.</span>
                                </div>
                            </div>
                            {/* <span className="abs-area d-center pe-none fs-four position-absolute rounded-2 me-5 f5-color end-0 f1-bg-color cus-border border b-twelfth">2</span> */}
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-4">
                        <div className="single-box n1-bg-color position-relative px-4 px-md-6 py-4 py-md-7 d-center flex-wrap gap-3 gap-md-4 rounded-4 cus-border border">
                            <div className="d-center align-items-start flex-wrap flex-sm-nowrap justify-content-start gap-3 gap-md-4">
                                <FontAwesomeIcon icon={faWallet} style={{ width: '16px', height: '16px', color: 'black' }}/>
                                <div className="text-area d-grid gap-2">
                                    <Link href="#"><h5 className="fw-bolder transition n17-color">Withdraw Cashback</h5></Link>
                                    <span className="fs-eight n17-color transition">Cashback gets added to your bank account, or as a voucher or recharge option instantly.</span>
                                </div>
                            </div>
                            {/* <span className="abs-area d-center pe-none fs-four position-absolute rounded-2 me-5 f5-color end-0 f1-bg-color cus-border border b-twelfth">3</span> */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StepsToAvail
