import { apiGetTopMerchants } from "@/apis/page_optimization";
import StoresCard from "./StoresCard/StoresCard";
import Button from "./Button";

interface Props {
    company_id: string;
    store_slug: string;
    slug_type: string;
}

const StoresSection = async ({ company_id,store_slug,slug_type }: Props) => {
    const response = await apiGetTopMerchants(company_id);
    const topMerchants = response.data;
    const heading = topMerchants?.top_merchants_widget?.widget_heading || 'Top Merchants';
    const description = response?.data?.top_merchants_widget?.widget_text;

    const maxVisible = 12;
    const visibleMerchants = topMerchants?.merchants.slice(0, maxVisible);

    return (
        <section className="s1-2nd-bg-color" style={{ padding: "5% 10%" }}>
            <div className="w-full max-w-[1200px] mx-auto px-4">
                <h1 className="stores-heading text-center text-2xl md:text-3xl font-extrabold    text-transparent bg-clip-text    bg-gradient-to-r from-[var(--primary-color)] to-orange-500    leading-tight pb-5">{heading}</h1>
                <p className="mt-2 mb-6 text-center text-gray-500 text-base max-w-4xl mx-auto leading-relaxed">
                    {description}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    {visibleMerchants?.map((merchant) => (
                        <StoresCard 
                        // key={index} 
                        // merchant_logo={item?.merchant_logo} 
                        // merchant_name={item?.merchant_name} 
                        // slug={item?.slug}
                        key={merchant.id || merchant.slug}
                         merchant={merchant}
                        mer_slug={store_slug}
                        mer_slug_type={slug_type}
                         />
                    ))}
                </div>

                <div className="text-center mt-10">
                    <Button
                        href="/all-stores/A"
                        variant="secondary"
                        className="btn-hover-gradient"
                        label="View All Stores"
                    >
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default StoresSection;
