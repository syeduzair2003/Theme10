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
            <div className="common-sidebar p-3"> {/* Added padding for better spacing */}
                <h4 className="n17-color mb-3 fw-semibold"> Popular Tags </h4>
                {/* Added 'flex-wrap' here to prevent horizontal overflow */}
                <ul className="tag-list d-flex align-items-center gap-2 flex-wrap list-unstyled">
                    {all_tags?.data?.slice(0, 10).map((tag: string, i: number) => {
                        return (
                            <li key={i} className="tag-list__item">
                                <Link
                                    href={`/search?query=${encodeURIComponent(tag)}`}
                                    className="cus-tags text-decoration-none"
                                    style={{ whiteSpace: 'nowrap' }} // Keeps text inside the tag on one line
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