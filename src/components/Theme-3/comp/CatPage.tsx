import { apiCategoryWithSub } from '@/apis/user';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
interface Props {
    company_id: string;
}
const CatPage = async ({ company_id }: Props) => {
    const categoryData = (await apiCategoryWithSub(company_id)).data;
    if (!categoryData || categoryData?.length === 0) {
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
    }
    // Sort parent categories by name
    categoryData?.sort((a, b) =>
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
            <ul className="category-sub-list">
                {sortedChildren?.map((child, idx) => {
                    if (typeof child === 'string') {
                        return <li key={idx} className="category-item">• {child}</li>;
                    }

                    return (
                        <li key={idx} className="category-item nested">
                            <Link href={child?.url} className='d-flex gap-3 align-items-center'>
                                • {child?.name}
                                {/* <span className="f5-color rounded-2 s1-4th-bg-color cus-border border b-sixth px-1 px-md-2 py-1 d-flex gap-2 gap-md-3">
                                    <span className='f11-color' style={{ fontSize: '12px' }}>
                                        ({child?.total_offers})
                                    </span>
                                </span> */}
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
        <div className="category-columns">
            {categoryData?.map((cat, idx) => (
                <div className="break-inside-avoid mb-6" key={idx}>
                    <Link href={cat?.category?.url}>
                        <h4 className="category-title n17-color">{cat?.category?.name}</h4>
                    </Link>
                    {renderChildren(cat?.category?.child)}
                </div>
            ))}
        </div>
    );
}

export default CatPage;
