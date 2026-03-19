import { apiGetTopMerchants } from "@/apis/page_optimization";
import NewPopularMerchantCard from "./NewPopularMerchantCard";
import Link from "next/link";
import Image from "next/image";
import { getBaseImageUrl, splitHeading } from "@/constants/hooks";
import cookieService from "@/services/CookiesService";
import { Merchant } from "@/services/dataTypes";
// import Image from '@/components/shared/Image';

interface Props {
  companyId: string;
  slug_type: string;
  mer_slug: string;
}
const PopularStores = async ({ companyId, slug_type, mer_slug }: Props) => {
  const merchants = await apiGetTopMerchants(companyId);
  const domain = (await cookieService.get("domain")).domain;
  const [firstHalf, secondHalf] = splitHeading(merchants?.data?.top_merchants_widget?.widget_heading);
  const allMerchants = merchants?.data?.merchants || [];
  let visibleMerchants: Merchant[] = [];
  const cleanedText = merchants?.data?.top_merchants_widget?.widget_heading?.trim();
  const wordCount = cleanedText?.split(/\s+/)?.filter(Boolean).length;

  if (allMerchants.length <= 6) {
    visibleMerchants = allMerchants;
  } else if (allMerchants.length > 6 && allMerchants.length < 9) {
    visibleMerchants = allMerchants.slice(0, 6);
  } else if (allMerchants.length >= 9 && allMerchants.length <= 12) {
    visibleMerchants = allMerchants.length >= 9 ? allMerchants.slice(0, 9) : allMerchants;
  } else if (allMerchants.length >= 12) {
    visibleMerchants = allMerchants.length >= 15 ? allMerchants.slice(0, 15) : allMerchants.slice(0, allMerchants.length - (allMerchants.length % 3));
  }

  if (merchants.data?.merchants?.length > 0) {
    return (
      <section className="padding-y-60 position-relative z-index-1 overflow-hidden"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // color: '#FFFFFF',
          fontSize: '24px',
          fontWeight: 'bold',
        }}
      >
        <div className="container">
          <Image src={"/themes/Theme_1/images/shapes/pattern.png"} alt="icon" className="bg-pattern"
            width={1000} height={400}
          />
          <div className="section-heading style-left style-flex flx-between align-items-end gap-3 mb-2">
            <div className="section-heading__inner w-lg">
              <h1 className={`section-heading__title ${wordCount > 20 ? 'f-25' : 'f-40'}`}>
                {firstHalf ? firstHalf : "Featured"} {secondHalf ? secondHalf : "Merchants"}
              </h1>
            </div>
            <Link href={`/${mer_slug}`} className="btn btn-main btn-lg pill">
              View All
            </Link>
          </div>
          <div className="row gy-4">
            <div className='col-lg-12 col-xl-12'>
              <p className="text-dark f-14">
                {merchants?.data?.top_merchants_widget?.widget_text ? merchants?.data?.top_merchants_widget?.widget_text : "Discover the most popular merchants offering the best deals, discounts, and coupons. These top brands are trusted by shoppers and frequently updated with exclusive offers to help you save more on your favorite products."}
              </p>
            </div>
            {visibleMerchants?.slice(0,12).map((merchant, i) => (
              <NewPopularMerchantCard
                key={i}
                merchant={merchant}
                mer_slug={mer_slug}
                slug_type={slug_type}
                preloadedImage={getBaseImageUrl(domain, merchant?.merchant_logo, "")}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
};

export default PopularStores;