"use client";

import { Offer } from "@/services/dataTypes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaFacebookF, FaXTwitter, FaWhatsapp, FaLinkedinIn, FaTelegram, FaThumbsUp, FaThumbsDown } from "react-icons/fa6";
import Link from "next/link";
import { apiUpdateOfferLikes } from "@/apis/offers";
import { toast } from "react-toastify";
import { discardHTMLTags, getBaseImageUrl } from "@/constants/hooks";
import Button from "./Button";
import Rating from "./Rating";

interface Props {
  data: Offer | null;
  companyId: string;
  onClose: () => void;
  domain: string;
}

export default function OfferPopOver({ data, companyId, onClose, domain }: Props) {
  const [hasLiked, setHasLiked] = useState(false);
  const [isLiked, setIsLiked] = useState<number | null>(null);

  const offerTitle = data?.offer_title || data?.offer_detail || "";
  const encodedTitle = encodeURIComponent(offerTitle);
  const offerUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";

  // check localstorage for previous like
  useEffect(() => {
    if (data?.unique_id) {
      const lastLiked = localStorage.getItem(`hasLiked_${data?.unique_id}`);
      if (lastLiked && new Date().getTime() - parseInt(lastLiked) < 86400000) {
        setHasLiked(true);
      }
    }
  }, [data?.unique_id]);

  const handleLikeStatus = async (val: number) => {
    if (hasLiked || !data?.unique_id) {
      toast.error("You have already rated, please try again later!", { autoClose: 2000 });
      return;
    }
    try {
      const response = await apiUpdateOfferLikes(companyId, data.unique_id, val);
      if (response.status === "success") {
        toast.success("Thank you for your feedback!", { autoClose: 2000 });
        setIsLiked(val);
        localStorage.setItem(`hasLiked_${data.unique_id}`, new Date().getTime().toString());
        setHasLiked(true);
      }
    } catch (err) {
      toast.error("An error occurred while submitting feedback.", { autoClose: 2000 });
    }
  };

  if (!data) return null;

  return (
    <div className="p-1 md:p-0 fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      {/* Modal Box */}
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h5 className="text-lg font-bold text-center flex-1">{data.offer_title || data.offer_detail}</h5>
          <Button onClick={onClose} label={"✕"} size="sm" />
          {/* <button
            className="text-gray-500 hover:text-gray-800 transition"
            onClick={onClose}
          >
            ✕
          </button> */}
        </div>

        {/* Body */}
        <div className="flex flex-col md:flex-row">
          {/* Left Content */}
          <div className="flex-1 p-6">
            <div className="flex flex-col items-center">
              <Image
                src={getBaseImageUrl(domain, data.merchant?.merchant_logo, "")}
                alt={offerTitle}
                width={150}
                height={150}
                className="object-contain mb-4"
              />
              {data.offer_detail && (
                <p className="text-sm text-gray-700 mb-4 text-justify">
                  {discardHTMLTags(data.offer_detail)}
                </p>
              )}

              {/* Deal Button */}
              <Link
                href={data.url || "#"}
                target="_blank"
                rel="nofollow sponsored noopener noreferrer"
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-lg shadow hover:bg-yellow-500 transition"
              >
                {data.coupon_code ? data.coupon_code : "GET DEAL"}
              </Link>

              <h6 className="mt-4 font-semibold">CLICK BUTTON ABOVE TO SHOP ONLINE AND SAVE</h6>

              {/* Did it work? */}
              <p className="mt-4 font-semibold">Did it work?</p>
              <div className="flex gap-6 text-3xl">
                <FaThumbsUp
                  className="cursor-pointer text-green-500 hover:scale-110 transition"
                  onClick={() => handleLikeStatus(1)}
                />
                <FaThumbsDown
                  className="cursor-pointer text-red-500 hover:scale-110 transition"
                  onClick={() => handleLikeStatus(0)}
                />
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l p-4">
            <h6 className="text-center font-semibold mb-2">Rating</h6>
            <Rating offer_id={data.unique_id} company_id={companyId} />
          </div>
        </div>

        {/* Footer: Social Share */}
        <div className="border-t p-4 flex justify-center gap-4">
          <Link
            href={`https://www.facebook.com/sharer/sharer.php?u=${offerUrl}`}
            target="_blank"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FaFacebookF />
          </Link>
          <Link
            href={`https://x.com/intent/tweet?url=${offerUrl}&text=${encodedTitle}`}
            target="_blank"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FaXTwitter />
          </Link>
          <Link
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${offerUrl}`}
            target="_blank"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FaWhatsapp />
          </Link>
          <Link
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${offerUrl}`}
            target="_blank"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href={`https://t.me/share/url?url=${offerUrl}&text=${encodedTitle}`}
            target="_blank"
            className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
          >
            <FaTelegram />
          </Link>
        </div>
      </div>
    </div>
  );
}
