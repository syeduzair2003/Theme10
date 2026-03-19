import cookieService from '@/services/CookiesService';
import {
  EventMerchant,
  Merchant,
  minimalMerchantData,
} from '@/services/dataTypes';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl, getMerchantHref } from '@/constants/hooks';

const styles = {
  card: {
    width: '100%',
    aspectRatio: '1 / 1',
    // borderRadius: '12px',
    // border: '1px solid #c2e4f0',
    // backgroundColor: '#f0fbff',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  imgWrapper: {
    width: '100%',
    height: '100%',
    padding: '14px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

interface Props {
  merchant: EventMerchant | Merchant | minimalMerchantData;
  merSlug: string;
  slugType: string;
}

const BottomMerchantCard = async ({
  merchant,
  merSlug,
  slugType,
}: Props) => {
  const domain = (await cookieService.get('domain')).domain;

  return (
    <Link
      href={getMerchantHref(merchant, merSlug, slugType)}
      className="d-block text-decoration-none"
    >
      <div
        className="merchant-square-card"
        style={styles.card}
      >
        <div style={styles.imgWrapper}>
          <Image
            src={getBaseImageUrl(domain, merchant?.merchant_logo, '')}
            alt={merchant?.merchant_name || 'Merchant'}
            width={100}
            height={100}
            className="img-fluid"
            style={{
              objectFit: 'contain',
              maxWidth: '100%',
              maxHeight: '100px',
            }}
          />
        </div>
      </div>
    </Link>
  );
};

export default BottomMerchantCard;
