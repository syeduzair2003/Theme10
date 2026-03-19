'use client'
import React from 'react'
import OffersCardClient from './OffersCardClient'
import { getLastUpdateDate, getProductDetailHref, splitHeading } from '@/constants/hooks'
import 'keen-slider/keen-slider.min.css'
import { useKeenSlider } from 'keen-slider/react'

interface Props {
    companyId: string
    mer_slug_type: string
    mer_slug: string
    bestOffers: any
    companyDomain: string
}

const BestOffersSSR = ({ companyId, mer_slug_type, mer_slug, bestOffers, companyDomain }: Props) => {
    const [firstHalf, secondHalf] = splitHeading(bestOffers?.popular_deals_widget?.widget_heading)
    const content = bestOffers?.popular_deals_widget?.widget_text

    const [sliderRef] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: 'free-snap',
        slides: {
            perView: 'auto',
            spacing: 16,
        },
        drag: true,
        rubberband: false,
        initial: 0,
    }, [
        (slider) => {
            let timeout: ReturnType<typeof setTimeout>
            let mouseOver = false

            function clearNextTimeout() {
                clearTimeout(timeout)
            }

            function nextTimeout() {
                clearTimeout(timeout)
                if (mouseOver) return
                timeout = setTimeout(() => {
                    slider.next()
                }, 2000)
            }

            slider.on('created', () => {
                slider.container.addEventListener('mouseover', () => {
                    mouseOver = true
                    clearNextTimeout()
                })
                slider.container.addEventListener('mouseout', () => {
                    mouseOver = false
                    nextTimeout()
                })
                nextTimeout()
            })
            slider.on('dragStarted', clearNextTimeout)
            slider.on('animationEnded', nextTimeout)
            slider.on('updated', nextTimeout)
        },
    ])

    if (bestOffers?.offers?.length > 0) {
        return (
            <section className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">
                <div className="container mx-auto px-4 mb-10">
                    <div className="flex flex-col items-center mb-12 border-l-4 border-indigo-600 pl-6">
                        <div className="w-full">
                            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                                <span className="text-slate-900">{firstHalf ? firstHalf : `Popular`} </span>
                                <span className="text-indigo-600">{secondHalf ? secondHalf : `Deals`}</span>
                            </h2>
                            <div>
                                <p className="text-lg text-slate-500 font-medium mb-0">
                                    {content}
                                </p>
                                <p className="text-sm text-slate-900 font-bold mt-2">
                                    This Weeks Hottest Deals — Verified on {getLastUpdateDate(1)} by Our Team.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative group">
                    <div ref={sliderRef} className="keen-slider" style={{ overflow: 'visible' }}>
                        {bestOffers?.offers?.map((item: any, i: number) => (
                            <div key={item?.offer?.unique_id || item?.offer?.id || i} className="keen-slider__slide" style={{ minWidth: '320px', maxWidth: '320px' }}>
                                <OffersCardClient
                                    offer={item}
                                    mer_slug_type={mer_slug_type}
                                    mer_slug={mer_slug}
                                    productDetailUrl={item?.offer?.slug ? getProductDetailHref(item?.merchant, mer_slug_type, item?.offer?.slug, item?.offer?.category?.slug) : null}
                                    domain={companyDomain}
                                    companyId={companyId}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    return null
}

export default BestOffersSSR