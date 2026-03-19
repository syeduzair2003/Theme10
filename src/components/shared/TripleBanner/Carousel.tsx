import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CompanyBanner } from '@/services/dataTypes';
import { getBaseImageUrl } from '@/constants/hooks';

interface Props {
  bannerResponse: CompanyBanner[];
  domain: string;
}

const Carousel = ({ bannerResponse, domain }: Props) => {
  return (
    <>
      {/* Grid for md and up */}
      <div className="row g-3 d-none d-md-flex">
        {bannerResponse.map((item, i) => {
          const isLarge = i % 2 === 0 ? 'small' : 'large';
          const colSize = isLarge === 'large' ? '6' : '3';

          return (
            <div
              key={i}
              className={`col-md-${colSize} col-lg-${colSize} col-xl-${colSize} ${isLarge === 'large' ? 'order-md-0' : ''}`}
            >
              <section className="custom-triple my-2">
                <div
                  className={`img-area ${isLarge}-banner`}
                  style={{ width: '100%', height: '100%' }}
                >
                  <Link
                    href={item?.url}
                    target='_blank'
                    rel={`${isLarge === 'large' ? '' : 'nofollow sponsored noopener noreferrer'}`}
                  >
                    <Image
                      className="w-100 rounded-3"
                      height={isLarge === 'large' ? 347 : 340}
                      width={isLarge === 'large' ? 552 : 270}
                      src={getBaseImageUrl(domain, item?.image, '')}
                      alt="Banner"
                      style={{ objectFit: 'cover' }}
                    />
                  </Link>
                </div>
              </section>
              <div className="banner-text text-center my-3 border rounded-2 bg-white p-3">
                  <Link href={item?.url} className="n17-color fw-bold f-18" target='_blank'>
                    {item?.text}
                  </Link>
                </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Carousel;
