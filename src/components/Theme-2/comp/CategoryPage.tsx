import { apiCategoryWithSub } from '@/apis/user';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'

const CategoryPage = async ({ companyId }: { companyId: string }) => {
    const categoryData = (await apiCategoryWithSub(companyId)).data;
    if (!categoryData || categoryData?.length === 0) {
        return (
            <section className="product-shop-full-grid">
                <div className="container">
                    <div className="row">
                        <div className="section-title-center text-center mt-5">
                        <div className="col-12">
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100px" }}>
                            <h3 className="fs-three n17-color text-danger">No Categories Found</h3>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }

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
            <ul className="t2-category-sub-list">
                {sortedChildren.map((child, idx) => {
                    if (typeof child === "string") {
                        return (
                            <li key={idx} className="t2-category-item">
                                • {child}
                            </li>
                        );
                    }

                    return (
                        <li key={idx} className="t2-category-item t2-nested">
                            <Link
                                href={child?.url}
                                className="t2-category-link d-flex gap-2 align-items-center"
                            >
                                • {child?.name}
                                {/* <span className="t2-offer-badge px-1 px-md-2 py-1 d-flex align-items-center">
                                    <span className="t2-offer-count">({child?.total_offers})</span>
                                </span> */}
                            </Link>

                            {/* Render children if available */}
                            {(child?.child?.length ?? 0) > 0 && renderChildren(child.child!)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="t2-category-columns">
            {categoryData.map((cat, idx) => (
                <div className="t2-category-block mb-3 cat-page-cards" key={idx}>
                    <Link href={cat?.category?.url}>
                        <h4 className="t2-category-title">{cat?.category?.name}</h4>
                    </Link>
                    {renderChildren(cat?.category?.child)}
                </div>
            ))}
        </div>
    );

}

export default CategoryPage
