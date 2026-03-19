"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Icon1 from "@theme3/assets/img/newsletter/newsletter-icon-1.png"
import Icon2 from "@theme3/assets/img/newsletter/newsletter-icon-2.png"
import Icon3 from "@theme3/assets/img/newsletter/newsletter-icon-3.png"
import Icon4 from "@theme3/assets/img/newsletter/newsletter-icon-4.png"
import Icon5 from "@theme3/assets/img/newsletter/newsletter-icon-5.png"
import { toast, ToastContainer } from "react-toastify";
import { apiSubscribeNewsletter } from '@/apis/page_optimization'

interface Props {
    companyId: string,
}

const Newsletter = ({ companyId }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRate = async (e: React.FormEvent, p_email: string) => {
        e.preventDefault();

        if (!validateEmail(p_email)) {
            setError("Please enter a valid email address.");
            toast.error(error);
            return;
        }
        setEmail(p_email);
        setError(""); // Clear previous error if valid
        await handleSubmit();
    };

    const handleSubmit = async () => {
        try {
            const response = await apiSubscribeNewsletter(companyId, email);
            if (response.message == "Subscribed successfully") {
                toast.success("Thank you for your feedback!", { autoClose: 2000 });
                setEmail("");
            } else {
                toast.error("You have already subscribe to our newsletter.")
            }
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    return (
        <section className="newsletter-section custom-overflow custom-z-index position-relative custom-bg custom-border py-10 py-md-15">
            <div className="container">
                <div className="decorative-elements d-none d-lg-block">
                    <div className="decorative-item position-absolute custom-z-index-left ps-8">
                        <Image src={Icon1} height={100} width={100} alt='icon' className='animated-image1' />
                    </div>
                    <div className="decorative-item position-absolute custom-z-index-right top-0 end-25" style={{ zIndex: "-1" }}>
                        <Image src={Icon2} height={100} width={100} alt='icon' />
                    </div>
                    <div className="decorative-item position-absolute custom-z-index-center top-0 end-50">
                        <Image src={Icon3} height={100} width={100} alt='icon' className='animated-image2' />
                    </div>
                    <div className="decorative-item position-absolute custom-z-index-center bottom-0 end-50">
                        <Image src={Icon4} height={100} width={100} alt='icon' />
                    </div>
                    <div className="decorative-item position-absolute custom-z-index-right end-0 pe-8">
                        <Image src={Icon5} height={100} width={100} alt='icon' className='animated-image' />
                    </div>
                </div>
                <div className="container">
                    <div className="row align-items-center justify-content-between z-10">
                        <div className="col-md-6 col-xl-6 z-10" style={{ zIndex: 10, textShadow: '1px 1px 3px white' }}>
                            <div className="text-area custom-animation">
                                <h2 className="custom-text-color fw-normal f-30" style={{ color: '#000002', zIndex: 10 }}>Subscribe to our newsletter to get the best deals right in your email</h2>
                            </div>
                        </div>
                        <div className="col-md-6 col-xl-5">
                            <div className="subscription-form custom-bg-light rounded-pill ps-2 ps-md-6 p-2 mt-3 mt-md-4 mb-2 mb-md-3 custom-border">
                                <form onSubmit={(e) => { handleRate(e, email) }} autoComplete="off" className="form-container d-flex justify-content-between">
                                    <div className="form-group w-100 d-flex mail-container">
                                        <input type="email" placeholder="Enter Email..." className="custom-input-mail px-3 px-md-4 w-100" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        <button type="submit" className="custom-button-mail">Subscribe</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
