'use client';

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

            if (res?.data) {
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
        <form onSubmit={handleSubmit} className="row gy-3 gy-md-5 pt-3 pt-md-4 cus-z1 gap-3 gap-md-4 position-relative">

            <div className='row'>
                <div className="col-md-6 col-sm-12 col-xs-12 marB30">
                    <input
                        type="text"
                        placeholder="Enter name..."
                        className="px-2 w-100"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-6 col-sm-12 col-xs-12 marB30">
                    <input
                        type="text"
                        placeholder="Enter number..."
                        className="px-2 w-100"
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 marB30">
                    <input
                        type="email"
                        placeholder="Enter email..."
                        className="px-2 w-100"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12 marB30">
                    <textarea
                        placeholder="Say something..."
                        className="w-100"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className="col-md-12 col-sm-12 col-xs-12">
                    <button
                        type="submit"
                        className="itg-btn box-btn deal-btn"
                        disabled={loading}
                    >{loading ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default ContactForm
