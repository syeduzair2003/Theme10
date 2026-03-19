"use client"
import { apiSubscribeNewsletter } from '@/apis/page_optimization';
import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";

interface Props {
    companyId: string;
}
const FooterNewsLetter = ({ companyId }: Props) => {
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
        <div className="footer-widget">
            <h5 className="footer-widget__title text-white">Newsletter</h5>
            <p className="font-14 mb-2">Subscribe to get the latest deals and offers directly in your inbox.</p>
            <form className="d-flex gap-2" onSubmit={(e) => { handleRate(e, email) }}>
                <div className="position-relative d-flex justify-content-between w-100 newsletter-input-cus">
                    <input
                        type="email"
                        className="form-control custom-input-with-button"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button
                        type="submit"
                        className="btn submit-icon-button"
                    >
                        <i className="fa fa-arrow-right" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FooterNewsLetter
