import { faArrowRight, faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import Link from "next/link";
import Image from "next/image";
import ProductOffers from "./ProductOffers";
import { getBaseImageUrl, getLastUpdateDate } from "@/constants/hooks";
import ScrollButtonLeft from "./ScrollButtonLeft";
import ScrollButtonRight from "./ScrollButtonRight";
import { Merchant } from "@/services/dataTypes";
import StoreCard from "./StoreCard";
import { apiGetProductCategories, apiGetProductCategoryMerchant, apiGetProductSuggestedMerchant } from "@/apis/page_optimization";
import CategorySidebarProduct from "./CategorySidebarProduct";
import AllProductsSchema from "@/components/shared/SchemaScripts/AllProductSchema";
import SidebarRoundMerchantCard from "./SidebarRoundMerchantCard";
import CircleStoreCard from "./CircleStoreCard";
import TopCategories from "./TopCategories";
import cookieService from "@/services/CookiesService";

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

    // Build breadcrumb paths
    const paths: { href: string; label: string }[] = cleanedSlug?.map((segment, index) => {
        const href = `/all-products/${cleanedSlug?.slice(0, index + 1).join("/")}`;
        const label = segment.replace(/-/g, " ");
        return { href, label };
    });
    const companyDomain = await cookieService.get("domain");

    return (
        <>
            {/* Banner Section */}
            <section className="banner-section index-one overflow-hidden position-relative s1-2nd-bg-color rounded-3 cus-border border">
                <div className="container position-relative">
                    <div className="row g-9 g-lg-0 align-items-center d-flex">
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div className="d-grid gap-4 gap-md-6 position-relative cus-z1">
                                <h1 className="display-four n17-color f-35">
                                    {categoryName ? `Get Discounts on ${categoryName} products from Top Brands` : 'Get Discounts on All Products, Popular Stores & Categories'}
                                </h1>
                                {/* Breadcrumbs */}
                                <div className="breadcrumb-area">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb second position-relative m-0 d-center justify-content-start gap-2 gap-md-3">
                                            {/* Home */}
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href="/" className="n17-color">Home</Link>
                                                <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                                            </li>

                                            {/* All Products */}
                                            <li className="d-flex align-items-center fs-seven justify-content-center gap-2">
                                                <Link href="/all-products" className="n17-color">All Products</Link>
                                                {paths?.length > 0 && (
                                                    <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                )}
                                            </li>

                                            {/* Dynamic Segments */}
                                            {paths?.map((p, i) => (
                                                <li
                                                    key={i}
                                                    className="d-flex align-items-center fs-seven justify-content-center gap-2"
                                                >
                                                    {i < paths?.length - 1 ? (
                                                        <>
                                                            <Link href={p?.href} className="n17-color text-capitalize">
                                                                {p?.label}
                                                            </Link>
                                                            <FontAwesomeIcon icon={faGreaterThan} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                        </>
                                                    ) : (
                                                        <span className="text-capitalize">{p?.label}</span> // last one: plain text
                                                    )}
                                                </li>
                                            ))}
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>

                        {/* Banner Image */}
                        <div className="col-lg-6 pe-4 pe-md-10 d-flex flex-column">
                            <div
                                className="img-area d-flex justify-content-end align-items-end position-relative"
                                style={{ width: '100%', minHeight: '350px' }}
                            >
                                <Image
                                    src="/shared-assets/BANNER.png"
                                    alt="img"
                                    fill
                                    style={{ objectFit: 'cover' }}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {suggestedMerchants?.length > 0 && (
                <section className="section-sidebar py-5">
                    <div className="container mb-7">
                        <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                            <h3 className="display-four n17-color f-30">Similar Merchants in All Products</h3>
                        </div>
                        <div className="position-relative my-4">
                            <ScrollButtonLeft sectionType="merchant" />
                            <div className="row horizontal-scroll horizontal-scroll-merchant flex-nowrap overflow-auto py-2" style={{ scrollBehavior: 'smooth' }}>
                                {suggestedMerchants?.length > 0 && suggestedMerchants?.map((merchant: Merchant, i: number) => {
                                    return (
                                        <div key={i} className="col-6 col-sm-6 col-md-4 col-lg-3 flex-shrink-0 px-2">
                                            <CircleStoreCard key={i} merchant={merchant} mer_slug={storeSlug} mer_slug_type={slugType} />
                                        </div>
                                    )
                                })}
                            </div>
                            <ScrollButtonRight sectionType="merchant" />
                        </div>
                    </div>
                </section>
            )}

            {/* Products Section */}
            <section className="section-sidebar py-5">
                <div className="container mb-7">
                    <div className="row">
                        <p className="fw-bold">
                            All deals in this category are hand-tested. Last verified on: {getLastUpdateDate(1)}.
                        </p>
                        {/* <div className="col-xl-4 col-xxl-4 mt-10 mt-xl-0">
                            <div className="sidebar-common cus-overflow sidebar-head primary-sidebar">
                                <div className="side-wrapper bg-transparent rounded-4">
                                    <div className="sidebar-wrapper pb-12 pb-lg-0 d-flex flex-column gap-6">
                                        <div className="sidebar-area">
                                            {categories?.length > 0 && (
                                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth mb-3">
                                                    <CategorySidebarProduct
                                                        categories={categories}
                                                        pageSlug="all-products"
                                                        categoryName={categoryName}
                                                    />
                                                </div>
                                            )}
                                            {suggestedMerchants?.length > 0 && (
                                                <div className="item-wrapper p-4 p-md-6 rounded-4 n1-bg-color cus-border border b-ninth">
                                                    <h4 className="n17-color mb-4 mb-md-6">Similar Stores</h4>

                                                    <div className="row g-2 py-3 mb-5 d-flex justify-content-center">

                                                        {suggestedMerchants?.slice(0, 5).map((merchant: Merchant) =>
                                                            <div className="col-12 col-md-6 col-lg-6 d-center" key={merchant.unique_id}>
                                                                
                                                                <SidebarRoundMerchantCard merchant={merchant} merSlug={storeSlug} slugType={slugType} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="btn-area mt-3 mt-md-5">
                                                        <Link href={`/all-stores/A`} className="d-center justify-content-start gap-2 gap-md-3">
                                                            <span className="p2-color fw-bold">See All Store</span>
                                                            <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                        {/* Product List */}
                        <div className="col-xl-12 col-xxl-12 cus-z1">
                            <ProductOffers
                                category_id={categoryId}
                                page={page}
                                company_id={companyId}
                                mer_slug={storeSlug}
                                mer_slug_type={slugType}
                                slug={slug}
                            />
                        </div>
                        {/* all product categories horizontal scroll */}
                        <div className="d-grid gap-4 gap-md-6 position-relative cus-z1 py-5">
                            <h3 className="display-four n17-color f-30">Categories in All Products</h3>
                        </div>
                        <div className="position-relative my-4 px-5">
                            <div className="position-absolute start-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                <ScrollButtonLeft sectionType="category" />
                            </div>
                            <div
                                className="horizontal-scroll-category d-flex flex-nowrap overflow-auto py-2"
                                style={{
                                    scrollBehavior: "smooth",
                                    gap: "16px",
                                }} >
                                {categories?.map((category, i) => (
                                    <div key={category.id || i} className="flex-shrink-0" style={{ width: "260px" }}>
                                        {/* <TopCategories category={category} /> */}
                                        <div className="custom-col my-custom-ani">
                                            <div className="custom-card position-relative gap-3 rounded-3">
                                                <Link href={`/all-products/${category.url}`} className='my-auto mx-auto' style={{ paddingLeft: '10px' }}>
                                                    <div className="category-main-text text-center">
                                                        <h4 className="brand-name fw-bold fw-5 mb-2 f-18">{category?.name}</h4>
                                                        {category?.total_offers &&
                                                            <span className="offers-info">{category?.total_offers ? category?.total_offers : 10} Offers Available</span>
                                                        }
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* href={`/${pageSlug}/${category.url}`} */}
                            </div>
                            <div className="position-absolute end-0 top-50 translate-middle-y" style={{ zIndex: 10 }}>
                                <ScrollButtonRight sectionType="category" />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            {page !== '1' && (
                <AllProductsSchema company_id={companyId} categoryName={categoryName} category_id={categoryId} categoryUrl={cleanedSlug.join('/')} />
            )}
        </>
    );
};


export default AllProductLayout