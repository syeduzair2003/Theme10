import { apiCategoryWithSub } from '@/apis/user';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react';

interface Props {
    company_id: string;
}

const CategorySection = async ({ company_id }: Props) => {
    const categoryData = (await apiCategoryWithSub(company_id)).data;

    // Sort parent categories by name
    categoryData.sort((a, b) =>
        a?.category?.name?.localeCompare(b?.category?.name, undefined, { sensitivity: 'base' })
    );

    const sortChildren = (children: CategoryChild[]) => {
        return [...children].sort((a, b) => {
            const nameA = typeof a === "string" ? a : a?.name;
            const nameB = typeof b === "string" ? b : b?.name;
            return nameA?.localeCompare(nameB, undefined, { sensitivity: "base" });
        });
    };

    const renderChildren = (children: CategoryChild[]) => {
        // Sort before rendering
        const sortedChildren = sortChildren(children);

        return (
            <ul className="category-sub-list list-unstyled mb-0">
                {sortedChildren.map((child, idx) => {
                    if (typeof child === 'string') {
                        return <li key={idx} className="category-item">• {child}</li>;
                    }

                    return (
                        <li key={idx} className="category-item nested mb-2">
                            <Link href={child?.url} className="d-flex gap-3 align-items-center text-decoration-none text-dark">
                                <span>• {child?.name}</span>
                                <span className="f5-color rounded-2 s1-4th-bg-color cus-border border b-sixth px-1 px-md-2 py-1 d-flex gap-2 gap-md-3">
                                    <span className="f11-color" style={{ fontSize: '12px' }}>
                                        ({child?.total_offers})
                                    </span>
                                </span>
                            </Link>

                            {/* If children exist, render them sorted too */}
                            {(child?.child?.length ?? 0) > 0 && renderChildren(child.child!)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="container my-4">
            {/* <div className="row g-4"> */}
            <div className="cat-col">
                {categoryData.map((cat: any, idx: number) => (
                    // <div key={idx} className="col-md-4">
                    <div key={idx} className="break-inside-avoid my-4">
                        <div className="category-card card shadow-sm border-0 h-100">
                            {/* Card Header */}
                            <div className="category-card-header card-header border-0 p-0">
                                <Link
                                    href={cat?.category?.url || "#"}
                                    className="category-card-title btn w-100 fw-semibold"
                                >
                                    {cat?.category?.name}
                                </Link>
                            </div>

                            {/* Card Body */}
                            <div className="category-card-body card-body">
                                {cat?.category?.child?.length > 0 &&
                                    renderChildren(cat.category.child)}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};

export default CategorySection;
