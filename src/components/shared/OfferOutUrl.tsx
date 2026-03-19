"use client"
import { apiOutUrl } from '@/apis/user';
import { extractOfferCodeFromUrl } from '@/constants/hooks';
import Link from 'next/link';
import { useRouter, usePathname, notFound } from 'next/navigation';
import React, { useCallback } from 'react'
interface Props {
  outUrl: string;
  merchantHref: string;
  unique_id: string;
  children: React.ReactNode;
  customClass?: string;
  domain: string;
}

const OfferOutUrl = ({ outUrl, merchantHref, unique_id, children, customClass, domain }: Props) => {
  const router = useRouter();

  // Ensure the outUrl is absolute and clean
  const finalUrl = outUrl?.startsWith('/') ? outUrl?.replace(/^\/+/, '') : outUrl;
  const absoluteOutUrl = `/${finalUrl}`; // This avoids /store prefix
  const offerCode = extractOfferCodeFromUrl(absoluteOutUrl);

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Open merchantHref in new tab
      const baseUrl = window.location.origin;
      const newTabUrl = new URL(`${baseUrl}${merchantHref}`);
      newTabUrl.searchParams.set('show', 'true');
      newTabUrl.searchParams.set('p_id', unique_id);
      window.open(newTabUrl.toString(), '_blank');

      try {
        // Get the actual tracking URL from API
        const response = await apiOutUrl(domain, offerCode);
        const redirectUrl = response?.data;

        if (redirectUrl) {
          window.location.href = redirectUrl;
        } else {
          notFound();
        }
      } catch (error) {
        console.error("Error getting redirect URL", error);
      }
    },
    [merchantHref, unique_id, offerCode]
  );

  return (
    <Link
      href={absoluteOutUrl}
      className={customClass}
      target="_blank"
      rel="nofollow sponsored noopener noreferrer"
      onClick={handleClick}
    >
      {children}
    </Link>
  )
}
export default OfferOutUrl
