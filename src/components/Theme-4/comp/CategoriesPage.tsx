import { apiCategoryWithSub } from "@/apis/user";
import Link from "next/link";
import PageBanner from "./PageBanner";
import Image from "next/image";

interface CategoryPageProps {
    categoryName?: string;
    company_id: string;
}

const CategoriesPage = async ({ categoryName, company_id }: CategoryPageProps) => {

    const categories = (await apiCategoryWithSub(company_id))?.data;

    return (
        <>
            <section className="pb-16 bg-gray-50">
                <PageBanner
                    title={categoryName ? categoryName : "Our Popular Categories"}
                    image="/themes/Theme_3/images/banner-illus-1.png"
                    breadcrumbs={[
                        { label: "Home", href: "/" },
                        { label: "All Categories", href: "/category" },
                    ]}
                />

                {/* Categories Section */}
                <div className="max-w-6xl mx-auto px-4 mt-12 [column-count:1] md:[column-count:2] lg:[column-count:3] [column-gap:2rem]">
                    {categories?.map((cat, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-xl border border-gray-100 py-3 px-4  shadow-sm 
                 hover:shadow-lg hover:border-[var(--primary-color)] 
                 transition-all duration-300 mb-6 break-inside-avoid"
                        >
                            {/* Category Title */}
                            {/* <Image width={20} height={10} className="z-0 text-gray-500" src={`/${cat?.category?.category_image}`} alt={`${cat?.category?.name}`} />
                             */}
                            
                            <Link href={`/${cat?.category?.url}`} className="no-underline">
                                <h2 className="text-lg font-semibold text-gray-800 mb-3 pb-1 hover:text-[var(--primary-color)] transition-colors">
                                    {cat?.category?.name}
                                </h2>
                            </Link>

                            {/* Subcategories */}
                            <ul className="space-y-2 pl-3">
                                {cat?.category?.child?.map((sub) => (
                                    <li
                                        key={sub?.id}
                                        className="flex justify-between items-center group"
                                    >
                                        {/* LEFT: Image + Text */}
                                        <div className="flex items-center gap-2">
                                            <Image
                                                width={20}
                                                height={20}
                                                className="rounded object-cover group-hover:text-[var(--primary-color)] transition-colors"
                                                src={`/${sub?.image}`}
                                                alt={`${sub?.name}`}
                                            />
                                            <Link
                                                href={`/${sub?.url}`}
                                                className="text-gray-600 no-underline group-hover:text-[var(--primary-color)] transition-colors font-medium"
                                            >
                                                {sub?.name}
                                            </Link>
                                        </div>

                                        {/* RIGHT: Offer count */}
                                        <span
                                            className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 
                                            group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors"
                                        >
                                            {sub?.total_offers}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default CategoriesPage;