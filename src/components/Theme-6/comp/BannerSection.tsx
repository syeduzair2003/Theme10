"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { KeenSliderInstance, useKeenSlider } from 'keen-slider/react';
import 'keen-slider/keen-slider.min.css';
// import styles from './HeroBanner.module.css';

const BannerSection = () => {
    // Autoplay Plugin with explicit typing and cleanup
    const autoplay = (slider: KeenSliderInstance) => {
        let timeout: ReturnType<typeof setTimeout>;
        let mouseOver = false;

        function clearNextTimeout() {
            clearTimeout(timeout);
        }

        function nextTimeout() {
            clearTimeout(timeout);
            if (mouseOver) return;
            timeout = setTimeout(() => {
                slider.next();
            }, 5000);
        }

        slider.on("created", () => {
            slider.container.addEventListener("mouseover", () => {
                mouseOver = true;
                clearNextTimeout();
            });
            slider.container.addEventListener("mouseout", () => {
                mouseOver = false;
                nextTimeout();
            });
            nextTimeout();
        });

        slider.on("dragStarted", clearNextTimeout);
        slider.on("animationEnded", nextTimeout);
        slider.on("updated", nextTimeout);

        // Equivalent to useEffect cleanup: ensure timer clears if component unmounts
        slider.on("destroyed", clearNextTimeout);
    };

    const [sliderRef] = useKeenSlider<HTMLDivElement>(
        {
            loop: true,
            initial: 0,
        },
        [autoplay]
    );
    return (
        <div className='theme-6 pb-4 pt-3' style={{ backgroundColor: '#066168' }}>
            <div className="cuscontainer" >
                <div className="trvHp5BnrSec">

                    {/* Content Overlay */}
                    <div
                        className="trvHp5BnrSecContent"
                        style={{ backgroundImage: `url('/themes/Theme_6/images/h-page-5/banner/overlay-shape.png')` , height: '100%'}}
                    >
                        <div className="trvBanner5Text">
                            <span className="trvBanner5TextSmall">Its’ Time</span>
                            <div className="trvBanner5TextMid">
                                <h1 className="trvBanner5TextLarge">
                                    To <span className="highlight">Your Dream </span>Destination
                                </h1>
                            </div>

                            <div className="trvBannerTextDetail">
                                Every journey begins with a dream. Let us take you To Your Dream
                                Destination and make your travel story unforgettable.
                            </div>

                            <div className="trvBannerBtnWrap">
                                <div className="trvBannerBtn">
                                    <Link href="/about" className="siteButton">
                                        Get In Touch
                                    </Link>
                                </div>

                                <div className="trvBnr5Moreinf">
                                    <div className="trvWspMedia">
                                        {/* Replace with your preferred Icon library */}
                                        <i className="bi bi-whatsapp"></i>
                                    </div>
                                    <div className="trvWspMorInfo">
                                        More Info
                                        <span>+44 7700 900123</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Keen Slider */}
                    <div ref={sliderRef} className="keen-slider" style={{ height: '100vh' }}>
                        {/* Slide 1 - Added priority for LCP optimization */}
                        <div className="keen-slider__slide trvDSliderMedia" style={{ position: 'relative' }}>
                            <Image
                                src="/themes/Theme_6/images/h-page-5/banner/slide-1.jpg"
                                alt="Slide 1"
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                                priority
                                unoptimized
                            />
                        </div>

                        {/* Slide 2 */}
                        <div className="keen-slider__slide trvDSliderMedia" style={{ position: 'relative' }}>
                            <Image
                                src="/themes/Theme_6/images/h-page-5/banner/slide-2.jpg"
                                alt="Slide 2"
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>

                        {/* Slide 3 */}
                        <div className="keen-slider__slide trvDSliderMedia" style={{ position: 'relative' }}>
                            <Image
                                src="/themes/Theme_6/images/h-page-5/banner/slide-3.jpg"
                                alt="Slide 3"
                                fill
                                sizes="100vw"
                                style={{ objectFit: 'cover' }}
                                unoptimized
                            />
                        </div>
                    </div>

                    {/* Floating Decorative Elements */}
                    <div className="trvHp5BnrBaloonTop">
                        <Image
                            src="/themes/Theme_6/images/h-page-5/banner/bln-top.png"
                            alt="Balloon Top"
                            width={80}
                            height={110}
                            priority
                            unoptimized
                        />
                    </div>

                    <div className="trvHp5BnrBaloonBottom">
                        <Image
                            src="/themes/Theme_6/images/h-page-5/banner/bln-bot.png"
                            alt="Balloon Bottom"
                            width={90}
                            height={120}
                            unoptimized
                        />
                    </div>

                    <div className="trvHp5BnrLeafTop">
                        <Image
                            src="/themes/Theme_6/images/h-page-5/banner/leaf-1.png"
                            alt="Leaf Top"
                            width={250}
                            height={180}
                            priority
                            unoptimized
                        />
                    </div>

                    <div className="trvHp5BnrLeafBottom">
                        <Image
                            src="/themes/Theme_6/images/h-page-5/banner/leaf-2.png"
                            alt="Leaf Bottom"
                            width={200}
                            height={150}
                            unoptimized
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerSection;