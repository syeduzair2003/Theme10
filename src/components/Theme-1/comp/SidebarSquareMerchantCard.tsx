import cookieService from '@/services/CookiesService';
import { EventMerchant, Merchant, minimalMerchantData } from '@/services/dataTypes';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl, getMerchantHref, getRandomStoreSeoTitle } from '@/constants/hooks';

// Styles for the modern look (You can move this to a CSS module)
const styles = {
  card: {
    width: '100%',
    aspectRatio: '1/1', // Forces a square shape
    borderRadius: '12px', // Modern rounded corners
    border: '1px solid #c2e4f0', // Subtle border
    backgroundColor: '#f0fbff',
    position: 'relative' as const,
    overflow: 'hidden',
    transition: 'all 0.2s ease-in-out',
  },
  imgContainer: {
    padding: '12px',
    width: '100%',
    height: '100%',
    display: 'flex',
    // alignItems: 'flex-start',
    justifyContent: 'center',
  },
  tag: {
    position: 'absolute' as const,
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(4px)',
    fontSize: '10px',
    fontWeight: '700',
    color: '#0081c1', // Example brand color
    textAlign: 'center' as const,
    padding: '4px 2px',
    borderTop: '1px solid #f3f4f6',
    // whiteSpace: 'nowrap' as const,
    // overflow: 'hidden',
    // textOverflow: 'ellipsis',
  }
};

interface Props {
  merchant: EventMerchant | Merchant | minimalMerchantData;
  merSlug: string;
  slugType: string;
}

const SidebarSquareMerchantCard = async ({ merchant, merSlug, slugType }: Props) => {
  const domain = (await cookieService.get('domain')).domain;

  return (
    <Link
      href={getMerchantHref(merchant, merSlug, slugType)}
      // Retaining your flex classes, but adding a hover class if you have one
      className="d-block text-decoration-none merchant-square-card-wrapper"
      style={{ maxWidth: '110px', margin: '0 auto' }} // Limits width in sidebar
    >
      {/* Square Card Container */}
      <div className="merchant-square-card shadow-sm-hover" style={styles.card}>
        
        {/* Image Area */}
        <div style={styles.imgContainer}>
          <Image
            src={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
            alt={getRandomStoreSeoTitle(merchant?.merchant_name)}
            width={80}
            height={80}
            style={{ 
                objectFit: 'contain', 
                maxWidth: '100%', 
                maxHeight: '50px' 
            }}
            className="merchant-logo"
          />
        </div>

        {/* Cashback / promotional tag - Docked at bottom */}
        {merchant?.promotional_tag && (
          <div style={styles.tag}>
            {merchant.promotional_tag}
          </div>
        )}
      </div>
    </Link>
  );
};

export default SidebarSquareMerchantCard;