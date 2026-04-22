import { apiGetAllProducts } from "@/apis/user";
import cookieService from "@/services/CookiesService";
import { OffersOffer } from "@/services/dataTypes";
import React from "react";
import Pagination from "./Pagination";
import EventOfferCard from "./EventOfferCard";

interface Props {
  page?: string;
  company_id: string;
  mer_slug: string;
  mer_slug_type: string;
  category_id?: string;
  slug?: string[];
  limit?: 18;
}

const ProductOffers = async ({
  page,
  company_id,
  mer_slug,
  mer_slug_type,
  category_id,
  slug,
}: Props) => {
  const currentPage = Math.max(1, parseInt(page || "1", 10));
  const offersData = (
    await apiGetAllProducts(company_id, category_id, currentPage.toString(), 18)
  ).data;
  const totalPages = offersData?.pagination?.last_page || 0;
  const domain = (await cookieService.get("domain")).domain;

  const cleanedSlug = slug?.length
    ? slug.filter((s, i) => {
        if (s === "page" && !isNaN(Number(slug[i + 1]))) return false;
        if (i > 0 && slug[i - 1] === "page" && !isNaN(Number(s))) return false;
        return true;
      })
    : [];

  const baseUrl = cleanedSlug.length
    ? `/all-products/${cleanedSlug.join("/")}`
    : `/all-products`;

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-10 items-stretch">
        {offersData && offersData?.offers?.length > 0 ? (
          offersData?.offers?.map((item: OffersOffer, i: number) => (
            <div key={i} className="w-full flex flex-col h-full group">
              <EventOfferCard
                product={item?.offer}
                merchantHref={`/store/${item.merchant?.slug}`}
                domain={domain}
                merchant_name={item.merchant?.merchant_name}
                merchant_logo={item.merchant?.merchant_logo}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-24 bg-[#FDFBE7]/50 rounded-[3rem] border-2 border-dashed border-[#EADDCA]">
            <div className="text-6xl mb-6 grayscale opacity-60">🛍️</div>
            <h3 className="text-2xl font-black text-[#1A1A1A] mb-3 uppercase tracking-tight">
              No <span className="text-[#800000]">Offers</span> Found
            </h3>
            <p className="text-[#4A4A4A] max-w-xs mx-auto text-sm font-medium leading-relaxed">
              We couldn't find any deals in this category right now. Try
              exploring other stores!
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {/* {totalPages > 1 && (
        <div className="mt-16 flex justify-center pb-8">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={baseUrl}
          />
        </div>
      )} */}
    </div>
  );
};

export default ProductOffers;
