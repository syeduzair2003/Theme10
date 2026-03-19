import { CategoryData } from "@/services/dataTypes";
import Link from "next/link";

interface PopularCouponCategoriesProps {
  categories: CategoryData[];
}

export default function PopularCouponCategories({ categories }: PopularCouponCategoriesProps) {
  if (!categories || categories.length === 0) return null;

  return (
<section>
  <h2 className="text-xl font-bold mb-4 text-black">Popular Coupon Categories</h2>
  <div className="flex flex-wrap gap-3">
    {categories.map((cat) => (
      <Link
        key={cat.id}
        href={`/category/${cat.slug}`}
        className="no-underline px-3 py-2 text-black bg-gray-100 rounded-lg text-sm font-medium hover:bg-[#e41717] hover:!text-white transition"
      >
        {cat.name}
      </Link>
    ))}
  </div>
</section>

  );
}
