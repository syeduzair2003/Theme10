'use client';

import { apiContactForm } from '@/apis/user';
import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

interface Props {
    domain: string;
}

const ContactForm = ({domain}: Props) => {
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
        <div className="d-center align-items-start flex-column rounded-5 cus-border border b-seventh py-6 py-md-10 px-2 px-sm-6 px-lg-10">
            <h4 className="n17-color fw-mid text-start mb-2">Get In Touch</h4>
            <span className="v-line w-100 position-relative d-center f-width py-3"></span>
            <form onSubmit={handleSubmit} className="row gy-3 gy-md-5 pt-3 pt-md-4 cus-z1 gap-3 gap-md-4 position-relative">
                <div className="col-md-12">
                    <div className="input-area rounded-pill cus-border border b-seventh transition">
                        <div className="single-select third w-100 position-relative px-4 px-md-6 py-3 py-md-4">
                            <span className="label position-absolute fs-nine n15-color n1-bg-color start-0 px-1 px-md-2 mx-3 mx-md-4">Your name</span>
                            <input
                                type="text"
                                placeholder="Enter name..."
                                className="px-2 w-100"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="input-area rounded-pill cus-border border b-seventh transition">
                        <div className="single-select third w-100 position-relative px-4 px-md-6 py-3 py-md-4">
                            <span className="label position-absolute fs-nine n15-color n1-bg-color start-0 px-1 px-md-2 mx-3 mx-md-4">Your number</span>
                            <input
                                type="text"
                                placeholder="Enter number..."
                                className="px-2 w-100"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="input-area rounded-pill cus-border border b-seventh transition">
                        <div className="single-select third w-100 position-relative px-4 px-md-6 py-3 py-md-4">
                            <span className="label position-absolute fs-nine n15-color n1-bg-color start-0 px-1 px-md-2 mx-3 mx-md-4">Your email</span>
                            <input
                                type="email"
                                placeholder="Enter email..."
                                className="px-2 w-100"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="input-area rounded-5 cus-border border b-seventh transition">
                        <div className="single-select third w-100 position-relative px-4 px-md-6 py-3 py-md-4">
                            <span className="label position-absolute fs-nine n15-color n1-bg-color start-0 px-1 px-md-2 mx-3 mx-md-4">Enter message</span>
                            <textarea
                                placeholder="Say something..."
                                className="w-100"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-12 pt-1 pt-md-2">
                    <button
                        type="submit"
                        className="box-style box-second gap-2 gap-md-3 rounded-pill py-3 py-md-3 px-5 px-md-7 d-center"
                        disabled={loading}
                    >
                        <span className="fs-six text-nowrap">{loading ? 'Sending...' : 'Send Message'}</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
