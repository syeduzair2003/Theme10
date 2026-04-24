import { apiCategoryWithSub } from "@/apis/user";
import { CategoryChild } from "@/services/dataTypes";
import Link from "next/link";
import React from "react";

interface Props {
  company_id: string;
}

const CatPage = async ({ company_id }: Props) => {
  const categoryData = (await apiCategoryWithSub(company_id)).data;

  if (!categoryData || categoryData?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h3 className="text-2xl font-bold text-red-500 bg-red-500/10 px-6 py-3 rounded-2xl border border-red-500/20">
          No Categories Found
        </h3>
      </div>
    );
  }

  categoryData?.sort((a, b) =>
    a?.category?.name?.localeCompare(b?.category?.name, undefined, {
      sensitivity: "base",
    }),
  );

  const sortChildren = (children: CategoryChild[]) => {
    return [...children].sort((a, b) => {
      const nameA = typeof a === "string" ? a : a?.name;
      const nameB = typeof b === "string" ? b : b?.name;
      return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
    });
  };

  const renderChildren = (children: CategoryChild[]) => {
    const sortedChildren = sortChildren(children);

    return (
      <ul className="mt-4 space-y-3 pl-4 border-l border-white/5">
        {sortedChildren?.map((child, idx) => {
          if (typeof child === "string") {
            return (
              <li
                key={idx}
                className="text-slate-400 text-sm flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-slate-600 rounded-full" />{" "}
                {child}
              </li>
            );
          }

          return (
            <li key={idx} className="group/item">
              <Link
                href={child?.url}
                className="no-underline flex items-center justify-between group-hover/item:translate-x-1.5 transition-all duration-300 py-1.5"
              >
                <div className="flex items-center gap-2 text-[#1A1A1A]/70 group-hover/item:text-[#800000] text-[14px] font-medium transition-colors">
                  <span className="text-[#800000]/40 group-hover/item:text-[#800000]">
                    •
                  </span>
                  {child?.name}
                </div>

                <span className="bg-[#800000]/5 text-[#800000] text-[10px] font-bold px-2 py-0.5 rounded-md border border-[#800000]/10 transition-all duration-300 group-hover/item:bg-[#800000] group-hover/item:text-white">
                  {child?.total_offers}
                </span>
              </Link>

              {(child?.child?.length ?? 0) > 0 && (
                <div className="ml-2 mt-2">{renderChildren(child.child!)}</div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-8 space-y-8">
      {categoryData?.map((cat, idx) => (
        <div
          key={idx}
          className="break-inside-avoid bg-white/60 backdrop-blur-md rounded-[2.5rem] p-8 border border-[#800000]/10 hover:border-[#800000]/40 transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(128,0,0,0.12)] hover:-translate-y-2 group"
        >
          <Link
            href={cat?.category?.url}
            className="no-underline block border-b border-[#800000]/10 pb-5 mb-4 group/link"
          >
            <h4 className="text-xl font-black text-[#1A1A1A] group-hover:text-[#800000] transition-all duration-300 flex items-center justify-between tracking-tight">
              {cat?.category?.name}

              <div className="w-9 h-9 rounded-full bg-[#800000]/5 flex items-center justify-center text-[#800000] scale-0 group-hover:scale-100 transition-all duration-500 shadow-sm border border-[#800000]/10">
                <svg
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </h4>
          </Link>

          <div className="mt-2">{renderChildren(cat?.category?.child)}</div>
        </div>
      ))}
    </div>
  );
};

export default CatPage;
