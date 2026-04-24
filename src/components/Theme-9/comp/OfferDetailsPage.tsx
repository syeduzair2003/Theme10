import {
  apiGetCategoryProductsOffer,
  apiGetProductDetails,
  apiGetCategoryProducts,
} from "@/apis/user";
import OfferOutUrl from "@/components/shared/OfferOutUrl";
import {
  calculateDiscountPercent,
  discardHTMLTags,
  getBaseImageUrl,
  getCurrencySymbol,
  getFinalDiscountTag,
  getMerchantHref,
  getProductDetailHref,
  getProductMerchantHref,
  getRandomRating,
  getRandomStoreSeoTitle,
  splitHeadingFromDetails,
} from "@/constants/hooks";
import {
  faGreaterThan,
  FontAwesomeIcon,
  faArrowRight,
} from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import RenderRating from "./RenderRating";
import RateUs from "./RateUs";
import SpecificProductSchema from "@/components/shared/SchemaScripts/SpecificProductSchema";
import EventOfferCard from "./EventOfferCard";
import { apiGetMerchantUniqueId } from "@/apis/merchant";

interface Props {
  company_id: string;
  store_slug: string;
  slug_type: string;
  product_id: string;
  current_merchant_slug: string;
  categorySlug: string;
}

const OfferDetailsPage = async ({
  company_id,
  store_slug,
  slug_type,
  product_id,
  current_merchant_slug,
  categorySlug,
}: Props) => {
  const domainData = await cookieService.get("domain");
  const companyDomain = domainData?.domain;

  const [response, catRes, merRes, cat] = await Promise.all([
    apiGetProductDetails(company_id, product_id, current_merchant_slug).then(
      (res) => res.data,
    ),
    apiGetCategoryProductsOffer(
      company_id,
      current_merchant_slug,
      categorySlug,
    ).then((res) => res.data),
    apiGetMerchantUniqueId(current_merchant_slug, company_id).then(
      (res) => res.data,
    ),
    apiGetCategoryProducts(company_id, current_merchant_slug).then(
      (res) => res.data,
    ),
  ]);

  const similarCategory = catRes?.filter(
    (item) => item.unique_id !== response?.unique_id,
  );
  if (response == null) return notFound();

  return (
    <>
      {/* Breadcrumb Section */}
      <section className="bg-[#fffde0] border-b border-[#800000]/10 py-8 px-4 lg:px-20">
        <div className="container mx-auto">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm md:text-base">
              <li className="flex items-center gap-2">
                <Link
                  href="/"
                  className="text-slate-500 hover:text-[#800000] transition-colors"
                >
                  Home
                </Link>
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  className="w-3 h-3 text-slate-400"
                />
              </li>
              <li className="flex items-center gap-2">
                <Link
                  href="/products"
                  className="text-slate-500 hover:text-[#800000] transition-colors"
                >
                  Products
                </Link>
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  className="w-3 h-3 text-slate-400"
                />
              </li>
              <li className="flex items-center gap-2 text-capitalize">
                <Link
                  href={getProductMerchantHref(response?.merchant, slug_type)}
                  className="text-slate-500 hover:text-[#800000] transition-colors"
                >
                  {response?.merchant?.merchant_name}
                </Link>
                <FontAwesomeIcon
                  icon={faGreaterThan}
                  className="w-3 h-3 text-slate-400"
                />
              </li>
              {categorySlug && (
                <li className="flex items-center gap-2 text-capitalize">
                  <Link
                    href={`/products/${response?.merchant?.slug}/${categorySlug}`}
                    className="text-slate-500 hover:text-[#800000] transition-colors"
                  >
                    {categorySlug.replace(/-/g, " ")}
                  </Link>
                  <FontAwesomeIcon
                    icon={faGreaterThan}
                    className="w-3 h-3 text-slate-400"
                  />
                </li>
              )}
              <li
                className="font-bold text-[#800000] truncate max-w-[200px] md:max-w-none"
                aria-current="page"
              >
                {response?.offer_title}
              </li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 px-4 lg:px-20 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Left Side: Product Info */}
            <div className="w-full lg:w-2/3">
              <div className="flex flex-col md:flex-row gap-8 items-start border-b border-slate-100 pb-10">
                <div className="w-full md:w-1/3 relative aspect-square bg-slate-50 rounded-2xl overflow-hidden border border-slate-200">
                  <Image
                    src={getBaseImageUrl(
                      companyDomain,
                      response?.product_image,
                      "",
                    )}
                    alt={response?.offer_title}
                    fill
                    className="object-contain p-4 transition-transform duration-500 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 300px"
                  />
                </div>
                <div className="w-full md:w-2/3">
                  <h1 className="text-2xl md:text-4xl font-black text-[#1A1A1A] leading-tight mb-4">
                    {discardHTMLTags(response?.offer_title)}
                  </h1>

                  <div className="flex flex-wrap items-center gap-6 mt-6 p-6 bg-[#800000]/5 rounded-2xl">
                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                        Price
                      </span>
                      <div className="flex items-baseline gap-3">
                        <span className="text-3xl font-black text-[#800000]">
                          {getCurrencySymbol(response?.currency)}
                          {response?.sale_price}
                        </span>
                        {response?.original_price && (
                          <span className="text-lg text-slate-400 line-through decoration-slate-300">
                            {getCurrencySymbol(response?.currency)}
                            {response?.original_price}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="h-12 w-[1px] bg-slate-200 hidden md:block"></div>

                    <div className="flex flex-col">
                      <span className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-1">
                        Discount
                      </span>
                      <span className="text-2xl font-black text-green-600">
                        {getFinalDiscountTag(
                          response?.offer_title,
                          calculateDiscountPercent(
                            response?.original_price,
                            response?.sale_price,
                          ),
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <OfferOutUrl
                      domain={companyDomain}
                      merchantHref={getMerchantHref(
                        response?.merchant,
                        store_slug,
                        slug_type,
                      )}
                      outUrl={response?.url}
                      unique_id={response?.unique_id}
                      customClass="w-full md:w-max bg-[#800000] text-white hover:bg-[#1A1A1A] transition-all duration-300 font-bold py-4 px-12 rounded-full flex justify-center items-center shadow-lg shadow-[#800000]/20"
                    >
                      <span className="text-lg">Buy Now</span>
                    </OfferOutUrl>
                  </div>
                </div>
              </div>

              {/* Description Section */}
              {response?.offer_detail && (
                <div className="mt-10 prose prose-slate max-w-none">
                  <h3 className="text-xl font-bold text-[#1A1A1A] mb-4">
                    Product Details
                  </h3>
                  <div
                    className="text-slate-600 leading-relaxed text-justify"
                    dangerouslySetInnerHTML={{ __html: response?.offer_detail }}
                  />
                </div>
              )}
            </div>

            {/* Right Side: Sticky Sidebar */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-24 space-y-6">
                {/* Merchant Info Card */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                  <div className="flex flex-col items-center gap-6">
                    <div className="relative w-full h-32 bg-slate-50 rounded-2xl overflow-hidden p-4 border border-slate-100">
                      <Image
                        className="object-contain"
                        alt={response?.merchant?.merchant_name}
                        src={getBaseImageUrl(
                          companyDomain,
                          response?.merchant?.merchant_logo,
                          "",
                        )}
                        fill
                      />
                    </div>

                    <div className="flex items-center gap-3 bg-[#fffde0] px-4 py-2 rounded-full border border-[#800000]/10">
                      <div className="bg-[#800000] text-white text-xs font-bold w-8 h-8 flex items-center justify-center rounded-full">
                        {getRandomRating(response?.merchant?.rating)}
                      </div>
                      <RenderRating
                        rating={getRandomRating(response?.merchant?.rating)}
                      />
                    </div>
                  </div>
                </div>

                {/* Rate Us Card */}
                <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                  <RateUs
                    offer_id={response?.unique_id || ""}
                    company_id={company_id}
                  />
                </div>

                {/* Sidebar Categories */}
                {cat?.length > 0 && (
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
                    <h4 className="text-lg font-black text-[#1A1A1A] mb-4 border-b border-slate-100 pb-4">
                      More from {response?.merchant?.merchant_name}
                    </h4>
                    <div className="space-y-3">
                      {cat.slice(0, 10).map((category, i) => (
                        <Link
                          key={i}
                          href={`${getProductMerchantHref(response?.merchant, slug_type)}/${category.slug}`}
                          className="flex items-center gap-3 group text-slate-600 hover:text-[#800000] transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-[#800000] transition-colors"></span>
                          <span className="text-sm font-medium">
                            {category?.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Link
                      href={getProductMerchantHref(
                        response?.merchant,
                        slug_type,
                      )}
                      className="flex items-center gap-2 mt-6 text-[#800000] font-bold text-sm hover:gap-4 transition-all"
                    >
                      <span>See All</span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="w-3 h-3"
                      />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Related Products Grid */}
          {similarCategory?.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-10 capitalize">
                {categorySlug.replace(/-/g, " ")}{" "}
                <span className="text-[#800000]">Related Products</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {similarCategory.slice(0, 8).map((item, i) => (
                  <EventOfferCard
                    key={i}
                    product={item}
                    merchantHref={getMerchantHref(
                      merRes,
                      store_slug,
                      slug_type,
                    )}
                    domain={companyDomain}
                    merchant_name={merRes?.merchant_name}
                    merchant_logo={merRes?.merchant_logo}
                    productDetailUrl={getProductDetailHref(
                      merRes,
                      slug_type,
                      item?.slug,
                      item?.category?.slug,
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <SpecificProductSchema
        company_id={company_id}
        product_id={response?.unique_id}
        current_merchant_slug={current_merchant_slug}
        slug_type={slug_type}
      />
    </>
  );
};

export default OfferDetailsPage;
