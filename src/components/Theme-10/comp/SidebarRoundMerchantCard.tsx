import cookieService from '@/services/CookiesService';
import { EventMerchant, Merchant, minimalMerchantData } from '@/services/dataTypes';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle } from '@/constants/hooks';

interface Props {
  merchant: EventMerchant | Merchant | minimalMerchantData;
  merSlug: string;
  slugType: string;
}

const SidebarRoundMerchantCard = async ({ merchant, merSlug, slugType }: Props) => {
  const domain = (await cookieService.get('domain')).domain;

  return (
    <Link
      href={getMerchantHref(merchant, merSlug, slugType)}
      className="no-underline group relative flex flex-col items-center py-6 px-3 transition-all duration-500"
    >
      {/* 🔵 Glow Background */}
      <div className="absolute inset-0 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 
        transition-all duration-700 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 
        rounded-3xl blur-2xl"></div>

      {/* 🟣 Logo Card */}
      <div className="relative z-10 w-24 h-24 flex items-center justify-center 
        rounded-3xl bg-white/70 backdrop-blur-md 
        border border-slate-200/60 
        shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] 
        transition-all duration-500 
        group-hover:-translate-y-3 
        group-hover:shadow-[0_20px_50px_-15px_rgba(0,0,0,0.25)]">

        {/* Gradient Border Ring */}
        <div className="absolute inset-0 rounded-3xl p-[1px] 
          bg-gradient-to-br from-blue-400 via-indigo-400 to-purple-400 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-full h-full bg-white rounded-3xl"></div>
        </div>

        {/* Logo */}
        <div className="relative z-10 w-14 h-14 flex items-center justify-center">
          <Image
            src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
            alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
            height={60}
            width={60}
            className="object-contain transition-all duration-500 group-hover:scale-110"
          />
        </div>

        {/* 🎯 Floating Discount Badge */}
        {/* {merchant?.promotional_tag && (
          <div className="absolute -top-2 -right-2">
            <span className="px-2 py-1 text-[8px] font-black uppercase tracking-wide 
              bg-gradient-to-r from-blue-600 to-indigo-600 
              text-white rounded-full shadow-lg">
              {merchant.promotional_tag}
            </span>
          </div>
        )} */}
      </div>

      {/* 📝 Merchant Name */}
      <div className="mt-5 text-center relative">
        <p className="text-xs font-extrabold tracking-wider text-slate-800 
          group-hover:text-blue-600 transition-colors duration-300 uppercase">
          {merchant?.merchant_name}
        </p>

        {/* Animated Underline */}
        <div className="mx-auto mt-2 h-[2px] w-0 bg-gradient-to-r 
          from-blue-500 to-indigo-500 
          rounded-full group-hover:w-8 transition-all duration-300"></div>
      </div>
    </Link>
  );
};

export default SidebarRoundMerchantCard;
