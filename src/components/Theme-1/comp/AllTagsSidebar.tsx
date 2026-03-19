import { apiGetAllKeywords } from '@/apis/user';
import Link from 'next/link';
import React from 'react'

type Props = {
    company_id: string,
}
const AllTagsSidebar = async ({ company_id }: Props) => {
    const all_tags = await apiGetAllKeywords(company_id);

    return (
        <div className="common-sidebar-wrapper mb-4 sidebar-bg card shadow-sm rounded-4 my-3">
            <div className="common-sidebar">
                <h4 className="n17-color mb-3 fw-semibold"> Popular Tags </h4>
                <ul className="tag-list flx-align gap-2">
                    {all_tags?.data.slice(0, 5).map((tag: any, i: number) => {
                        return (
                            <li key={i} className="tag-list__item ">
                                <Link
                                    href={`/search?query=${tag}`}
                                    className="cus-tags"
                                >
                                    {tag}
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default AllTagsSidebar
