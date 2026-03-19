import { apiGetPopularDeals } from "@/apis/page_optimization";
import { getRandomRating } from "@/constants/hooks";
import DealCard from "./DealCard";
interface Props {
    company_id: string;
    domain: string;
    mer_slug: string;
    slug_type: string;
}

const TopDealsSection = async ({ company_id, domain, mer_slug, slug_type }: Props) => {
    const response = await (apiGetPopularDeals(company_id));
    const heading = response?.data.popular_deals_widget?.widget_heading || 'Today’s Hottest Deals & Verified Coupons';
    const description = response?.data.popular_deals_widget?.widget_text;
    const offer = response?.data?.offers.flat();
    const maxOffers = 8;
    return (
        <section className="s1-2nd-bg-color" style={{ padding: "5% 10%" }}>
                <div className="container">
                    <div className="row section-header d-flex align-items-center">
        <div className="w-full max-w-[1200px] mx-auto px-4 py-10 md:py-12">
            <h2
                className="stores-heading text-center text-2xl md:text-3xl font-extrabold 
             text-transparent bg-clip-text 
             bg-gradient-to-r from-[var(--primary-color)] to-orange-500 
             leading-tight pb-5"
            >
                {heading}
            </h2>


            <p className="mt-2 mb-6 text-left text-gray-500 text-base max-w-4xl mx-auto leading-relaxed">
                {description}
            </p>


            {/* Offers Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8">
                {offer?.slice(0, maxOffers)?.map((item, index) => (
                    <DealCard
                        key={index}
                        image={`/${item?.merchant?.merchant_logo}`}
                        title={item?.merchant?.merchant_name}
                        description={item?.merchant?.merchant_name + '-' + item?.offer?.offer_title}
                        expiry={item?.offer?.end_date}
                        rating={getRandomRating()}
                        href={item?.offer?.url}
                        coupon_code={item?.offer?.coupon_code}
                        unique_id={item?.offer?.unique_id}
                        domain={domain}
                        mer_slug={mer_slug}
                        slug_type={slug_type} id={item?.offer?.id}
                        merchant={item?.merchant}
                    />
                ))}
            </div>
        </div>
        </div>
        </div>
        </section>
    )
}

export default TopDealsSection;