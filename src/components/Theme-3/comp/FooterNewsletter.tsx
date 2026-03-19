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
                    }else{
                        toast.error("You have already subscribe to our newsletter.")
                    }
                } catch (error) {
                    console.error("Error subscribing:", error);
                }
            };
    return (
        <form className="mt-3 mt-md-4" onSubmit={(e) => {handleRate(e, email)}} autoComplete="off">
        <div className="input-area second w-100 rounded-pill p-2 transition cus-border border b-eighteen">
            <div className="d-center justify-content-between">
                <div className="input-single w-100">
                    <input type="email" placeholder="Email address" className="px-3 px-md-4 w-100 n1-color"  value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button  type="submit" className="rounded-pill px-4 px-md-6 py-2 py-md-3 s1-bg-color overflow-hidden ">
                    <FontAwesomeIcon icon={faPaperPlane} style={{ width: '16px', height: '16px', color: 'black' }}/>
                </button>
            </div>
        </div>
        </form>
    )
}

export default FooterNewsletter
