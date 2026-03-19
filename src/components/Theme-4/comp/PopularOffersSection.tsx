import { apiGetPopularOffers } from "@/apis/page_optimization";
import OfferCard from "./OfferCard";

interface Props {
    company_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
}

const PopularOffersSection = async ({ company_id, domain, mer_slug, slug_type }: Props) => {
    const response = await apiGetPopularOffers(company_id);
    const heading = response?.data?.popular_offer_widget?.widget_heading || 'Beyond the Coupon: A Smart Shopping Resource';
    const description = response?.data?.popular_offer_widget?.widget_text;
    const offers = response?.data?.offers.flat();
    const maxLimit = 6;
    return (
        <section className="bg-gradient-to-r from-[#f73a17] via-[#fb4717] to-[#e71c17] py-10 md:py-16 text-white">
            <div className="max-w-[1200px] mx-auto px-4">
                <h2 className="text-center text-2xl md:text-3xl font-bold mb-4">{heading}</h2>
                <p className="text-center text-white/90 mb-10 max-w-4xl mx-auto">
                    {description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {
                        offers?.slice(0, maxLimit)?.map((item, index) => (
                            <OfferCard key={index}
                                image={`/${item?.merchant?.merchant_logo}`}
                                title={item?.offer?.offer_title}
                                expiry={item?.offer?.end_date}
                                href={item?.offer?.url}
                                unique_id={item?.offer?.unique_id}
                                domain={domain}
                                mer_slug={mer_slug}
                                slug_type={slug_type} id={item?.offer?.id}
                                merchant={item?.merchant}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default PopularOffersSection;