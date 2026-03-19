"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import { Merchant, OfferResponse, OffersMerchant, OffersOffer } from "@/services/dataTypes";

interface Props {
  offersData: OfferResponse | null;
  mer_slug: string;
  mer_slug_type: string;
}

const TodaysOfferClient = ({ offersData, mer_slug, mer_slug_type }: Props) => {
  const getHref = (store: OffersMerchant) => `/${mer_slug}/${store[mer_slug_type as keyof OffersMerchant] || store.slug}`;
  const SampleNextArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="las la-arrow-right" />
      </button>
    );
  };

  const SamplePrevArrow = (props: any) => {
    const { className, onClick } = props;
    return (
      <button className={className} onClick={onClick}>
        <i className="las la-arrow-left" />
      </button>
    );
  };

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 992, settings: { slidesToShow: 4, slidesToScroll: 2, arrows: false } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, arrows: false } },
    ],
  };

  return (
    <div className="row">
      <Slider {...settings}>
        {offersData !== null && offersData?.offers?.map((items: OffersOffer, i: number) => {
          return (
            <Link
              key={i}
              href={getHref(items.merchant)}
              className="popular-item w-100 d-flex g-3 ani-in-effect"
            >
              <Image
                className="align-self-center"
                src={items.merchant.merchant_logo}
                width={130}
                height={0}
                alt={items?.merchant?.merchant_name || "Merchant Logo"}
              />
              <Container style={styles.cardContent}>
                <h6 className="font-18 align-self-start">
                  {items?.offer?.offer_title && (
                    <span className="popular-item__qty text-body">
                      {items.offer.offer_title.replace(/<\/?p>/g, "").length > 40
                        ? items.offer.offer_title.replace(/<\/?p>/g, "").substring(0, 35) + "..."
                        : items.offer.offer_title.replace(/<\/?p>/g, "")}
                    </span>
                  )}
                </h6>
                {items?.offer?.offer_detail && (
                  <span className="popular-item__qty text-body">
                    {items.offer.offer_detail.replace(/<\/?p>/g, "").length > 45
                      ? items.offer.offer_detail.replace(/<\/?p>/g, "").substring(0, 40) + "..."
                      : items.offer.offer_detail.replace(/<\/?p>/g, "")}
                  </span>
                )}
              </Container>
            </Link>
          )
        })}
      </Slider>
    </div>
  );
};

const styles: any = {
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingLeft: "5%",
  },
};

export default TodaysOfferClient;
