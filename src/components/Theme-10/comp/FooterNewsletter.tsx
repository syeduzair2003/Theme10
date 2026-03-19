'use client'
import { apiSubscribeNewsletter } from '@/apis/page_optimization';
import { faPaperPlane, FontAwesomeIcon } from '@/constants/icons';
import React, { useState } from 'react'
import { toast, ToastContainer } from "react-toastify";

interface Props {
    companyId: string;
}

const FooterNewsletter = ({ companyId }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            toast.error("Please enter a valid email address.", {
                position: "bottom-right"
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await apiSubscribeNewsletter(companyId, email);
            if (response.message === "Subscribed successfully") {
                toast.success("Thank you for subscribing!", { autoClose: 2000 });
                setEmail("");
            } else {
                toast.info("You are already subscribed to our newsletter.");
            }
        } catch (error) {
            console.error("Error subscribing:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <ToastContainer />
            <form 
                className="relative flex items-center group" 
                onSubmit={handleRate} 
                autoComplete="off"
            >
                <div className="relative w-full">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-full py-4 pl-6 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 placeholder:text-gray-400"
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        disabled={isLoading}
                    />
                    
                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="absolute right-2 top-1.5 bottom-1.5 px-5 bg-slate-900 hover:bg-blue-600 disabled:bg-gray-400 text-white rounded-full transition-all duration-300 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/20"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <FontAwesomeIcon 
                                icon={faPaperPlane} 
                                className={`w-4 h-4 transition-transform duration-300 ${email ? 'rotate-12 scale-110' : ''}`}
                            />
                        )}
                    </button>
                </div>
            </form>
            <p className="mt-3 text-[11px] text-gray-400 px-4">
                We care about your data in our <span className="underline cursor-pointer">privacy policy</span>.
            </p>
        </div>
    )
}

export default FooterNewsletter