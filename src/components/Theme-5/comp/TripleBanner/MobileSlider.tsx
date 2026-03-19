'use client';
import { useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { getBaseImageUrl } from '@/constants/hooks';
import { CompanyBanner } from '@/services/dataTypes';

interface Props {
  domain: string;
  banners: CompanyBanner[];
}

const MobileSlider = ({ domain, banners }: Props) => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
  });

  return (
    <div ref={sliderRef} className="keen-slider px-2">
      {banners.map((item, i) => {
        const isLarge = i % 2 === 0 ? 'small' : 'large';
        return (
          <div key={i} className="keen-slider__slide px-1">
            <section className="transition-transform duration-300 hover:scale-105">
              <div className="w-full">
                <Link
                  href={item?.url}
                  rel={isLarge === 'large' ? '' : 'nofollow sponsored noopener noreferrer'}
                >
                  <Image
                    className="w-full rounded-lg md:rounded-xl"
                    height={300}
                    width={600}
                    src={getBaseImageUrl(domain, item?.image, '')}
                    alt="Banner"
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <div className="text-center mt-2 md:mt-3 border rounded-lg bg-white p-2 md:p-3">
                <Link href={item?.url} className="text-gray-800 font-bold text-sm md:text-base line-clamp-2">
                  {item?.text}
                </Link>
              </div>
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default MobileSlider;
