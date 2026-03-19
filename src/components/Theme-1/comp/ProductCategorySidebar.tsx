import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
  categories: CategoryData[];
  pageSlug: string;
  categoryName?: string;
}

const ProductCategorySidebar = async ({ categories, pageSlug, categoryName }: Props) => {
  return (
    <div className="single-bar modern-sidebar p-4 rounded-4 shadow-sm bg-white">
      <h4 className="n17-color mb-3 fw-semibold">
        {categoryName
          ? `Explore Related ${categoryName} Coupon Categories`
          : `Popular Categories`}
      </h4>

      <div className="v-line w-100 position-relative my-3"></div>

      {/* ✅ Scrollable fixed-height container */}
      <div className="d-grid gap-2 category-scroll">
        {categories?.slice(0, 10).map((category, i) => (
          <div key={i} className="suggested-category d-flex justify-content-between align-items-center p-2 rounded-3 hover-card">
            <Link
              href={`/${pageSlug}/${category.url}`}
              className="d-flex align-items-center gap-2 text-decoration-none flex-grow-1"
            >
              <span className="custom-bullet"></span>
              <span className="title-area text-dark">{category?.name}</span>
            </Link>

            <span className="text-muted small">{category?.total_offers}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategorySidebar;
