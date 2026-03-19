import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from "@/apis/page_optimization";
import { apiGetAllProducts } from "@/apis/user";
import Banner from "@/components/shared/Banner/Banners";
import MerchantsCarousel from "@/components/Theme-4/comp/MerchantsCarousel";
import { getLastUpdateDate, getRandomRating } from "@/constants/hooks";
import Image from "next/image";
import Link from "next/link";
import PageBanner from "./PageBanner";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

interface AllProductsPageProps {
    company_id: string;
    page?: string;
    storeSlug: string;
    slugType: string;
    categoryId?: string;
    slug?: string[];
    categoryName?: string;
    domain: string;
}

const AllProductsPage = async ({ company_id, page, categoryId, slug, categoryName, domain, storeSlug, slugType }: AllProductsPageProps) => {
    const merchants = (await apiGetProductCategoryMerchant(company_id)).data;
    const suggestedMerchants = (await apiGetProductSuggestedMerchant(company_id)).data;
    const suggestedCategories = (await apiGetProductCategories(company_id, categoryId)).data;
    const response = (await apiGetAllProducts(company_id, categoryId, page?.toString())).data;
    const products = response?.offers;

    return (
        <section className="pb-16 bg-gray-50">
            <PageBanner
                title={categoryName ? categoryName : "Popular All Products"}
                image="/themes/Theme_3/images/banner-illus-16.png"
                breadcrumbs={[
                    { label: "Home", href: "/" },
                    { label: "All Products", href: "/all-products" },
                    ...slug?.map((part, idx) => {
                        const path = `/all-products/${slug.slice(0, idx + 1).join("/")}`;
                        return {
                            label: decodeURIComponent(part.replace(/-/g, " ")),
                            href: idx < slug.length - 1 ? path : undefined, // last one = current page
                        };
                    }) || [],
                ]}
            />

            <div className="max-w-[1200px] mx-auto px-4 mt-6">
                {/* Heading */}
                <h2
                    className="stores-heading text-center text-2xl md:text-3xl font-extrabold 
                        text-transparent bg-clip-text 
                        bg-gradient-to-r from-[var(--primary-color)] to-orange-500 
                        leading-tight pb-10"
                    >
                    Trending Merchants in All Products
                </h2>

                {/* Carousel */}
                <MerchantsCarousel merchants={merchants} />

                {/* Sub-heading */}
                {products?.length ? (
                    <p className="text-left text-gray-600 text-base md:text-lg font-medium italic mt-8">
                        All deals in this category are hand-tested.
                        Last verified on: {getLastUpdateDate(1)}.
                    </p>
                ) : null}
                {/* Divider */}
                <div className="border-t-2 border-gray-200 mt-6 pt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <aside className="md:col-span-1 space-y-3">
                        {/* Suggested Categories */}
                        {suggestedCategories.length ? (

                            <div className="bg-white rounded-xl shadow-md py-4 px-3">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-[var(--primary-color)] pl-2">
                                    Suggested Categories
                                </h3>
                                <ul className="space-y-2 text-gray-600 p-0">
                                    {suggestedCategories.map((cat, idx) => (
                                        <li key={idx}>
                                            <Link
                                                href={`/all-products/${cat.url}`}
                                                className="no-underline text-black block px-2 py-2  rounded-lg bg-gray-50 hover:bg-[#dc2626] hover:!text-white transition"
                                            >
                                                {cat.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : null}

                        {/* Similar Stores */}
                        {suggestedMerchants.length ? (

                            <div className="bg-white rounded-xl shadow-md p-5">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-[var(--primary-color)] pl-2">
                                    Similar Stores
                                </h3>
                                <div className="space-y-4">
                                    {suggestedMerchants.slice(0, 5).map((merchant, idx) => (
                                        <Link
                                            key={idx}
                                            href={`/store/${merchant.slug}`}
                                            className="border border-gray-200 rounded p-2 flex items-center gap-3 group"
                                        >
                                            <div className="w-[30%] flex items-center justify-center bg-white p-1 shadow-sm">
                                                <Image
                                                    src={`/${merchant.merchant_logo}`}
                                                    alt={merchant.merchant_name}
                                                    width={60}
                                                    height={40}
                                                    className="object-contain"
                                                />
                                            </div>
                                            <span className="w-[70%] text-gray-700 group-hover:text-[var(--primary-color)] transition">
                                                {merchant.merchant_name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </aside>

                    {/* Products Section */}
                    {products?.length ? (
                        <div className="md:col-span-3">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">All Products</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                                {/* product cards */}
                                {products?.map((item: any, index: number) => (
                                    <ProductCard
                                        key={index}
                                        image={`${item.offer.product_image}`}
                                        title={item.offer.offer_title}
                                        description={item.offer.offer_detail}
                                        expiry={item.offer.end_date}
                                        originalPrice={item.offer.original_price}
                                        discountedPrice={item.offer.sale_price}
                                        rating={getRandomRating()}
                                        href={item.offer.url}
                                        unique_id={item.offer.unique_id}
                                        domain={domain}
                                        mer_slug={storeSlug}
                                        slug_type={slugType} id={item.offer.id}
                                        merchant={item.merchant}
                                    />
                                ))}
                            </div>

                            <Pagination
                                page={page}
                                pagination={response?.pagination}
                                basePath={
                                    slug && slug.length > 0
                                        ? `/all-products/${slug.join("/")}`
                                        : "/all-products"
                                }
                            />

                        </div>
                    ) :
                        <p className="text-gray-500 text-center italic mt-8">
                            No products available at the moment.
                        </p>
                    }
                </div>
            </div>
        </section >
    );
};

export default AllProductsPage;
