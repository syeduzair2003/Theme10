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
    <div ref={sliderRef} className="keen-slider">
      {banners.map((item, i) => {
        const isLarge = i % 2 === 0 ? 'small' : 'large';
        return (
          <div key={i} className="keen-slider__slide">
            <section className="custom-triple mb-3">
              <div className="img-area w-100">
                <Link
                  href={item?.url}
                  rel={isLarge === 'large' ? '' : 'nofollow sponsored noopener noreferrer'}
                >
                  <Image
                    className="w-100 rounded-3"
                    height={300}
                    width={600}
                    src={getBaseImageUrl(domain, item?.image, '')}
                    alt="Banner"
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </div>
              <div className="banner-text text-center pt-2">
                <Link href={item?.url} className="n17-color fw-bold f-16">
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
