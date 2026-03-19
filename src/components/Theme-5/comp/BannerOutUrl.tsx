"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react'
interface Props {
  outUrl: string;
  merchantHref: string;
  unique_id: string;
  children: React.ReactNode;
}

const BannerOutUrl = ({ outUrl, merchantHref, unique_id, children }: Props) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent, outUrl: string, merchantHref: string) => {
    e.preventDefault();
    const newUrl = new URL(`${location.href}${merchantHref}`);
    newUrl.searchParams.set('show', 'true');
    newUrl.searchParams.set('p_id', unique_id);
    window.open(newUrl.toString(), '_blank');
    router.push(outUrl);
  }

  return (
    <Link href={outUrl} target="_blank" rel="noopener noreferrer" onClick={(e) => handleClick(e, outUrl, merchantHref)}>
      {children}
    </Link>
  )
}

export default BannerOutUrl