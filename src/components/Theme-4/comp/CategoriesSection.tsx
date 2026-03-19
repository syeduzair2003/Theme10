import Image from "next/image";
import { apiGetTopCategories } from "@/apis/page_optimization";
import Link from "next/link";
import Button from "./Button";

interface CategoriesSectionProps {
  company_id: string;
}

const CategoriesSection = async ({ company_id }: CategoriesSectionProps) => {
  const result = (await apiGetTopCategories(company_id))?.data;
  const heading = result?.top_category_widget?.widget_heading || 'Discover Deals in Every Category';
  const description = result?.top_category_widget?.widget_text;
  const categories = result?.categories;
  return (
    <section className="py-10 md:py-16 bg-gray-50">
      <div className="max-w-[1200px] mx-auto px-4">
        {/* Section Heading */}
        <h2 className="stores-heading text-center text-2xl md:text-3xl font-extrabold 
             text-transparent bg-clip-text 
             bg-gradient-to-r from-[var(--primary-color)] to-orange-500 
             leading-tight pb-5">
          {heading}
        </h2>
        <p className="text-gray-900 text-center mb-10">
          {description}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categories?.map((cat) => (
            <Link
              key={cat?.id}
              href={cat?.url || "#"}
              className="group bg-white no-underline shadow-md rounded-xl p-6 flex flex-col items-center justify-center
                         hover:shadow-xl hover:-translate-y-1 transition-all duration-300 "
            >
              <div className="relative w-20 h-20 mb-4">
                <Image
                  src={`/${cat?.category_image}`}
                  alt={cat?.name}
                  fill
                  className="object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm  text-center font-medium text-gray-800">
                {cat?.name}
              </h3>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button
            href="/category"
            variant="ghost"
            className="btn-hover-gradient"
            label="View All Categories"
          >
          </Button>
        </div>
      </div>
    </section>
  );
}


export default CategoriesSection;