import { apiGetCategoryProducts, apiGetMerchantProducts } from "@/apis/user";
import { faGreaterThan, FontAwesomeIcon } from "@/constants/icons";
import cookieService from "@/services/CookiesService";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  getMerchantHref,
  getMerchantProductsSeo,
  getProductDetailHref,
} from "@/constants/hooks";
import EventOfferCard from "@/components/Theme-3/comp/EventOfferCard";
import { apiGetMerchantUniqueId } from "@/apis/merchant";
import ScrollButtonLeft from "./ScrollButtonLeft";
import ScrollButtonRight from "./ScrollButtonRight";
import MerchantProductsSchema from "@/components/shared/SchemaScripts/ProductsMerchantSchema";
import { ChevronRight } from "lucide-react"; // Replacing FA for cleaner look if you want

interface Props {
  slug: string;
  companyId: string;
  storeSlug: string;
  slugType: string;
}

const MerchantProductsPage = async ({
  slug,
  companyId,
  storeSlug,
  slugType,
}: Props) => {
  const cookieData = await cookieService.get("domain");
  const companyDomain = cookieData?.domain;

  const [products, merRes, cat] = await Promise.all([
    apiGetMerchantProducts(companyId, slug).then((res) => res.data),
    apiGetMerchantUniqueId(slug, companyId).then((res) => res.data),
    apiGetCategoryProducts(companyId, slug).then((res) => res.data),
  ]);

  return (
    <>
      {/* Banner Section */}
      <section className="relative overflow-hidden bg-[#fffde0] rounded-xl border border-[#800000]/10 mx-4 lg:mx-20 mt-6">
        <div className="container mx-auto px-6 py-12 lg:py-0">
          <div className="flex flex-col lg:flex-row items-center gap-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col gap-6 z-10">
              <h1 className="text-3xl md:text-5xl font-black text-[#1A1A1A] tracking-tight leading-tight">
                {getMerchantProductsSeo(merRes?.merchant_name)}
              </h1>

              <nav aria-label="Breadcrumb">
                <ol className="flex items-center flex-wrap gap-2 text-sm md:text-base">
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
                  <li
                    className="font-bold text-[#800000] capitalize"
                    aria-current="page"
                  >
                    {slug}
                  </li>
                </ol>
              </nav>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 relative h-[250px] md:h-[400px]">
              <Image
                src="/shared-assets/BANNER.png"
                alt="Banner"
                fill
                className="object-cover lg:object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-12 lg:px-20">
        {/* Categories Section */}
        {cat?.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A] mb-8 capitalize">
              Product Categories for{" "}
              <span className="text-[#800000]">{merRes?.merchant_name}</span>
            </h2>

            <div className="relative group px-2">
              {/* Scroll Buttons */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
                <ScrollButtonLeft sectionType="category" />
              </div>

              <div className="horizontal-scroll-category flex flex-nowrap overflow-x-auto scroll-smooth gap-4 py-4 no-scrollbar">
                {cat.map(
                  (
                    item: { id: number; name: string; slug: string },
                    i: number,
                  ) => (
                    <Link
                      key={item.id || i}
                      href={`/products/${slug}/${item.slug}`}
                      className="flex-shrink-0 w-[240px] group/card"
                    >
                      <div className="bg-white border border-[#800000]/10 rounded-2xl p-6 text-center shadow-sm group-hover/card:border-[#800000] group-hover/card:shadow-md transition-all duration-300">
                        <h4 className="text-lg font-bold text-[#1A1A1A] group-hover/card:text-[#800000] transition-colors">
                          {item.name}
                        </h4>
                      </div>
                    </Link>
                  ),
                )}
              </div>

              <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
                <ScrollButtonRight sectionType="category" />
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        <div className="space-y-10">
          <h2 className="text-2xl md:text-3xl font-black text-[#1A1A1A]">
            Discover Quality Discount Products from{" "}
            <span className="text-[#800000]">{merRes?.merchant_name}</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.length > 0 ? (
              products.map((item, i) => (
                <div key={i} className="w-full flex justify-center">
                  <EventOfferCard
                    product={item}
                    merchantHref={getMerchantHref(merRes, storeSlug, slugType)}
                    domain={companyDomain}
                    merchant_name={merRes?.merchant_name}
                    merchant_logo={merRes?.merchant_logo}
                    productDetailUrl={getProductDetailHref(
                      merRes,
                      slugType,
                      item.slug,
                      item?.category?.slug,
                    )}
                  />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-slate-400 font-medium">
                No products found for this merchant.
              </div>
            )}
          </div>
        </div>
      </section>

      <MerchantProductsSchema
        company_id={companyId}
        merchantSlug={slug}
        merchantName={merRes?.merchant_name}
      />
    </>
  );
};

export default MerchantProductsPage;
