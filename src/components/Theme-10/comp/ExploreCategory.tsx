import React from "react";
import Link from "next/link";
import { apiGetTopCategories } from "@/apis/page_optimization";
import { splitHeading } from "@/constants/hooks";
import { ArrowRight } from "lucide-react";
import TopCategories from "./TopCategories"; // Hum niche naya component banayenge

interface Props {
  companyId: string;
  slug_type: string;
  cat_slug: string;
}

const ExploreCategory = async ({ companyId, cat_slug, slug_type }: Props) => {
  const response = await apiGetTopCategories(companyId);
  const topCategoriesResponse = response.data;

  // Heading logic
  const [firstHalf, secondHalf] = splitHeading(
    response?.data?.top_category_widget?.widget_heading,
  );
  const content = response?.data?.top_category_widget?.widget_text;

  if (
    !topCategoriesResponse?.categories ||
    topCategoriesResponse?.categories?.length === 0
  ) {
    return null;
  }

  return (
    <section className="relative bg-[#fffde0] py-24 px-6 overflow-hidden">
      {/* Section Top Divider Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#800000]/10 via-[#800000]/60 via-[#800000]/10 to-transparent opacity-100 shadow-[0_1px_2px_rgba(0,0,0,0.05)]" />

      <div className="max-w-7xl mx-auto">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div className="max-w-full">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-[#1A1A1A]"></span>
              <p className="text-[#800000] font-bold text-sm uppercase tracking-[0.2em] leading-none">
                Explore Categories
              </p>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-[#1A1A1A] mb-4 tracking-tight">
              {firstHalf ? firstHalf : `Browse by`}{" "}
              <span className="text-[#800000]">
                {secondHalf ? secondHalf : `Category`}
              </span>
            </h2>
            <p className="text-gray-500 text-lg">{content}</p>
          </div>

          <Link
            href={`/${cat_slug}`}
            className="group relative flex items-center gap-3 w-fit text-[#1A1A1A]/70 font-black text-[12px] uppercase tracking-[0.2em] no-underline transition-all duration-300 hover:text-[#800000]"
          >
            {/* Main Text */}
            <span className="relative">
              All Categories
              {/* Animated Underline */}
              <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[#800000] transition-all duration-300 group-hover:w-full" />
            </span>

            {/* Dynamic Arrow Icon */}
            <div className="relative flex items-center justify-center">
              {/* Arrow Background Circle on Hover - Updated to Maroon tint for theme consistency */}
              <div className="absolute h-8 w-8 scale-0 rounded-full bg-[#800000]/5 transition-transform duration-300 group-hover:scale-100" />

              <ArrowRight
                size={18}
                className="relative z-10 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-[#800000]"
              />
            </div>
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCategoriesResponse.categories
            .slice(0, 8)
            .map((category: any, index: number) => (
              <TopCategories key={index} category={category} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategory;
