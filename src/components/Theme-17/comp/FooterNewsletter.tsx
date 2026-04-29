'use client'
import { apiSubscribeNewsletter } from '@/apis/page_optimization';
import { faPaperPlane, FontAwesomeIcon } from '@/constants/icons';
import React, { useState } from 'react'
import { toast } from "react-toastify";

interface Props {
    companyId: string;
}

const FooterNewsletter = ({ companyId }: Props) => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleRate = async (e: React.FormEvent, p_email: string) => {
        e.preventDefault();

        if (!validateEmail(p_email)) {
            setError("Please enter a valid email address.");
            toast.error("Please enter a valid email address.");
            return;
        }
        setEmail(p_email);
        setError(""); // Clear previous error if valid
        await handleSubmit();
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await apiSubscribeNewsletter(companyId, email);
            if (response.message == "Subscribed successfully") {
                toast.success("Thank you for your feedback!", { autoClose: 2000 });
                setEmail("");
            } else {
                toast.error("You have already subscribed to our newsletter.")
            }
        } catch (error) {
            console.error("Error subscribing:", error);
            toast.error("There was an error subscribing. Please try again later.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full">
            <h3 className="text-white font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter to get the latest updates and exclusive deals right into your inbox.
            </p>
            <form className="relative w-full" onSubmit={(e) => {handleRate(e, email)}} autoComplete="off">
                <div className="flex items-center w-full bg-[#1a233a] rounded-full p-1.5 border border-[#1a233a] focus-within:border-[#8bc94a] focus-within:ring-2 focus-within:ring-[#8bc94a]/20 transition-all duration-300 shadow-md">
                    <input 
                        type="email" 
                        placeholder="Your email address" 
                        className="flex-1 bg-transparent border-none outline-none px-4 py-2 text-sm text-gray-200 placeholder-gray-500 focus:ring-0"  
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        disabled={isSubmitting}
                    />
                    <button  
                        type="submit" 
                        disabled={isSubmitting}
                        className="flex justify-center items-center rounded-full w-10 h-10 bg-[#8bc94a] hover:bg-[#ff912f] text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed group shadow-[0_4px_10px_rgba(139,201,74,0.3)] hover:shadow-[0_6px_15px_rgba(255,145,47,0.4)]"
                        aria-label="Subscribe"
                    >
                         <FontAwesomeIcon icon={faPaperPlane} className="w-4 h-4 text-[#0B1121] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
                {error && <p className="text-red-400 text-xs mt-3 ml-2">{error}</p>}
            </form>
        </div>
    )
}

export default FooterNewsletter
