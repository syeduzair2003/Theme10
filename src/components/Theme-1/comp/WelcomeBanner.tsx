import React from "react"
import breadcrumbGradient from '@theme1/assets/images/gradients/breadcrumb-gradient-bg.png'
import Image from 'next/image'
import moonImage from '@theme1/assets/images/shapes/element-moon1.png'
import moonImage2 from '@theme1/assets/images/shapes/element-moon3.png'
import { CompanyData } from "@/services/dataTypes"

type Props = {
  companyData: CompanyData
}
const WelcomeBanner = ({companyData}:Props) => {
  return (
    <section className="breadcrumb breadcrumb-one padding-y-60 section-bg position-relative z-index-1 overflow-hidden"
    style={{
      borderRadius: '10px',
      background: 'linear-gradient(90deg, #6BAAEF, #A38CFF, #FFFF)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#FFFFFF', // White text
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      fontSize: '24px',
      fontWeight: 'bold',
    }}
    >
      <Image
        src={breadcrumbGradient}
        alt=""
        className="bg--gradient"
        width={500}
        height={500}
      />
      <Image
        src={moonImage2}
        alt=""
        style={styles.element}
        className="one"
      />
      <Image
        src={moonImage}
        alt=""
        style={styles.elementThree}
        // className="three"
      />
      <div className="container container-two">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="breadcrumb-one-content">
              <h3 className="breadcrumb-one-content__title text-center mb-3 text-capitalize">
                {/* 58,000+ products available for purchase */}
                Exclusive Deals & Coupons – Save More Every Day!
              </h3>
              <p className="breadcrumb-one-content__desc text-center text-black-three">
              {companyData.company_name} {' '}
              {/* is positioned as a promotional and deals-driven business, leveraging a structured online presence to attract customers.
              With its dedicated store and category structure, it aims to provide an easy and rewarding shopping experience.
              As it continues to develop its branding elements, such as a logo and site description,
              the company has strong potential to expand its reach in the promotions industry. */}
              Find unbeatable discounts on thousands of products with our well-organized online store.
              We bring you the latest promotions, making saving money easier than ever.
              Unlock the best promo codes and offers across a vast range of categories.
              Our user-friendly platform ensures a rewarding and hassle-free shopping experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const styles = {
  element: {
    position: 'absolute' as const,
    left: '90px',
    bottom: '70%',
    animation: 'upDownRotate 15s linear infinite',
    zIndex: -1,
  },
  elementThree: {
    position: 'absolute' as const,
    left: 'auto !important',
    right: '16% !important',
    bottom: '14% !important',
    animationDelay: '5s',
    animation: 'upDownRotate 15s linear infinite',
    zIndex: -1,

  }
};

export default WelcomeBanner;
