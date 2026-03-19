import { apiMostSearch } from '@/apis/user';
import Link from 'next/link';
import React from 'react'

interface Props {
    company_id: string
}
const MostSearchSidebar = async ({ company_id }: Props) => {
    const most_search = (await apiMostSearch(company_id))?.data;
    if (most_search?.length > 0) {
        return (
            <div className="single-bar">
                <div className="coupon-sin-sidebar d-flex flex-column gap-2 gap-md-1">
                    <h2 className="n17-color mb-4 mb-md-6 f-20">Frequently Searched</h2>
                    <ul className='d-flex flex-wrap gap-3 gap-md-4'>
                        {most_search?.map((tag: string, i: number) => {
                            return (
                                <li key={i}>
                                    <Link href={`/search?query=${tag}`} className='box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex'>
                                        <span className="fs-six text-nowrap transition f-15 fw-5" style={{ color: 'rgb(64 74 96)' }}>{tag}</span>
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

export default MostSearchSidebar
