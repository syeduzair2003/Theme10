
import React from "react"; 
import { faArrowRight, faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import Link from "next/link";
import Image from "next/image";
import ProductOffers from "./ProductOffers";
import { getLastUpdateDate } from "@/constants/hooks";
import ScrollButtonLeft from "./ScrollButtonLeft";
import ScrollButtonRight from "./ScrollButtonRight";
import { Merchant } from "@/services/dataTypes";
import StoreCard from "./StoreCard";
import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from "@/apis/page_optimization";
import CategorySidebarProduct from "./CategorySidebarProduct";
import AllProductsSchema from "@/components/shared/SchemaScripts/AllProductSchema";
import SidebarRoundMerchantCard from "./SidebarRoundMerchantCard";

interface Props {
    page?: string;
    companyId: string;
    storeSlug: string;
    slugType: string;
    categoryId?: string;
    slug?: string[];
    categoryName?: string;
}

const AllProductLayout = async ({ page, companyId, storeSlug, slugType, categoryId, slug, categoryName }: Props) => {
    const [categories, merchants, suggestedMerchants] = await Promise.all([
        apiGetProductCategories(companyId, categoryId).then(res => res.data),
        apiGetProductCategoryMerchant(companyId, categoryId).then(res => res.data),
        apiGetProductSuggestedMerchant(companyId, categoryId).then(res => res.data),
    ]);
    const safeSlug = slug ?? [];

    const cleanedSlug = safeSlug?.filter(
        (s, i) => !(s === "page" || (!isNaN(Number(s)) && safeSlug[i - 1] === "page"))
    );

    const paths: { href: string; label: string }[] = cleanedSlug?.map((segment, index) => {
        const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/-/g, " ");
        return { href, label };
    });

    return (
        <div className="bg-[#f8fafc] min-h-screen font-sans">
            <section className="relative overflow-hidden bg-white border-b border-slate-100 pt-16 pb-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="w-full lg:w-7/12">
                            <nav aria-label="breadcrumb" className="mb-6">
                                <ol className="flex items-center flex-wrap gap-2 list-none p-0 m-0">
                                    <li className="flex items-center gap-2">
                                        <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium no-underline">
                                            Home 
                                        </Link>
                                        <FontAwesomeIcon icon={faGreaterThan} className="text-[10px] text-slate-300" />
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <Link href="/all-products" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium no-underline">
                                            All Products
                                        </Link>
                                        {paths && paths.length > 0 && (
                                            <FontAwesomeIcon icon={faGreaterThan} className="text-[10px] text-slate-300" />
                                        )}
                                    </li>
                                    {paths?.map((p, i) => (
                                        <li key={i} className="flex items-center gap-2">
                                            <span className={`capitalize text-sm font-medium ${i === paths.length - 1 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                                                {i < paths.length - 1 ? (
                                                    <Link href={p.href} className="text-inherit hover:text-blue-600 no-underline">{p.label}</Link>
                                                ) : (
                                                    p.label
                                                )}
                                            </span>
                                            {i < paths.length - 1 && (
                                                <FontAwesomeIcon icon={faGreaterThan} className="text-[10px] text-slate-300" />
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                            
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                                {categoryName ? (
                                    <>Best Deals on <span className="text-blue-600">{categoryName}</span></>
                                ) : (
                                    <>Explore <span className="text-blue-600">Premium Products</span> & Coupons</>
                                )}
                            </h1>
                            <p className="text-slate-500 text-lg md:text-xl max-w-xl leading-relaxed">
                                Save more with our hand-picked discounts and verified offers from top international brands.
                            </p>
                        </div>

                        <div className="hidden lg:block w-full lg:w-5/12 relative">
                            <div className="relative h-[350px] w-full transform hover:-translate-y-3 transition-transform duration-700 ease-out">
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="shopping banner"
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {merchants?.length > 0 && (
                <section className="py-12 bg-white border-b border-slate-100">
                    <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h3 className="text-2xl font-bold text-slate-900">Trending Stores</h3>
                                <div className="w-12 h-1 bg-blue-600 rounded-full mt-2"></div>
                            </div>
                        </div>
                        <div className="relative group/scroll">
                            <ScrollButtonLeft sectionType="merchant" />
                            <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide scroll-smooth">
                                {merchants.map((merchant: Merchant, i: number) => (
                                    <div key={i} className="min-w-[160px] md:min-w-[200px] flex-shrink-0 transition-transform hover:scale-[1.03]">
                                        <StoreCard merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
                                    </div>
                                ))}
                            </div>
                            <ScrollButtonRight sectionType="merchant" />
                        </div>
                    </div>
                </section>
            )}

            <section className="py-12">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-10 flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <p className="text-slate-600 font-medium m-0 text-sm">
                                Verified Deals: <span className="text-slate-900 font-bold">{getLastUpdateDate(1)}</span>
                            </p>
                        </div>
                        <div className="hidden md:block text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                            Secure Shopping Experience
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <aside className="w-full lg:w-[350px] shrink-0">
                            <div className="sticky top-8 flex flex-col gap-8">
                                {categories?.length > 0 && (
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-slate-100">
                                        <CategorySidebarProduct
                                            categories={categories}
                                            pageSlug="all-products"
                                            categoryName={categoryName}
                                        />
                                    </div>
                                )}
                                
                                {suggestedMerchants?.length > 0 && (
                                    <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                                        
                                        <h4 className="text-slate-900 text-xl font-bold mb-8 flex items-center gap-2 relative">
                                            Popular Stores
                                        </h4>
                                        <div className="flex flex-col gap-4 mb-8 relative">
                                            {suggestedMerchants.slice(0, 6).map((merchant: Merchant) => (
                                                <SidebarRoundMerchantCard 
                                                    key={merchant.unique_id}
                                                    merchant={merchant} 
                                                    merSlug={storeSlug} 
                                                    slugType={slugType} 
                                                />
                                            ))}
                                        </div>
                                        <Link href={`/all-stores/A`} className="group flex items-center justify-between bg-slate-900 hover:bg-blue-600 p-4 rounded-2xl transition-all no-underline">
                                            <span className="text-white font-bold text-xs uppercase tracking-widest">View All Stores</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-white text-xs group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </aside>

                        <div className="flex-1 min-w-0">
                            <div className="bg-white p-4 md:p-8 rounded-[2.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] border border-slate-100">
                                <ProductOffers
                                    category_id={categoryId}
                                    page={page}
                                    company_id={companyId}
                                    mer_slug={storeSlug}
                                    mer_slug_type={slugType}
                                    slug={slug}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {page !== '1' && (
                <AllProductsSchema company_id={companyId} categoryName={categoryName} category_id={categoryId} categoryUrl={cleanedSlug.join('/')} />
            )}
        </div>
    );
};

export default AllProductLayout;