"use client"
import React, { useState } from 'react'
// import Image from "next/image";
import { apiSubscribeNewsletter } from '@/apis/page_optimization';
import { toast } from 'react-toastify';
import Image from 'next/image'

interface Props {
    companyId: string
}
const Newsletter = ({ companyId }: Props) => {
    const [email, setEmail] = useState<string>("");

    const handleRate = async (e: React.FormEvent, email: string) => {
        e.preventDefault();
        setEmail(email);
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
        <section className="newsletter position-relative z-index-1 overflow-hidden">
            <Image
                src="/themes/Theme_1/images/gradients/newsletter-gradient-bg.png"
                height={300}
                width={300}
                alt="gradient"
                className="bg--gradient"
            />
            <Image
                src="/themes/Theme_1/images/shapes/line-vector-one.png"
                height={300}
                width={300}
                alt="vector one"
                className="line-vector one"
            />
            <Image
                src="/themes/Theme_1/images/shapes/line-vector-two.png"
                height={300}
                width={300}
                alt="vector two"
                className="line-vector two"
            />
            <div className="container container-two">
                <div className="row justify-content-center" style={{ padding: "20px 0 20px 0" }}>
                    <div className="col-xl-6 col-lg-8 col-md-10">
                        <div className="newsletter-content" >
                            <h1 className="newsletter-content__title mb-2 text-center f-30"style={{color:"white"}}>
                                Subscribe our newsletter to get the best deals right in your email.
                            </h1>
                            <form
                                onSubmit={(e) => { handleRate(e, email) }}
                                className="mt-4 newsletter-box position-relative"
                            >
                                <input
                                    type="email"
                                    className="form-control common-input common-input--lg pill text-white news-input-box"
                                    placeholder="Enter your email."
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="btn btn-main btn-lg pill flx-align gap-1"
                                >
                                    Subscribe <span className="text d-sm-flex d-none">Now</span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Newsletter
