import React from 'react'
import MainImage from "../assets/img/4bg.png";
import BestOffersSlider from './BestOffersSlider';
import { apiBestOffers } from '@/apis/offers';

interface Props {
    companyId: string;
}
const BestOffersCarousel = async ({ companyId }: Props) => {
    const bestOffers = await apiBestOffers(companyId, 20);
    return (
        <>
            <section className="mt-2 mb-2">
                <div className="section-title-center text-center no-before">
                    <h2 className="title bg-white" style={{ marginTop: "135px" }}>Best Deals</h2>
                </div>
                <div className="container-fluid custom-width pb-5 px-5">
                    <BestOffersSlider offers={bestOffers.data} companyId={companyId}/>
                </div>
            </section>
        </>
    )
}

export default BestOffersCarousel
