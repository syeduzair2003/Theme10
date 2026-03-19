import { apiGetPopularProducts } from "@/apis/page_optimization";
import { getRandomRating } from "@/constants/hooks";
import ProductCard from "./ProductCard";

interface ProductsSectionProps {
  company_id: string;
  domain: string;
  mer_slug: string;
  slug_type: string;
}

const ProductsSection = async ({ company_id, domain, mer_slug, slug_type }: ProductsSectionProps) => {
  const response = await apiGetPopularProducts(company_id);
  const heading = response?.data?.home_page_widget?.widget_heading || 'Trending Products';
  const description = response?.data?.home_page_widget?.widget_text;
  const products = response?.data?.offers.flat();

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Heading */}
        <h2 className="stores-heading text-center text-3xl font-extrabold 
             text-transparent bg-clip-text 
             bg-gradient-to-r from-[var(--primary-color)] to-orange-500 
             leading-tight pb-5">
          {heading}
        </h2>
        <p className="text-gray-900 text-center mb-10">
          {description}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {products?.map((item: any, index: number) => (
            <ProductCard
              key={index}
              image={`${item?.offer?.product_image}`}
              title={item?.offer?.offer_title}
              description={item?.offer?.offer_detail}
              expiry={item?.offer?.end_date}
              originalPrice={item?.offer?.original_price}
              discountedPrice={item?.offer?.sale_price}
              rating={getRandomRating()}
              href={item?.offer?.url}
              unique_id={item?.offer?.unique_id}
              domain={domain}
              mer_slug={mer_slug}
              slug_type={slug_type} id={item?.offer?.id}
              merchant={item?.merchant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
