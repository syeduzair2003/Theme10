import { apiCategoryWithSub } from '@/apis/user';
import { CategoryChild } from '@/services/dataTypes';
import Link from 'next/link';
import React from 'react'
interface Props {
    company_id: string;
}
const CatPage = async ({ company_id }: Props) => {
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
            <ul className="category-sub-list">
                {sortedChildren.map((child, idx) => {
                    if (typeof child === 'string') {
                        return <li key={idx} className="category-item">• {child}</li>;
                    }

                    return (
                        <li key={idx} className="category-item nested">
                            <Link href={child?.url} className='d-flex justify-content-between'>
                            • {child?.name}
                            <span className="badge bg-secondary">({child?.total_offers})</span>
                            </Link>
                            {/* If children exist, render them sorted too */}
                            {/* {child?.children?.length > 0 && renderChildren(child.children)} */}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="category-columns">
            {categoryData.map((cat, idx) => (
                // <div className="break-inside-avoid mb-6" key={idx}>
                //     <Link href={cat?.category?.url}>
                //         <h4 className="category-title n17-color">{cat?.category?.name}</h4>
                //     </Link>
                //     {renderChildren(cat?.category?.child)}
                // </div>
                <div key={idx} className="card my-3 p-2 rounded-4 shadow-sm">
                    <div className="card-header text-center border-0">
                        <Link className="text-decoration-none" href={cat?.category?.url}>
                            <h4 className="category-title n17-color">{cat?.category?.name}</h4>
                        </Link>
                    </div>
                    <div className="card-body p-2">
                        <div className="cmd-child-taxonomies list-group">
                            {renderChildren(cat?.category?.child)}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default CatPage;
