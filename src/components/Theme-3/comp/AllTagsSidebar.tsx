import { apiGetAllKeywords } from '@/apis/user';
import Link from 'next/link';
import React from 'react'

interface Props {
    company_id: string,
}
const AllTagsSidebar = async ({ company_id }: Props) => {
    const all_tags = (await apiGetAllKeywords(company_id)).data;
    if (all_tags?.length > 0) {

        return (
            <div className="single-bar">
                <span className="v-line w-100 position-relative d-center f-width pt-3 pb-3 pb-md-6"></span>
                <h2 className="n17-color mb-4 mb-md-6 f-20">Popular Tags</h2>
                <ul className='d-flex flex-wrap gap-3 gap-md-4 overflow-hidden'>
                    {all_tags?.map((tag: string, i: number) => {
                        return (
                            <li key={i}>
                                <Link href={`/search?query=${tag}`} className='box-style box-second third-alt rounded-pill py-2 py-md-2 px-3 px-md-5 d-center d-inline-flex'>
                                    <span className="fs-six transition f-15 fw-5" style={{ color: 'rgb(64 74 96)' }}>{tag}</span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default AllTagsSidebar
