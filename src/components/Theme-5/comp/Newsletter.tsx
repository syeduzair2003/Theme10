'use client'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { splitHeading } from '@/constants/hooks'
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

  const [first, second] = splitHeading("Never Miss a Winning Deal");
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
      if (response.message == "Subscribed successfully!") {
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
    <section className="py-20 bg-[#fafafa] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none overflow-hidden">
        {/* Top Left Blob - Shifted slightly more inward */}
        <div className="absolute -top-12 -left-12 w-[500px] h-[500px] bg-cyan-100/50 rounded-full blur-[100px]"></div>

        {/* Bottom Right Blob - Using a deeper violet for contrast */}
        <div className="absolute bottom-0 -right-20 w-[400px] h-[400px] bg-violet-100/60 rounded-full blur-[80px]"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="relative bg-[#0F172A] rounded-[3rem] p-8 md:p-16 overflow-hidden shadow-2xl shadow-indigo-200">

          {/* Decorative Abstract Background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-[80px] -ml-36 -mb-36"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6 tracking-tight">
                {first || 'Subscribe to our newsletter'} <span className="text-indigo-400">{second || 'to get the best deals'}</span> right in your email.
              </h2>
              <p className="text-lg text-slate-400 mb-10 max-w-md leading-relaxed">
                Get a curated list of the worlds best offers and exclusive coupon codes, delivered weekly. No spam, just savings.
              </p>
            </div>
            {/* Form Area */}
            <div className="bg-slate-800/40 backdrop-blur-xl p-8 md:p-10 rounded-[2rem] border border-white/5">
              <form onSubmit={(e) => handleRate(e, email)} className="flex flex-col gap-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email..."
                    className="w-full bg-slate-900/50 border border-slate-700 text-white px-6 py-5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all placeholder:text-slate-500"
                  />
                </div>
                <button type="submit" className="w-full bg-white text-slate-900 hover:bg-indigo-400 hover:text-white px-8 py-5 rounded-2xl transition-all duration-300 font-black uppercase tracking-widest shadow-xl active:scale-95">
                  Subscribe Now
                </button>
              </form>
              <p className="text-[11px] text-slate-500 mt-6 text-center leading-relaxed">
                By subscribing, you agree to our <a href="#" className="underline hover:text-indigo-400">Privacy Policy</a>. You can unsubscribe at any time.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Newsletter