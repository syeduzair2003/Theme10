'use client';
import { apiContactForm } from '@/apis/user';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { ScaleReveal } from './MotionWrapper'; // Animation Wrapper import kiya

const ContactForm = ({ domain }: { domain: string }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !number.trim() || !email.trim() || !message.trim()) {
            toast.error('All fields are required.');
            return;
        }
        setLoading(true);
        try {
            const res = await apiContactForm(domain, name, number, email, message);
            if (res?.data) {
                toast.success('Your message has been sent!');
                setName(''); setNumber(''); setEmail(''); setMessage('');
            } else {
                toast.error('Something went wrong.');
            }
        } catch (error) {
            toast.error('Failed to send message.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full px-5 py-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400";

    return (
        <ScaleReveal> {/* Pura form smooth scale hokar aayega */}
            <div className="bg-white rounded-[2rem] border border-slate-100 p-8 md:p-12 shadow-2xl shadow-slate-200/60">
                <div className="mb-10">
                    <h4 className="text-3xl font-bold text-slate-900 mb-2">Get In Touch</h4>
                    {/* Error Fixed Here: We'd -> We&apos;d */}
                    <p className="text-slate-500">We&apos;d love to hear from you. Please fill out this form.</p>
                    <div className="w-20 h-1.5 bg-blue-600 rounded-full mt-4" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                className={inputClasses}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700 ml-1">Phone Number</label>
                            <input
                                type="text"
                                placeholder="+1 (555) 000-0000"
                                className={inputClasses}
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                        <input
                            type="email"
                            placeholder="john@example.com"
                            className={inputClasses}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 ml-1">Your Message</label>
                        <textarea
                            rows={5}
                            placeholder="How can we help you?"
                            className={`${inputClasses} resize-none`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-3"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : null}
                        <span>{loading ? 'Sending...' : 'Send Message'}</span>
                    </button>
                </form>
            </div>
        </ScaleReveal>
    );
};

export default ContactForm;