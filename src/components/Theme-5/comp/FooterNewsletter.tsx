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
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiSubscribeNewsletter(companyId, email);

      if (response.message === "Subscribed successfully") {
        toast.success("Welcome to our newsletter!", { autoClose: 2000 });
        setEmail("");
      } else {
        toast.info("You are already subscribed to our newsletter.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="relative mt-6 max-w-md"
      onSubmit={handleSubscribe}
      autoComplete="off"
    >
      <div className="relative flex items-center p-1 bg-white rounded-full border border-slate-200 shadow-sm focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all duration-300">
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow bg-transparent px-3 sm:px-5 py-2 text-slate-700 text-sm outline-none placeholder:text-slate-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className={`
                        flex items-center justify-center rounded-full px-3 sm:px-5 py-2 sm:py-2.5 
                        transition-all duration-300 active:scale-95
                        ${loading
              ? 'bg-slate-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-indigo-200'}
                    `}
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs font-bold uppercase tracking-wider">Join</span>
              <FontAwesomeIcon icon={faPaperPlane} className="w-3.5 h-3.5" />
            </div>
          )}
        </button>
      </div>

      {/* Optional helper text */}
      <p className="mt-3 ml-4 text-[11px] text-slate-400">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </form>
  )
}

export default FooterNewsletter