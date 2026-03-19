import { apiMostSearch } from '@/apis/user';
import Link from 'next/link';
import React from 'react'

type Props = {
    company_id: string,
}
const MostSearchSidebar = async ({ company_id }: Props) => {
    const most_search = await apiMostSearch(company_id);
    return (
        <div className="common-sidebar-wrapper mb-4 sidebar-bg">
            <div className="common-sidebar">
                <h6 className="common-sidebar__title"> Frequently Searched </h6>
                <ul className="tag-list flx-align gap-2">
                    {most_search?.data.map((tag: any, i: number) => {
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

export default MostSearchSidebar
