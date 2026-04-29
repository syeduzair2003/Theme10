"use client";
import React, { useState } from 'react';
import { toast } from "react-toastify";
import { apiSubscribeNewsletter } from '@/apis/page_optimization';

interface Props {
  companyId: string;
}

const Newsletter = ({ companyId }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const response = await apiSubscribeNewsletter(companyId, email);
      if (response.message === "Subscribed successfully") {
        toast.success("Thank you for your feedback!", { autoClose: 2000 });
        setEmail("");
      } else {
        toast.error("You have already subscribed to our newsletter.");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div
          className="relative overflow-hidden rounded-3xl md:rounded-[2.5rem] p-6 sm:p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          }}
        >
          {/* ── Background Decorative Gradient ── */}
          <div className="absolute top-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-[#ff912f] opacity-10 blur-[80px] md:blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-[#8bc94a] opacity-5 blur-[80px] md:blur-[100px] pointer-events-none" />

          {/* ── Left Content ── */}
          <div className="flex-1 text-center lg:text-left z-10 w-full">
            <h2 className="oswald text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4 tracking-tight">
              Never Miss a <br className="hidden lg:block" />
              <span style={{ color: '#ff912f' }}>Golden Deal</span> Again
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed">
              Join <span className="text-white font-bold">50,000+</span> shoppers receiving the best coupons directly in their inbox every morning.
            </p>
          </div>

          {/* ── Right Content: Form ── */}
          <div className="w-full lg:max-w-md z-10">
            <form
              onSubmit={handleSubscribe}
              className="relative flex flex-col sm:flex-row items-stretch sm:items-center bg-transparent sm:bg-white rounded-2xl sm:rounded-full p-0 sm:p-1.5 shadow-none sm:shadow-lg group focus-within:ring-0 sm:focus-within:ring-2 sm:focus-within:ring-[#8bc94a] transition-all gap-3 sm:gap-0"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full sm:flex-1 bg-white sm:bg-transparent px-6 sm:px-4 py-3.5 sm:py-3 rounded-full sm:rounded-none text-gray-800 text-sm md:text-base outline-none placeholder:text-gray-400 shadow-md sm:shadow-none focus:ring-2 sm:focus:ring-0 focus:ring-[#8bc94a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-[#ff912f] text-white px-6 md:px-8 py-3.5 sm:py-3 rounded-full text-sm font-black uppercase tracking-widest hover:bg-[#ff912f]/90 transition-all active:scale-95 disabled:opacity-70 flex justify-center items-center gap-2 shadow-md sm:shadow-none"
              >
                {loading ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
            <p className="mt-4 text-[11px] text-gray-500 text-center lg:text-left px-2 sm:px-4">
              * By subscribing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;