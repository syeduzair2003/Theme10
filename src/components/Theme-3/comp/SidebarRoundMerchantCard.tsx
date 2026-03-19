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
      className="flex-column d-center text-center text-decoration-none merchant-circle-card"
    >
      {/* Circle logo */}
      <div className="merchant-circle d-flex align-items-center justify-content-center mb-2">
        <Image
          src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
          alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
          height={100}
          width={100}
          objectFit='contain'
          className="merchant-event-logo"
        />
      </div>

      {/* Cashback / promotional tag */}
      {merchant?.promotional_tag && (
        <div className="merchant-cashback">
          <span className="fw-bold n-17-color f-12">{merchant.promotional_tag}</span>
        </div>
      )}
    </Link>
  );
};

export default SidebarRoundMerchantCard;
