"use client"
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { apiContactForm } from '@/apis/user';

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
        <div className="card common-card p-sm-4">
            <div className="card-body">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="row gy-4">
                        <div className="col-sm-12 col-xs-12">
                            <label
                                htmlFor="name"
                                className="form-label mb-2 font-18 font-heading fw-600"
                            >
                                Full Name
                            </label>
                            <input
                                type="text"
                                className="common-input common-input--grayBg border"
                                id="name"
                                placeholder="Your name here"
                                name={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6 col-xs-6">
                            <label
                                htmlFor="email"
                                className="form-label mb-2 font-18 font-heading fw-600"
                            >
                                Your Mail
                            </label>
                            <input
                                type="email"
                                className="common-input common-input--grayBg border"
                                id="email"
                                placeholder="Your email here "
                                name={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-6 col-xs-6">
                            <label
                                htmlFor="number"
                                className="form-label mb-2 font-18 font-heading fw-600"
                            >
                                Your Number
                            </label>
                            <input
                                type="text"
                                className="common-input common-input--grayBg border"
                                id="number"
                                name={number}
                                placeholder="Your number here "
                                onChange={(e) => setNumber(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-12">
                            <label
                                htmlFor="message"
                                className="form-label mb-2 font-18 font-heading fw-600"
                            >
                                Your Message
                            </label>
                            <textarea
                                className="common-input common-input--grayBg border"
                                id="message"
                                placeholder="Write Your Message Here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                        <div className="col-sm-12">
                            <button className="btn btn-main btn-lg pill w-100"
                                disabled={loading}
                                type='submit'
                            >
                                <span className="fs-six text-nowrap">{loading ? 'Sending...' : 'Send Message'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ContactForm
