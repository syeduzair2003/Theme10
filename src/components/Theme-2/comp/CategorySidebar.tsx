import { faArrowRight, FontAwesomeIcon } from '@/constants/icons';
import { CategoryData } from '@/services/dataTypes'
import Link from 'next/link';
import React from 'react'

interface Props {
    categories: CategoryData[];
    parentCategory?: string;
    pageType?: string;
    limit?: number;
}

const CategorySidebar = async ({ categories, parentCategory, pageType, limit }: Props) => {
    // <Link
    //     href={`/${pageSlug}/${category.url}`}  // ✅ updated URL
    //     className="d-center ms-9 justify-content-between"
    // ></Link>
    const limitedCategories = limit ? categories?.slice(0, limit) : categories;

    if (categories?.length> 0 ) {
    return (
        <aside className="sidebar-box marT20 p-3 rounded-3 shadow-sm b-seventh">
            <h4 className="sidebar-heading marB15 fw-bold capital n17-color">
                {parentCategory
                    ? `Explore Related ${parentCategory} Coupon Categories`
                    : "Popular Coupon Categories"}
            </h4>

            <ul className="sidebar-list list-unstyled m-0 p-0">
                {limitedCategories?.slice(0, 4)?.map((cat, idx) => {
                    const href = pageType ? `/${pageType}/${cat?.url}` : `/${cat?.url}`
                    return (
                        <li
                            key={idx}
                            className={`sidebar-item mb-2`}
                        >
                            <Link
                                href={href}
                                className="sidebar-link d-flex justify-content-between align-items-center px-3 py-2 rounded-2"
                            >
                                <span className="text-capitalize">{cat.name}</span>
                                {cat?.total_offers && (
                                    <span className="badge bg-light text-dark sidebar-offer-count">
                                        {cat.total_offers}
                                    </span>
                                )}
                            </Link>
                        </li>
                    );
                })}
            </ul>
            {pageType !== 'all-products' && (
                <div className="btn-area mt-4 mt-md-6">
                    <Link href={`/category`} className="justify-content-start gap-2 gap-md-3 d-flex align-items-center">
                        <span className="p2-color fw-bold">See All</span>
                        <FontAwesomeIcon icon={faArrowRight} style={{ width: '16px', height: '16px', color: 'black' }} />
                    </Link>
                </div>
            )}
        </aside>
    )
    }
}

export default CategorySidebar
