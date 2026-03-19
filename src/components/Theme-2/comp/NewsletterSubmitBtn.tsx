"use client";
import { apiSubscribeNewsletter } from "@/apis/page_optimization";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface Props {
    companyId: string;
}

const NewsletterSection = ({ companyId }: Props) => {
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
            toast.error(error || "Please enter a valid email address.");
            return;
        }
        setEmail(p_email);
        setError("");
        await handleSubmit();
    };

    const handleSubmit = async () => {
        try {
            const response = await apiSubscribeNewsletter(companyId, email);
            if (response.message === "Subscribed successfully") {
                toast.success("Thank you for subscribing!", { autoClose: 2000 });
                setEmail("");
            } else {
                toast.error("You are already subscribed to our newsletter.");
            }
        } catch (error) {
            console.error("Error subscribing:", error);
        }
    };

    return (
        <section className="newsletter-section py-5 px-3 px-md-5 container-fluid">
            <ToastContainer />
            <div className="text-center mb-4">
                <h2 className="newsletter-title">Stay Updated</h2>
                <p className="newsletter-subtitle opacity-80 f-25">
                    Subscribe to our newsletter and never miss out on the latest deals & updates.
                </p>
            </div>

            <form
                className="newsletter-form row justify-content-center g-3"
                onSubmit={(e) => handleRate(e, email)}
                autoComplete="off"
            >
                <div className="col-12 col-md-7 col-lg-6">
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="newsletter-input w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-3 col-lg-3">
                    <button type="submit" className="newsletter-btn w-100">
                        Subscribe
                    </button>
                </div>
            </form>
        </section>
    );
};

export default NewsletterSection;
