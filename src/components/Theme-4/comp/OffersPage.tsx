import { apiGetSimilarMerchants, apiMerchantDetails } from "@/apis/merchant";
import { apiOfferBanners, apiSpecificOffers } from "@/apis/offers";
import { apiNavCategory } from "@/apis/page_optimization";
import { apiCompanyUpdatedData, apiGetMetaData } from "@/apis/user";
import { discardHTMLTags, getRandomRating, splitHeadingFromDetails } from "@/constants/hooks";
import OffersPageClientWrapper from "./OffersPageClientWrapper";
import cookieService from "@/services/CookiesService";
import PageBanner from "./PageBanner";
import StoresCard from "./StoresCard/StoresCard";
import PopularCouponCategories from "./PopularCouponCategories";
import PopularTags from "./PopularTags";
import VerticalBanner from "./VerticalBanner";
import { FaChevronDown } from "react-icons/fa";

interface OffersPageProps {
    merchant_id: string;
    slug: string[];
    product_id: Promise<string>;
    company_id: string;
    store_slug: string;
    category_slug: string;
    slug_type: string;
}

const companyDomain = await cookieService.get("domain");

const OffersPage = async ({
    merchant_id,
    slug,
    product_id,
    company_id,
    slug_type,
    store_slug,
    
    
}: OffersPageProps) => {
    const [
        awaited_p_id,
        bannerResponse,
        categories,
        offers,
        similarMerchantsRes,
        metaRes,
        merchantDetailsRes,
        company_data,
    ] = await Promise.all([
        product_id,
        apiOfferBanners(merchant_id, company_id),
        apiNavCategory(company_id),
        apiSpecificOffers(merchant_id, company_id, 1),
        apiGetSimilarMerchants(company_id, merchant_id),
        apiGetMetaData(JSON.stringify(slug), companyDomain.domain),
        apiMerchantDetails(merchant_id, company_id),
        apiCompanyUpdatedData(companyDomain),
    ]);
    const finalRating = getRandomRating();
    const similarMerchants = similarMerchantsRes?.data?.slice(0, 6) || []; // limit to 6
    const meta = metaRes?.data;
    const faq = merchantDetailsRes.data.faqs;
    const merchant_details = {
        ...merchantDetailsRes,
        mer_meta_title: meta?.meta_title,
        mer_meta_desc: meta?.meta_description,
    };
    const [heading] = splitHeadingFromDetails(
        merchant_details?.data?.merchant_detail
    );

    return (
        <div className="bg-gray-50">
            {/* Banner */}
            <PageBanner
                variant="offers"
                title={discardHTMLTags(heading)}
                logo={merchantDetailsRes?.data?.merchant_logo}
                rating={finalRating}
                description={discardHTMLTags(
                    merchantDetailsRes?.data?.merchant_detail?.slice(0, 250) + "..."
                )}
                readMoreTarget="full-description"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "All Stores", href: "/all-stores/A" },
                    { label: merchantDetailsRes.data.merchant_name },
                ]}
            />

            {/* Main Layout */}
            <div className="max-w-[1400px] mx-auto container px-4 py-12 flex flex-col lg:flex-row gap-10">
                {/* Left Content - Offers */}
                <div className="flex-1">
                    {offers?.data?.offers?.length > 0 && (
                        <section className="">                   
                            <div className="">
                                <OffersPageClientWrapper
                                    initialOffers={offers.data.offers}
                                    pagination={offers.data.pagination}
                                    merchantDetails={merchantDetailsRes.data}
                                    companyId={company_data.data.unique_id}
                                    merchantId={merchant_id}
                                    domain={companyDomain.domain}
                                    slug_type={company_data.data.slug_type}
                                    mer_slug={company_data.data.store_slug}
                                />
                            </div>
                        </section>
                    )}
                    {/* Full Store Description */}
                    {merchantDetailsRes?.data?.merchant_detail && (
                        <section
                            id="full-description"
                            className="bg-white border border-gray-200 shadow-md rounded-lg p-6 mt-10"
                        >
                            <h2 className="text-xl font-semibold mb-4">
                                About {merchantDetailsRes?.data?.merchant_name}
                            </h2>
                            <p
                                className="text-[15px] text-slate-700 leading-relaxed"
                                dangerouslySetInnerHTML={{
                                    __html: merchantDetailsRes?.data?.merchant_detail,
                                }}
                            />
                        </section>
                    )}
                </div>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-80 shrink-0 space-y-8">

                    {faq?.length > 0 && (
                        <section className="mb-8 bg-white border border-gray-200 shadow-md rounded-lg p-3 md:p-6">
                            <h2 className="text-xl text-black font-bold mb-4">{merchantDetailsRes?.data?.merchant_name} FAQs</h2>
                            <div className="space-y-2">
                                {faq.map((faq: any, idx: number) => (
                                    <details
                                        key={idx}
                                        className="group border border-gray-200 rounded-xl bg-white shadow-sm"
                                    >
                                        <summary className="flex justify-between items-center cursor-pointer px-3 py-2 text-gray-800 font-medium list-none">
                                            {faq?.question}
                                            <FaChevronDown
                                                className="ml-2 transition-transform duration-300 group-open:rotate-180 text-gray-500"
                                                size={16}
                                            />
                                        </summary>
                                        <div className="px-3 py-2 text-gray-600 border-t border-gray-100">
                                            {faq?.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}
                    {/* Similar Stores */}
                    {similarMerchants.length > 0 && (
                        <section className="mb-8 bg-white border border-gray-200 shadow-md rounded-lg px-3 py-3 md:p-6">
                            <h2 className="text-xl text-black font-bold mb-4">Similar Stores</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {similarMerchants.slice(0, 6).map((merchant) => (
                                    <StoresCard
                                        key={merchant.id}
                                        merchant={merchant}
                                        mer_slug={store_slug}
                                        mer_slug_type={slug_type}
                                    />
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Popular Coupon Categories */}
                    {categories?.data && (
                        <section className="bg-white border border-gray-200 shadow-md rounded-lg px-3 py-3 md:p-6">
                            <PopularCouponCategories categories={categories.data} />
                        </section>
                    )}

                    {/* Popular Tags */}

                    <section className="bg-white border border-gray-200 shadow-md rounded-lg px-3 py-3 md:p-6">
                        <h2 className="text-xl text-black font-bold mb-4">Popular Tags</h2>
                        <PopularTags company_id={company_data.data.unique_id} merchant_id={merchant_id} />
                    </section>

                    {/* Vertical Banners */}
                    {bannerResponse?.data?.offers?.length > 0 && (
                        <section className="bg-white border border-gray-200 shadow-md rounded-lg px-3 py-3 md:p-6 space-y-6">
                            <h2 className="text-xl text-black font-bold mb-4">Banners</h2>
                            {bannerResponse.data.offers.map((item, index) => (
                                <VerticalBanner
                                    key={index}
                                    url={item.offer.url}
                                    image={item.offer.banner_image}
                                />
                            ))}
                        </section>
                    )}
                </aside>
            </div>
        </div>
    );
};

export default OffersPage;
