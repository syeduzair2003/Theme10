'use client'

import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'
import { useEffect, useRef, useState } from 'react'
import { getBaseImageUrl } from '@/constants/hooks'
import { EventBannerResponse, PromotionBannerResponse } from '@/services/dataTypes'
import { faAngleLeft, faAngleRight, FontAwesomeIcon } from '@/constants/icons'
import Image from 'next/image'

interface Props {
    sliders: EventBannerResponse[] | PromotionBannerResponse[];
    domain: string;
    eventName: string;
}

const EventSlider = ({ sliders, domain, eventName }: Props) => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: true,
        slides: {
            perView: 1,
        },
    })

    const [imgLoaded, setImgLoaded] = useState(false)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (!slider.current || sliders.length <= 1) return

        const startAutoSlide = () => {
            timeoutRef.current = setInterval(() => {
                slider.current?.next()
            }, 4000)
        }

        const stopAutoSlide = () => {
            if (timeoutRef.current) clearInterval(timeoutRef.current)
        }

        startAutoSlide()
        return () => stopAutoSlide()
    }, [slider, sliders.length])

    const BannerImage = ({ src, alt, loading, priority = false }: { src: string; alt: string; loading?: 'eager' | 'lazy'; priority?: boolean }) => (
        <div style={{ position: 'relative', width: '100%', height: "auto" }}>
            {!imgLoaded && <div className="slider-image-skeleton" />}
            <Image
                src={getBaseImageUrl(domain, src, "")}
                height={500}
                width={1400}
                alt={alt}
                onLoad={() => setImgLoaded(true)}
                className={`slider-image-shared ${imgLoaded ? 'fade-in' : 'hidden'}`}
                priority={priority}
                fetchPriority={priority ? "high" : "auto"}
                loading={loading}
            />
        </div>
    )

    if (sliders?.length <= 1) {
        const slide = sliders[0]
        return (
            <div className="keen-slider-wrapper" style={{ position: 'relative' }}>
                {slide && (
                    <BannerImage
                        src={slide?.banner}
                        alt={eventName + "Banner"}
                        priority
                        loading="eager"
                    />
                )}
            </div>
        )
    }

    return (
        <div
            className="keen-slider-wrapper"
            style={{ position: 'relative' }}
            onMouseEnter={() => timeoutRef.current && clearInterval(timeoutRef.current)}
            onMouseLeave={() => {
                timeoutRef.current = setInterval(() => {
                    slider.current?.next()
                }, 4000)
            }}
        >
            <div ref={sliderRef} className="keen-slider">
                {sliders.map((slide, i) => (
                    <div className="keen-slider__slide slider-container-shared" key={i}>
                        <BannerImage
                            src={slide?.banner}
                            alt={eventName + " Banner " +(i + 1)}
                            priority={i === 0}
                            loading={i === 0 ? 'eager' : 'lazy'}
                        />
                    </div>
                ))}
            </div>

            {/* Arrows */}
            <div
                className="custom-slider-prev-shared"
                onClick={() => slider.current?.prev()}
            >
                <button className="custom-arrow-button">
                    <FontAwesomeIcon icon={faAngleLeft} style={{ width: '16px', height: '16px', color: 'black' }}/>
                </button>
            </div>

            <div
                className="custom-slider-next-shared"
                onClick={() => slider.current?.next()}
            >
                <button className="custom-arrow-button">
                    <FontAwesomeIcon icon={faAngleRight} style={{ width: '16px', height: '16px', color: 'black' }}/>
                </button>
            </div>
        </div>
    )
}

export default EventSlider
