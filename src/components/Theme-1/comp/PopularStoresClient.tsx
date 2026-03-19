"use client"
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Merchant } from "@/services/dataTypes";
import { getMerchantHref } from "@/constants/hooks";

interface Props {
  merchantData: Merchant[];
  mer_slug: string;
  mer_slug_type: string;
}

const PopularStoresClient = ({ merchantData, mer_slug_type, mer_slug }: Props) => {

  const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="las la-arrow-right" />
      </button>
    );
  }
  const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;

    return (
      <button className={className} onClick={onClick}>
        <i className="las la-arrow-left" />
      </button>
    );
  }

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4, slidesToScroll: 3 } },
      { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
    ],
  };

  return (
    <div className="popular-slider arrow-style-two row gy-4">
      <Slider {...settings}>
        {merchantData?.map((item, i) => (
          <div key={i}>
            <Link href={getMerchantHref<Merchant>(item, mer_slug, mer_slug_type)} className="popular-item w-100 ani-in-effect">
              <span className="popular-item__icon">
                <Image src={item?.merchant_logo} alt={`${item?.merchant_name} logo`} width={500} height={500} />
              </span>
              <h6 className="popular-item__title font-17">
                {item.merchant_name.length > 17 ? `${item.merchant_name.slice(0, 17)}...` : item.merchant_name}
              </h6>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PopularStoresClient;
