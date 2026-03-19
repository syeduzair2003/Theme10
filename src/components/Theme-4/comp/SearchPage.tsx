"use client";

import { SearchResponse } from "@/services/dataTypes";
import Image from "next/image";
import Link from "next/link";

interface SearchPageProps {
  slug_type: string;
  mer_slug: string;
  cat_slug: string;
  searchData: SearchResponse;
  query: string;
}

export default function SearchPage({
  slug_type,
  mer_slug,
  cat_slug,
  searchData,
  query,
}: SearchPageProps) {
  const getStoreHref = (store: any) =>
    `/${mer_slug}/${store[slug_type as keyof typeof store] || store.slug}`;

  const getCategoryHref = (category: any) =>
    `/${cat_slug}/${category[slug_type as keyof typeof category] || category.slug}`;

  const hasResults =
    searchData?.merchants?.length ||
    searchData?.categories?.length ||
    searchData?.offers?.length;

  return (
    <section className="flex-1">
      <div className="max-w-[1200px] mx-auto px-4 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Search Results for{" "}
            <span className="text-[var(--primary-color)]">&quot;{query}&quot;</span>
          </h2>
          {!hasResults && (
            <p className="text-gray-500 mt-3">No results found. Try again!</p>
          )}
        </div>

        {hasResults && (
          <div className="space-y-12">
            {/* Merchants Section */}
            {searchData.merchants?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                  Stores
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchData.merchants.map((store, idx) => (
                    <Link
                      href={getStoreHref(store)}
                      key={idx}
                      className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[var(--primary-color)] transition-all duration-300"
                    >
                      <div className="relative w-full h-36 bg-gray-50 rounded-t-xl overflow-hidden">
                        <Image
                          src={`/${store.merchant_logo}`}
                          alt={store.merchant_name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[var(--primary-color)]">
                          {store.merchant_name}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories Section */}
            {searchData.categories?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                  Categories
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                  {searchData.categories.map((cat, idx) => (
                    <Link
                      href={getCategoryHref(cat)}
                      key={idx}
                      className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[var(--primary-color)] transition-all duration-300"
                    >
                      <div className="relative w-full h-36 bg-gray-50 rounded-t-xl overflow-hidden">
                        <Image
                          src={`/${cat.category_image}`}
                          alt={cat.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-1 group-hover:text-[var(--primary-color)]">
                          {cat.name}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Offers Section */}
            {searchData.offers?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
                  Offers
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchData.offers.map((offer, idx) => (
                    <Link
                      href={offer.url || "#"}
                      key={idx}
                      className="group bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-[var(--primary-color)] transition-all duration-300"
                    >
                      <div className="p-5">
                        <h4 className="text-base font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-[var(--primary-color)]">
                          {offer.offer_title}
                        </h4>
                        <p className="text-sm text-gray-600 line-clamp-3">
                          {offer.offer_detail}
                        </p>
                        <span className="inline-block mt-3 text-[var(--primary-color)] text-sm font-medium">
                          View Offer →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
