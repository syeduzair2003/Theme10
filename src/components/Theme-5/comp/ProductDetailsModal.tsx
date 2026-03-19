'use client';

import React, { useState } from 'react';
import { discardHTMLTags, getCurrencySymbol } from '@/constants/hooks';
import { Offer } from '@/services/dataTypes';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface Props {
    product: Offer;
    merchantName: string;
    merchantLogo: string;
    domain: string;
}

const ProductDetailsModal = ({ product, merchantName, merchantLogo, domain }: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    const modalContent = isOpen ? (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-slate-900 text-white hover:bg-indigo-600 transition-colors flex items-center justify-center"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-start gap-6 mb-6 pb-6 border-b border-slate-200">
                        <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-4">
                            <Image
                                src={merchantLogo}
                                alt={merchantName}
                                width={80}
                                height={80}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">
                                {discardHTMLTags(product?.offer_title)}
                            </h2>
                            <p className="text-sm text-slate-500 font-medium">
                                by <span className="text-slate-900 font-bold">{merchantName}</span>
                            </p>
                        </div>
                    </div>

                    {/* Pricing */}
                    {product?.offer_type?.name === "product" && (product?.sale_price || product?.original_price) && (
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-6">
                            <div className="flex items-center gap-4">
                                {product?.sale_price && (
                                    <span className="text-4xl font-black text-indigo-600">
                                        {getCurrencySymbol(product?.currency)}{product?.sale_price}
                                    </span>
                                )}
                                {product?.original_price && (
                                    <span className="text-xl line-through text-slate-400 font-medium">
                                        {getCurrencySymbol(product?.currency)}{product?.original_price}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Description */}
                    {product?.offer_detail && (
                        <div className="mb-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Description</h3>
                            <div className="text-slate-600 leading-relaxed text-sm">
                                {discardHTMLTags(product?.offer_detail)}
                            </div>
                        </div>
                    )}

                    {/* Coupon Code */}
                    {product?.coupon_code && (
                        <div className="mb-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-3">Coupon Code</h3>
                            <div className="bg-slate-900 text-white px-6 py-4 rounded-xl font-mono text-lg font-bold text-center tracking-wider">
                                {product?.coupon_code}
                            </div>
                        </div>
                    )}

                    {/* Offer Type & Validity */}
                    <div className="grid grid-cols-2 gap-4">
                        {product?.end_date && (
                            <div className="bg-slate-50 rounded-xl p-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Valid Until</p>
                                <p className="text-sm font-black text-slate-900">
                                    {new Date(product?.end_date).toLocaleDateString()}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    ) : null;

    return (
        <>
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsOpen(true);
                }}
                className="text-[11px] font-bold text-indigo-600 hover:text-indigo-700 transition-colors underline"
            >
                View Details
            </button>
            {mounted && typeof window !== 'undefined' && modalContent && createPortal(modalContent, document.body)}
        </>
    );
};

export default ProductDetailsModal;