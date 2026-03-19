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
  className="flex flex-col items-center text-center no-underline transform transition duration-300 ease-in-out hover:scale-105 mt-2"
>
  {/* Circle logo */}
  <div className="merchant-circle flex items-center justify-center px-2 mb-1 w-[100px] h-[100px] overflow-hidden bg-white rounded-4 border-2 border-[#e41717]">
    <Image
      src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
      alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
      height={200}
      width={150}
      className="object-contain w-full h-full"
    />
  </div>

  {/* <p>{merchant?.merchant_name}</p> */}

  {/* Cashback / promotional tag */}
  {merchant?.promotional_tag && (
    <div className="merchant-cashback mt-1">
      <span className="font-bold text-[#n-17-color] text-xs">{merchant.promotional_tag}</span>
    </div>
  )}
</Link>

    );
  };

  export default SidebarRoundMerchantCard;
