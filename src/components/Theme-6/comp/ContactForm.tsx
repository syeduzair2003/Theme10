'use client';

import { apiContactForm } from '@/apis/user';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

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
                setName(''); setNumber(''); setEmail(''); setMessage('');
            } else {
                toast.error('Something went wrong. Try again!', { autoClose: 2000 });
            }
        } catch (error) {
            toast.error('Failed to send message.', { autoClose: 2000 });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-form-wrapper">
            <h3 className="form-title">Get In Touch</h3>
            <p className="form-subtitle">We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.</p>
            
            <form onSubmit={handleSubmit} className="modern-form">
                <div className="input-group-custom">
                    <label className="input-label">Your Name</label>
                    <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-group-custom">
                    <label className="input-label">Phone Number</label>
                    <input
                        type="text"
                        placeholder="e.g. +1 234 567 890"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>

                <div className="input-group-custom">
                    <label className="input-label">Email Address</label>
                    <input
                        type="email"
                        placeholder="e.g. john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className="input-group-custom">
                    <label className="input-label">Your Message</label>
                    <textarea
                        rows={4}
                        placeholder="How can we help you?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : 'Send Message'}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ContactForm;