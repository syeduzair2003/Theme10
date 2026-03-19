"use client";

import { useState, FormEvent } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaPaperPlane } from "react-icons/fa";

interface NewsletterFormProps {
  company_id: string;
  onSubmit: (company_id: string, formData: FormData) => Promise<{ success: boolean; message?: string | null }>;
}

export default function NewsletterForm({ company_id, onSubmit }: NewsletterFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setLoading(true);
    try {
      const result = await onSubmit(company_id, formData);

      if (result.success) {
        toast.success("🎉 Subscribed successfully!");
      } else {
        toast.error("❌ Subscription failed. Please try again.");
      }
    } catch (error) {
      toast.error("❌ Subscription failed. Please try again.");
      console.log("Error submitting form: ", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex !flex-col sm:flex-row items-center gap-3">
      <div className="relative sm:w-2/3 !w-[100%]">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 pr-16 rounded-xl text-white border border-white bg-transparent
                    placeholder-white/70 focus:outline-none focus:border-white 
                    focus:shadow-[0_0_15px_rgba(255,255,255,0.7)] transition"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 px-4 py-2
                    rounded-lg bg-white text-[var(--primary-color)] font-semibold shadow-md 
                    disabled:opacity-70"
        >
          <FaPaperPlane className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
