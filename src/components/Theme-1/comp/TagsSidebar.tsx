import { apiGetKeywords } from '@/apis/user';
import Link from 'next/link';
import React from 'react'

type Props = {
    company_id: string,
    merchant_id: string,
}
const TagsSidebar = async ({ company_id, merchant_id }: Props) => {
    const tags = await apiGetKeywords(merchant_id, company_id);
    const merchantTags: string[] = tags.data.merchant.meta_keywords
        ?.split(",")
        .map((tag: string) => tag.trim()) || [];
    if (merchantTags?.length > 0) {
        return (
            <div className="common-sidebar-wrapper sidebar-bg">
                <div className="common-sidebar">
                    <h2 className="common-sidebar__title f-25" style={{ textAlign: "center", marginBottom: "10px" }}>Popular Tags</h2>
                    <ul className="tag-list flx-align gap-2">
                        {merchantTags?.map((tag: any, i: number) => {
                            return (
                                <li key={i} className="tag-list__item ">
                                    <Link
                                        href={`/search?query=${tag}`}
                                        className="custom-search-item font-14 py-2 px-3 pill"
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
}

export default TagsSidebar
