import { apiGetTopMerchants } from "@/apis/page_optimization";
import { getBaseImageUrl, splitHeading } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { Merchant } from "@/services/dataTypes";
import Link from "next/link";
import NewPopularMerchantCard from "./PopularMerchantCard";

interface Props {
    companyId: string;
    slug_type: string;
    mer_slug: string;
}

const PopularStores = async ({ companyId, slug_type, mer_slug }: Props) => {
    const merchants = await apiGetTopMerchants(companyId);
    const domain = (await cookieService.get("domain")).domain;

    const widget = merchants?.data?.top_merchants_widget;
    const allMerchants = merchants?.data?.merchants || [];

    const [firstHalf, secondHalf] = splitHeading(widget?.widget_heading);

    const visibleMerchants: Merchant[] = allMerchants.slice(0, 8);

    if (!visibleMerchants.length) return null;

    return (
        <section
            className="trv-service-st2 py-5"
            style={{ background: "#fff" }}
        >
            <div className="container">

                {/* SECTION TITLE */}
                <div className="section-head trv-head-title-wrap text-center mb-5">
                    <h2 className="trv-head-title">
                        <span className="site-text-yellow">
                            {firstHalf || "Featured"}
                        </span>{" "}
                        {secondHalf || "Merchants"}
                    </h2>

                    <div className="trv-head-discription">
                        {merchants?.data?.top_merchants_widget?.widget_text ? merchants?.data?.top_merchants_widget?.widget_text : "Discover the most popular merchants offering the best deals, discounts, and coupons. These top brands are trusted by shoppers and frequently updated with exclusive offers to help you save more on your favorite products."}
                    </div>
                </div>

                {/* CARDS */}
                <div className="row justify-content-center">
                    {visibleMerchants.map((merchant, index) => (
                        <NewPopularMerchantCard
                            key={index}
                            merchant={merchant}
                            mer_slug={mer_slug}
                            slug_type={slug_type}
                            preloadedImage={merchant?.merchant_logo}
                        />
                    ))}
                </div>

                {/* VIEW ALL */}
                <div className="text-center mt-4">
                    <Link href={`/${mer_slug}`} className="siteButton">
                        View All
                    </Link>
                </div>

            </div>
        </section>
    );
};

export default PopularStores;
