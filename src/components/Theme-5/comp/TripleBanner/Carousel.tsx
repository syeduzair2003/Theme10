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
    <div className="flex gap-2 md:gap-3">
      {bannerResponse.map((item, i) => {
        const isLarge = i % 2 === 0 ? 'small' : 'large';
        const colClass = isLarge === 'large' ? 'md:w-1/2' : 'md:w-1/4';

        return (
          <div key={i} className={colClass}>
            <section className="my-2 transition-transform duration-300 hover:scale-105">
              <div className="w-full h-full">
                <Link
                  href={item?.url}
                  target='_blank'
                  rel={`${isLarge === 'large' ? '' : 'nofollow sponsored noopener noreferrer'}`}
                >
                  <Image
                    className="w-full rounded-lg md:rounded-xl"
                    height={isLarge === 'large' ? 347 : 340}
                    width={isLarge === 'large' ? 552 : 270}
                    src={getBaseImageUrl(domain, item?.image, '')}
                    alt="Banner"
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
            </section>
            <div className="text-center my-2 md:my-3 border rounded-lg bg-white p-2 md:p-3">
              <Link href={item?.url} className="text-gray-800 font-bold text-sm md:text-base lg:text-lg line-clamp-2" target='_blank'>
                {item?.text}
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Carousel;
