import React from 'react';
import Image from 'next/image';
import { faThumbsDown, faThumbsUp } from '@/constants/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { calculateOfferDuration, getBaseImageUrl } from '@/constants/hooks';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Offer } from '@/services/dataTypes';


const RateUs = dynamic(() => import('./RateUs'), { ssr: false });
const SocialMediaShare = dynamic(() => import('./SocialMediaShare'), { ssr: false });

interface Props {
    data: Offer;
    companyId: string;
    onClose: () => void;
    domain: string;
    merchantHref: string;
}

const OfferModal = ({ data, companyId, onClose, domain, merchantHref }: Props) => {
    const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
    const absoluteOutUrl = `/${finalUrl}`;
    const imgSrc = data?.offer_type?.name === "product" ? data?.product_image : data?.merchant?.merchant_logo;
    
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      
            <div 
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            />

            <div className="relative w-full max-w-3xl bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[70vh]">
                
                
                <div className="relative bg-white pt-12 pb-6 px-8 md:px-12 text-center border-b border-slate-50">
                    <button 
                        onClick={onClose}
                        className="absolute top-5 right-5 z-50 w-8 h-8 bg-slate-100 text-slate-500 hover:bg-red-50 hover:text-red-500 rounded-full flex items-center justify-center transition-all"
                    >
                    </button>

                    <div className="max-w-xl mx-auto space-y-4">
                        <h2 className="text-xl md:text-2xl font-black text-slate-800 leading-tight uppercase tracking-tight">
                            {data?.offer_title}
                        </h2>

                        <div className="flex justify-center">
                            {data?.coupon_code ? (
                                <div className="inline-flex flex-col md:flex-row items-center bg-blue-50/50 border-2 border-dashed border-blue-200 rounded-2xl p-1.5 md:pl-5 group">
                                    <span className="text-lg font-black text-blue-600 tracking-widest uppercase px-4 py-1">
                                        {data?.coupon_code}
                                    </span>
                                    <button className="bg-blue-600 hover:bg-slate-900 text-white px-8 py-3 rounded-xl font-bold text-[11px] uppercase tracking-widest transition-all shadow-md">
                                        Copy Code
                                    </button>
                                </div>
                            ) : (
                                <Link 
                                    href={absoluteOutUrl} 
                                    className="bg-blue-600 hover:bg-slate-900 text-white px-10 py-3.5 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg"
                                >
                                    Activate Deal
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* 2. Scrollable Body Content */}
                <div className="flex-grow overflow-y-auto p-8 md:p-10 bg-white scrollbar-thin scrollbar-thumb-slate-200">
                    <div className="flex flex-col md:flex-row gap-8">
                       
                        <div className="md:w-3/5 space-y-6">
                            <div className="flex gap-2">
                                <span className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
                                    Verified
                                </span>
                                <span className="bg-slate-50 text-slate-500 border border-slate-100 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider">
                                    {data?.end_date ? calculateOfferDuration(data?.end_date) : "Active Deal"}
                                </span>
                            </div>

                            <div className="relative w-24 h-14 bg-white rounded-lg border border-slate-100 p-2 shadow-sm">
                                <Image 
                                    src={getBaseImageUrl(domain, imgSrc, "")} 
                                    alt="Logo" fill className="object-contain p-2" 
                                />
                            </div>

                            <div className="space-y-2">
                                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offer Details</h4>
                                <div 
                                    className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: data?.offer_detail }}
                                />
                            </div>
                        </div>

                        {/* Rating Side */}
                        <div className="md:w-2/5">
                            <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100">
                                <RateUs offer_id={data?.unique_id || ""} company_id={companyId} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Footer Section (Social Icons & Helpful) */}
                <div className="bg-slate-50/30 border-t border-slate-100 p-6 md:px-10">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Helpful?</span>
                            <div className="flex gap-2">
                                <button className="px-5 py-2 rounded-lg text-[10px] font-bold border border-slate-200 bg-white text-slate-600 hover:bg-emerald-500 hover:text-white transition-all">
                                    <FontAwesomeIcon icon={faThumbsUp} className="mr-2" /> YES
                                </button>
                                <button className="px-5 py-2 rounded-lg text-[10px] font-bold border border-slate-200 bg-white text-slate-600 hover:bg-red-500 hover:text-white transition-all">
                                    <FontAwesomeIcon icon={faThumbsDown} className="mr-2" /> NO
                                </button>
                            </div>
                        </div>

                        {/* Social Media Share Icons */}
                        <div className="flex items-center gap-3">
                            <SocialMediaShare 
                                offerUrl={typeof window !== 'undefined' ? encodeURIComponent(window.location.href) : ""} 
                                offerTitle={data ? encodeURIComponent(data?.offer_title || data?.offer_detail) : ""} 
                                merchantHref={merchantHref} 
                                unique_id={data?.unique_id} 
                                domain={domain} 
                            />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default OfferModal;