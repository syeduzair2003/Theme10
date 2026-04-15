import { getCategoryHref } from "@/constants/hooks";
import { faArrowRight, FontAwesomeIcon } from "@/constants/icons";
import { CategoryData } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";

interface Props {
  categories: CategoryData[];
  cat_slug: string;
  slug_type: string;
  parentCategory?: string;
}

const CategorySidebar = async ({
  categories,
  cat_slug,
  slug_type,
  parentCategory,
}: Props) => {
  return (
    <div className="space-y-6">
      <h4 className="text-xl font-black text-[#1A1A1A] border-b border-[#800000]/10 pb-4 leading-tight tracking-tight uppercase text-xs sm:text-xl">
        {parentCategory ? `${parentCategory} Deals` : "Popular Categories"}
      </h4>

      <div className="space-y-1.5">
        {categories?.slice(0, 10).map((category, i) => (
          <Link
            key={i}
            href={`/${category.url}`}
            className="no-underline group flex items-center justify-between p-3 rounded-2xl hover:bg-[#800000]/5 transition-all duration-300"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <span className="w-1.5 h-1.5 bg-[#800000]/20 group-hover:bg-[#800000] rounded-full transition-colors flex-shrink-0"></span>
              <span className="text-[#1A1A1A]/70 group-hover:text-[#1A1A1A] font-medium truncate transition-colors">
                {category?.name}
              </span>
            </div>

            {/* Offers Badge */}
            <span className="text-[10px] font-black text-[#800000] bg-[#800000]/5 px-2.5 py-1 rounded-lg group-hover:bg-[#800000] group-hover:text-white transition-all duration-500 border border-[#800000]/5">
              {category?.total_offers}
            </span>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <Link
        href={`/${cat_slug}`}
        className="flex items-center justify-center gap-3 w-full py-4 bg-[#800000]/5 text-[#800000] font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#800000] hover:text-white transition-all duration-500 shadow-sm group border border-[#800000]/10"
      >
        <span>View All Categories</span>
        <FontAwesomeIcon
          icon={faArrowRight}
          className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform"
        />
      </Link>
    </div>
  );
};

export default CategorySidebar;
