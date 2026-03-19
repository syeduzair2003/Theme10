import React from 'react'
import Link from 'next/link'
import { apiCategoryWithSub } from '@/apis/user'
import { CategoryChild } from '@/services/dataTypes'

interface CategoryPageLayoutProps {
  company_id: string
}

const CategoryPageLayout = async ({ company_id }: CategoryPageLayoutProps) => {
  const categoryData = await apiCategoryWithSub(company_id);
  const categories = categoryData?.data || []

  categories?.sort((a, b) =>
    a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
  );

  const sortChildren = (children: CategoryChild[]) => {
    return [...children].sort((a, b) => {
      const nameA = typeof a === "string" ? a : a?.name;
      const nameB = typeof b === "string" ? b : b?.name;
      return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
    });
  };

  const renderChildren = (children: CategoryChild[], level = 0) => {
    const sortedChildren = sortChildren(children);

    return (
      <ul className={`mt-2 space-y-0.5 ${level > 0 ? 'border-l border-slate-800' : ''}`}>
        {sortedChildren?.map((child, idx) => {
          const isString = typeof child === 'string';
          const name = isString ? child : child?.name;
          const url = isString ? '#' : child?.url;
          const offers = isString ? 0 : child?.total_offers;

          return (
            <li key={idx} className="group/item">
              <Link
                href={url}
                className="flex items-center justify-between py-2 px-1 rounded-lg hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-1 h-1 shrink-0 rounded-full bg-slate-700 group-hover/item:bg-indigo-500 transition-colors" />
                  <span className="text-sm font-medium text-slate-400 group-hover/item:text-indigo-200 truncate">
                    {name}
                  </span>
                </div>

                {/* {offers > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-500 group-hover/item:text-indigo-400 transition-all">
                    {offers}
                  </span>
                )} */}
              </Link>
              {!isString && (child?.child?.length ?? 0) > 0 && renderChildren(child.child!, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  if (!categories || categories.length === 0) {
    return (
      <div className="mx-4 py-16 bg-slate-900 rounded-[2rem] border border-white/5 flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-black text-white uppercase tracking-tight">Empty</h2>
      </div>
    );
  }

  return (
    <div className="px-4 pb-20 lg:px-16">
      {/* Container: 1 col on mobile, masonry on desktop */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4 lg:space-y-8">
        {categories?.map((cat, idx) => (
          <div
            className="break-inside-avoid bg-slate-900 border border-white/5 p-5 lg:p-8 rounded-[1.5rem] lg:rounded-[2.5rem] hover:border-indigo-500/30 transition-all shadow-xl"
            key={idx}
          >
            <Link href={cat?.category?.url} className="group/title block">
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base font-black text-white uppercase tracking-tight group-hover/title:text-indigo-500 transition-colors truncate">
                  {cat?.category?.name}
                </h4>
                <svg className="w-4 h-4 text-slate-600 group-hover/title:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
              <div className="h-1 w-6 bg-indigo-600 mt-2 group-hover/title:w-full transition-all duration-500" />
            </Link>

            <div className="mt-4">
              {renderChildren(cat?.category?.child)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryPageLayout;