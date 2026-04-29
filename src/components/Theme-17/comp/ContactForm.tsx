"use client";
import { apiContactForm } from '@/apis/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
    domain: string;
}

const ContactForm = ({ domain }: Props) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !number.trim() || !email.trim() || !message.trim()) {
            toast.error('All fields are required.', { autoClose: 2000 });
            return;
        }

        setLoading(true);

        try {
            const res = await apiContactForm(domain, name, number, email, message);

            if (res?.status == 200) {
                toast.success('Your message has been sent!', { autoClose: 2000 });
                setName('');
                setNumber('');
                setEmail('');
                setMessage('');
            } else {
                toast.error('Something went wrong. Try again!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Failed to send message. Please try again later.', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 border border-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] h-full">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Get In Touch</h2>
            <p className="text-gray-500 mb-10">We&apos;d love to hear from you. Please fill out this form.</p>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">Your Name</label>
                    <input
                        type="text"
                        placeholder="e.g. John Doe"
                        className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-full focus:ring-4 focus:ring-[#8bc94a]/10 focus:border-[#8bc94a] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">Phone Number</label>
                        <input
                            type="text"
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-full focus:ring-4 focus:ring-[#8bc94a]/10 focus:border-[#8bc94a] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-full focus:ring-4 focus:ring-[#8bc94a]/10 focus:border-[#8bc94a] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2 ml-4">Your Message</label>
                    <textarea
                        placeholder="How can we help you?"
                        rows={5}
                        className="w-full px-8 py-5 bg-gray-50/50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-[#8bc94a]/10 focus:border-[#8bc94a] focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-700 resize-none"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-[#ff912f] hover:bg-[#8bc94a] text-white font-bold px-12 py-4 rounded-full shadow-lg shadow-orange-500/20 hover:shadow-green-500/20 transition-all duration-300 disabled:opacity-70 active:scale-95"
                    >
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
