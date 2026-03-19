"use client"
import { apiUpdateOfferLikes } from '@/apis/offers';
import { Offer } from '@/services/dataTypes';
import React, { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import Link from 'next/link';
import { calculateOfferDuration, discardHTMLTags, getBaseImageUrl } from '@/constants/hooks';
import Image from 'next/image';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCalendarDays, faThumbsDown, faThumbsUp, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Props {
  data: Offer;
  companyId: string;
  onClose: () => void;
  domain: string;
}

const OfferModal = ({ data, companyId, onClose, domain }: Props) => {
  const [mounted, setMounted] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (data?.unique_id) {
      const lastLiked = localStorage.getItem(`hasLiked_${data?.unique_id}`);
      if (lastLiked && new Date().getTime() - parseInt(lastLiked) < 86400000) {
        setHasLiked(true);
      }
    }
  }, [data?.unique_id]);

  const handleLikeStatus = async (val: number) => {
    if (hasLiked) {
      toast.error("You have already rated, please try again later!", { autoClose: 2000 });
      return;
    }
    try {
      const response = await apiUpdateOfferLikes(companyId, data?.unique_id, val);
      if (response.status === "success") {
        toast.success("Thank you for your feedback!", { autoClose: 2000 });
        localStorage.setItem(`hasLiked_${data?.unique_id}`, new Date().getTime().toString());
        setHasLiked(true);
      }
    } catch (error) {
      toast.error("An error occurred while submitting your feedback.", { autoClose: 2000 });
    }
  };

  const finalUrl = data?.url?.startsWith('/') ? data?.url.replace(/^\/+/, '') : data?.url;
  const absoluteOutUrl = `/${finalUrl}`;

  if (!mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-lg text-sm font-bold">
              <FontAwesomeIcon icon={faCheck} className="w-3 h-3" />
              Verified
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold">
              <FontAwesomeIcon icon={faCalendarDays} className="w-3 h-3" />
              {data?.end_date ? calculateOfferDuration(data?.end_date) : "Life Time"}
            </span>
          </div>

          <div className="flex justify-center mb-6">
            <Image
              src={getBaseImageUrl(domain, data?.merchant.merchant_logo, "")}
              alt={`${data?.offer_title} merchant`}
              width={120}
              height={120}
              className="rounded-lg shadow-sm"
            />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2">Offer Details</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {discardHTMLTags(data?.offer_detail || "")}
          </p>
        </div>

        {/* Body */}
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 mb-4 pr-8">
            {data?.offer_title}
          </h2>
          <Link
            href={absoluteOutUrl}
            rel="nofollow sponsored noopener noreferrer"
            className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
          >
            Get Deal
          </Link>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between gap-4 flex-wrap">
          <span className="text-sm font-medium text-slate-600">Did it work?</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleLikeStatus(1)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-bold transition-colors"
            >
              <FontAwesomeIcon icon={faThumbsUp} className="w-3 h-3" />
              Yes
            </button>
            <button
              onClick={() => handleLikeStatus(0)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors"
            >
              <FontAwesomeIcon icon={faThumbsDown} className="w-3 h-3" />
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default OfferModal;
