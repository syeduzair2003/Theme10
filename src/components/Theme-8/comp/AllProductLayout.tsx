// 1. Fixed: Added React import to solve ts(2686)
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
        <div className="bg-slate-50/50 min-h-screen">
            {/* Banner Section */}
            <section className="relative overflow-hidden bg-white border-b border-slate-100 mb-8 pt-10 pb-0">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-7 pb-10">
                            <nav aria-label="breadcrumb" className="mb-4">
                                <ol className="breadcrumb bg-transparent p-0 m-0 d-flex align-items-center gap-2 flex-wrap">
                                    <li className="breadcrumb-item d-flex align-items-center gap-2">
                                        <Link href="/" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium no-underline">Home</Link>
                                        <FontAwesomeIcon icon={faGreaterThan} className="text-[10px] text-slate-300" />
                                    </li>
                                    <li className="breadcrumb-item d-flex align-items-center gap-2">
                                        <Link href="/all-products" className="text-slate-400 hover:text-blue-600 transition-colors text-sm font-medium no-underline">All Products</Link>
                                    </li>
                                    {paths?.map((p, i) => (
                                        // Fixed: React.Fragment now has 'React' imported
                                        <React.Fragment key={i}>
                                            <li className="d-flex align-items-center gap-2">
                                                <FontAwesomeIcon icon={faGreaterThan} className="text-[10px] text-slate-300" />
                                                <span className={`text-capitalize text-sm font-medium ${i === paths.length - 1 ? 'text-slate-900 font-bold' : 'text-slate-400'}`}>
                                                    {i < paths.length - 1 ? (
                                                        <Link href={p.href} className="text-inherit hover:text-blue-600 no-underline">{p.label}</Link>
                                                    ) : p.label}
                                                </span>
                                            </li>
                                        </React.Fragment>
                                    ))}
                                </ol>
                            </nav>
                            
                            <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6 tracking-tight">
                                {categoryName ? (
                                    <>Best Deals on <span className="text-blue-600">{categoryName}</span> Categories</>
                                ) : (
                                    <>Explore <span className="text-blue-600">Premium Products</span> & Coupons</>
                                )}
                            </h1>
                            <p className="text-slate-500 text-lg max-w-xl mb-0 leading-relaxed">
                                Save more with our hand-picked discounts and verified offers from top international brands.
                            </p>
                        </div>

                        <div className="col-lg-5 d-none d-lg-block relative">
                            <div className="relative h-[320px] w-full transform hover:translate-y-[-10px] transition-transform duration-500">
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="shopping banner"
                                    fill
                                    className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trending Merchants */}
            {merchants?.length > 0 && (
                <section className="py-12 bg-white mb-10 border-y border-slate-100">
                    <div className="container">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 mb-1">Trending Stores</h3>
                            <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                        </div>
                        <div className="position-relative group/scroll">
                            <ScrollButtonLeft sectionType="merchant" />
                            <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-4 scrollbar-hide gap-1" style={{ scrollBehavior: 'smooth' }}>
                                {merchants.map((merchant: Merchant, i: number) => (
                                    <div key={i} className="col-6 col-sm-4 col-md-3 col-lg-2 flex-shrink-0 px-2 transition-transform hover:scale-[1.02]">
                                        <StoreCard merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
                                    </div>
                                ))}
                            </div>
                            <ScrollButtonRight sectionType="merchant" />
                        </div>
                    </div>
                </section>
            )}

            {/* Main Grid Content */}
            <section className="pb-20">
                <div className="container">
                    <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-10 d-flex align-items-center justify-content-between shadow-sm">
                        <div className="d-flex align-items-center gap-3">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </div>
                            <p className="text-slate-600 font-medium mb-0 text-sm">
                                Verified Deals: <span className="text-slate-900 font-bold">{getLastUpdateDate(1)}</span>
                            </p>
                        </div>
                        <div className="hidden md:block text-xs text-slate-400 font-bold uppercase tracking-widest">
                            Secure Shopping
                        </div>
                    </div>

                    <div className="row g-6">
                        {/* Sidebar */}
                        <aside className="col-xl-4 col-lg-4">
                            <div className="sticky-top" style={{ top: '2rem' }}>
                                {categories?.length > 0 && (
                                    <div className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 mb-6">
                                        <CategorySidebarProduct
                                            categories={categories}
                                            pageSlug="all-products"
                                            categoryName={categoryName}
                                        />
                                    </div>
                                )}
                                
                                {suggestedMerchants?.length > 0 && (
                                    <div className="bg-white rounded-[2rem] p-8 text-white shadow-2xl shadow-slate-300 relative overflow-hidden">
                                        {/* Background Decor */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                        
                                        <h4 className="text-slate-900 text-xl font-bold mb-6 flex items-center gap-2">
                                            Popular Stores
                                        </h4>
                                        <div className="d-grid gap-4 mb-8">
                                            {suggestedMerchants.slice(0, 5).map((merchant: Merchant) => (
                                                <SidebarRoundMerchantCard 
                                                    key={merchant.unique_id}
                                                    merchant={merchant} 
                                                    merSlug={storeSlug} 
                                                    slugType={slugType} 
                                                />
                                            ))}
                                        </div>
                                        <Link href={`/all-stores/A`} className="group flex items-center justify-between bg-slate-900 hover:bg-slate-900 p-4 rounded-2xl transition-all no-underline border border-white/10">
                                            <span className="text-white font-bold text-xs uppercase tracking-widest">View All Stores</span>
                                            <FontAwesomeIcon icon={faArrowRight} className="text-white text-xs group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </aside>

                        {/* Product Grid */}
                        <div className="col-xl-8 col-lg-8">
                            <div className="bg-white p-2 rounded-[2rem] shadow-sm border border-slate-100">
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